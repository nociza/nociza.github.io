"use client";

import { ChevronDown, ChevronUp, ChevronRight } from "lucide-react";

interface NavigationArrowsProps {
  currentSection: string;
  sections: string[];
  onNavigate: (direction: "up" | "down") => void;
  onSwipeRight?: () => void;
}

export default function NavigationArrows({
  currentSection,
  sections,
  onNavigate,
  onSwipeRight,
}: NavigationArrowsProps) {
  const currentIndex = sections.findIndex(
    (section) => section === currentSection
  );
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === sections.length - 1;

  return (
    <>
      {/* Up Arrow - Top of screen */}
      {!isFirst && (
        <button
          type="button"
          onClick={() => onNavigate("up")}
          className="fixed right-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-500 shadow-sm backdrop-blur transition hover:border-black/20 hover:text-orange-700 sm:left-1/2 sm:right-auto sm:top-6 sm:-translate-x-1/2"
          aria-label="Previous section"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Right Arrow - Right side of screen */}
      {onSwipeRight && (
        <button
          type="button"
          onClick={onSwipeRight}
          className="fixed right-3 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-500 shadow-sm backdrop-blur transition hover:border-black/20 hover:text-orange-700 sm:right-6"
          aria-label="View full archive"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Down Arrow - Bottom of screen */}
      {!isLast && (
        <button
          type="button"
          onClick={() => onNavigate("down")}
          className="fixed bottom-3 right-3 z-50 flex h-11 w-11 items-center justify-center rounded-full border border-black/10 bg-white/80 text-neutral-500 shadow-sm backdrop-blur transition hover:border-black/20 hover:text-orange-700 sm:bottom-6 sm:left-1/2 sm:right-auto sm:-translate-x-1/2"
          aria-label="Next section"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
