import { useEffect, useState } from "react";
import { visibleSectionIndex } from "@/lib/section-scroll";

export type AttractorType = "lorenz" | "rossler" | "chua" | "lorenz-side";

const attractors: Record<string, AttractorType> = {
  resume: "lorenz",
  projects: "lorenz-side",
  coffee: "rossler",
  books: "chua",
};

export function useSectionObserver() {
  const [currentSection, setCurrentSection] = useState("resume");

  useEffect(() => {
    const container = document.querySelector<HTMLElement>(".scroll-container");
    if (!container) return;
    const sections = Array.from(container.querySelectorAll<HTMLElement>(".scroll-section"));
    if (!sections.length) return;
    let frame = 0;

    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const index = visibleSectionIndex(sections, container.scrollTop, container.clientHeight);
        setCurrentSection(sections[index].id);
      });
    };

    // Gallery filters and deferred content can change section heights.
    const resizeObserver = new ResizeObserver(update);
    resizeObserver.observe(container);
    sections.forEach((section) => resizeObserver.observe(section));
    container.addEventListener("scroll", update, { passive: true });
    update();

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      container.removeEventListener("scroll", update);
    };
  }, []);

  return { currentSection, currentAttractor: attractors[currentSection] ?? "lorenz" };
}
