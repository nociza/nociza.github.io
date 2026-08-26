import Link from "next/link";
import { ArrowUpRight, Coffee, Leaf } from "lucide-react";
import { formatSipDate, SipEntry } from "@/data/sip-data";

export default function SipCard({ entry, compact = false }: { entry: SipEntry; compact?: boolean }) {
  const KindIcon = entry.kind === "tea" ? Leaf : Coffee;

  return (
    <Link
      href={`/sips/${entry.slug}`}
      className="group block overflow-hidden rounded-[1.75rem] border border-stone-200/80 bg-white/90 shadow-[0_20px_70px_-42px_rgba(64,45,30,0.55)] transition duration-300 hover:-translate-y-1 hover:border-orange-300 hover:shadow-[0_24px_70px_-36px_rgba(180,92,37,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4"
    >
      <div className={`relative overflow-hidden bg-stone-100 ${compact ? "aspect-[4/3]" : "aspect-[16/9]"}`}>
        <img
          src={entry.image.src}
          alt={entry.image.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/35 via-transparent to-transparent" />
        <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full border border-white/50 bg-white/90 px-3 py-1 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-stone-700 backdrop-blur">
          <KindIcon className="h-3.5 w-3.5" />
          {entry.kind}
        </span>
      </div>

      <div className={compact ? "p-5" : "p-6 sm:p-7"}>
        <div className="mb-3 flex items-center justify-between gap-4 text-xs uppercase tracking-[0.16em] text-stone-500">
          <time dateTime={entry.observedAt}>{formatSipDate(entry.observedAt)}</time>
          <ArrowUpRight className="h-4 w-4 text-orange-500 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
        <h2 className={`${compact ? "text-xl" : "text-2xl"} font-serif font-semibold leading-tight text-stone-900`}>
          {entry.title}
        </h2>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-stone-600">{entry.excerpt}</p>
        {entry.tastingNotes.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {entry.tastingNotes.slice(0, 3).map((note) => (
              <span key={note} className="rounded-full bg-orange-50 px-2.5 py-1 text-xs text-orange-800">
                {note}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}
