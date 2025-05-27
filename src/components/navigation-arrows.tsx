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
          onClick={() => onNavigate("up")}
          className="fixed top-8 left-1/2 transform -translate-x-1/2 z-50 text-gray-400 hover:text-orange-500 transition-colors duration-200"
          aria-label="Previous section"
        >
          <ChevronUp className="w-6 h-6" />
        </button>
      )}

      {/* Right Arrow - Right side of screen */}
      {onSwipeRight && (
        <button
          onClick={onSwipeRight}
          className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50 text-gray-400 hover:text-orange-500 transition-colors duration-200"
          aria-label="View full archive"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Down Arrow - Bottom of screen */}
      {!isLast && (
        <button
          onClick={() => onNavigate("down")}
          className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 text-gray-400 hover:text-orange-500 transition-colors duration-200"
          aria-label="Next section"
        >
          <ChevronDown className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
