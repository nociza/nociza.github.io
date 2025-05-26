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

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when section is in center of viewport
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    const config = sectionConfigs.find(c => c.id === sectionId);
                    if (config) {
                        setCurrentAttractor(config.attractorType);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        sectionConfigs.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) {
                observer.observe(element);
            }
        });

        return () => {
            observer.disconnect();
        };
    }, []);

    return currentAttractor;
} 