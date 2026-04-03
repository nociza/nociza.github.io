"use client";

import { useEffect, useRef } from "react";

const sigma = 10;
const rho = 28;
const beta = 8 / 3;
const dt = 0.01;
const maxTrailLength = 480;
const maxSpeed = 20;
const maxDevicePixelRatio = 1.5;
const pointThrottleMs = 24;
const minPointerDelta = 8;

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
    if (this.trail.length > maxTrailLength) {
      this.trail.splice(0, this.trail.length - maxTrailLength);
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
  const viewportRef = useRef({ width: 0, height: 0 });
  const lastPointerRef = useRef({ x: 0, y: 0, time: 0 });

  useEffect(() => {
    lineRef.current = new ChaoticAttractor(attractorType);
  }, [attractorType]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const pixelRatio = Math.min(window.devicePixelRatio || 1, maxDevicePixelRatio);

      viewportRef.current = { width, height };
      canvas.width = Math.floor(width * pixelRatio);
      canvas.height = Math.floor(height * pixelRatio);
      ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    };

    const draw = () => {
      const { width, height } = viewportRef.current;
      ctx.clearRect(0, 0, width, height);

      if (lineRef.current.trail.length === 0) {
        return;
      }

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
          x1 = width / 2 + point.x * 10;
          y1 = height / 2 + point.z * 10;
          x2 = width / 2 + point.x * 10 - point.dx * 10;
          y2 = height / 2 + point.z * 10 - point.dz * 10;
        } else {
          // Standard x-y projection
          x1 = width / 2 + point.x * 10;
          y1 = height / 2 + point.y * 10;
          x2 = width / 2 + point.x * 10 - point.dx * 10;
          y2 = height / 2 + point.y * 10 - point.dy * 10;
        }

        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    };

    const stopAnimation = () => {
      if (animationFrameRef.current !== undefined) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = undefined;
      }
    };

    const animate = () => {
      if (document.hidden) {
        stopAnimation();
        return;
      }

      draw();
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationFrameRef.current === undefined) {
        animationFrameRef.current = requestAnimationFrame(animate);
      }
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );
    const legacyMediaQuery = prefersReducedMotion as MediaQueryList & {
      addListener?: (listener: (event: MediaQueryListEvent) => void) => void;
      removeListener?: (listener: (event: MediaQueryListEvent) => void) => void;
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion.matches) {
        return;
      }

      const now = performance.now();
      const deltaX = event.clientX - lastPointerRef.current.x;
      const deltaY = event.clientY - lastPointerRef.current.y;
      const movedDistance = Math.hypot(deltaX, deltaY);

      if (
        now - lastPointerRef.current.time < pointThrottleMs &&
        movedDistance < minPointerDelta
      ) {
        return;
      }

      lastPointerRef.current = {
        x: event.clientX,
        y: event.clientY,
        time: now,
      };

      const { width, height } = viewportRef.current;

      lineRef.current.addPoint(
        (event.clientX - width / 2) / 10,
        (event.clientY - height / 2) / 10,
        0,
        0,
        0,
        0
      );

      startAnimation();
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAnimation();
      } else if (
        !prefersReducedMotion.matches &&
        lineRef.current.trail.length > 0
      ) {
        startAnimation();
      }
    };

    const handleMotionPreferenceChange = () => {
      const { width, height } = viewportRef.current;

      if (prefersReducedMotion.matches) {
        stopAnimation();
        ctx.clearRect(0, 0, width, height);
        return;
      }

      if (!document.hidden && lineRef.current.trail.length > 0) {
        startAnimation();
      }
    };

    // Initialize
    resizeCanvas();

    // Event listeners
    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    window.addEventListener("resize", resizeCanvas);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    if (typeof prefersReducedMotion.addEventListener === "function") {
      prefersReducedMotion.addEventListener(
        "change",
        handleMotionPreferenceChange
      );
    } else if (legacyMediaQuery.addListener) {
      legacyMediaQuery.addListener(handleMotionPreferenceChange);
    }

    return () => {
      stopAnimation();
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", resizeCanvas);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      if (typeof prefersReducedMotion.removeEventListener === "function") {
        prefersReducedMotion.removeEventListener(
          "change",
          handleMotionPreferenceChange
        );
      } else if (legacyMediaQuery.removeListener) {
        legacyMediaQuery.removeListener(handleMotionPreferenceChange);
      }
    };
  }, [attractorType]);

  return (
    <canvas
      ref={canvasRef}
      id="canvas"
      className="pointer-events-none absolute inset-0 -z-10"
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
