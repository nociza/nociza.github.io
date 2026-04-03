"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface ProfilePictureProps {
  size?: number;
  className?: string;
}

export default function ProfilePicture({
  size = 300,
  className = "",
}: ProfilePictureProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [shouldLoadPortrait, setShouldLoadPortrait] = useState(false);

  useEffect(() => {
    if (shouldLoadPortrait) {
      return;
    }

    if (typeof window.requestIdleCallback === "function") {
      const idleCallbackId = window.requestIdleCallback(
        () => setShouldLoadPortrait(true),
        { timeout: 1500 }
      );

      return () => window.cancelIdleCallback?.(idleCallbackId);
    }

    const timeoutId = window.setTimeout(() => {
      setShouldLoadPortrait(true);
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [shouldLoadPortrait]);

  const handleMouseEnter = () => {
    setShouldLoadPortrait(true);
    setIsHovered(true);
  };

  return (
    <div
      className={`relative overflow-hidden rounded-full cursor-pointer transition-all duration-300 ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Image
        alt="Profile illustration"
        src="/skull.png"
        fill
        priority
        sizes={`${size}px`}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 p-10 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        }}
      />

      {shouldLoadPortrait ? (
        <Image
          alt="Alex Zhang"
          src="/linkedin_pic.jpg"
          fill
          sizes={`${size}px`}
          className={`absolute inset-0 h-full w-full rounded-full object-cover transition-opacity duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </div>
  );
}
