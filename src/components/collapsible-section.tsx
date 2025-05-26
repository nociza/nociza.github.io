"use client";

import { ReactNode } from "react";

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  return (
    <div className="flex flex-col items-start gap-1">
      <button
        className="text-left transition-all hover:underline"
        onClick={onToggle}
      >
        {title}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="text-sm font-light font-inconsolata">{children}</div>
      </div>
    </div>
  );
}
