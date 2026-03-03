"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface ParticleImageProps {
  src: string;
  width?: number;
  height?: number;
  className?: string;
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  char: string;
  density: number;

  constructor(char: string, baseX: number, baseY: number, canvasWidth: number, canvasHeight: number) {
    this.char = char;
    this.originX = baseX;
    this.originY = baseY;

    // Initial spawn effect scattering from outer ring inwards
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const angle = Math.atan2(baseY - centerY, baseX - centerX);
    const dist = Math.sqrt((baseX - centerX) ** 2 + (baseY - centerY) ** 2) + (Math.random() * 500 + 300);
    const phase = angle + Math.random() * 2;

    this.x = centerX + Math.cos(phase) * dist;
    this.y = centerY + Math.sin(phase) * dist;
    this.density = Math.random() * 15 + 5;
  }

  update(mouse: { x: number; y: number; radius: number }) {
    const dx = mouse.x - this.x;
    const dy = mouse.y - this.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < mouse.radius) {
      const norm_x = dx / distance;
      const norm_y = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;
      // Add a tangential swirl force + radial push
      const swirl_x = norm_y;
      const swirl_y = -norm_x;

      const push_x = (norm_x + swirl_x * 2.5) * force * this.density * 2.0;
      const push_y = (norm_y + swirl_y * 2.5) * force * this.density * 2.0;

      this.x -= push_x;
      this.y -= push_y;
    } else {
      // Return to original quickly and smoothly
      const easeSpeed = this.density * 0.9;
      if (Math.abs(this.x - this.originX) > 0.05) this.x -= (this.x - this.originX) / easeSpeed;
      if (Math.abs(this.y - this.originY) > 0.05) this.y -= (this.y - this.originY) / easeSpeed;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillText(this.char, this.x, this.y);
  }
}

export function ParticleImage({ src, width = 224, height = 224, className = "" }: ParticleImageProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000, radius: 20 });
  const currentRadiusRef = useRef(20);
  const targetRadiusRef = useRef(20);
  const requestRef = useRef<number>(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    fetch(src)
      .then(res => res.text())
      .then(svgText => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(svgText, "image/svg+xml");
        const svgNode = doc.querySelector("svg");
        const vb = svgNode?.getAttribute("viewBox")?.split(" ") || ["0", "0", "400", "399"];
        const vbWidth = parseFloat(vb[2]);
        const vbHeight = parseFloat(vb[3]);

        // Ensure scale is computed cleanly representing layout dimensions
        const scale = Math.min(width / vbWidth, height / vbHeight);
        const offsetX = (width - vbWidth * scale) / 2;
        const offsetY = (height - vbHeight * scale) / 2;

        const texts = doc.querySelectorAll("text");
        const particles: Particle[] = [];

        // Only register valid 1-char ascii particles
        texts.forEach(node => {
          const char = node.textContent?.trim();
          if (char) {
            const x = parseFloat(node.getAttribute("x") || "0");
            const y = parseFloat(node.getAttribute("y") || "0");
            particles.push(new Particle(char, (x * scale) + offsetX, (y * scale) + offsetY, width, height));
          }
        });

        particlesRef.current = particles;
      });
  }, [src, width, height, mounted]);

  useEffect(() => {
    if (!mounted) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = width * pixelRatio;
    canvas.height = height * pixelRatio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.scale(pixelRatio, pixelRatio);

    const isDark = resolvedTheme === "dark" || resolvedTheme === "system";
    const fillStyle = isDark ? "#d4d4d4" : "#525252";
    const particleAlpha = isDark ? 1 : 0.88;
    const ringAlpha = isDark ? 0.4 : 0.3;

    // Adjust font scale relative to original viewBox height (399) vs physical canvas height (224)
    const fontScaleFactor = height / 399;
    const fontSize = Math.max(8.5 * fontScaleFactor, 4.5); // Ensure text does not get too tiny

    const animate = () => {
      // Lerp radius toward target each frame
      currentRadiusRef.current += (targetRadiusRef.current - currentRadiusRef.current) * 0.12;
      mouseRef.current.radius = currentRadiusRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = particleAlpha;
      ctx.fillStyle = fillStyle;

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      particlesRef.current.forEach(p => {
        p.update(mouseRef.current);
        p.draw(ctx);
      });

      // Draw visible cursor ring
      const mouse = mouseRef.current;
      if (mouse.x > -999) {
        ctx.save();
        ctx.globalAlpha = ringAlpha;
        ctx.strokeStyle = fillStyle;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, currentRadiusRef.current, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      requestRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(requestRef.current);
    };
  }, [width, height, resolvedTheme, mounted]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
  };

  const handleMouseLeave = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    targetRadiusRef.current = 20;
  };

  const handleMouseDown = () => {
    targetRadiusRef.current = 80;
  };

  const handleMouseUp = () => {
    targetRadiusRef.current = 20;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const touch = e.touches[0];
    if (!touch) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = touch.clientX - rect.left;
    mouseRef.current.y = touch.clientY - rect.top;
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    targetRadiusRef.current = 80;
    handleTouchMove(e);
  };

  const handleTouchEnd = () => {
    mouseRef.current.x = -1000;
    mouseRef.current.y = -1000;
    targetRadiusRef.current = 20;
  };

  return (
    <canvas
      ref={canvasRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseOut={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      style={{ display: "block", touchAction: "none" }}
    />
  );
}
