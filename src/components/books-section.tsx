import Link from "next/link";
import { ArrowRight, BookOpen, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Book {
  title: string;
  author: string;
  status: "reading" | "listening" | "completed" | "paused";
  progress?: string;
  format: "physical" | "ebook" | "audiobook";
  audibleProgress?: {
    currentChapter?: string;
    timeRemaining?: string;
    percentComplete?: number;
  };
}

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "reading":
      case "listening":
        return "default";
      case "completed":
        return "secondary";
      case "paused":
        return "outline";
      default:
        return "default";
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "audiobook":
        return <Headphones className="w-4 h-4" />;
      case "physical":
      case "ebook":
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-start justify-between">
          <CardTitle className="text-lg font-inconsolata">
            {book.title}
          </CardTitle>
          <div className="flex items-center gap-2">
            {getFormatIcon(book.format)}
            <Badge variant={getStatusVariant(book.status)}>{book.status}</Badge>
          </div>
        </div>
        <p className="text-muted-foreground font-inconsolata">
          by {book.author}
        </p>
      </CardHeader>
      <CardContent>
        {book.audibleProgress && (
          <div className="space-y-2">
            {book.audibleProgress.currentChapter && (
              <p className="text-sm text-muted-foreground font-inconsolata">
                Current: {book.audibleProgress.currentChapter}
              </p>
            )}
            {book.audibleProgress.timeRemaining && (
              <p className="text-sm text-muted-foreground font-inconsolata">
                Time remaining: {book.audibleProgress.timeRemaining}
              </p>
            )}
            {book.audibleProgress.percentComplete && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${book.audibleProgress.percentComplete}%` }}
                ></div>
              </div>
            )}
          </div>
        )}
        {book.progress && !book.audibleProgress && (
          <p className="text-sm text-muted-foreground font-inconsolata">
            Progress: {book.progress}
          </p>
        )}
      </CardContent>
    </Card>
  );
}

// Fallback data with Jerusalem by Alan Moore
const currentlyReadingData: Book[] = [
  {
    title: "Jerusalem",
    author: "Alan Moore",
    status: "listening",
    format: "audiobook",
    audibleProgress: {
      currentChapter: "Chapter 12: The Breeze That Plucks Her Apron",
      timeRemaining: "47 hours 23 minutes",
      percentComplete: 15,
    },
  },
];

export default function BooksSection() {
  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
            Currently Reading/Listening
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-inconsolata">
            Books and audiobooks that are shaping my thoughts and expanding my
            perspective
          </p>
          <Button variant="outline" asChild>
            <Link href="/books" className="inline-flex items-center gap-2">
              View Full Reading Archive
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentlyReadingData.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
