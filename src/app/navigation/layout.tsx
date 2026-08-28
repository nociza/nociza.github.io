import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Site Index",
  description: "A map of the public pages on nociza.com.",
  url: "/navigation",
  type: "website",
});

export default function NavigationLayout({ children }: { children: React.ReactNode }) {
  return children;
}
