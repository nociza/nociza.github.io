import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Coffee, MapPin, Star } from "lucide-react";
import { coffeeEntries } from "@/data/site-data";

function isCurrent(status?: string): boolean {
  return Boolean(status?.toLowerCase().includes("current"));
}

function formatDate(value: string): string {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return value;
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
}

export default function CoffeeDetail({ params }: { params: { id: string } }) {
  const coffee = coffeeEntries.find((entry) => entry.id === params.id);
  if (!coffee) notFound();

  const ratings: Array<{ label: string; rating: number }> = [];
  if (coffee.pourOverRating != null) ratings.push({ label: "Pour over", rating: coffee.pourOverRating });
  if (coffee.americanoRating != null) ratings.push({ label: "Americano", rating: coffee.americanoRating });
  const hasNotes = coffee.notes && coffee.notes !== "No notes available";

  return (
    <main id="main-content" className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <article className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/coffee" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Coffee archive
          </Link>
          <Link href="/sips" className="inline-flex min-h-10 items-center gap-1.5 transition hover:text-neutral-950">
            Siplogue <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </Link>
        </nav>

        <header className="max-w-4xl pb-12 pt-14 sm:pb-16 sm:pt-20">
          <div className="mb-6 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-neutral-500">
            <span className="inline-flex items-center gap-2">
              <Coffee aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              {isCurrent(coffee.status) ? "Currently brewing" : "Coffee note"}
            </span>
            <span aria-hidden="true">·</span>
            <time dateTime={coffee.date}>{formatDate(coffee.date)}</time>
          </div>
          <h1 className="font-serif text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl">{coffee.name}</h1>
          <p className="mt-5 text-base text-neutral-600 sm:text-lg">Roasted by {coffee.roaster}</p>
        </header>

        <div className="grid gap-12 border-y border-black/10 py-10 sm:py-12 lg:grid-cols-[minmax(0,1fr)_18rem] lg:gap-16">
          <section aria-labelledby="tasting-notes-heading">
            <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">Tasting notes</p>
            <h2 id="tasting-notes-heading" className="mt-4 font-serif text-3xl font-medium tracking-[-0.025em]">
              {hasNotes ? "What stayed with the cup." : "A cup kept for the record."}
            </h2>
            <p className="mt-6 max-w-2xl whitespace-pre-wrap font-serif text-lg leading-8 text-neutral-700 sm:text-xl sm:leading-9">
              {hasNotes ? coffee.notes : "No tasting notes were recorded for this coffee."}
            </p>
          </section>

          <aside className="h-fit border-t border-black/10 pt-5 lg:border-t-0 lg:pt-0">
            <h2 className="text-sm font-medium text-neutral-900">Cup details</h2>
            <dl className="mt-5 space-y-4 text-sm leading-6">
              {coffee.origin && (
                <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                  <dt className="inline-flex items-center gap-1.5 text-neutral-500"><MapPin aria-hidden="true" className="h-3.5 w-3.5" /> Origin</dt>
                  <dd className="font-medium text-neutral-800">{coffee.origin}</dd>
                </div>
              )}
              {coffee.process && (
                <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                  <dt className="text-neutral-500">Process</dt>
                  <dd className="font-medium text-neutral-800">{coffee.process}</dd>
                </div>
              )}
              {coffee.status && (
                <div className="grid grid-cols-[5.5rem_1fr] gap-3">
                  <dt className="text-neutral-500">Status</dt>
                  <dd className="font-medium text-neutral-800">{coffee.status}</dd>
                </div>
              )}
            </dl>

            {ratings.length > 0 && (
              <div className="mt-6 border-t border-black/10 pt-5">
                {ratings.map(({ label, rating }) => (
                  <div key={label} className="mt-3 flex items-center justify-between gap-4 text-sm first:mt-0">
                    <span className="text-neutral-500">{label}</span>
                    <span className="inline-flex items-center gap-1.5 font-semibold text-neutral-900">
                      <Star aria-hidden="true" className="h-3.5 w-3.5 fill-neutral-800 text-neutral-800" /> {rating}/10
                    </span>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>

        <footer className="flex flex-col gap-4 pt-6 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between">
          <span>Part of the original coffee archive.</span>
          <div className="flex gap-5">
            <Link href="/coffee" className="min-h-10 content-center transition hover:text-neutral-950">More coffee notes</Link>
            <Link href="/me" className="min-h-10 content-center transition hover:text-neutral-950">Home</Link>
          </div>
        </footer>
      </article>
    </main>
  );
}
