import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Siplogue — Tea & Coffee Journal",
  description: "A living rotation of tea and coffee, the brew setups behind each cup, and a dated tasting archive.",
  url: "/sips",
  type: "website",
  tags: ["tea", "coffee", "tasting notes", "brew setups", "brewing", "siplogue"],
});

export default function SipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
