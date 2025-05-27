import Link from "next/link";
import { booksData, Book } from "../data/personal-data";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface BookCardProps {
  book: Book;
}

function BookCard({ book }: BookCardProps) {
  const statusColors = {
    reading: "bg-blue-100 text-blue-800",
    completed: "bg-green-100 text-green-800",
    paused: "bg-yellow-100 text-yellow-800",
  };

  const statusEmojis = {
    reading: "📖",
    completed: "✅",
    paused: "⏸️",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800 font-inconsolata">
          {book.title}
        </h3>
        <span className="text-sm text-gray-500 font-inconsolata">
          {book.status}
        </span>
      </div>
      <p className="text-gray-600 font-semibold mb-2 font-inconsolata">
        by {book.author}
      </p>
      {book.progress && (
        <p className="text-gray-500 text-sm font-inconsolata">
          Progress: {book.progress}
        </p>
      )}
    </div>
  );
}

export default function BooksSection() {
  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
            Currently Reading
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-inconsolata">
            Books that are shaping my thoughts and expanding my perspective
          </p>
          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200 border-b border-orange-500 hover:border-orange-600"
          >
            View Full Reading Archive
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {booksData.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
