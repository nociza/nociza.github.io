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
  const [showPortrait, setShowPortrait] = useState(false);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [shouldLoadPortrait, setShouldLoadPortrait] = useState(false);
  const portraitVisible = showPortrait || isPreviewing;

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

  const showPhoto = () => {
    setShouldLoadPortrait(true);
    setIsPreviewing(true);
  };

  return (
    <button
      type="button"
      aria-label={portraitVisible ? "Show profile illustration" : "Show portrait"}
      aria-pressed={showPortrait}
      className={`relative overflow-hidden rounded-full transition-transform duration-300 hover:scale-[1.015] ${className}`}
      style={{ width: `min(${size}px, 58vw)`, aspectRatio: "1 / 1" }}
      onClick={() => {
        setShouldLoadPortrait(true);
        setShowPortrait((visible) => !visible);
      }}
      onMouseEnter={showPhoto}
      onMouseLeave={() => setIsPreviewing(false)}
      onFocus={showPhoto}
      onBlur={() => setIsPreviewing(false)}
    >
      <Image
        alt="Profile illustration"
        src="/skull.png"
        fill
        priority
        sizes={`${size}px`}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 p-10 ${
          portraitVisible ? "opacity-0" : "opacity-100"
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
            portraitVisible ? "opacity-100" : "opacity-0"
          }`}
        />
      ) : null}
    </button>
  );
}
