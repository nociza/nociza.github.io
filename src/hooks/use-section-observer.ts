import { useEffect, useState } from 'react';

export type AttractorType = 'lorenz' | 'rossler' | 'chua' | 'lorenz-side';

interface SectionConfig {
    id: string;
    attractorType: AttractorType;
}

const sectionConfigs: SectionConfig[] = [
    { id: 'resume', attractorType: 'lorenz' },
    { id: 'coffee', attractorType: 'rossler' },
    { id: 'books', attractorType: 'chua' },
    { id: 'papers', attractorType: 'lorenz-side' },
    // { id: 'music', attractorType: 'lorenz-side' } // Temporarily hidden
];

export function useSectionObserver() {
    const [currentAttractor, setCurrentAttractor] = useState<AttractorType>('lorenz');
    const [currentSection, setCurrentSection] = useState<string>('resume');

    useEffect(() => {
        // Wait for DOM to be ready
        const timer = setTimeout(() => {
            const scrollContainer = document.querySelector('.scroll-container');
            if (!scrollContainer) {
                console.log('Scroll container not found');
                return;
            }

            const updateCurrentSection = () => {
                const scrollTop = scrollContainer.scrollTop;
                const containerHeight = scrollContainer.clientHeight;
                const sections = scrollContainer.querySelectorAll('.scroll-section');

                if (sections.length === 0) {
                    console.log('No sections found');
                    return;
                }

                let currentSectionElement: Element | null = null;
                let minDistance = Infinity;

                // Find the section that is most visible in the viewport
                sections.forEach((section) => {
                    const rect = section.getBoundingClientRect();
                    const containerRect = scrollContainer.getBoundingClientRect();

                    // Calculate how much of the section is visible
                    const visibleTop = Math.max(rect.top, containerRect.top);
                    const visibleBottom = Math.min(rect.bottom, containerRect.bottom);
                    const visibleHeight = Math.max(0, visibleBottom - visibleTop);

                    // If this section has the most visible area, it's the current one
                    if (visibleHeight > 0) {
                        const sectionCenter = rect.top + rect.height / 2;
                        const viewportCenter = containerRect.top + containerRect.height / 2;
                        const distance = Math.abs(sectionCenter - viewportCenter);

                        if (distance < minDistance) {
                            minDistance = distance;
                            currentSectionElement = section;
                        }
                    }
                });

                if (currentSectionElement) {
                    const sectionId = (currentSectionElement as HTMLElement).id;
                    const config = sectionConfigs.find(c => c.id === sectionId);
                    if (config) {
                        console.log('Switching to section:', sectionId, 'attractor:', config.attractorType);
                        setCurrentAttractor(config.attractorType);
                        setCurrentSection(sectionId);
                    }
                }
            };

            // Initial check
            updateCurrentSection();

            // Listen to scroll events with throttling
            let ticking = false;
            const handleScroll = () => {
                if (!ticking) {
                    requestAnimationFrame(() => {
                        updateCurrentSection();
                        ticking = false;
                    });
                    ticking = true;
                }
            };

            scrollContainer.addEventListener('scroll', handleScroll, { passive: true });

            return () => {
                scrollContainer.removeEventListener('scroll', handleScroll);
            };
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return { currentAttractor, currentSection };
} 