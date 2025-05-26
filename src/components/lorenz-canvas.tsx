"use client";

import { useEffect, useRef } from "react";

const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;
const maxTrailLength = 1000;
const maxSpeed = 20;

interface Point {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
}

class LorenzAttractor {
  trail: Point[] = [];

  addPoint(
    x: number,
    y: number,
    z: number,
    dx: number,
    dy: number,
    dz: number
  ) {
    this.trail.push({ x, y, z, dx, dy, dz });
    while (this.trail.length > maxTrailLength) {
      this.trail.shift();
    }
  }

  update() {
    for (let i = 0; i < this.trail.length - 1; i++) {
      const point = this.trail[i];
      point.dx = sigma * (point.y - point.x) * dt;
      point.dy = (point.x * (rho - point.z) - point.y) * dt;
      point.dz = (point.x * point.y - beta * point.z) * dt;
      point.x += point.dx;
      point.y += point.dy;
      point.z += point.dz;
    }
  }
}

function getVelocityColor(speed: number): string {
  const hue = (1 - speed / maxSpeed) * 240;
  return `hsl(${hue}, 100%, 50%)`;
}

export default function LorenzCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<LorenzAttractor>(new LorenzAttractor());
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      lineRef.current.update();

      for (let i = 0; i < lineRef.current.trail.length - 1; i++) {
        const point = lineRef.current.trail[i];
        const speed = Math.sqrt(
          point.dx * point.dx + point.dy * point.dy + point.dz * point.dz
        );
        const normalizedSpeed = Math.min(speed, maxSpeed);
        ctx.strokeStyle = getVelocityColor(normalizedSpeed);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(
          canvas.width / 2 + point.x * 10,
          canvas.height / 2 + point.y * 10
        );
        ctx.lineTo(
          canvas.width / 2 + point.x * 10 - point.dx * 10,
          canvas.height / 2 + point.y * 10 - point.dy * 10
        );
        ctx.stroke();
      }
    };

    const animate = () => {
      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      lineRef.current.addPoint(
        (mouseX - canvas.width / 2) / 10,
        (mouseY - canvas.height / 2) / 10,
        0,
        0,
        0,
        0
      );
    };

    const handleResize = () => {
      resizeCanvas();
    };

    // Initialize
    resizeCanvas();
    animate();

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="absolute inset-0 -z-10"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
      }}
    />
  );
}
