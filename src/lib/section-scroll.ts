interface SectionBounds {
  offsetTop: number;
  offsetHeight: number;
}

// Compare visible pixels, not center distance or percentage of section height:
// a tall mobile gallery must remain active while its middle fills the viewport.
export function visibleSectionIndex(
  sections: readonly SectionBounds[],
  scrollTop: number,
  viewportHeight: number,
): number {
  let active = 0;
  let mostVisible = -1;
  sections.forEach((section, index) => {
    const visible = Math.max(0,
      Math.min(section.offsetTop + section.offsetHeight, scrollTop + viewportHeight)
      - Math.max(section.offsetTop, scrollTop),
    );
    if (visible > mostVisible) {
      mostVisible = visible;
      active = index;
    }
  });
  return active;
}

export function canScrollWithinSection(
  section: SectionBounds,
  scrollTop: number,
  viewportHeight: number,
  direction: number,
): boolean {
  if (section.offsetHeight <= viewportHeight + 4) return false;
  return direction > 0
    ? scrollTop + viewportHeight < section.offsetTop + section.offsetHeight - 4
    : scrollTop > section.offsetTop + 4;
}
