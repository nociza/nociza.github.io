"use client";

import { useEffect, useRef } from "react";

const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;
const maxTrailLength = 1000;
const maxSpeed = 20;

// Rossler attractor parameters
const rosslerA = 0.2;
const rosslerB = 0.2;
const rosslerC = 5.7;

// Chua attractor parameters
const chuaAlpha = 15.6;
const chuaBeta = 28;
const chuaGamma = -1.143;

interface Point {
  x: number;
  y: number;
  z: number;
  dx: number;
  dy: number;
  dz: number;
}

class ChaoticAttractor {
  trail: Point[] = [];
  type: "lorenz" | "rossler" | "chua" | "lorenz-side" = "lorenz";

  constructor(type: "lorenz" | "rossler" | "chua" | "lorenz-side" = "lorenz") {
    this.type = type;
  }

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

      switch (this.type) {
        case "lorenz":
          point.dx = sigma * (point.y - point.x) * dt;
          point.dy = (point.x * (rho - point.z) - point.y) * dt;
          point.dz = (point.x * point.y - beta * point.z) * dt;
          break;
        case "rossler":
          point.dx = (-point.y - point.z) * dt;
          point.dy = (point.x + rosslerA * point.y) * dt;
          point.dz = (rosslerB + point.z * (point.x - rosslerC)) * dt;
          break;
        case "chua":
          const h =
            -1.143 * point.x +
            0.714 * (Math.abs(point.x + 1) - Math.abs(point.x - 1));
          point.dx = chuaAlpha * (point.y - point.x - h) * dt;
          point.dy = (point.x - point.y + point.z) * dt;
          point.dz = (-chuaBeta * point.y - chuaGamma * point.z) * dt;
          break;
        case "lorenz-side":
          // Same as Lorenz but different viewing angle
          point.dx = sigma * (point.y - point.x) * dt;
          point.dy = (point.x * (rho - point.z) - point.y) * dt;
          point.dz = (point.x * point.y - beta * point.z) * dt;
          break;
      }

      point.x += point.dx;
      point.y += point.dy;
      point.z += point.dz;
    }
  }
}

function getVelocityColor(speed: number, type: string): string {
  let hue: number;
  switch (type) {
    case "rossler":
      hue = (1 - speed / maxSpeed) * 120 + 240; // Purple to blue
      break;
    case "chua":
      hue = (1 - speed / maxSpeed) * 60 + 300; // Pink to red
      break;
    case "lorenz-side":
      hue = (1 - speed / maxSpeed) * 120 + 120; // Green to cyan
      break;
    default:
      hue = (1 - speed / maxSpeed) * 240; // Blue to red
  }
  return `hsl(${hue}, 100%, 50%)`;
}

interface LorenzCanvasProps {
  attractorType?: "lorenz" | "rossler" | "chua" | "lorenz-side";
}

export default function LorenzCanvas({
  attractorType = "lorenz",
}: LorenzCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lineRef = useRef<ChaoticAttractor>(new ChaoticAttractor(attractorType));
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    lineRef.current = new ChaoticAttractor(attractorType);
  }, [attractorType]);

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
        ctx.strokeStyle = getVelocityColor(normalizedSpeed, attractorType);
        ctx.lineWidth = 1;
        ctx.beginPath();

        // Different projections for different attractors
        let x1, y1, x2, y2;
        if (attractorType === "lorenz-side") {
          // Side view projection (x-z plane)
          x1 = canvas.width / 2 + point.x * 10;
          y1 = canvas.height / 2 + point.z * 10;
          x2 = canvas.width / 2 + point.x * 10 - point.dx * 10;
          y2 = canvas.height / 2 + point.z * 10 - point.dz * 10;
        } else {
          // Standard x-y projection
          x1 = canvas.width / 2 + point.x * 10;
          y1 = canvas.height / 2 + point.y * 10;
          x2 = canvas.width / 2 + point.x * 10 - point.dx * 10;
          y2 = canvas.height / 2 + point.y * 10 - point.dy * 10;
        }

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
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
  }, [attractorType]);

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
