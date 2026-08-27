"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { ArrowLeft, Search } from "lucide-react";
import ReadingEntryCard from "@/components/reading-entry-card";
import { ReadEntry } from "@/data/read-data";

function searchableText(entry: ReadEntry): string {
  return [
    entry.title,
    ...entry.authors,
    entry.status,
    entry.kind === "book" ? entry.format : "paper",
    entry.excerpt,
    entry.reflection,
    ...(entry.tags ?? []),
    ...Object.values(entry.identifiers ?? {}),
    entry.progress?.label,
    entry.progress?.remaining,
    ...(entry.kind === "paper" ? [entry.abstract, entry.venue, ...(entry.categories ?? [])] : [entry.publisher, ...(entry.narrators ?? [])]),
  ]
    .filter(Boolean)
    .join(" ")
    .toLocaleLowerCase();
}

export default function ReadingArchive({
  kind,
  entries,
}: {
  kind: "book" | "paper";
  entries: ReadEntry[];
}) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query.trim().toLocaleLowerCase());
  const filtered = useMemo(
    () => deferredQuery ? entries.filter((entry) => searchableText(entry).includes(deferredQuery)) : entries,
    [deferredQuery, entries]
  );
  const books = kind === "book";

  return (
    <main className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/me" className="inline-flex items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            nociza.com
          </Link>
          <div className="flex items-center gap-5">
            <Link href="/books" className={books ? "font-medium text-neutral-950" : "transition hover:text-neutral-950"}>Books</Link>
            <Link href="/papers" className={!books ? "font-medium text-neutral-950" : "transition hover:text-neutral-950"}>Papers</Link>
          </div>
        </nav>

        <header className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.65fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm text-neutral-500">{books ? "Finished books and audiobooks" : "Research reading"}</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.03] tracking-[-0.035em] sm:text-5xl">
              {books ? "The shelf." : "Papers worth keeping."}
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600 lg:justify-self-end">
            {books
              ? "A searchable record of books and audiobooks I have completed."
              : "A small, searchable record of research ideas I want to return to."}
          </p>
        </header>

        <section aria-label="Archive search">
          <div className="flex flex-col gap-4 border-y border-black/10 py-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full max-w-xl">
              <Search aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <span className="sr-only">Search the archive</span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={books ? "Search title, author, format, notes…" : "Search title, author, abstract, topic…"}
                className="h-10 w-full border-0 bg-transparent pl-7 pr-3 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus:ring-0"
              />
            </label>
            <p className="shrink-0 text-xs text-neutral-500">
              {filtered.length} {filtered.length === 1 ? "entry" : "entries"}
            </p>
          </div>

          {filtered.length ? (
            <div>
              {filtered.map((entry, index) => <ReadingEntryCard key={entry.id} entry={entry} eagerCover={index < 4} />)}
            </div>
          ) : (
            <div className="border-b border-black/10 py-20 text-center">
              <p className="font-serif text-2xl text-neutral-800">Nothing matched that search.</p>
              <button type="button" onClick={() => setQuery("")} className="mt-3 text-sm text-neutral-500 underline underline-offset-4 transition hover:text-neutral-950">
                Clear the search
              </button>
            </div>
          )}
        </section>

        <footer className="mt-16 border-t border-black/10 pt-6 text-xs text-neutral-500">
          Kept as plain JSON and Git history.
        </footer>
      </div>
    </main>
  );
}
