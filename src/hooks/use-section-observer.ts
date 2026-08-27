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
    // { id: 'music', attractorType: 'lorenz-side' } // Temporarily hidden
];

export function useSectionObserver() {
    const [currentAttractor, setCurrentAttractor] = useState<AttractorType>('lorenz');
    const [currentSection, setCurrentSection] = useState<string>('resume');

    useEffect(() => {
        const scrollContainer = document.querySelector<HTMLElement>('.scroll-container');
        if (!scrollContainer) {
            return;
        }

        const sectionRatios = new Map<string, number>();
        const sections = Array.from(
            scrollContainer.querySelectorAll<HTMLElement>('.scroll-section')
        );

        if (sections.length === 0) {
            return;
        }

        const updateCurrentSection = () => {
            let nextSection = sectionConfigs[0].id;
            let highestRatio = -1;

            sectionConfigs.forEach((config) => {
                const ratio = sectionRatios.get(config.id) ?? 0;
                if (ratio > highestRatio) {
                    highestRatio = ratio;
                    nextSection = config.id;
                }
            });

            const nextConfig =
                sectionConfigs.find((config) => config.id === nextSection) ??
                sectionConfigs[0];

            setCurrentSection((previous) =>
                previous === nextSection ? previous : nextSection
            );
            setCurrentAttractor((previous) =>
                previous === nextConfig.attractorType
                    ? previous
                    : nextConfig.attractorType
            );
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    sectionRatios.set(
                        (entry.target as HTMLElement).id,
                        entry.intersectionRatio
                    );
                });
                updateCurrentSection();
            },
            {
                root: scrollContainer,
                threshold: [0.2, 0.4, 0.6, 0.8],
            }
        );

        sections.forEach((section) => {
            sectionRatios.set(section.id, section.id === 'resume' ? 1 : 0);
            observer.observe(section);
        });
        updateCurrentSection();

        return () => {
            observer.disconnect();
        };
    }, []);

    return { currentAttractor, currentSection };
}
