import { generateMetadata } from "../../lib/seo";

export const metadata = generateMetadata({
  title: "Music & Audio Exploration",
  description:
    "Discover my musical journey and audio explorations. From favorite tracks to music production insights and audio technology discussions.",
  url: "/music",
  type: "website",
  tags: [
    "music",
    "audio",
    "playlist",
    "music production",
    "sound",
    "technology",
  ],
});

export default function MusicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
