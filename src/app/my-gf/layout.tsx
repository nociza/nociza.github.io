import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Brain with Water",
  description: "A small visual footnote from the Book of Me.",
  url: "/my-gf",
  type: "website",
});

export default function BrainWithWaterLayout({ children }: { children: React.ReactNode }) {
  return children;
}
