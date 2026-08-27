import Link from "next/link";
import { ArrowRight, FileText } from "lucide-react";
import ReadingEntryCard from "@/components/reading-entry-card";
import { paperReads } from "@/data/read-data";

export default function PapersSection() {
  const visible = paperReads.slice(0, 3);

  return (
    <div className="min-h-screen bg-[#f7f6f2]/85 px-6 py-20 sm:px-10">
      <div className="mx-auto flex min-h-[calc(100vh-10rem)] max-w-5xl flex-col justify-center">
        <div className="flex flex-col gap-6 border-b border-black/10 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-neutral-500">
              <FileText aria-hidden="true" className="h-4 w-4 stroke-[1.5]" />
              Research reading
            </div>
            <h1 className="font-serif text-4xl font-medium tracking-[-0.035em] text-neutral-950 sm:text-5xl">Papers worth keeping.</h1>
            <p className="mt-3 max-w-xl text-sm leading-7 text-neutral-600">
              Research ideas that caught my attention and deserve another pass.
            </p>
          </div>
          <Link href="/papers" className="inline-flex items-center gap-2 text-sm font-medium text-neutral-700 transition hover:text-neutral-950">
            Browse the archive <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>

        {visible.length ? (
          <div>
            {visible.map((entry) => <ReadingEntryCard key={entry.id} entry={entry} compact />)}
          </div>
        ) : (
          <div className="border-b border-black/10 py-16 text-center">
            <p className="font-serif text-2xl text-neutral-800">The paper trail starts here.</p>
            <p className="mt-2 text-sm text-neutral-500">Send Teleclaw a paper link or title to add it.</p>
          </div>
        )}
      </div>
    </div>
  );
}
