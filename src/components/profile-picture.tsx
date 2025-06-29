"use client";

import { useState } from "react";

interface ProfilePictureProps {
  size?: number;
  className?: string;
}

export default function ProfilePicture({
  size = 300,
  className = "",
}: ProfilePictureProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={`relative overflow-hidden rounded-full cursor-pointer transition-all duration-300 ${className}`}
      style={{ width: size, height: size }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Skull image (default) - adjusted padding to prevent cropping */}
      <img
        alt="Profile"
        src="/skull.png"
        width={size}
        height={size}
        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-300 p-10 ${
          isHovered ? "opacity-0" : "opacity-100"
        }`}
        style={{
          filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))",
        }}
      />

      {/* LinkedIn picture (on hover) */}
      <img
        alt="Alex Zhang"
        src="/linkedin_pic_rounded.png"
        width={size}
        height={size}
        className={`absolute inset-0 w-full h-full object-cover rounded-full transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      />
    </div>
  );
}
