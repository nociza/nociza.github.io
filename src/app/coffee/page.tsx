"use client";

import Link from "next/link";
import { ArrowUpRight, Coffee, MapPin } from "lucide-react";
import SearchableIndex from "../../components/searchable-index";
import { CoffeeEntry, coffeeEntries } from "../../data/site-data";

function CoffeeCard({ coffee }: { coffee: CoffeeEntry }) {
  const isCurrentlyDrinking = coffee.status === "currently_drinking" ||
    coffee.status === "Currently Drinking" ||
    coffee.status === "Currently Brewing" ||
    coffee.status?.toLowerCase().includes("current");

  return (
    <Link
      href={`/coffee/${coffee.id}`}
      className="group flex min-h-64 flex-col rounded-2xl border border-black/10 bg-white/65 p-5 transition hover:-translate-y-0.5 hover:border-black/20 hover:bg-white focus-visible:outline-none sm:p-6"
    >
      <div className="flex items-center justify-between gap-4 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-2">
          <Coffee aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" />
          {isCurrentlyDrinking ? "Currently brewing" : "Coffee note"}
        </span>
        <time dateTime={coffee.date}>{coffee.date}</time>
      </div>

      <h2 className="mt-7 font-serif text-2xl font-medium leading-tight tracking-[-0.025em] text-neutral-950">
        {coffee.name}
      </h2>
      <p className="mt-2 text-sm font-medium text-neutral-600">{coffee.roaster}</p>

      {(coffee.origin || coffee.process) && (
        <div className="mt-5 flex flex-wrap gap-x-4 gap-y-2 text-xs text-neutral-500">
          {coffee.origin && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="h-3.5 w-3.5" /> {coffee.origin}
            </span>
          )}
          {coffee.process && <span>{coffee.process}</span>}
        </div>
      )}

      {coffee.notes && coffee.notes !== "No notes available" && (
        <p className="mt-5 line-clamp-3 text-sm leading-6 text-neutral-600">{coffee.notes}</p>
      )}

      <div className="mt-auto flex items-end justify-between gap-4 pt-8 text-xs text-neutral-500">
        <span>
          {coffee.pourOverRating ? `Pour over ${coffee.pourOverRating}/10` : coffee.americanoRating ? `Americano ${coffee.americanoRating}/10` : "View details"}
        </span>
        <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

export default function CoffeeIndexPage() {
  return (
    <SearchableIndex
      title="The coffee archive."
      eyebrow="Legacy tasting notes"
      description="Earlier coffee logs, preserved here while newer cups live in Siplogue. Search by bean, roaster, origin, process, or note."
      itemLabel="coffee"
      items={coffeeEntries}
      searchFields={["name", "roaster", "notes", "origin", "process"]}
      placeholder="Search coffee, roaster, origin, process, notes…"
      renderItem={(coffee: CoffeeEntry) => <CoffeeCard key={coffee.id} coffee={coffee} />}
    />
  );
}
