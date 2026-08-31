import Link from "next/link";
import { ArrowUpRight, Wrench } from "lucide-react";
import type { BrewSetup } from "@/data/brew-setup-data";

export default function BrewSetupCard({ setup, compact = false }: { setup: BrewSetup; compact?: boolean }) {
  return (
    <Link
      href={`/sips/setups/${setup.slug}`}
      className="group block overflow-hidden rounded-2xl border border-black/10 bg-white/75 transition hover:border-black/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-4 focus-visible:ring-offset-[#f4f4f1]"
    >
      <div className={`${compact ? "aspect-[16/10]" : "aspect-[4/3]"} overflow-hidden bg-neutral-200`}>
        <img src={setup.image.src} alt={setup.image.alt} loading="lazy" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.02]" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-4 text-[11px] text-neutral-500">
          <span className="inline-flex items-center gap-1.5"><Wrench aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" /> Brew setup</span>
          <ArrowUpRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </div>
        <h3 className="mt-3 font-serif text-xl font-medium leading-tight tracking-[-0.02em] text-neutral-950">{setup.name}</h3>
        <p className="mt-2 line-clamp-2 text-xs leading-5 text-neutral-600">{setup.summary}</p>
        {setup.methods.length > 0 && <p className="mt-3 text-[11px] text-neutral-500">{setup.methods.join(" · ")}</p>}
      </div>
    </Link>
  );
}
