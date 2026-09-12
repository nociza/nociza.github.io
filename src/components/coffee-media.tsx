import { Coffee } from "lucide-react";
import { sipEntries } from "@/data/sip-data";
import SipMedia from "./sip-media";

// Legacy Notion IDs were retained during the Siplogue migration. Reuse its
// locally saved media so the archive and journal cannot drift into two copies.
export default function CoffeeMedia({
  coffeeId,
  eager = false,
}: {
  coffeeId: string;
  eager?: boolean;
}) {
  const entry = sipEntries.find((sip) => sip.kind === "coffee" && sip.id === coffeeId);

  if (entry) {
    return <SipMedia entry={entry} eager={eager} className="!object-contain" />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-[#e8e8e3] p-6 text-neutral-600">
      <Coffee aria-hidden="true" className="h-8 w-8 stroke-[1.4]" />
      <p className="text-xs">Original photograph unavailable</p>
    </div>
  );
}
