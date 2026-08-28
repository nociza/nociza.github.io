"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

const definitions = {
  The: "[definite article] Makes the thing you are describing seem more important than it really is.",
  Book: "[noun] Not paper, not bound, and not especially orderly—a small collection of unrelated things that found their way onto this website.",
  of: "[preposition] A path toward the preface, or perhaps toward the rest of the site. Either way, good luck.",
  Me: "Yueheng [Alex] Zhang",
};

type Word = keyof typeof definitions;

export default function BookPage() {
  const [selected, setSelected] = useState<Word>("Book");

  return (
    <main id="main-content" className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-5 pb-10 pt-5 sm:px-8 sm:pb-14 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/me" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> nociza.com
          </Link>
          <Link href="/navigation" className="-mr-2 inline-flex min-h-10 items-center px-2 transition hover:text-neutral-950">Index</Link>
        </nav>

        <section className="grid flex-1 gap-12 py-16 sm:py-24 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] lg:items-center">
          <div>
            <p className="mb-6 text-sm text-neutral-500">An old front door</p>
            <h1 className="max-w-4xl font-serif text-[clamp(3.5rem,10vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.06em]">
              {(Object.keys(definitions) as Word[]).map((word) =>
                word === "Me" ? (
                  <Link
                    key={word}
                    href="/preface"
                    onMouseEnter={() => setSelected(word)}
                    onFocus={() => setSelected(word)}
                    className="text-orange-700 transition-colors hover:text-orange-900"
                  >
                    {word}
                  </Link>
                ) : (
                  <button
                    key={word}
                    type="button"
                    onClick={() => setSelected(word)}
                    onMouseEnter={() => setSelected(word)}
                    onFocus={() => setSelected(word)}
                    aria-pressed={selected === word}
                    className={`mr-[0.18em] rounded-sm text-left transition-colors ${selected === word ? "text-neutral-950" : "text-neutral-400 hover:text-neutral-700"}`}
                  >
                    {word}
                  </button>
                )
              )}
            </h1>
          </div>

          <aside aria-live="polite" className="border-t border-black/10 pt-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-400">Selected word</p>
            <h2 className="mt-3 font-serif text-3xl font-medium">{selected}</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">{definitions[selected]}</p>
            <Link href="/preface" className="mt-7 inline-flex min-h-10 items-center gap-2 text-sm font-medium text-neutral-800 transition hover:text-orange-800">
              Read the preface <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </aside>
        </section>

        <p className="border-t border-black/10 pt-5 text-xs text-neutral-500">Hover, focus, or tap a word.</p>
      </div>
    </main>
  );
}
