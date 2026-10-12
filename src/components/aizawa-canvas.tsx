"use client";

import { useEffect, useRef } from "react";
import { createAizawaTrajectory } from "@/lib/aizawa";

export default function AizawaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    const points = createAizawaTrajectory();
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let width = 0;
    let height = 0;
    let yaw = 0.4;
    let tilt = 0.35;
    let targetYaw = yaw;
    let targetTilt = tilt;
    let frame: number | undefined;
    let previousTime = 0;

    const draw = () => {
      context.clearRect(0, 0, width, height);
      const scale = Math.min(width * 0.22, height * 0.25);
      const centerX = width >= 900 ? width - scale * 1.7 - 24 : width / 2;
      const centerY = height * 0.55;
      const cosYaw = Math.cos(yaw);
      const sinYaw = Math.sin(yaw);
      const cosTilt = Math.cos(tilt);
      const sinTilt = Math.sin(tilt);
      const gradient = context.createLinearGradient(centerX - scale, centerY - scale, centerX + scale, centerY + scale);
      gradient.addColorStop(0, "#8b5cf6");
      gradient.addColorStop(1, "#0d9488");
      context.strokeStyle = gradient;
      context.lineWidth = 0.7;
      context.globalAlpha = 0.32;
      context.beginPath();

      points.forEach(([x, y, z], index) => {
        const rotatedX = x * cosYaw - y * sinYaw;
        const depth = x * sinYaw + y * cosYaw;
        const screenX = centerX + rotatedX * scale;
        const screenY = centerY - ((z - 0.5) * cosTilt + depth * sinTilt) * scale;
        if (index === 0) context.moveTo(screenX, screenY);
        else context.lineTo(screenX, screenY);
      });
      context.stroke();
    };

    const animate = (time: number) => {
      frame = undefined;
      if (document.hidden || motion.matches) return;
      const elapsed = previousTime ? Math.min(time - previousTime, 50) : 16;
      previousTime = time;
      const blend = 1 - Math.exp(-elapsed / 120);
      yaw += (targetYaw - yaw) * blend;
      tilt += (targetTilt - tilt) * blend;
      draw();
      if (Math.abs(targetYaw - yaw) + Math.abs(targetTilt - tilt) > 0.001) {
        frame = requestAnimationFrame(animate);
      } else previousTime = 0;
    };

    const stop = () => {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
      previousTime = 0;
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.round(width * ratio);
      canvas.height = Math.round(height * ratio);
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      draw();
    };

    const handlePointer = (event: PointerEvent) => {
      if (motion.matches || document.hidden || event.pointerType === "touch") return;
      targetYaw = 0.4 + (event.clientX / width - 0.5) * 0.7;
      targetTilt = 0.35 + (event.clientY / height - 0.5) * 0.3;
      if (frame === undefined) frame = requestAnimationFrame(animate);
    };

    const handleMotion = () => {
      stop();
      yaw = targetYaw = 0.4;
      tilt = targetTilt = 0.35;
      draw();
    };

    const handleVisibility = () => {
      stop();
      if (!document.hidden) draw();
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", handlePointer, { passive: true });
    document.addEventListener("visibilitychange", handleVisibility);
    motion.addEventListener("change", handleMotion);
    return () => {
      stop();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointer);
      document.removeEventListener("visibilitychange", handleVisibility);
      motion.removeEventListener("change", handleMotion);
    };
  }, []);

  return <canvas ref={canvasRef} data-attractor="aizawa" aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full" />;
}
