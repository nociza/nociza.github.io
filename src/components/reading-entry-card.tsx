import Link from "next/link";
import { ArrowUpRight, BookOpen, FileText, Headphones } from "lucide-react";
import {
  bookFormatLabel,
  readDate,
  ReadEntry,
  readStatusLabel,
} from "@/data/read-data";

export default function ReadingEntryCard({
  entry,
  compact = false,
  eagerCover = false,
}: {
  entry: ReadEntry;
  compact?: boolean;
  eagerCover?: boolean;
}) {
  const Icon = entry.kind === "paper" ? FileText : entry.format === "audiobook" ? Headphones : BookOpen;
  const typeLabel = entry.kind === "paper" ? "Paper" : bookFormatLabel(entry.format);
  const description = entry.reflection ?? entry.excerpt ?? (entry.kind === "paper" ? entry.abstract : undefined);
  const rawTags = entry.kind === "paper" ? entry.categories ?? entry.tags ?? [] : entry.tags ?? [];
  const approximateCompletionYear = entry.kind === "book" && rawTags.includes("completion-year-approximate");
  const date = readDate(entry.publishedAt ?? entry.completedAt ?? entry.updatedAt, approximateCompletionYear);
  const tags = rawTags.filter((tag) => tag !== "completion-year-approximate");
  const primaryLink = entry.links?.[0] ?? (entry.kind === "paper" && entry.url ? { label: "Source", url: entry.url } : null);
  const isbn = entry.kind === "book" ? entry.identifiers?.isbn13 ?? entry.identifiers?.isbn10 : undefined;
  const cover = entry.cover;

  return (
    <article
      id={entry.id}
      className={`group border-t border-black/10 ${compact ? "py-5" : "py-7 sm:py-9"}`}
    >
      <div className={`grid gap-5 ${entry.kind === "book" ? "sm:grid-cols-[6.5rem_minmax(0,1fr)]" : "sm:grid-cols-[8.5rem_minmax(0,1fr)]"} sm:gap-8`}>
        <div className={entry.kind === "book" ? "grid grid-cols-[4.25rem_minmax(0,1fr)] items-start gap-4 sm:block" : undefined}>
          {entry.kind === "book" && (
            <div className="aspect-[2/3] w-full overflow-hidden rounded-sm border border-black/10 bg-black/[0.035] shadow-sm">
              {cover ? (
                isbn ? (
                  <Link href={`https://openlibrary.org/isbn/${isbn}`} target="_blank" rel="noopener noreferrer" aria-label={`Open Library edition for ${entry.title}`} className="block h-full w-full">
                    <img
                      src={cover}
                      alt={`Cover of ${entry.title}`}
                      className="h-full w-full object-cover"
                      loading={eagerCover ? "eager" : "lazy"}
                      fetchPriority={eagerCover ? "high" : "auto"}
                    />
                  </Link>
                ) : (
                  <img
                    src={cover}
                    alt={`Cover of ${entry.title}`}
                    className="h-full w-full object-cover"
                    loading={eagerCover ? "eager" : "lazy"}
                    fetchPriority={eagerCover ? "high" : "auto"}
                  />
                )
              ) : (
                <div className="flex h-full items-center justify-center text-neutral-300">
                  <BookOpen aria-hidden="true" className="h-5 w-5 stroke-[1.25]" />
                </div>
              )}
            </div>
          )}
          <div className={entry.kind === "book" ? "sm:mt-4" : undefined}>
            <div className="flex items-center gap-2 text-xs text-neutral-500">
              <Icon aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" />
              <span>{typeLabel}</span>
            </div>
            <p className="mt-2 text-xs font-medium text-neutral-800">{readStatusLabel(entry.status)}</p>
            {date && <time className="mt-1 block text-xs text-neutral-500">{date}</time>}
          </div>
        </div>

        <div className="min-w-0">
          <div className="flex items-start justify-between gap-5">
            <div>
              <h2 className={`${compact ? "text-xl" : "text-2xl sm:text-3xl"} font-serif font-medium leading-tight tracking-[-0.025em] text-neutral-950`}>
                {entry.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-neutral-500">
                {entry.authors.join(", ")}
              </p>
            </div>
            {primaryLink && (
              <Link
                href={primaryLink.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${primaryLink.label}: ${entry.title}`}
                className="mt-1 shrink-0 text-neutral-400 transition hover:-translate-y-0.5 hover:translate-x-0.5 hover:text-neutral-950"
              >
                <ArrowUpRight aria-hidden="true" className="h-5 w-5" />
              </Link>
            )}
          </div>

          {description && (
            <p className={`${compact ? "line-clamp-2" : "line-clamp-3"} mt-4 max-w-3xl text-sm leading-7 text-neutral-600`}>
              {description}
            </p>
          )}

          {entry.progress && (
            <div className="mt-5 max-w-xl">
              <div className="flex items-center justify-between gap-4 text-xs text-neutral-500">
                <span className="truncate">{entry.progress.label ?? "Progress"}</span>
                {entry.progress.percent != null && <span>{entry.progress.percent}%</span>}
              </div>
              {entry.progress.percent != null && (
                <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/10">
                  <div className="h-full rounded-full bg-neutral-800" style={{ width: `${entry.progress.percent}%` }} />
                </div>
              )}
              {entry.progress.remaining && <p className="mt-2 text-xs text-neutral-500">{entry.progress.remaining} remaining</p>}
            </div>
          )}

          {!compact && tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {tags.slice(0, 6).map((tag) => (
                <span key={tag} className="rounded-full bg-black/[0.045] px-2.5 py-1 text-[11px] text-neutral-600">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
