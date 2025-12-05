"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { gsap } from "gsap";
import { DATA } from "@/data/resume";

export function ThreeFooter() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create interconnected nodes (like a network)
    const nodes: THREE.Mesh[] = [];
    const nodeGeometry = new THREE.SphereGeometry(0.08, 16, 16);
    const nodeMaterial = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.8,
    });

    // Create nodes in a grid pattern
    for (let i = 0; i < 15; i++) {
      const node = new THREE.Mesh(nodeGeometry, nodeMaterial.clone());
      const angle = (i / 15) * Math.PI * 2;
      const radius = 3 + Math.random() * 2;
      node.position.set(
        Math.cos(angle) * radius,
        (Math.random() - 0.5) * 3,
        Math.sin(angle) * radius
      );
      scene.add(node);
      nodes.push(node);
    }

    // Create connecting lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.15,
    });

    const lines: THREE.Line[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = nodes[i].position.distanceTo(nodes[j].position);
        if (distance < 3) {
          const lineGeometry = new THREE.BufferGeometry().setFromPoints([
            nodes[i].position,
            nodes[j].position,
          ]);
          const line = new THREE.Line(lineGeometry, lineMaterial.clone());
          scene.add(line);
          lines.push(line);
        }
      }
    }

    // Create floating rings
    const rings: THREE.Mesh[] = [];
    for (let i = 0; i < 3; i++) {
      const ringGeometry = new THREE.TorusGeometry(1 + i * 0.5, 0.02, 16, 100);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x6366f1,
        transparent: true,
        opacity: 0.3,
      });
      const ring = new THREE.Mesh(ringGeometry, ringMaterial);
      ring.position.set(0, -1, -2);
      ring.rotation.x = Math.PI / 2;
      scene.add(ring);
      rings.push(ring);
    }

    // Particle field
    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 500;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(posArray, 3)
    );

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: 0x6366f1,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();

      // Rotate particle field
      particlesMesh.rotation.y = elapsedTime * 0.03;
      particlesMesh.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;

      // Animate nodes (pulsing)
      nodes.forEach((node, i) => {
        const scale = 1 + Math.sin(elapsedTime * 2 + i) * 0.3;
        node.scale.set(scale, scale, scale);
        
        // Rotate nodes around center
        const angle = (i / nodes.length) * Math.PI * 2 + elapsedTime * 0.1;
        const radius = 3 + Math.sin(elapsedTime + i) * 0.5;
        node.position.x = Math.cos(angle) * radius;
        node.position.z = Math.sin(angle) * radius;
        node.position.y = Math.sin(elapsedTime * 0.5 + i) * 1.5;
      });

      // Update lines
      lines.forEach((line) => {
        const positions = line.geometry.attributes.position.array as Float32Array;
        line.geometry.attributes.position.needsUpdate = true;
      });

      // Animate rings
      rings.forEach((ring, i) => {
        ring.rotation.z = elapsedTime * (0.5 + i * 0.2);
        ring.scale.set(
          1 + Math.sin(elapsedTime + i) * 0.1,
          1 + Math.sin(elapsedTime + i) * 0.1,
          1
        );
      });

      // Camera follows mouse
      camera.position.x += (mouseX * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouseY * 2 - camera.position.y) * 0.02;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // GSAP entrance animations
    gsap.from(camera.position, {
      duration: 2.5,
      z: 15,
      ease: "power3.out",
    });

    nodes.forEach((node, i) => {
      gsap.from(node.scale, {
        duration: 1.5,
        x: 0,
        y: 0,
        z: 0,
        delay: i * 0.05,
        ease: "back.out(1.7)",
      });
    });

    // Handle resize
    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };

    window.addEventListener("resize", handleResize);

    // Theme change detection
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      const newColor = isDark ? 0x6366f1 : 0x3b82f6;
      const color = new THREE.Color(newColor);
      
      nodes.forEach((node) => {
        gsap.to((node.material as THREE.MeshBasicMaterial).color, {
          duration: 0.5,
          r: color.r,
          g: color.g,
          b: color.b,
        });
      });

      lines.forEach((line) => {
        gsap.to((line.material as THREE.LineBasicMaterial).color, {
          duration: 0.5,
          r: color.r,
          g: color.g,
          b: color.b,
        });
      });

      rings.forEach((ring) => {
        gsap.to((ring.material as THREE.MeshBasicMaterial).color, {
          duration: 0.5,
          r: color.r,
          g: color.g,
          b: color.b,
        });
      });

      gsap.to(particlesMaterial.color, {
        duration: 0.5,
        r: color.r,
        g: color.g,
        b: color.b,
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    // Animate content entrance
    if (contentRef.current) {
      gsap.from(contentRef.current, {
        opacity: 0,
        y: 50,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.5,
      });
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
      renderer.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      lineMaterial.dispose();
    };
  }, []);

  return (
    <footer className="relative w-full min-h-[400px] py-16 mt-16 border-t overflow-hidden bg-background">
      {/* Three.js Canvas Background */}
      <div 
        ref={containerRef}
        className="absolute inset-0 w-full h-full"
      >
        <canvas ref={canvasRef} className="w-full h-full" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6">
        <div ref={contentRef} className="flex flex-col items-center gap-6">
          <div className="text-center space-y-2">
            <p className="text-sm text-muted-foreground">
              Design & Developed by <span className="font-semibold text-foreground">{DATA.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
