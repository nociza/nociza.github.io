import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default function PrefacePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[#f4f4f1] text-neutral-950">
      <div className="mx-auto max-w-5xl px-5 pb-16 pt-5 sm:px-8 sm:pb-24 sm:pt-7">
        <nav className="flex items-center justify-between border-b border-black/10 pb-5 text-sm text-neutral-600">
          <Link href="/book" className="inline-flex min-h-10 items-center gap-2 transition hover:text-neutral-950">
            <ArrowLeft aria-hidden="true" className="h-4 w-4" /> The Book of Me
          </Link>
          <Link href="/navigation" className="-mr-2 inline-flex min-h-10 items-center px-2 transition hover:text-neutral-950">Index</Link>
        </nav>

        <article className="grid gap-10 py-14 sm:py-20 lg:grid-cols-[13rem_minmax(0,1fr)] lg:gap-16">
          <header>
            <p className="text-sm text-neutral-500">Before the rest</p>
            <h1 className="mt-3 font-serif text-5xl font-medium tracking-[-0.04em]">Preface.</h1>
          </header>

          <div className="max-w-2xl space-y-7 font-serif text-lg leading-8 text-neutral-700 sm:text-xl sm:leading-9">
            <p>
              Congratulations—you found the preface. The website is not a hoax after all. If you are an impatient reader, or simply need a direct overview of my experience, the{" "}
              <Link href="/me" className="text-neutral-950 underline decoration-black/20 underline-offset-4 transition hover:decoration-black/60">summary</Link>{" "}
              will suit you better.
            </p>
            <p>
              Finishing this personal website lived for years on lists scattered across productivity tools, each declaring itself essential and each offering a student plan too alluring to ignore.
            </p>
            <p>
              Otherwise, we can indulge in the deeper question of how a{" "}
              <Link href="/my-gf" className="text-orange-800 underline decoration-orange-800/20 underline-offset-4 transition hover:decoration-orange-800/60">carol</Link>
              ogy changes our perspective of the world.
            </p>
          </div>
        </article>

        <footer className="flex justify-end border-t border-black/10 pt-6">
          <Link href="/navigation" className="inline-flex min-h-10 items-center gap-2 text-sm text-neutral-600 transition hover:text-neutral-950">
            Continue to the index <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </footer>
      </div>
    </main>
  );
}
