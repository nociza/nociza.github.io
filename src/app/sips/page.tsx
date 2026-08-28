import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Coffee } from "lucide-react";
import SipCard from "@/components/sip-card";
import { sipEntries } from "@/data/sip-data";

export default function SipsPage() {
  const [featured, ...remaining] = sipEntries;

  return (
    <main className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/me" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            nociza.com
          </Link>
          <span className="inline-flex min-h-10 items-center font-medium text-neutral-900">Siplogue</span>
        </nav>

        <header className="grid gap-7 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.6fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm text-neutral-500">Tea and coffee journal</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.03] tracking-[-0.035em] text-neutral-950 sm:text-5xl">
              Cups worth remembering.
            </h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600 lg:justify-self-end">
            A personal record of leaves, beans, brewing experiments, and the quiet details that remain after the cup is empty.
          </p>
        </header>

        {featured ? (
          <section aria-labelledby="latest-entry">
            <div className="mb-5 flex items-end justify-between">
              <h2 id="latest-entry" className="text-sm font-medium text-neutral-900">Latest entry</h2>
              <span className="text-xs text-neutral-500">{sipEntries.length} {sipEntries.length === 1 ? "entry" : "entries"}</span>
            </div>
            <SipCard entry={featured} featured />

            {remaining.length > 0 && (
              <div className="mt-16 sm:mt-20">
                <div className="flex items-baseline justify-between pb-3">
                  <h2 className="text-sm font-medium text-neutral-900">Archive</h2>
                  <span className="text-xs text-neutral-500">Newest first</span>
                </div>
                <div>
                  {remaining.map((entry) => <SipCard key={entry.id} entry={entry} />)}
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="rounded-[1.75rem] border border-black/10 bg-white px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-neutral-700">
              <Coffee aria-hidden="true" className="h-5 w-5 stroke-[1.5]" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-medium text-neutral-950">The kettle is warming.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-neutral-600">
              The journal is ready. New tea and coffee notes will appear here after they are polished and published through Siplogue.
            </p>
          </section>
        )}

        <footer className="mt-20 flex flex-col gap-4 border-t border-black/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg leading-5">
            <p>Written from the cup, kept in Git.</p>
            <p className="mt-1.5">
              This journal is published with{" "}
              <a
                href="https://github.com/nociza/siplogue"
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-10 items-center gap-1 text-neutral-700 underline decoration-black/20 underline-offset-4 transition hover:text-neutral-950 hover:decoration-black/50"
              >
                Sip <ArrowUpRight aria-hidden="true" className="h-3 w-3" />
              </a>{", an open-source skill that turns a photo and rough notes into a polished entry."}
            </p>
          </div>
          <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-end">
            <a
              href="https://www.goodreads.com/user/show/84703211-alex-zhang"
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-10 items-center gap-1.5 transition hover:text-neutral-950"
            >
              Goodreads <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </a>
            <Link href="/coffee" className="inline-flex min-h-10 items-center gap-1.5 transition hover:text-neutral-950">
              Legacy coffee archive <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
            </Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
