import type { Metadata } from "next";
import { readFileSync } from "fs";
import { join } from "path";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Coffee, Wrench } from "lucide-react";
import { findBrewSetup } from "@/data/brew-setup-data";
import { formatSipDate, sipEntries } from "@/data/sip-data";
import { generateMetadata as makeMetadata } from "@/lib/seo";

export async function generateStaticParams() {
  const setups = JSON.parse(readFileSync(join(process.cwd(), "public", "data", "brew-setups.json"), "utf8")) as Array<{ slug?: string }>;
  const params = setups.filter((setup) => setup.slug).map((setup) => ({ slug: setup.slug as string }));
  return params.length ? params : [{ slug: "_empty" }];
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const setup = findBrewSetup(params.slug);
  if (!setup) return {};
  return makeMetadata({
    title: `${setup.name} — Brew Setup`,
    description: setup.summary,
    image: setup.image.src,
    url: `/sips/setups/${setup.slug}`,
    type: "article",
    publishedTime: setup.publishedAt,
    modifiedTime: setup.updatedAt,
    tags: setup.tags,
    section: "Brew setup",
  });
}

export default function BrewSetupPage({ params }: { params: { slug: string } }) {
  const setup = findBrewSetup(params.slug);
  if (!setup) notFound();
  const related = sipEntries.filter((entry) => entry.setupIds.includes(setup.id));
  const paragraphs = setup.description.split(/\n\s*\n/).map((paragraph) => paragraph.trim()).filter(Boolean);

  return (
    <main className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <article className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/sips" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950"><ArrowLeft aria-hidden="true" className="h-4 w-4" /> Siplogue</Link>
          <span className="inline-flex min-h-10 items-center gap-2"><Wrench aria-hidden="true" className="h-4 w-4 stroke-[1.5]" /> Brew setup</span>
        </nav>

        <header className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end">
          <div>
            <p className="mb-4 text-sm text-neutral-500">Tools · machinery · methods</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl">{setup.name}</h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-neutral-600 sm:text-lg">{setup.summary}</p>
          </div>
          {setup.methods.length > 0 && <div className="flex flex-wrap gap-2 lg:justify-end">{setup.methods.map((method) => <span key={method} className="rounded-full border border-black/10 bg-white/75 px-3 py-1.5 text-xs text-neutral-700">{method}</span>)}</div>}
        </header>

        <figure className="aspect-[16/10] overflow-hidden rounded-[1.75rem] border border-black/10 bg-neutral-200 sm:aspect-[16/9]">
          <img src={setup.image.src} alt={setup.image.alt} className="h-full w-full object-cover" />
        </figure>

        <div className="mt-12 grid gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <div className="max-w-2xl space-y-6 font-serif text-lg leading-8 text-neutral-800 sm:text-xl sm:leading-9">{paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}</div>
          <aside className="h-fit border-t border-black/10 pt-5">
            <h2 className="text-sm font-medium">On this shelf</h2>
            {setup.tools.length ? <dl className="mt-5 space-y-5">{setup.tools.map((tool) => <div key={`${tool.role}-${tool.name}`}><dt className="text-sm font-medium text-neutral-900">{tool.name}</dt>{tool.role && <dd className="mt-1 text-xs uppercase tracking-[0.12em] text-neutral-500">{tool.role}</dd>}{tool.notes && <dd className="mt-2 text-xs leading-5 text-neutral-600">{tool.notes}</dd>}</div>)}</dl> : <p className="mt-4 text-sm leading-6 text-neutral-500">No individual tools listed yet.</p>}
          </aside>
        </div>

        {related.length > 0 && <section className="mt-20 border-t border-black/10 pt-6" aria-labelledby="setup-related-sips"><h2 id="setup-related-sips" className="font-serif text-2xl font-medium tracking-[-0.025em]">Made with this setup</h2><div className="mt-5 grid gap-3 sm:grid-cols-2">{related.map((entry) => <Link key={entry.id} href={`/sips/${entry.slug}`} className="group rounded-2xl border border-black/10 bg-white/70 p-5 transition hover:border-black/25"><div className="flex items-center gap-2 text-xs text-neutral-500"><Coffee aria-hidden="true" className="h-3.5 w-3.5" /><time dateTime={entry.observedAt}>{formatSipDate(entry.observedAt)}</time></div><h3 className="mt-3 font-serif text-xl font-medium">{entry.title}</h3><p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{entry.excerpt}</p></Link>)}</div></section>}

        <footer className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6 text-xs text-neutral-500"><span className="inline-flex items-center gap-1.5"><Clock3 aria-hidden="true" className="h-3.5 w-3.5" /> Added {formatSipDate(setup.receivedAt)}</span><Link href="/sips" className="inline-flex min-h-10 items-center transition hover:text-neutral-950">Back to the shelf</Link></footer>
      </article>
    </main>
  );
}
