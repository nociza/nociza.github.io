"use client";

import { useState } from "react";

interface NameHeaderProps {
  firstName: string;
  altFirstName: string;
  lastName: string;
}

export default function NameHeader({
  firstName,
  altFirstName,
  lastName,
}: NameHeaderProps) {
  const [hovered, setHovered] = useState(false);

  const nameStyle = {
    color: hovered ? "rgba(255, 168, 68, 0.8)" : "rgba(20, 20, 20, 0.9)",
    fontFamily: "'Times New Roman', 'Times', serif",
    fontSize: "clamp(2.5rem, 7vw, 5rem)",
    fontWeight: "600",
    maxWidth: "68%",
    letterSpacing: "-0.02em",
    textShadow: "none",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    lineHeight: "1.1",
  };

  return (
    <div className="w-full lg:w-[40vw]">
      <div
        className="w-full lg:w-[40vw] cursor-pointer transition-all duration-300"
        style={nameStyle}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {hovered ? altFirstName : firstName}
      </div>
      <div className="heading-normal" style={nameStyle}>
        {lastName}
      </div>
    </div>
  );
}
