import { useState, useEffect } from 'react';

interface CoffeeEntry {
    id: string;
    name: string;
    roaster: string;
    date: string;
    notes: string;
    pourOverRating?: number;
    americanoRating?: number;
    origin?: string;
    process?: string;
    status?: string;
}

interface UseCoffeeDataReturn {
    coffeeEntries: CoffeeEntry[];
    currentlyDrinking: CoffeeEntry[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
}

// Fallback data
const fallbackCoffeeData: CoffeeEntry[] = [
    {
        id: "fallback-1",
        name: "Sample Coffee",
        roaster: "Local Roaster",
        date: "2024-01-01",
        notes: "A delicious coffee with notes of chocolate and caramel.",
        pourOverRating: 8,
        americanoRating: 7,
        origin: "Colombia",
        process: "Washed",
        status: "completed"
    }
];

export function useCoffeeData(): UseCoffeeDataReturn {
    const [coffeeEntries, setCoffeeEntries] = useState<CoffeeEntry[]>(fallbackCoffeeData);
    const [currentlyDrinking, setCurrentlyDrinking] = useState<CoffeeEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchCoffeeData = async () => {
        setLoading(true);
        setError(null);

        try {
            // Try to fetch from static JSON files
            const [allResponse, currentResponse] = await Promise.all([
                fetch('/data/coffee.json'),
                fetch('/data/coffee-current.json')
            ]);

            if (allResponse.ok) {
                const allData = await allResponse.json();
                if (allData.length > 0) {
                    setCoffeeEntries(allData);
                    console.log(`Loaded ${allData.length} coffee entries from static data`);
                } else {
                    console.log('No coffee entries in static data, using fallback');
                    setCoffeeEntries(fallbackCoffeeData);
                }
            } else {
                console.log('Static coffee data not found, using fallback');
                setCoffeeEntries(fallbackCoffeeData);
            }

            if (currentResponse.ok) {
                const currentData = await currentResponse.json();
                setCurrentlyDrinking(currentData);
                console.log(`Loaded ${currentData.length} currently drinking entries from static data`);
            } else {
                console.log('Static currently drinking data not found');
                setCurrentlyDrinking([]);
            }
        } catch (err) {
            console.error('Error fetching coffee data:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            // Use fallback data on error
            setCoffeeEntries(fallbackCoffeeData);
            setCurrentlyDrinking([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCoffeeData();
    }, []);

    return {
        coffeeEntries,
        currentlyDrinking,
        loading,
        error,
        refetch: fetchCoffeeData,
    };
} 