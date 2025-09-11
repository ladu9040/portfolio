"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface ParticleType {
  radius: number;
  explosionRadius: number;
  x: number;
  y: number;
  angle: number;
  velocity: { x: number; y: number };
  alpha: number;
  reset: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  update: () => void;
}

const ParticleCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particles = useRef<ParticleType[]>([]);
  const multiply = 500;
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      mousePos.current.x = window.innerWidth / 2;
      mousePos.current.y = window.innerHeight / 2;
    };

    const random = (min: number, max: number) => Math.random() * (max - min) + min;

    class Particle implements ParticleType {
      radius!: number;
      explosionRadius!: number;
      x!: number;
      y!: number;
      angle!: number;
      velocity!: { x: number; y: number };
      alpha!: number;

      constructor() {
        this.reset();
      }

      reset() {
        this.radius = 0.5 + Math.random() * 1.2; // smaller size
        this.x = mousePos.current.x;
        this.y = mousePos.current.y;
        this.explosionRadius = 2;
        this.angle = random(0, Math.PI * 2);
        this.velocity = {
          x: Math.sin(this.angle) * this.explosionRadius,
          y: Math.cos(this.angle) * this.explosionRadius,
        };
        this.alpha = Math.random();
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fillStyle = "black"; // fixed black color
        ctx.globalAlpha = this.alpha;
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.01;
        if (this.alpha < 0) this.reset();
      }
    }

    // Initialize particles
    for (let i = 0; i < multiply; i++) {
      particles.current.push(new Particle());
    }

    // GSAP ticker callback
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
    };

    gsap.ticker.add(tick);

    const handleMouseMove = (e: MouseEvent) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", handleMouseMove);

    resize();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "transparent",
      }}
    />
  );
};

export default ParticleCanvas;
