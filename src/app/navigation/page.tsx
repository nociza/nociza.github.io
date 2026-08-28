import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const destinations = [
  { href: "/me", title: "Home", description: "Resume, current cups, and the books in progress." },
  { href: "/sips", title: "Siplogue", description: "Tea, coffee, and brewing field notes." },
  { href: "/books", title: "The shelf", description: "Current reading, all-time favorites, and the archive." },
  { href: "/papers", title: "Papers", description: "Research reading worth returning to." },
  { href: "/coffee", title: "Coffee archive", description: "The earlier tasting-note collection." },
  { href: "/music", title: "Listening notes", description: "Albums, songs, and playlists kept for the record." },
  { href: "/compvision", title: "Computer vision", description: "Project reports from Berkeley CS 194/294-26." },
  { href: "/book", title: "The Book of Me", description: "The older, stranger entrance to this website." },
];

export default function NavigationPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-6xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/me" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> nociza.com
          </Link>
        </nav>

        <header className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.65fr)] lg:items-end">
          <div>
            <p className="mb-4 text-sm text-neutral-500">Site index</p>
            <h1 className="font-serif text-5xl font-medium leading-[1.03] tracking-[-0.04em] sm:text-6xl">Everything, in one place.</h1>
          </div>
          <p className="max-w-md text-sm leading-7 text-neutral-600 lg:justify-self-end">A small map of the public corners of this website.</p>
        </header>

        <section aria-label="Site destinations" className="grid gap-px overflow-hidden rounded-2xl border border-black/10 bg-black/10 sm:grid-cols-2">
          {destinations.map((destination) => (
            <Link key={destination.href} href={destination.href} className="group min-h-44 bg-[#f8f8f5] p-5 transition hover:bg-white sm:p-7">
              <div className="flex items-start justify-between gap-6">
                <h2 className="font-serif text-2xl font-medium tracking-[-0.025em]">{destination.title}</h2>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
              </div>
              <p className="mt-4 max-w-sm text-sm leading-6 text-neutral-600">{destination.description}</p>
            </Link>
          ))}
        </section>
      </div>
    </main>
  );
}
