import Link from "next/link";
import { ArrowUpRight, BookOpen, Headphones } from "lucide-react";
import { bookFormatLabel, BookRead, readDate, readStatusLabel } from "@/data/read-data";

export default function BookShelfCard({
  entry,
  eagerCover = false,
  compact = false,
}: {
  entry: BookRead;
  eagerCover?: boolean;
  compact?: boolean;
}) {
  const isbn = entry.identifiers?.isbn13 ?? entry.identifiers?.isbn10;
  const approximateCompletionYear = entry.tags?.includes("completion-year-approximate") ?? false;
  const date = readDate(entry.completedAt ?? entry.updatedAt, approximateCompletionYear);
  const active = entry.status === "active";
  const primaryLink = entry.links?.[0];
  const FormatIcon = entry.format === "audiobook" ? Headphones : BookOpen;

  const coverImage = entry.cover ? (
    <img
      src={entry.cover}
      alt={`Cover of ${entry.title}`}
      className="h-full w-full object-cover transition duration-500 ease-out group-hover:scale-[1.025]"
      loading={eagerCover ? "eager" : "lazy"}
      fetchPriority={eagerCover ? "high" : "auto"}
    />
  ) : (
    <div className="flex h-full items-center justify-center text-neutral-300">
      <BookOpen aria-hidden="true" className="h-7 w-7 stroke-[1.1]" />
    </div>
  );

  return (
    <article
      id={entry.id}
      style={{ contentVisibility: "auto", containIntrinsicSize: compact ? "180px" : "420px" }}
      className={
        compact
          ? "group grid min-w-0 grid-cols-[6rem_minmax(0,1fr)] gap-4 border-t border-black/10 pt-4 sm:grid-cols-[7.5rem_minmax(0,1fr)] sm:gap-6"
          : "group min-w-0"
      }
    >
      <div className="aspect-[2/3] overflow-hidden rounded-xl border border-black/10 bg-black/[0.035] shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
        {isbn && entry.cover ? (
          <Link
            href={`https://openlibrary.org/isbn/${isbn}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Library edition for ${entry.title}`}
            className="block h-full w-full"
          >
            {coverImage}
          </Link>
        ) : coverImage}
      </div>

      <div className={compact ? "min-w-0 pt-1" : "pt-4"}>
        <div className="flex items-center justify-between gap-3 text-[11px] text-neutral-500">
          <span className="inline-flex min-w-0 items-center gap-1.5">
            <FormatIcon aria-hidden="true" className="h-3.5 w-3.5 shrink-0 stroke-[1.4]" />
            <span className="truncate">{bookFormatLabel(entry.format)}</span>
          </span>
          {active ? (
            <span className="shrink-0 font-medium text-neutral-700">{readStatusLabel(entry.status)}</span>
          ) : date ? (
            <time className="shrink-0">{date}</time>
          ) : null}
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-3">
          <h2 className="line-clamp-3 font-serif text-lg font-medium leading-[1.18] tracking-[-0.02em] text-neutral-950 sm:text-xl">
            {entry.title}
          </h2>
          {primaryLink && (
            <Link
              href={primaryLink.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${primaryLink.label}: ${entry.title}`}
                className="-mr-2 -mt-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-neutral-400 transition hover:-translate-y-0.5 hover:translate-x-0.5 hover:bg-black/[0.04] hover:text-neutral-950"
            >
              <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          )}
        </div>

        <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-500">
          {entry.authors.join(", ")}
        </p>

        {active && entry.progress?.percent != null && (
          <div className="mt-4">
            <div className="flex items-center justify-between gap-3 text-[11px] text-neutral-500">
              <span className="truncate">{entry.progress.label ?? "Progress"}</span>
              <span>{entry.progress.percent}%</span>
            </div>
            <div className="mt-2 h-px overflow-hidden bg-black/10">
              <div className="h-full bg-neutral-700" style={{ width: `${entry.progress.percent}%` }} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
