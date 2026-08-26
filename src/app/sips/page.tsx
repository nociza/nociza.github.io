import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Coffee, Leaf } from "lucide-react";
import SipCard from "@/components/sip-card";
import { sipEntries } from "@/data/sip-data";

export default function SipsPage() {
  const [featured, ...remaining] = sipEntries;

  return (
    <main className="min-h-screen overflow-hidden bg-[#f7f3ea] text-stone-900">
      <div className="pointer-events-none fixed inset-0 opacity-40 [background-image:radial-gradient(circle_at_20%_10%,rgba(224,138,74,0.22),transparent_30%),radial-gradient(circle_at_85%_30%,rgba(92,116,88,0.16),transparent_28%)]" />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-6 sm:px-8 lg:px-10">
        <nav className="flex items-center justify-between border-b border-stone-300/70 pb-5 text-xs uppercase tracking-[0.2em] text-stone-600">
          <Link href="/me" className="inline-flex items-center gap-2 transition hover:text-orange-700">
            <ArrowLeft className="h-4 w-4" />
            nociza.com
          </Link>
          <span>Siplogue · field notes</span>
        </nav>

        <header className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[1.5fr_0.75fr] lg:items-end">
          <div>
            <div className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-orange-700">
              <span className="h-px w-10 bg-orange-500" />
              Tea, coffee, and time
            </div>
            <h1 className="max-w-3xl font-serif text-4xl font-semibold leading-tight tracking-[-0.035em] text-stone-950 sm:text-5xl lg:text-6xl">
              Cups worth remembering.
            </h1>
          </div>
          <div className="border-l border-stone-300 pl-5 text-sm leading-7 text-stone-600 lg:mb-2">
            <p>
              A personal journal of leaves, beans, brewing experiments, and the quiet details that stay after the cup is empty.
            </p>
            <div className="mt-6 flex items-center gap-4 text-stone-500">
              <span className="inline-flex items-center gap-1.5"><Leaf className="h-4 w-4" /> Tea</span>
              <span className="inline-flex items-center gap-1.5"><Coffee className="h-4 w-4" /> Coffee</span>
            </div>
          </div>
        </header>

        {featured ? (
          <section aria-labelledby="latest-entry">
            <div className="mb-6 flex items-end justify-between border-b border-stone-300/70 pb-3">
              <h2 id="latest-entry" className="text-xs font-semibold uppercase tracking-[0.24em] text-stone-600">Latest entry</h2>
              <span className="text-xs text-stone-500">{sipEntries.length} {sipEntries.length === 1 ? "note" : "notes"}</span>
            </div>
            <SipCard entry={featured} />

            {remaining.length > 0 && (
              <div className="mt-14">
                <h2 className="mb-6 border-b border-stone-300/70 pb-3 text-xs font-semibold uppercase tracking-[0.24em] text-stone-600">
                  From the journal
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  {remaining.map((entry) => <SipCard key={entry.id} entry={entry} compact />)}
                </div>
              </div>
            )}
          </section>
        ) : (
          <section className="rounded-[2rem] border border-dashed border-stone-300 bg-white/45 px-6 py-16 text-center sm:px-12 sm:py-24">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-orange-100 text-orange-700">
              <Coffee className="h-6 w-6" />
            </div>
            <h2 className="mt-6 font-serif text-3xl font-semibold text-stone-900">The kettle is warming.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-stone-600">
              The journal is ready. New tea and coffee notes will appear here after they are polished and published through Siplogue.
            </p>
          </section>
        )}

        <footer className="mt-20 flex flex-col gap-4 border-t border-stone-300/70 pt-6 text-xs text-stone-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Written from the cup, kept in Git.</span>
          <Link href="/coffee" className="inline-flex items-center gap-1.5 transition hover:text-orange-700">
            Visit the legacy coffee archive <ArrowUpRight className="h-3.5 w-3.5" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
