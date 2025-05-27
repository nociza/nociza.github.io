import { NextResponse } from 'next/server';
import { coffeeService } from '@/lib/notion';

export async function GET() {
    try {
        const coffeeEntries = await coffeeService.getCoffeeEntries();
        return NextResponse.json(coffeeEntries);
    } catch (error) {
        console.error('Error fetching coffee data:', error);
        return NextResponse.json(
            { error: 'Failed to fetch coffee data' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const entryId = await coffeeService.addCoffeeEntry(body);

        if (entryId) {
            return NextResponse.json({ id: entryId, success: true });
        } else {
            return NextResponse.json(
                { error: 'Failed to add coffee entry' },
                { status: 500 }
            );
        }
    } catch (error) {
        console.error('Error adding coffee entry:', error);
        return NextResponse.json(
            { error: 'Failed to add coffee entry' },
            { status: 500 }
        );
    }
} 