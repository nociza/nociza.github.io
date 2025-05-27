import { NextResponse } from 'next/server';
import { papersService } from '../../../lib/notion';

export async function GET() {
    try {
        const papers = await papersService.getPaperEntries();
        return NextResponse.json(papers);
    } catch (error) {
        console.error('Error in papers API:', error);
        return NextResponse.json(
            { error: 'Failed to fetch papers' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const { url, status } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        const paperId = await papersService.addPaperEntry({ url, status });

        if (paperId) {
            return NextResponse.json({ id: paperId, success: true });
        } else {
            return NextResponse.json(
                { error: 'Failed to add paper' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error adding paper:', error);
        return NextResponse.json(
            { error: 'Failed to add paper' },
            { status: 500 }
        );
    }
} 