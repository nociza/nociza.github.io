import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Reading List & Book Reviews",
  description:
    "Discover my curated reading list and book reviews. Explore recommendations spanning technology, philosophy, fiction, and personal development.",
  url: "/books",
  type: "website",
  tags: [
    "books",
    "reading list",
    "book reviews",
    "recommendations",
    "literature",
    "reading",
  ],
});

export default function BooksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
