import { Client } from '@notionhq/client';

// Initialize Notion client
const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

export interface NotionCoffeeEntry {
    id: string;
    name: string;
    roaster: string;
    date: string;
    notes: string;
    rating?: number;
    origin?: string;
    process?: string;
    status?: 'currently_drinking' | 'completed' | 'wishlist';
}

export interface NotionPaperEntry {
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

export class NotionCoffeeService {
    private databaseId: string;

    constructor(databaseId: string) {
        this.databaseId = databaseId;
    }

    private validateConfig(): boolean {
        const token = process.env.NOTION_TOKEN;
        const dbId = this.databaseId;

        if (!token || token === 'your_notion_integration_token_here') {
            console.warn('Notion integration token not configured');
            return false;
        }

        if (!dbId || dbId === 'your_coffee_database_id_here') {
            console.warn('Notion coffee database ID not configured');
            return false;
        }

        return true;
    }

    async getCoffeeEntries(): Promise<NotionCoffeeEntry[]> {
        if (!this.validateConfig()) {
            console.log('Notion not configured, skipping API call');
            return [];
        }

        try {
            const response = await notion.databases.query({
                database_id: this.databaseId,
                sorts: [
                    {
                        property: 'Purchase Date',
                        direction: 'descending',
                    },
                ],
            });

            const entries = response.results.map((page: any) => ({
                id: page.id,
                name: this.getPropertyValue(page.properties.Name) || '',
                roaster: this.getPropertyValue(page.properties.Roaster) || '',
                date: this.getPropertyValue(page.properties['Purchase Date']) || this.getPropertyValue(page.properties.Date) || '',
                notes: this.getPropertyValue(page.properties.Notes) || 'No notes available',
                rating: this.getPropertyValue(page.properties.Rating),
                origin: this.getPropertyValue(page.properties.Origin),
                process: this.getPropertyValue(page.properties.Process),
                status: this.getPropertyValue(page.properties.Status) || 'completed',
            }));

            console.log(`Fetched ${entries.length} total coffee entries from Notion`);
            entries.forEach((entry, index) => {
                console.log(`${index + 1}. ${entry.name} by ${entry.roaster} - Status: "${entry.status}"`);
            });

            return entries;
        } catch (error: any) {
            if (error.code === 'object_not_found') {
                console.warn('Notion database not found or not shared with integration. Please share your database with the integration.');
            } else {
                console.error('Error fetching coffee entries from Notion:', error);
            }
            return [];
        }
    }

    async getCurrentlyDrinking(): Promise<NotionCoffeeEntry[]> {
        if (!this.validateConfig()) {
            console.log('Notion not configured, skipping API call');
            return [];
        }

        try {
            // First, try to get all entries and filter client-side to avoid property type issues
            const response = await notion.databases.query({
                database_id: this.databaseId,
                sorts: [
                    {
                        property: 'Purchase Date',
                        direction: 'descending',
                    },
                ],
            });

            // Filter client-side for currently drinking entries
            const allEntries = response.results.map((page: any) => ({
                id: page.id,
                name: this.getPropertyValue(page.properties.Name) || '',
                roaster: this.getPropertyValue(page.properties.Roaster) || '',
                date: this.getPropertyValue(page.properties['Purchase Date']) || this.getPropertyValue(page.properties.Date) || '',
                notes: this.getPropertyValue(page.properties.Notes) || 'No notes available',
                rating: this.getPropertyValue(page.properties.Rating),
                origin: this.getPropertyValue(page.properties.Origin),
                process: this.getPropertyValue(page.properties.Process),
                status: this.getPropertyValue(page.properties.Status) || 'completed',
            }));

            // Debug: Log all entries and their status values
            console.log('All coffee entries from Notion:');
            allEntries.forEach((entry, index) => {
                console.log(`${index + 1}. ${entry.name} - Status: "${entry.status}"`);
            });

            // Filter for currently drinking entries
            const currentlyDrinking = allEntries.filter(entry =>
                entry.status === 'currently_drinking' ||
                entry.status === 'Currently Drinking' ||
                entry.status?.toLowerCase().includes('current')
            );

            console.log(`Found ${currentlyDrinking.length} currently drinking entries`);
            return currentlyDrinking;
        } catch (error: any) {
            if (error.code === 'object_not_found') {
                console.warn('Notion database not found or not shared with integration. Please share your database with the integration.');
            } else if (error.code === 'validation_error') {
                console.warn('Notion database property type mismatch. Using client-side filtering instead.');
                // Fall back to getting all entries without filtering
                try {
                    const response = await notion.databases.query({
                        database_id: this.databaseId,
                        sorts: [{ property: 'Purchase Date', direction: 'descending' }],
                    });
                    const allEntries = response.results.map((page: any) => ({
                        id: page.id,
                        name: this.getPropertyValue(page.properties.Name) || '',
                        roaster: this.getPropertyValue(page.properties.Roaster) || '',
                        date: this.getPropertyValue(page.properties['Purchase Date']) || this.getPropertyValue(page.properties.Date) || '',
                        notes: this.getPropertyValue(page.properties.Notes) || 'No notes available',
                        rating: this.getPropertyValue(page.properties.Rating),
                        origin: this.getPropertyValue(page.properties.Origin),
                        process: this.getPropertyValue(page.properties.Process),
                        status: this.getPropertyValue(page.properties.Status) || 'completed',
                    }));
                    return allEntries.filter(entry =>
                        entry.status === 'currently_drinking' ||
                        entry.status === 'Currently Drinking' ||
                        entry.status?.toLowerCase().includes('current')
                    );
                } catch (fallbackError) {
                    console.error('Error in fallback query:', fallbackError);
                    return [];
                }
            } else {
                console.error('Error fetching currently drinking coffee from Notion:', error);
            }
            return [];
        }
    }

