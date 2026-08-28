import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Preface",
  description: "A preface to Yueheng Zhang's personal website.",
  url: "/preface",
  type: "article",
});

export default function PrefaceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
