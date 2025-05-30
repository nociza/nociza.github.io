import { useState, useEffect } from 'react';

interface ArxivPaper {
    id: string;
    arxivId: string;
    url: string;
    title: string;
    authors: string[];
    abstract: string;
    publishedDate: string;
    categories: string[];
    status?: 'reading' | 'completed' | 'bookmarked';
}

interface UsePapersDataReturn {
    papers: ArxivPaper[];
    loading: boolean;
    error: string | null;
    refetch: () => Promise<void>;
    addPaper: (url: string, status?: string) => Promise<boolean>;
}

export function usePapersData(): UsePapersDataReturn {
    const [papers, setPapers] = useState<ArxivPaper[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchPapers = async () => {
        setLoading(true);
        setError(null);

        try {
            // Try to fetch from static JSON file
            const response = await fetch('/data/papers.json');

            if (response.ok) {
                const data = await response.json();
                setPapers(data || []);
                console.log(`Loaded ${data.length} papers from static data`);
            } else if (response.status === 404) {
                // File doesn't exist - no papers configured
                setPapers([]);
                setError('Papers data not available. Set up Notion integration to track papers.');
            } else {
                throw new Error(`Failed to fetch papers: ${response.statusText}`);
            }
        } catch (err) {
            console.error('Error fetching papers:', err);
            setError(err instanceof Error ? err.message : 'Failed to load papers data');
            setPapers([]);
        } finally {
            setLoading(false);
        }
    };

    const addPaper = async (url: string, status?: string): Promise<boolean> => {
        // For static sites, we can't add papers dynamically
        // This would require manual addition to the Notion database and rebuild
        console.warn('Adding papers is not supported in static mode. Please add to your Notion database and rebuild the site.');
        setError('Adding papers requires rebuilding the site. Please add to your Notion database and redeploy.');
        return false;
    };

    useEffect(() => {
        fetchPapers();
    }, []);

    return {
        papers,
        loading,
        error,
        refetch: fetchPapers,
        addPaper,
    };
} 