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
    { id: 'music', attractorType: 'lorenz-side' }
];

export function useSectionObserver() {
    const [currentAttractor, setCurrentAttractor] = useState<AttractorType>('lorenz');
    const [currentSection, setCurrentSection] = useState<string>('resume');

    useEffect(() => {
        const scrollContainer = document.querySelector('.scroll-container');
        if (!scrollContainer) return;

        const updateCurrentSection = () => {
            const scrollTop = scrollContainer.scrollTop;
            const containerHeight = scrollContainer.clientHeight;
            const sections = scrollContainer.querySelectorAll('.scroll-section');

            let currentSectionElement: Element | null = null;
            let minDistance = Infinity;

            // Find the section closest to the center of the viewport
            sections.forEach((section) => {
                const sectionTop = (section as HTMLElement).offsetTop;
                const sectionHeight = (section as HTMLElement).offsetHeight;
                const sectionCenter = sectionTop + sectionHeight / 2;
                const viewportCenter = scrollTop + containerHeight / 2;
                const distance = Math.abs(sectionCenter - viewportCenter);

                if (distance < minDistance) {
                    minDistance = distance;
                    currentSectionElement = section;
                }
            });

            if (currentSectionElement) {
                const sectionId = (currentSectionElement as HTMLElement).id;
                const config = sectionConfigs.find(c => c.id === sectionId);
                if (config) {
                    setCurrentAttractor(config.attractorType);
                    setCurrentSection(sectionId);
                }
            }
        };

        // Initial check
        updateCurrentSection();

        // Listen to scroll events
        scrollContainer.addEventListener('scroll', updateCurrentSection);

        return () => {
            scrollContainer.removeEventListener('scroll', updateCurrentSection);
        };
    }, []);

    return { currentAttractor, currentSection };
} 