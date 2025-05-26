import { booksData, Book } from "../data/personal-data";

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
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold text-gray-800 font-inconsolata">
          {book.title}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            statusColors[book.status]
          }`}
        >
          {statusEmojis[book.status]} {book.status}
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
        <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
          Currently Reading
        </h1>
        <p className="text-xl text-gray-600 mb-12 font-inconsolata">
          Books that are shaping my thoughts and expanding my perspective
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          {booksData.map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
