import Link from "next/link";
import { ArrowRight, BookOpen } from "lucide-react";
import ReadingEntryCard from "@/components/reading-entry-card";
import { bookReads } from "@/data/read-data";

export default function BooksSection() {
  const active = bookReads.filter((entry) => entry.status === "active").slice(0, 3);
  const visible = active.length ? active : bookReads.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f4f4f1]/85 px-6 py-20 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl flex-col justify-center">
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              <BookOpen aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              Reading now
            </div>
            <h1 className="font-serif text-4xl font-medium tracking-[-0.035em] text-neutral-950 sm:text-5xl">The reading shelf.</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600">
              Books and audiobooks in progress, with the notes I want to keep.
            </p>
          </div>
          <Link href="/books" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-950">
            Open the shelf <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {visible.length ? (
          <div>
            {visible.map((entry) => <ReadingEntryCard key={entry.id} entry={entry} compact />)}
          </div>
        ) : (
          <div className="border-b border-black/10 py-16 text-center">
            <p className="font-serif text-2xl text-neutral-800">The shelf is ready.</p>
            <p className="mt-2 text-sm text-neutral-500">Send Teleclaw a title or a photo of a book to add the first entry.</p>
          </div>
        )}
      </div>
    </div>
  );
}
