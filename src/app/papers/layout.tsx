import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Research Papers & Publications",
  description:
    "Explore my research work and academic publications in computer vision, machine learning, and related fields. Access papers, abstracts, and research insights.",
  url: "/papers",
  type: "website",
  tags: [
    "research",
    "papers",
    "publications",
    "computer vision",
    "machine learning",
    "academic",
    "science",
  ],
});

export default function PapersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
