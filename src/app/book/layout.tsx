import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "The Book of Me",
  description: "The older, more playful entrance to Yueheng Zhang's personal website.",
  url: "/book",
  type: "website",
});

export default function BookLayout({ children }: { children: React.ReactNode }) {
  return children;
}
