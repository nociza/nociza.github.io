import Link from "next/link";
import { Wrench } from "lucide-react";
import { findBrewSetup } from "@/data/brew-setup-data";

export default function SipSetupLinks({ setupIds, compact = false }: { setupIds: string[]; compact?: boolean }) {
  const setups = setupIds.map(findBrewSetup).filter((setup) => setup !== undefined);
  if (!setups.length) return null;

  return (
    <div className={`flex flex-wrap gap-2 ${compact ? "mt-3" : "mt-5"}`} aria-label="Brew setups used">
      {setups.map((setup) => (
        <Link
          key={setup.id}
          href={`/sips/setups/${setup.slug}`}
          className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-3 text-xs text-neutral-600 transition hover:border-black/25 hover:text-neutral-950"
        >
          <Wrench aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" />
          {setup.name}
        </Link>
      ))}
    </div>
  );
}
