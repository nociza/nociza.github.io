import Link from "next/link";
import { ArrowUpRight, Coffee, Leaf } from "lucide-react";
import { formatSipDate, SipEntry } from "@/data/sip-data";
import SipMedia from "@/components/sip-media";

export default function SipCard({
  entry,
  featured = false,
  compact = false,
}: {
  entry: SipEntry;
  featured?: boolean;
  compact?: boolean;
}) {
  const KindIcon = entry.kind === "tea" ? Leaf : Coffee;

  if (featured) {
    return (
      <Link
        href={`/sips/${entry.slug}`}
        className="group grid overflow-hidden rounded-[1.75rem] border border-black/10 bg-white transition-colors hover:border-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 md:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[26rem]">
          <SipMedia entry={entry} eager className="transition duration-500 group-hover:scale-[1.015]" />
        </div>
        <div className="flex flex-col p-6 sm:p-8 lg:p-10">
          <div className="flex items-center gap-2 text-xs text-neutral-500">
            <KindIcon aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" />
            <span className="capitalize">{entry.kind}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={entry.observedAt}>{formatSipDate(entry.observedAt)}</time>
          </div>
          <h2 className="mt-6 font-serif text-3xl font-medium leading-[1.05] tracking-[-0.03em] text-neutral-950 sm:text-4xl">
            {entry.title}
          </h2>
          <p className="mt-4 text-sm leading-7 text-neutral-600">{entry.excerpt}</p>
          <div className="mt-10 flex items-center gap-2 text-sm font-medium text-neutral-900 md:mt-auto md:pt-10">
            Read entry
            <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </Link>
    );
  }

  if (compact) {
    return (
      <Link
        href={`/sips/${entry.slug}`}
        className="group block border-t border-black/10 pt-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4"
      >
        <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-200">
          <SipMedia entry={entry} className="transition duration-500 group-hover:scale-[1.02]" />
        </div>
        <div className="mt-4 flex items-center gap-2 text-xs text-neutral-500">
          <KindIcon aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" />
          <time dateTime={entry.observedAt}>{formatSipDate(entry.observedAt)}</time>
        </div>
        <h2 className="mt-2 font-serif text-xl font-medium leading-tight tracking-[-0.02em] text-neutral-950">
          {entry.title}
        </h2>
        <p className="mt-2 line-clamp-2 text-sm leading-6 text-neutral-600">{entry.excerpt}</p>
      </Link>
    );
  }

  return (
    <Link
      href={`/sips/${entry.slug}`}
      className="group grid grid-cols-[5.5rem_minmax(0,1fr)] items-center gap-4 border-t border-black/10 py-5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 sm:grid-cols-[7rem_minmax(0,1fr)_auto] sm:gap-6 sm:py-6"
    >
      <div className="aspect-square overflow-hidden rounded-xl bg-neutral-200">
        <SipMedia entry={entry} className="transition duration-500 group-hover:scale-[1.025]" />
      </div>

      <div className="min-w-0">
        <div className="flex items-center gap-2 text-xs text-neutral-500">
          <KindIcon aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" />
          <span className="capitalize">{entry.kind}</span>
          <span aria-hidden="true">·</span>
          <time dateTime={entry.observedAt}>{formatSipDate(entry.observedAt)}</time>
        </div>
        <h2 className="mt-2 truncate font-serif text-xl font-medium leading-tight tracking-[-0.02em] text-neutral-950 sm:text-2xl">
          {entry.title}
        </h2>
        <p className="mt-2 line-clamp-1 text-sm text-neutral-600 sm:line-clamp-2 sm:leading-6">{entry.excerpt}</p>
      </div>
      <ArrowUpRight
        aria-hidden="true"
        className="hidden h-5 w-5 text-neutral-400 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 sm:block"
      />
    </Link>
  );
}
