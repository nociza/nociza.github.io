import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import BookShelfCard from "@/components/book-shelf-card";
import { activeBookReads } from "@/data/read-data";

export default function BooksSection() {
  const visible = activeBookReads;

  return (
    <div className="min-h-screen bg-[#f7f3ea]/80 px-6 py-20 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl flex-col justify-center">
        <div className="mb-9 flex flex-col gap-6 border-b border-stone-300/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
              <BookOpen aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              In progress
            </div>
            <h1 className="font-serif text-4xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-5xl">Currently reading.</h1>
            <p className="mt-3 max-w-xl text-base leading-7 text-stone-600">
              The books and audiobooks I am spending time with now.
            </p>
          </div>
          <Link href="/books" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-900">
            View the shelf <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {visible.length ? (
          <div className="grid gap-8 sm:grid-cols-2 sm:gap-10">
            {visible.map((entry) => <BookShelfCard key={entry.id} entry={entry} eagerCover compact />)}
          </div>
        ) : (
          <div className="border-b border-black/10 py-16 text-center">
            <p className="font-serif text-2xl text-neutral-800">Nothing in progress.</p>
            <p className="mt-2 text-sm text-neutral-500">Currently reading books will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
