import { generateMetadata } from "@/lib/seo";

export const metadata = generateMetadata({
  title: "Computer Vision Projects",
  description: "Computer vision project reports from UC Berkeley CS 194/294-26.",
  url: "/compvision",
  type: "website",
  tags: ["computer vision", "image processing", "Berkeley", "project reports"],
});

export default function ComputerVisionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
