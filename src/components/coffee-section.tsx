import Link from "next/link";
import { ArrowRight, Coffee, Leaf } from "lucide-react";
import SipCard from "@/components/sip-card";
import { sipEntries } from "@/data/sip-data";

export default function CoffeeSection() {
  const recentEntries = sipEntries.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f3ea]/80 px-6 py-20 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-6xl flex-col justify-center">
        <div className="mb-9 flex flex-col gap-6 border-b border-stone-300/70 pb-8 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-orange-700">
              <Leaf className="h-4 w-4" /> Tea · Coffee · Field notes
            </div>
            <h1 className="font-serif text-5xl font-semibold tracking-[-0.035em] text-stone-950 sm:text-6xl">Siplogue</h1>
            <p className="mt-3 max-w-2xl text-base leading-7 text-stone-600">
              Cups worth remembering—polished from quick notes, kept as a small personal journal.
            </p>
          </div>
          <Link href="/sips" className="inline-flex items-center gap-2 text-sm font-semibold text-orange-700 transition hover:text-orange-900">
            Open the journal <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {recentEntries.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-3">
            {recentEntries.map((entry) => <SipCard key={entry.id} entry={entry} compact />)}
          </div>
        ) : (
          <Link
            href="/sips"
            className="group flex min-h-64 flex-col items-center justify-center rounded-[2rem] border border-dashed border-stone-300 bg-white/45 px-6 text-center transition hover:border-orange-300 hover:bg-white/70"
          >
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange-100 text-orange-700">
              <Coffee className="h-5 w-5" />
            </span>
            <h2 className="mt-5 font-serif text-2xl font-semibold text-stone-900">The first entry is steeping.</h2>
            <p className="mt-2 max-w-lg text-sm leading-6 text-stone-600">
              Send Teleclaw a photo and a few thoughts; the finished note will appear here.
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-orange-700">
              Visit Siplogue <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