    async addCoffeeEntry(entry: Omit<NotionCoffeeEntry, 'id'>): Promise<string | null> {
        if (!this.validateConfig()) {
            throw new Error('Notion integration not configured. Please set up your environment variables.');
        }

        try {
            const response = await notion.pages.create({
                parent: { database_id: this.databaseId },
                properties: {
                    Name: {
                        title: [
                            {
                                text: {
                                    content: entry.name,
                                },
                            },
                        ],
                    },
                    Roaster: {
                        rich_text: [
                            {
                                text: {
                                    content: entry.roaster,
                                },
                            },
                        ],
                    },
                    Date: {
                        date: {
                            start: entry.date,
                        },
                    },
                    Notes: {
                        rich_text: [
                            {
                                text: {
                                    content: entry.notes,
                                },
                            },
                        ],
                    },
                    ...(entry.rating && {
                        Rating: {
                            number: entry.rating,
                        },
                    }),
                    ...(entry.origin && {
                        Origin: {
                            rich_text: [
                                {
                                    text: {
                                        content: entry.origin,
                                    },
                                },
                            ],
                        },
                    }),
                    ...(entry.process && {
                        Process: {
                            rich_text: [
                                {
                                    text: {
                                        content: entry.process,
                                    },
                                },
                            ],
                        },
                    }),
                    ...(entry.status && {
                        Status: {
                            select: {
                                name: entry.status,
                            },
                        },
                    }),
                },
            });

            return response.id;
        } catch (error) {
            console.error('Error adding coffee entry to Notion:', error);
            return null;
        }
    }

    private getPropertyValue(property: any): any {
        if (!property) return null;

        switch (property.type) {
            case 'title':
                return property.title?.[0]?.text?.content || '';
            case 'rich_text':
                return property.rich_text?.[0]?.text?.content || '';
            case 'date':
                return property.date?.start || '';
            case 'last_edited_time':
                return property.last_edited_time || '';
            case 'number':
                return property.number;
            case 'select':
                return property.select?.name || '';
            case 'status':
                return property.status?.name || '';
            case 'multi_select':
                return property.multi_select?.map((item: any) => item.name) || [];
            default:
                return null;
        }
    }
}

export class NotionPapersService {
    private databaseId: string;

    constructor(databaseId: string) {
        this.databaseId = databaseId;
    }

    private validateConfig(): boolean {
        const token = process.env.NOTION_TOKEN;
        const dbId = this.databaseId;

        if (!token || token === 'your_notion_integration_token_here') {
            console.warn('Notion integration token not configured');
            return false;
        }

        if (!dbId || dbId === 'your_papers_database_id_here') {
            console.warn('Notion papers database ID not configured');
            return false;
        }

        return true;
    }

