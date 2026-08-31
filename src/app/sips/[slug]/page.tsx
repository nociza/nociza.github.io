import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Coffee, Leaf, Star } from "lucide-react";
import SipMedia from "@/components/sip-media";
import SipSetupLinks from "@/components/sip-setup-links";
import { findSip, formatSipDate, formatSipLabel, formatSipShortDate, formatSipValue } from "@/data/sip-data";
import { blogPostStructuredData, generateJsonLd, generateMetadata as makeMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const filePath = join(process.cwd(), "public", "data", "sips.json");
  const entries = JSON.parse(readFileSync(filePath, "utf8")) as Array<{ slug?: string }>;
  const params = entries.filter((entry) => entry.slug).map((entry) => ({ slug: entry.slug as string }));

  // Next 14's static exporter rejects an empty dynamic route set. The reserved
  // value renders the normal 404 and is never linked or written to the journal.
  return params.length > 0 ? params : [{ slug: "_empty" }];
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
    <main className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={generateJsonLd(structuredData)} />
      <article>
        <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
          <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
            <Link href="/sips" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
              <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Siplogue
            </Link>
            <span className="inline-flex min-h-10 items-center capitalize">{entry.kind} entry</span>
          </nav>

          <header className="max-w-3xl pb-10 pt-14 sm:pb-12 sm:pt-20">
            <div className="mb-6 flex items-center gap-2 text-sm text-neutral-500">
              <KindIcon aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              {entry.kind} · {formatSipDate(entry.observedAt)}
            </div>
            <h1 className="font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] text-neutral-950 sm:text-6xl">
              {entry.title}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-neutral-600 sm:text-lg">{entry.excerpt}</p>
            <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-neutral-500">
              <span>Noted {formatSipDate(entry.receivedAt)}</span>
              {entry.activity.expiresAt && <span>Rotation through {formatSipShortDate(entry.activity.expiresAt)}</span>}
            </div>
            <SipSetupLinks setupIds={entry.setupIds} />
          </header>

          <figure className="aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-black/10 bg-neutral-200 sm:aspect-[16/9]">
            <SipMedia entry={entry} eager />
          </figure>

          <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-16">
            <div className="max-w-2xl space-y-6 font-serif text-lg leading-8 text-neutral-800 sm:text-xl sm:leading-9">
              {paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </div>

            <aside className="h-fit border-t border-black/10 pt-5">
              <h2 className="text-sm font-medium text-neutral-900">Cup notes</h2>
              {details.length > 0 && (
                <dl className="mt-5 space-y-4">
                  {details.map(([key, value]) => (
                    <div key={key} className="grid grid-cols-[6.5rem_1fr] gap-3 text-sm leading-5">
                      <dt className="text-neutral-500">{formatSipLabel(key)}</dt>
                      <dd className="font-medium text-neutral-800">{formatSipValue(key, value)}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {entry.rating !== null && (
                <div className="mt-6 flex items-center gap-2 border-t border-black/10 pt-5 text-sm">
                  <Star aria-hidden="true" className="h-4 w-4 fill-neutral-800 text-neutral-800" />
                  <span className="font-semibold">{entry.rating}/10</span>
                </div>
              )}
              {entry.tastingNotes.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                  {entry.tastingNotes.map((note) => (
                    <span key={note} className="rounded-full bg-neutral-200 px-2.5 py-1 text-xs text-neutral-700">{note}</span>
                  ))}
                </div>
              )}
            </aside>
          </div>

          <footer className="mt-20 flex items-center justify-between border-t border-black/10 pt-6 text-xs text-neutral-500">
            <span>Published {formatSipDate(entry.publishedAt)}</span>
            <Link href="/sips" className="inline-flex min-h-10 items-center transition hover:text-neutral-950">More entries</Link>
          </footer>
        </div>
      </article>
    </main>
  );
}
