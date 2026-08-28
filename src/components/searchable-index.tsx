"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, Search, X } from "lucide-react";

interface SearchableIndexProps<T> {
  title: string;
  items: T[];
  searchFields: (keyof T)[];
  renderItem: (item: T, index: number) => React.ReactNode;
  placeholder?: string;
  eyebrow?: string;
  description?: string;
  itemLabel?: string;
  gridClassName?: string;
}

export default function SearchableIndex<T>({
  title,
  items,
  searchFields,
  renderItem,
  placeholder = "Search...",
  eyebrow = "Personal archive",
  description = "A searchable record, kept small and easy to revisit.",
  itemLabel = "item",
  gridClassName = "grid gap-4 sm:grid-cols-2",
}: SearchableIndexProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const filteredItems = useMemo(() => {
    const normalizedSearchTerm = deferredSearchTerm.trim().toLowerCase();
    if (!normalizedSearchTerm) return items;

    return items.filter((item) =>
      searchFields.some((field) => {
        const value = item[field];

        if (typeof value === "string") {
          return value.toLowerCase().includes(normalizedSearchTerm);
        }

        if (Array.isArray(value)) {
          return value.some(
            (entry) =>
              typeof entry === "string" &&
              entry.toLowerCase().includes(normalizedSearchTerm)
          );
        }

        return false;
      })
    );
  }, [deferredSearchTerm, items, searchFields]);

  return (
    <main id="main-content" className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/me" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            nociza.com
          </Link>
          <Link href="/navigation" className="-mr-2 inline-flex min-h-10 items-center px-2 transition hover:text-neutral-950">
            Index
          </Link>
        </nav>

        <header className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(17rem,0.65fr)] lg:items-end">
          <div className="max-w-3xl">
            <p className="mb-4 text-sm text-neutral-500">{eyebrow}</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.03] tracking-[-0.035em] sm:text-5xl">
              {title}
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600 lg:justify-self-end">{description}</p>
        </header>

        <section aria-label={`Search ${title}`}>
          <div className="flex flex-col gap-3 border-y border-black/10 py-4 sm:flex-row sm:items-center sm:justify-between">
            <label className="relative block w-full max-w-2xl">
              <Search aria-hidden="true" className="pointer-events-none absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
              <span className="sr-only">Search {title}</span>
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                className="h-11 w-full border-0 bg-transparent pl-7 pr-10 text-sm text-neutral-900 outline-none placeholder:text-neutral-400 focus-visible:outline-none focus-visible:ring-0"
                placeholder={placeholder}
              />
              {searchTerm && (
                <button
                  type="button"
                  onClick={() => setSearchTerm("")}
                  aria-label="Clear search"
                  className="absolute right-0 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full text-neutral-400 transition hover:bg-black/[0.04] hover:text-neutral-900"
                >
                  <X aria-hidden="true" className="h-4 w-4" />
                </button>
              )}
            </label>
            <p aria-live="polite" className="shrink-0 text-xs text-neutral-500">
              {filteredItems.length} {filteredItems.length === 1 ? itemLabel : `${itemLabel}s`}
            </p>
          </div>

          <div className={`${gridClassName} pt-7`}>
          {filteredItems.length > 0 ? (
            filteredItems.map((item, index) => renderItem(item, index))
          ) : (
            <div className="col-span-full border-b border-black/10 py-20 text-center">
              <p className="font-serif text-2xl text-neutral-800">Nothing matched that search.</p>
              <button type="button" onClick={() => setSearchTerm("")} className="mt-3 min-h-10 text-sm text-neutral-500 underline underline-offset-4 transition hover:text-neutral-950">
                Clear the search
              </button>
            </div>
          )}
          </div>
        </section>

        <footer className="mt-16 border-t border-black/10 pt-6 text-xs text-neutral-500">
          A quiet corner of nociza.com.
        </footer>
      </div>
    </main>
  );
}