    async fetchArxivMetadata(arxivId: string): Promise<Partial<NotionPaperEntry> | null> {
        try {
            // Extract just the ID part (remove version if present)
            const cleanId = arxivId.replace(/v\d+$/, '');

            // Fetch from arXiv API
            const response = await fetch(`http://export.arxiv.org/api/query?id_list=${cleanId}`);
            const xmlText = await response.text();

            // Parse XML (basic parsing - in production you'd want a proper XML parser)
            const titleMatch = xmlText.match(/<title>(.*?)<\/title>/s);
            const summaryMatch = xmlText.match(/<summary>(.*?)<\/summary>/s);
            const authorsMatch = xmlText.match(/<author><name>(.*?)<\/name><\/author>/g);
            const publishedMatch = xmlText.match(/<published>(.*?)<\/published>/);
            const categoriesMatch = xmlText.match(/<category term="(.*?)".*?\/>/g);

            if (!titleMatch || !summaryMatch) {
                console.warn(`Could not fetch metadata for arXiv:${arxivId}`);
                return null;
            }

            const authors = authorsMatch
                ? authorsMatch.map(match => match.match(/<name>(.*?)<\/name>/)?.[1] || '').filter(Boolean)
                : [];

            const categories = categoriesMatch
                ? categoriesMatch.map(match => match.match(/term="(.*?)"/)?.[1] || '').filter(Boolean)
                : [];

            return {
                title: titleMatch[1].trim().replace(/^\s*arXiv:\d+\.\d+(v\d+)?\s*\[.*?\]\s*/, ''),
                abstract: summaryMatch[1].trim().replace(/\s+/g, ' '),
                authors,
                publishedDate: publishedMatch?.[1] || '',
                categories: categories.slice(0, 3), // Limit to first 3 categories
            };
        } catch (error) {
            console.error(`Error fetching arXiv metadata for ${arxivId}:`, error);
            return null;
        }
    }

    async getPaperEntries(): Promise<NotionPaperEntry[]> {
        if (!this.validateConfig()) {
            console.log('Notion not configured, skipping API call');
            return [];
        }

        try {
            const response = await notion.databases.query({
                database_id: this.databaseId,
                sorts: [
                    {
                        property: 'Date Added',
                        direction: 'descending',
                    },
                ],
            });

            const entries = await Promise.all(
                response.results.map(async (page: any) => {
                    const url = this.getPropertyValue(page.properties.URL) || this.getPropertyValue(page.properties.Link) || '';

                    // Extract arXiv ID from URL
                    const arxivMatch = url.match(/arxiv\.org\/abs\/(\d+\.\d+(?:v\d+)?)/);
                    const arxivId = arxivMatch ? arxivMatch[1] : '';

                    // Fetch metadata from arXiv API
                    const metadata = arxivId ? await this.fetchArxivMetadata(arxivId) : null;

                    return {
                        id: page.id,
                        arxivId,
                        url,
                        title: metadata?.title || this.getPropertyValue(page.properties.Title) || `arXiv:${arxivId}`,
                        authors: metadata?.authors || [],
                        abstract: metadata?.abstract || 'Abstract not available',
                        publishedDate: metadata?.publishedDate || this.getPropertyValue(page.properties['Date Added']) || '',
                        categories: metadata?.categories || [],
                        status: this.getPropertyValue(page.properties.Status) || 'bookmarked',
                    };
                })
            );

            console.log(`Fetched ${entries.length} paper entries from Notion`);
            return entries.filter(entry => entry.arxivId); // Only return entries with valid arXiv IDs
        } catch (error: any) {
            if (error.code === 'object_not_found') {
                console.warn('Notion papers database not found or not shared with integration.');
            } else {
                console.error('Error fetching paper entries from Notion:', error);
            }
            return [];
        }
    }

    async addPaperEntry(entry: { url: string; status?: string }): Promise<string | null> {
        if (!this.validateConfig()) {
            throw new Error('Notion integration not configured. Please set up your environment variables.');
        }

        try {
            const response = await notion.pages.create({
                parent: { database_id: this.databaseId },
                properties: {
                    URL: {
                        url: entry.url,
                    },
                    ...(entry.status && {
                        Status: {
                            select: {
                                name: entry.status,
                            },
                        },
                    }),
                    'Date Added': {
                        date: {
                            start: new Date().toISOString().split('T')[0],
                        },
                    },
                },
            });

            return response.id;
        } catch (error) {
            console.error('Error adding paper entry to Notion:', error);
            return null;
        }
    }

    private getPropertyValue(property: any): any {
        if (!property) return null;

        switch (property.type) {
            case 'title':
                return property.title?.[0]?.text?.content || '';
            case 'rich_text':
                return property.rich_text?.[0]?.text?.content || '';
            case 'url':
                return property.url || '';
            case 'date':
                return property.date?.start || '';
            case 'last_edited_time':
                return property.last_edited_time || '';
            case 'number':
                return property.number;
            case 'select':
                return property.select?.name || '';
            case 'status':
                return property.status?.name || '';
            case 'multi_select':
                return property.multi_select?.map((item: any) => item.name) || [];
            default:
                return null;
        }
    }
}

// Export default instances
export const coffeeService = new NotionCoffeeService(
    process.env.NOTION_COFFEE_DATABASE_ID || ''
);

export const papersService = new NotionPapersService(
    process.env.NOTION_PAPERS_DATABASE_ID || ''
); 