export interface CoffeeEntry {
    name: string;
    roaster: string;
    date: string;
    notes: string;
}

export interface Book {
    title: string;
    author: string;
    status: 'reading' | 'completed' | 'paused';
    progress?: string;
}

export interface MusicItem {
    title: string;
    artist: string;
    type: 'album' | 'song' | 'playlist';
    link?: string;
}

export const coffeeData: CoffeeEntry[] = [
    {
        name: "Ethiopian Yirgacheffe",
        roaster: "Blue Bottle Coffee",
        date: "December 2024",
        notes: "Bright, floral notes with hints of lemon and bergamot. Perfect morning brew."
    },
    {
        name: "Colombian Huila",
        roaster: "Intelligentsia",
        date: "November 2024",
        notes: "Rich chocolate undertones with caramel sweetness. Excellent for pour-over."
    },
    {
        name: "Guatemalan Antigua",
        roaster: "Stumptown",
        date: "October 2024",
        notes: "Full-bodied with smoky finish. Complex flavor profile that evolves as it cools."
    }
];

export const booksData: Book[] = [
    {
        title: "The Three-Body Problem",
        author: "Liu Cixin",
        status: "reading",
        progress: "Chapter 12"
    },
    {
        title: "Designing Data-Intensive Applications",
        author: "Martin Kleppmann",
        status: "reading",
        progress: "Part II"
    },
    {
        title: "The Pragmatic Programmer",
        author: "David Thomas & Andrew Hunt",
        status: "completed"
    },
    {
        title: "Gödel, Escher, Bach",
        author: "Douglas Hofstadter",
        status: "paused",
        progress: "Chapter 8"
    }
];

export const musicData: MusicItem[] = [
    {
        title: "In Rainbows",
        artist: "Radiohead",
        type: "album"
    },
    {
        title: "Redbone",
        artist: "Childish Gambino",
        type: "song"
    },
    {
        title: "Blonde",
        artist: "Frank Ocean",
        type: "album"
    },
    {
        title: "Coding Focus",
        artist: "Various Artists",
        type: "playlist"
    },
    {
        title: "Time",
        artist: "Pink Floyd",
        type: "song"
    },
    {
        title: "Random Access Memories",
        artist: "Daft Punk",
        type: "album"
    }
]; 