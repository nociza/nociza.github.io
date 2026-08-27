import { Coffee, Leaf } from "lucide-react";
import type { SipEntry } from "@/data/sip-data";

export function isSipArchivePlaceholder(entry: SipEntry): boolean {
  return entry.image.src.endsWith("/archive-coffee.svg");
}

export default function SipMedia({
  entry,
  className = "",
  eager = false,
}: {
  entry: SipEntry;
  className?: string;
  eager?: boolean;
}) {
  if (isSipArchivePlaceholder(entry)) {
    const KindIcon = entry.kind === "tea" ? Leaf : Coffee;
    const producer = typeof entry.subject.producer === "string" ? entry.subject.producer : "Siplogue";

    return (
      <div
        role="img"
        aria-label={entry.image.alt}
        className={`relative flex h-full w-full flex-col justify-between overflow-hidden bg-[#e8e8e3] p-5 text-neutral-700 ${className}`}
      >
        <div className="flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.18em] text-neutral-500">
          <span>Archive</span>
          <span>{entry.observedAt.slice(0, 4)}</span>
        </div>
        <div>
          <KindIcon aria-hidden="true" className="mb-4 h-8 w-8 stroke-[1.4] text-neutral-600" />
          <p className="max-w-[14rem] text-lg font-medium leading-snug tracking-[-0.02em] text-neutral-800">
            {producer}
          </p>
          <p className="mt-1 text-xs text-neutral-500">Original photograph unavailable</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={entry.image.src}
      alt={entry.image.alt}
      loading={eager ? "eager" : "lazy"}
      className={`h-full w-full object-cover ${className}`}
    />
  );
}
