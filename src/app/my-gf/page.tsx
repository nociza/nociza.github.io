import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function MyGFPage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/preface" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Preface
          </Link>
          <Link href="/navigation" className="-mr-2 inline-flex min-h-10 items-center px-2 transition hover:text-neutral-950">Index</Link>
        </nav>

        <header className="py-14 sm:py-20">
          <p className="mb-4 text-sm text-neutral-500">A literal interpretation</p>
          <h1 className="font-serif text-5xl font-medium tracking-[-0.04em] sm:text-6xl">Brain with water.</h1>
        </header>

        <figure>
          <div className="overflow-hidden rounded-[1.75rem] border border-black/10 bg-white">
            <Image src="/brainwater.jpeg" alt="A brain represented with water" width={800} height={600} priority className="h-auto w-full object-cover" />
          </div>
          <figcaption className="mt-4 text-xs leading-5 text-neutral-500">The punchline at the end of a very long “carol-ogy” joke.</figcaption>
        </figure>
      </div>
    </main>
  );
}
