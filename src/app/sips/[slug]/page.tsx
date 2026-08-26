import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Coffee, Leaf, Star } from "lucide-react";
import { findSip, formatSipDate, formatSipLabel, formatSipValue, sipEntries } from "@/data/sip-data";
import { blogPostStructuredData, generateJsonLd, generateMetadata as makeMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  // Next 14's static exporter rejects an empty dynamic route set. The reserved
  // value renders the normal 404 and is never linked or written to the journal.
  if (sipEntries.length === 0) return [{ slug: "_empty" }];
  return sipEntries.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const entry = findSip(params.slug);
  if (!entry) return {};
  return makeMetadata({
    title: entry.title,
    description: entry.excerpt,
    image: entry.image.src,
    url: `/sips/${entry.slug}`,
    type: "article",
    publishedTime: entry.publishedAt,
    modifiedTime: entry.publishedAt,
    tags: entry.tags,
    section: entry.kind === "tea" ? "Tea" : "Coffee",
  });
}

export default function SipEntryPage({ params }: { params: { slug: string } }) {
  const entry = findSip(params.slug);
  if (!entry) notFound();
  const KindIcon = entry.kind === "tea" ? Leaf : Coffee;
  const details = [...Object.entries(entry.subject), ...Object.entries(entry.brew)].filter(([, value]) => value !== null && value !== "");
  const paragraphs = entry.body.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);
  const structuredData = blogPostStructuredData({
    title: entry.title,
    description: entry.excerpt,
    url: `https://www.nociza.com/sips/${entry.slug}/`,
    datePublished: entry.publishedAt,
    dateModified: entry.publishedAt,
    image: `https://www.nociza.com${entry.image.src}`,
  });

  return (
    <main className="min-h-screen bg-[#f7f3ea] text-stone-900">
      <script type="application/ld+json" dangerouslySetInnerHTML={generateJsonLd(structuredData)} />
      <article>
        <div className="mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
          <nav className="flex items-center justify-between border-b border-stone-300/70 pb-5 text-xs uppercase tracking-[0.2em] text-stone-600">
            <Link href="/sips" className="inline-flex items-center gap-2 transition hover:text-orange-700">
              <ArrowLeft className="h-4 w-4" /> Back to Siplogue
            </Link>
            <span>{entry.kind} note</span>
          </nav>

          <header className="mx-auto max-w-4xl pb-10 pt-14 text-center sm:pt-20">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/55 px-3 py-1.5 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-stone-600">
              <KindIcon className="h-3.5 w-3.5 text-orange-700" />
              {entry.kind} · {formatSipDate(entry.observedAt)}
            </div>
            <h1 className="font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.035em] text-stone-950 sm:text-7xl">
              {entry.title}
            </h1>
            <p className="mx-auto mt-7 max-w-2xl text-base leading-8 text-stone-600 sm:text-lg">{entry.excerpt}</p>
          </header>

          <figure className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-stone-200 bg-stone-100 shadow-[0_30px_90px_-55px_rgba(57,39,25,0.65)]">
            <img src={entry.image.src} alt={entry.image.alt} className="max-h-[70vh] w-full object-cover" />
          </figure>

          <div className="mx-auto mt-12 grid max-w-5xl gap-10 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="space-y-6 font-serif text-xl leading-9 text-stone-800">
              {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>

            <aside className="h-fit border-t border-stone-300 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
              <h2 className="text-xs font-semibold uppercase tracking-[0.22em] text-stone-500">Cup notes</h2>
              {details.length > 0 && (
                <dl className="mt-5 space-y-4">
                  {details.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm leading-5">
                      <dt className="text-stone-500">{formatSipLabel(key)}</dt>
                      <dd className="font-medium text-stone-800">{formatSipValue(key, value)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {entry.rating !== null && (
                <div className="mt-6 flex items-center gap-2 border-t border-stone-200 pt-5 text-sm">
                  <Star className="h-4 w-4 fill-orange-400 text-orange-500" />
                  <span className="font-semibold">{entry.rating}/10</span>
                </div>
              )}
              {entry.tastingNotes.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {entry.tastingNotes.map((note) => (
                    <span key={note} className="rounded-full bg-orange-100/70 px-2.5 py-1 text-xs text-orange-900">{note}</span>
                  ))}
                </div>
              )}
            </aside>
          </div>

          <footer className="mx-auto mt-20 flex max-w-5xl items-center justify-between border-t border-stone-300/70 pt-6 text-xs text-stone-500">
            <span>Published {formatSipDate(entry.publishedAt)}</span>
            <Link href="/sips" className="transition hover:text-orange-700">More field notes</Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
