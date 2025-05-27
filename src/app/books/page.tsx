"use client";

import Link from "next/link";
import SearchableIndex from "../../components/searchable-index";
import { ArrowLeft, BookOpen, Headphones } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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

// Extended archive data including Jerusalem and other books
const allBooksData: Book[] = [
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

function BookCard({ book, index }: { book: Book; index: number }) {
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
    <Card>
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

export default function BooksIndexPage() {
  return (
    <div className="relative">
      {/* Back Button */}
      <Link
        href="/me"
        className="fixed top-8 left-8 z-50 p-2 bg-white border border-gray-200 rounded-full hover:border-orange-500 transition-colors duration-200"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600 hover:text-orange-500" />
      </Link>

      <SearchableIndex
        title="Reading/Listening Archive"
        items={allBooksData}
        searchFields={["title", "author"]}
        placeholder="Search by book title or author..."
        renderItem={(book, index) => (
          <BookCard key={index} book={book} index={index} />
        )}
      />
    </div>
  );
}
