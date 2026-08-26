import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Siplogue — Tea & Coffee Journal",
  description: "A personal field journal of tea, coffee, brewing experiments, and the cups worth remembering.",
  url: "/sips",
  type: "website",
  tags: ["tea", "coffee", "tasting notes", "brewing", "siplogue"],
});

export default function SipsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
