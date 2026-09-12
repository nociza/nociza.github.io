import { useEffect, useRef } from "react";
import { canScrollWithinSection, visibleSectionIndex } from "@/lib/section-scroll";

export function useScrollSnap() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const sections = Array.from(container.querySelectorAll<HTMLElement>(".scroll-section"));
    let isSnapping = false;
    let wheelTimeout: number | undefined;
    let unlockTimeout: number | undefined;

    const currentIndex = () =>
      visibleSectionIndex(sections, container.scrollTop, container.clientHeight);
    const canScrollWithin = (direction: number) => {
      const section = sections[currentIndex()];
      return section && canScrollWithinSection(
        section, container.scrollTop, container.clientHeight, direction,
      );
    };

    const scrollToIndex = (index: number) => {
      const target = sections[Math.max(0, Math.min(index, sections.length - 1))];
      if (!target) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      isSnapping = true;
      container.scrollTo({ top: target.offsetTop, behavior: reduceMotion ? "auto" : "smooth" });

      window.clearTimeout(unlockTimeout);
      unlockTimeout = window.setTimeout(() => {
        isSnapping = false;
      }, reduceMotion ? 100 : 700);
    };

    const handleWheel = (event: WheelEvent) => {
      // Keep native horizontal scrolling available for galleries.
      if (Math.abs(event.deltaX) > Math.abs(event.deltaY) || Math.abs(event.deltaY) < 1) {
        return;
      }

      window.clearTimeout(wheelTimeout);
      if (isSnapping) {
        event.preventDefault();
        return;
      }
      // Read every card in an oversized section before snapping onward.
      if (canScrollWithin(event.deltaY)) return;

      event.preventDefault();
      wheelTimeout = window.setTimeout(() => {
        scrollToIndex(currentIndex() + (event.deltaY > 0 ? 1 : -1));
      }, 50);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, button, a, [contenteditable='true']")) return;

      const direction = ["ArrowDown", "PageDown", " "].includes(event.key)
        ? (event.key === " " && event.shiftKey ? -1 : 1)
        : ["ArrowUp", "PageUp"].includes(event.key) ? -1 : 0;
      if (direction) {
        event.preventDefault();
        if (canScrollWithin(direction)) {
          const section = sections[currentIndex()];
          const step = event.key.startsWith("Arrow") ? 40 : container.clientHeight * 0.8;
          container.scrollTo({
            top: Math.max(section.offsetTop, Math.min(
              container.scrollTop + direction * step,
              section.offsetTop + section.offsetHeight - container.clientHeight,
            )),
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
          });
          return;
        }
        scrollToIndex(currentIndex() + direction);
      } else if (event.key === "Home") {
        event.preventDefault();
        scrollToIndex(0);
      } else if (event.key === "End") {
        event.preventDefault();
        scrollToIndex(sections.length - 1);
      }
    };

    container.addEventListener("wheel", handleWheel, { passive: false });
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      container.removeEventListener("wheel", handleWheel);
      document.removeEventListener("keydown", handleKeyDown);
      window.clearTimeout(wheelTimeout);
      window.clearTimeout(unlockTimeout);
    };
  }, []);

  return containerRef;
}
