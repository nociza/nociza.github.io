import { useEffect, useRef } from "react";

export function useScrollSnap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.querySelectorAll<HTMLElement>(".scroll-section"));

    const currentIndex = () => {
      const center = container.scrollTop + container.clientHeight / 2;
      return sections.reduce((closest, section, index) => {
        const sectionCenter = section.offsetTop + section.offsetHeight / 2;
        const closestCenter = sections[closest].offsetTop + sections[closest].offsetHeight / 2;
        return Math.abs(sectionCenter - center) < Math.abs(closestCenter - center) ? index : closest;
      }, 0);
    };

    const scrollToIndex = (index: number) => {
      const target = sections[Math.max(0, Math.min(index, sections.length - 1))];
      if (!target) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      container.scrollTo({ top: target.offsetTop, behavior: reduceMotion ? "auto" : "smooth" });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true']")) return;

      if (["ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        scrollToIndex(currentIndex() + 1);
      } else if (["ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        scrollToIndex(currentIndex() - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        scrollToIndex(sections.length - 1);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return containerRef;
}
