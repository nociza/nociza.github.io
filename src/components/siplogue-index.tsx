"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3, Coffee, Wrench } from "lucide-react";
import BrewSetupCard from "@/components/brew-setup-card";
import SipCard from "@/components/sip-card";
import SipSetupLinks from "@/components/sip-setup-links";
import { brewSetups } from "@/data/brew-setup-data";
import { formatSipShortDate, isSipCurrent, sipEntries } from "@/data/sip-data";

export default function SiplogueIndex({ referenceNow }: { referenceNow: string }) {
  const [now, setNow] = useState(() => Date.parse(referenceNow));

  useEffect(() => {
    setNow(Date.now());
    const timer = window.setInterval(() => setNow(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  const { current, archive } = useMemo(() => ({
    current: sipEntries.filter((entry) => isSipCurrent(entry, now)),
    archive: sipEntries.filter((entry) => !isSipCurrent(entry, now)),
  }), [now]);

  return (
    <main className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/me" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> nociza.com
          </Link>
          <span className="inline-flex min-h-10 items-center font-medium text-neutral-900">Siplogue</span>
        </nav>

        <header className="grid gap-7 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.25fr)_minmax(16rem,0.6fr)] lg:items-end">
          <div className="max-w-2xl">
            <p className="mb-4 text-sm text-neutral-500">Tea, coffee, and the ways I make them</p>
            <h1 className="font-serif text-4xl font-medium leading-[1.03] tracking-[-0.035em] text-neutral-950 sm:text-5xl">Cups in rotation.</h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600 lg:justify-self-end">
            What I am drinking now, the setups behind each brew, and a dated archive of the cups that moved through the shelf.
          </p>
        </header>

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.65fr)_minmax(17rem,0.7fr)] lg:gap-12">
          <section aria-labelledby="current-rotation-heading">
            <div className="flex items-end justify-between border-b border-black/10 pb-4">
              <div>
                <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs text-orange-700"><Clock3 aria-hidden="true" className="h-3.5 w-3.5" /> 14-day window</p>
                <h2 id="current-rotation-heading" className="font-serif text-2xl font-medium tracking-[-0.025em]">Currently drinking</h2>
              </div>
              <span className="text-xs text-neutral-500">{current.length} active</span>
            </div>

            {current.length ? (
              <div className="grid gap-7 pt-5 sm:grid-cols-2">
                {current.map((entry) => (
                  <article key={entry.id}>
                    <SipCard entry={entry} compact />
                    <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-neutral-500">
                      <span>Noted {formatSipShortDate(entry.receivedAt)}</span>
                      {entry.activity.expiresAt && <span>Moves to archive {formatSipShortDate(entry.activity.expiresAt)}</span>}
                    </div>
                    <SipSetupLinks setupIds={entry.setupIds} compact />
                  </article>
                ))}
              </div>
            ) : (
              <div className="border-b border-black/10 py-14">
                <Coffee aria-hidden="true" className="h-6 w-6 stroke-[1.4] text-neutral-400" />
                <p className="mt-4 font-serif text-2xl text-neutral-800">Nothing in rotation.</p>
                <p className="mt-2 max-w-lg text-sm leading-6 text-neutral-500">A newly noted coffee appears here for two weeks. Telling Sip that you are drinking it again starts a fresh window.</p>
              </div>
            )}
          </section>

          <aside aria-labelledby="brew-shelf-heading">
            <div className="border-b border-black/10 pb-4">
              <p className="mb-1.5 inline-flex items-center gap-1.5 text-xs text-neutral-500"><Wrench aria-hidden="true" className="h-3.5 w-3.5" /> Tools · machinery · methods</p>
              <h2 id="brew-shelf-heading" className="font-serif text-2xl font-medium tracking-[-0.025em]">The brew shelf</h2>
            </div>
            {brewSetups.length ? (
              <div className="grid gap-4 pt-5 sm:grid-cols-2 lg:grid-cols-1">
                {brewSetups.map((setup) => <BrewSetupCard key={setup.id} setup={setup} compact />)}
              </div>
            ) : (
              <div className="border-b border-black/10 py-10">
                <p className="text-sm leading-6 text-neutral-600">Photographed setups will live here, with the tools on hand and every brew method they support.</p>
                <p className="mt-3 text-xs leading-5 text-neutral-500">Send Teleclaw a setup photo and describe the equipment to add the first one.</p>
              </div>
            )}
          </aside>
        </div>

        {archive.length > 0 && (
          <section aria-labelledby="sip-archive-heading" className="mt-20 sm:mt-24">
            <div className="flex items-baseline justify-between border-b border-black/10 pb-3">
              <h2 id="sip-archive-heading" className="font-serif text-2xl font-medium tracking-[-0.025em]">Archive</h2>
              <span className="text-xs text-neutral-500">{archive.length} recorded · newest first</span>
            </div>
            <div>
              {archive.map((entry) => (
                <article key={entry.id}>
                  <SipCard entry={entry} />
                  <SipSetupLinks setupIds={entry.setupIds} compact />
                </article>
              ))}
            </div>
          </section>
        )}

        <footer className="mt-20 flex flex-col gap-4 border-t border-black/10 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-lg leading-5">
            <p>Written from the cup, kept in Git.</p>
            <p className="mt-1.5">Published with <a href="https://github.com/nociza/siplogue" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1 text-neutral-700 underline decoration-black/20 underline-offset-4 transition hover:text-neutral-950 hover:decoration-black/50">Sip <ArrowUpRight aria-hidden="true" className="h-3 w-3" /></a>{", an open-source skill for cups, rotations, and brew setups."}</p>
          </div>
          <div className="flex flex-wrap items-center gap-x-5">
            <a href="https://www.goodreads.com/user/show/84703211-alex-zhang" target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-1.5 transition hover:text-neutral-950">Goodreads <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></a>
            <Link href="/coffee" className="inline-flex min-h-10 items-center gap-1.5 transition hover:text-neutral-950">Legacy coffee archive <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" /></Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
