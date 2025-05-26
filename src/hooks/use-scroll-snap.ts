import { useEffect, useRef } from 'react';

export function useScrollSnap() {
    const containerRef = useRef<HTMLDivElement>(null);
    const isScrollingRef = useRef(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout>();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        let isSnapping = false;

        const snapToSection = (direction: 'up' | 'down') => {
            if (isSnapping) return;

            const sections = container.querySelectorAll('.scroll-section');
            const containerHeight = container.clientHeight;
            const scrollTop = container.scrollTop;

            let targetSection: Element | null = null;

            if (direction === 'down') {
                // Find the next section that's not fully visible
                for (let i = 0; i < sections.length; i++) {
                    const section = sections[i];
                    const sectionTop = (section as HTMLElement).offsetTop;
                    if (sectionTop > scrollTop + 10) {
                        targetSection = section;
                        break;
                    }
                }
            } else {
                // Find the previous section
                for (let i = sections.length - 1; i >= 0; i--) {
                    const section = sections[i];
                    const sectionTop = (section as HTMLElement).offsetTop;
                    if (sectionTop < scrollTop - 10) {
                        targetSection = section;
                        break;
                    }
                }
            }

            if (targetSection) {
                isSnapping = true;
                const targetTop = (targetSection as HTMLElement).offsetTop;

                container.scrollTo({
                    top: targetTop,
                    behavior: 'smooth'
                });

                // Reset snapping flag after animation
                setTimeout(() => {
                    isSnapping = false;
                }, 800);
            }
        };

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            // Clear any existing timeout
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }

            // Determine scroll direction
            const direction = e.deltaY > 0 ? 'down' : 'up';

            // Debounce the snap action
            scrollTimeoutRef.current = setTimeout(() => {
                snapToSection(direction);
            }, 50);
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
                e.preventDefault();
                snapToSection('down');
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                snapToSection('up');
            }
        };

        // Add event listeners
        container.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            container.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, []);

    return containerRef;
} 