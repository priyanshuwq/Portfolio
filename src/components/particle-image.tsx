"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";

interface ParticleImageProps {
  src: string;
  imageSrc?: string;
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
  color: string;
  vx: number = 0;
  vy: number = 0;

  constructor(char: string, baseX: number, baseY: number, canvasWidth: number, canvasHeight: number, color: string) {
    this.char = char;
    this.originX = baseX;
    this.originY = baseY;
    this.color = color;

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

    // Spring force to return to origin
    const dxOrigin = this.originX - this.x;
    const dyOrigin = this.originY - this.y;

    this.vx += dxOrigin * 0.08;
    this.vy += dyOrigin * 0.08;

    if (distance < mouse.radius) {
      const norm_x = dx / distance;
      const norm_y = dy / distance;
      const force = (mouse.radius - distance) / mouse.radius;

      // Swirl and push
      const swirl_x = norm_y;
      const swirl_y = -norm_x;

      this.vx -= (norm_x + swirl_x * 1.5) * force * (this.density * 0.5);
      this.vy -= (norm_y + swirl_y * 1.5) * force * (this.density * 0.5);
    }

    // Friction
    this.vx *= 0.85;
    this.vy *= 0.85;

    this.x += this.vx;
    this.y += this.vy;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillText(this.char, this.x, this.y);
  }
}

export function ParticleImage({ src, imageSrc, width = 224, height = 224, className = "" }: ParticleImageProps) {
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

    const imgSrc = imageSrc || src.replace('.svg', '.png');

    Promise.all([
      fetch(src).then(res => res.text()),
      new Promise<HTMLImageElement>((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = imgSrc;
      })
    ]).then(([svgText, loadedImage]) => {
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

      const offscreen = document.createElement("canvas");
      offscreen.width = vbWidth;
      offscreen.height = vbHeight;
      const offCtx = offscreen.getContext("2d", { willReadFrequently: true });
      if (offCtx) {
        offCtx.drawImage(loadedImage, 0, 0, vbWidth, vbHeight);
      }
      const imgData = offCtx?.getImageData(0, 0, vbWidth, vbHeight).data;

      const texts = doc.querySelectorAll("text");
      const particles: Particle[] = [];

      // Only register valid 1-char ascii particles
      texts.forEach(node => {
        const char = node.textContent?.trim();
        if (char) {
          const x = parseFloat(node.getAttribute("x") || "0");
          const y = parseFloat(node.getAttribute("y") || "0");

          let color = "#d4d4d4";
          if (imgData) {
            const px = Math.min(Math.floor(x), vbWidth - 1);
            const py = Math.min(Math.floor(y), vbHeight - 1);
            if (px >= 0 && py >= 0) {
              const idx = (py * Math.floor(vbWidth) + Math.floor(px)) * 4;
              const r = imgData[idx];
              const g = imgData[idx + 1];
              const b = imgData[idx + 2];
              color = `rgb(${r}, ${g}, ${b})`;
            }
          }

          particles.push(new Particle(char, (x * scale) + offsetX, (y * scale) + offsetY, width, height, color));
        }
      });

      particlesRef.current = particles;
    });
  }, [src, imageSrc, width, height, mounted]);

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

    // Adjust font scale relative to original viewBox height (399) vs physical canvas height (224)
    const fontScaleFactor = height / 399;
    const fontSize = Math.max(8.5 * fontScaleFactor, 4.5); // Ensure text does not get too tiny

    const animate = () => {
      // Lerp radius toward target each frame
      currentRadiusRef.current += (targetRadiusRef.current - currentRadiusRef.current) * 0.12;
      mouseRef.current.radius = currentRadiusRef.current;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = particleAlpha;
      // fillStyle for the ring cursor fallback
      ctx.fillStyle = fillStyle;

      ctx.font = `${fontSize}px monospace`;
      ctx.textBaseline = "middle";
      ctx.textAlign = "center";

      particlesRef.current.forEach(p => {
        p.update(mouseRef.current);
        p.draw(ctx);
      });

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
