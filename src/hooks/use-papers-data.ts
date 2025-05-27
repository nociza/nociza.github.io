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

// Fallback data
const fallbackPapers: ArxivPaper[] = [
    {
        id: "fallback-1",
        arxivId: "1706.03762",
        url: "https://arxiv.org/abs/1706.03762",
        title: "Attention Is All You Need",
        authors: ["Ashish Vaswani", "Noam Shazeer", "Niki Parmar", "Jakob Uszkoreit"],
        abstract: "The dominant sequence transduction models are based on complex recurrent or convolutional neural networks that include an encoder and a decoder. The best performing models also connect the encoder and decoder through an attention mechanism.",
        publishedDate: "2017-06-12",
        categories: ["cs.CL", "cs.LG"],
        status: "reading"
    }
];

export function usePapersData(): UsePapersDataReturn {
    const [papers, setPapers] = useState<ArxivPaper[]>(fallbackPapers);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchPapers = async () => {
        setLoading(true);
        setError(null);

        try {
            // Try to fetch from static JSON file first
            const response = await fetch('/data/papers.json');

            if (response.ok) {
                const data = await response.json();
                if (data.length > 0) {
                    setPapers(data);
                    console.log(`Loaded ${data.length} papers from static data`);
                } else {
                    console.log('No papers in static data, using fallback');
                    setPapers(fallbackPapers);
                }
            } else {
                // If static file doesn't exist, use fallback
                console.log('Static papers data not found, using fallback');
                setPapers(fallbackPapers);
            }
        } catch (err) {
            console.error('Error fetching papers:', err);
            setError(err instanceof Error ? err.message : 'Unknown error');
            // Use fallback data on error
            setPapers(fallbackPapers);
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