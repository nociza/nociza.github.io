import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

const projects = [
  ["01", "Colorizing the Prokudin-Gorskii photo collection", "https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj1/cs194-26-acm/"],
  ["02", "Fun with Filters and Frequencies", "https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj2/cs194-26-acm/"],
  ["03", "Face Morphing", "https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj3/cs194-26-acm/"],
  ["04A", "Image Warping and Mosaicing", "https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4A/cs194-26-acm/"],
  ["04B", "Auto-alignment, Image Warping and Mosaicing", "https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj4B/cs194-26-acm/"],
  ["05", "Facial Keypoint Detection with Neural Networks", "https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/proj5/cs194-26-acm/"],
  ["Final", "Augmented Reality & A Neural Algorithm for Artistic Style", "https://inst.eecs.berkeley.edu/~cs194-26/fa22/upload/files/projFinalAssigned/cs194-26-acm/"],
] as const;

export default function ComputerVisionProjectReports() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/me" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> nociza.com
          </Link>
          <Link href="/navigation" className="-mr-2 inline-flex min-h-10 items-center px-2 transition hover:text-neutral-950">Index</Link>
        </nav>

        <header className="grid gap-8 py-14 sm:py-20 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end">
          <div>
            <p className="mb-4 text-sm text-neutral-500">UC Berkeley · Fall 2022</p>
            <h1 className="max-w-3xl font-serif text-4xl font-medium leading-[1.04] tracking-[-0.035em] sm:text-5xl">Computer vision, project by project.</h1>
          </div>
          <p className="text-sm leading-7 text-neutral-600">Reports from CS 194/294-26, from image alignment to neural rendering.</p>
        </header>

        <ol className="border-b border-black/10">
          {projects.map(([number, title, href]) => (
            <li key={number} className="border-t border-black/10">
              <Link href={href} target="_blank" rel="noopener noreferrer" className="group grid min-h-24 grid-cols-[3.5rem_minmax(0,1fr)_auto] items-center gap-3 py-5 sm:grid-cols-[5rem_minmax(0,1fr)_auto] sm:gap-5">
                <span className="text-xs text-neutral-400">{number}</span>
                <span className="font-serif text-xl font-medium leading-snug tracking-[-0.02em] sm:text-2xl">{title}</span>
                <ArrowUpRight aria-hidden="true" className="h-4 w-4 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </main>
  );
}
