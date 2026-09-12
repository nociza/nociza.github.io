import { Metadata } from "next";
import Link from "next/link";
import { generateMetadata } from "../lib/seo";

export const metadata: Metadata = generateMetadata({
  title: undefined, // Use default title
  description: undefined, // Use default description
  url: "/",
  type: "website",
});

export default function IndexPage() {
  // GitHub Pages serves static files, not Next's server redirect responses.
  // Native refresh plus a visible link also works before JavaScript loads.
  return <>
    <meta httpEquiv="refresh" content="0;url=/me/" />
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="font-serif text-4xl">Yueheng [Alex] Zhang</h1>
      <p className="mt-6 text-base"><Link href="/me" className="underline underline-offset-4">Continue to my website</Link></p>
    </main>
  </>;
}
