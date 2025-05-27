"use client";

import Link from "next/link";
import SearchableIndex from "../../components/searchable-index";
import { allBooksData, Book } from "../../data/personal-data";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function BookCard({ book, index }: { book: Book; index: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
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

export default function BooksIndexPage() {
  return (
    <div className="relative">
      {/* Back Button */}
      <Link
        href="/me"
        className="fixed top-8 left-8 z-50 p-2 bg-white border border-gray-200 rounded-full hover:border-orange-500 transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-5 h-5 text-gray-600 hover:text-orange-500" />
      </Link>

      <SearchableIndex
        title="Reading Archive"
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
