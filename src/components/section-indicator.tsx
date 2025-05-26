"use client";

import { useEffect, useState } from "react";

interface SectionIndicatorProps {
  sections: string[];
  currentSection?: string;
  onSectionClick?: (sectionId: string) => void;
}

export default function SectionIndicator({
  sections,
  currentSection,
  onSectionClick,
}: SectionIndicatorProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const currentIndex = sections.findIndex(
      (section) => section === currentSection
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [currentSection, sections]);

  const handleDotClick = (index: number) => {
    const sectionId = sections[index];
    if (onSectionClick) {
      onSectionClick(sectionId);
    }
  };

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-50">
      <div className="flex flex-col space-y-3">
        {sections.map((section, index) => (
          <button
            key={section}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full border-2 transition-all duration-300 hover:scale-125 ${
              index === activeIndex
                ? "bg-gray-800 border-gray-800 shadow-lg"
                : "bg-transparent border-gray-400 hover:border-gray-600"
            }`}
            aria-label={`Go to ${section} section`}
          />
        ))}
      </div>
    </div>
  );
}
