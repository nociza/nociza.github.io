import Link from "next/link";
import articles from "../../../public/data/articles.json";
import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({ title: "Writing", description: "Notes and essays, collected over time.", url: "/writing", type: "website" });

type Article = { format: string; slug: string; title: string; body: string };

function ArticleBody({ body }: { body: string }) {
  // Deliberately no HTML/MDX execution. A small readable Markdown subset is enough
  // for portable essays; source text always passes through React's escaping.
  return <div className="space-y-6 text-base leading-8 text-neutral-700">{body.split(/\n\s*\n/).map((block, i) => {
    if (block.startsWith("```")) return <pre key={i} className="overflow-x-auto rounded-lg bg-neutral-900 p-5 text-sm text-neutral-100"><code>{block.replace(/^```[^\n]*\n?/, "").replace(/\n?```$/, "")}</code></pre>;
    if (/^#{1,3} /.test(block)) return <h3 key={i} className="pt-4 font-serif text-2xl text-neutral-950">{block.replace(/^#{1,3} /, "")}</h3>;
    if (block.startsWith("> ")) return <blockquote key={i} className="border-l-2 border-neutral-300 pl-5 italic">{block.replace(/^> /gm, "")}</blockquote>;
    if (block.split("\n").every(line => /^[-*] /.test(line))) return <ul key={i} className="list-disc space-y-2 pl-6">{block.split("\n").map((line, j) => <li key={j}>{line.slice(2)}</li>)}</ul>;
    return <p key={i} className="whitespace-pre-wrap break-words">{block}</p>;
  })}</div>;
}

export default function WritingPage() {
  const rows = articles as Article[];
  return <main className="min-h-screen bg-[#f4f4f1] text-neutral-950"><div className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8">
    <Link href="/me" className="text-sm text-neutral-500 hover:text-neutral-950">← nociza.com</Link>
    <header className="border-b border-black/10 py-16"><p className="mb-4 text-sm text-neutral-500">Notes and essays</p><h1 className="font-serif text-5xl tracking-tight">Writing.</h1><p className="mt-5 max-w-lg leading-7 text-neutral-600">Ideas worth returning to, shaped into something worth sharing.</p></header>
    {rows.length ? <><nav aria-label="Articles" className="space-y-3 border-b border-black/10 py-8">{rows.map(row => <Link className="block font-serif text-xl hover:underline" href={`#${row.slug}`} key={row.slug}>{row.title} ↗</Link>)}</nav>{rows.map(row => <article id={row.slug} key={row.slug} className="scroll-mt-24 border-b border-black/10 py-14"><h2 className="mb-8 font-serif text-3xl tracking-tight">{row.title}</h2><ArticleBody body={row.body} /></article>)}</> : <p className="py-14 text-neutral-500">Nothing published here yet.</p>}
  </div></main>;
}
