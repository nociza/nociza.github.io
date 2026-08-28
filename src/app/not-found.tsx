import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main-content" className="flex min-h-screen items-center bg-[#f4f4f1] px-5 py-16 text-neutral-950 sm:px-8">
      <div className="mx-auto w-full max-w-3xl border-y border-black/10 py-14 sm:py-20">
        <p className="text-sm text-neutral-500">404 · Off the map</p>
        <h1 className="mt-5 font-serif text-5xl font-medium leading-none tracking-[-0.04em] sm:text-7xl">Nothing lives here.</h1>
        <p className="mt-6 max-w-xl text-sm leading-7 text-neutral-600">The page may have moved, or the path may simply be taking the scenic route.</p>
        <Link href="/me" className="mt-8 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-neutral-900 transition hover:text-orange-800">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" /> Return home
        </Link>
      </div>
    </main>
  );
}
