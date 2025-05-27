import { useState, useEffect } from 'react';
import { NotionCoffeeEntry } from '@/lib/notion';

export function useCoffeeData() {
    const [coffeeData, setCoffeeData] = useState<NotionCoffeeEntry[]>([]);
    const [currentlyDrinking, setCurrentlyDrinking] = useState<NotionCoffeeEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCoffeeData = async () => {
            try {
                setLoading(true);

                // Fetch all coffee entries
                const coffeeResponse = await fetch('/api/coffee');
                if (!coffeeResponse.ok) {
                    throw new Error('Failed to fetch coffee data');
                }
                const allCoffee = await coffeeResponse.json();
                setCoffeeData(allCoffee);

                // Fetch currently drinking coffee
                const currentResponse = await fetch('/api/coffee/currently-drinking');
                if (!currentResponse.ok) {
                    throw new Error('Failed to fetch currently drinking coffee');
                }
                const current = await currentResponse.json();
                setCurrentlyDrinking(current);

                setError(null);
            } catch (err) {
                console.error('Error fetching coffee data:', err);

                // Check if it's a configuration issue
                const isConfigError = err instanceof Error &&
                    (err.message.includes('invalid_request_url') ||
                        err.message.includes('not configured') ||
                        err.message.includes('object_not_found') ||
                        err.message.includes('validation_error'));

                if (isConfigError) {
                    console.log('Notion configuration issue detected, using static data');
                    setError(null); // Don't show error for config issues
                } else {
                    setError(err instanceof Error ? err.message : 'Unknown error');
                }

                // Fallback to static data if API fails
                const { coffeeData: staticData } = await import('../data/personal-data');
                setCoffeeData(staticData.map((coffee, index) => ({
                    id: `static-${index}`,
                    name: coffee.name,
                    roaster: coffee.roaster,
                    date: coffee.date,
                    notes: coffee.notes,
                    status: 'completed' as const,
                })));
                setCurrentlyDrinking([]);
            } finally {
                setLoading(false);
            }
        };

        fetchCoffeeData();
    }, []);

    const addCoffeeEntry = async (entry: Omit<NotionCoffeeEntry, 'id'>) => {
        try {
            const response = await fetch('/api/coffee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(entry),
            });

            if (!response.ok) {
                throw new Error('Failed to add coffee entry');
            }

            const result = await response.json();

            // Refresh data after adding
            const coffeeResponse = await fetch('/api/coffee');
            if (coffeeResponse.ok) {
                const updatedCoffee = await coffeeResponse.json();
                setCoffeeData(updatedCoffee);
            }

            return result.id;
        } catch (err) {
            console.error('Error adding coffee entry:', err);
            throw err;
        }
    };

    return {
        coffeeData,
        currentlyDrinking,
        loading,
        error,
        addCoffeeEntry,
    };
} 