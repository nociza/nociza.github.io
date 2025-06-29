import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Coffee Discovery Archive",
  description:
    "Explore my personal coffee journey and discoveries. Reviews, tasting notes, and insights from specialty coffee shops and roasters around the world.",
  url: "/coffee",
  type: "website",
  tags: [
    "coffee",
    "specialty coffee",
    "tasting notes",
    "coffee reviews",
    "pour over",
    "americano",
    "coffee blog",
  ],
});

export default function CoffeeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
