import { NextResponse } from 'next/server';
import { coffeeService } from '@/lib/notion';

export async function GET() {
    try {
        const currentlyDrinking = await coffeeService.getCurrentlyDrinking();
        return NextResponse.json(currentlyDrinking);
    } catch (error) {
        console.error('Error fetching currently drinking coffee:', error);
        return NextResponse.json(
            { error: 'Failed to fetch currently drinking coffee' },
            { status: 500 }
        );
    }
} 