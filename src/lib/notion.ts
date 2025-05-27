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

// Export a default instance
export const coffeeService = new NotionCoffeeService(
    process.env.NOTION_COFFEE_DATABASE_ID || ''
); 