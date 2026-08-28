"use client";

import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  isOpen: boolean;
  onToggle: () => void;
  children: ReactNode;
}

export default function CollapsibleSection({
  title,
  isOpen,
  onToggle,
  children,
}: CollapsibleSectionProps) {
  const panelId = `resume-${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;

  return (
    <div className="flex w-full max-w-xl flex-col items-start gap-1">
      <button
        type="button"
        className="group flex min-h-10 w-full items-center justify-between gap-4 rounded-sm py-1 text-left transition-colors hover:text-orange-700"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        <span>{title}</span>
        <ChevronDown
          aria-hidden="true"
          className={`h-4 w-4 shrink-0 text-neutral-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div
        id={panelId}
        aria-hidden={!isOpen}
        className={`grid w-full transition-[grid-template-rows,opacity] duration-300 ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className={`${isOpen ? "visible" : "invisible"} pb-3 pr-6 text-sm font-light leading-6 font-inconsolata`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
