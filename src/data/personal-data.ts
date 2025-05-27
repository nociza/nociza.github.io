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
        notes: "Bright, floral notes with hints of lemon and bergamot. Perfect morning brew with a clean finish that dances on your palate."
    },
    {
        name: "Colombian Huila",
        roaster: "Intelligentsia",
        date: "November 2024",
        notes: "Rich chocolate undertones with caramel sweetness. Excellent for pour-over, medium body with nutty aftertaste."
    },
    {
        name: "Guatemalan Antigua",
        roaster: "Stumptown",
        date: "October 2024",
        notes: "Full-bodied with smoky finish. Complex flavor profile that evolves as it cools - starts bold, ends with subtle spice."
    }
];

// Extended coffee database for index page
export const allCoffeeData: CoffeeEntry[] = [
    ...coffeeData,
    {
        name: "Kenya AA Nyeri",
        roaster: "Counter Culture",
        date: "September 2024",
        notes: "Wine-like acidity with blackcurrant notes. Incredibly complex with a long, satisfying finish."
    },
    {
        name: "Panama Geisha",
        roaster: "George Howell Coffee",
        date: "August 2024",
        notes: "Jasmine and tropical fruit aromatics. Delicate, tea-like body with extraordinary clarity."
    },
    {
        name: "Brazilian Cerrado",
        roaster: "Ritual Coffee",
        date: "July 2024",
        notes: "Nutty and chocolatey with low acidity. Perfect for espresso with rich crema."
    },
    {
        name: "Costa Rican Tarrazú",
        roaster: "Verve Coffee",
        date: "June 2024",
        notes: "Bright citrus acidity with honey sweetness. Clean cup with orange zest finish."
    },
    {
        name: "Rwandan Bourbon",
        roaster: "Onyx Coffee Lab",
        date: "May 2024",
        notes: "Red fruit forward with wine-like complexity. Medium body with lingering cherry notes."
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

// Extended books database for index page
export const allBooksData: Book[] = [
    ...booksData,
    {
        title: "Clean Code",
        author: "Robert C. Martin",
        status: "completed"
    },
    {
        title: "The Dark Forest",
        author: "Liu Cixin",
        status: "completed"
    },
    {
        title: "Death's End",
        author: "Liu Cixin",
        status: "reading",
        progress: "Chapter 3"
    },
    {
        title: "System Design Interview",
        author: "Alex Xu",
        status: "reading",
        progress: "Chapter 7"
    },
    {
        title: "The Mythical Man-Month",
        author: "Frederick P. Brooks Jr.",
        status: "completed"
    },
    {
        title: "Atomic Habits",
        author: "James Clear",
        status: "completed"
    },
    {
        title: "The Algorithm Design Manual",
        author: "Steven S. Skiena",
        status: "paused",
        progress: "Chapter 4"
    },
    {
        title: "Sapiens",
        author: "Yuval Noah Harari",
        status: "completed"
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

// Extended music database for index page
export const allMusicData: MusicItem[] = [
    ...musicData,
    {
        title: "OK Computer",
        artist: "Radiohead",
        type: "album"
    },
    {
        title: "Bohemian Rhapsody",
        artist: "Queen",
        type: "song"
    },
    {
        title: "The Dark Side of the Moon",
        artist: "Pink Floyd",
        type: "album"
    },
    {
        title: "Lofi Hip Hop Study",
        artist: "ChilledCow",
        type: "playlist"
    },
    {
        title: "Stairway to Heaven",
        artist: "Led Zeppelin",
        type: "song"
    },
    {
        title: "Abbey Road",
        artist: "The Beatles",
        type: "album"
    },
    {
        title: "Midnight City",
        artist: "M83",
        type: "song"
    },
    {
        title: "Discovery",
        artist: "Daft Punk",
        type: "album"
    },
    {
        title: "Deep Focus",
        artist: "Spotify",
        type: "playlist"
    },
    {
        title: "Pyramids",
        artist: "Frank Ocean",
        type: "song"
    }
]; 