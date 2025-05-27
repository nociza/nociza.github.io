import Link from "next/link";
import { musicData, MusicItem } from "../data/personal-data";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

interface MusicCardProps {
  music: MusicItem;
}

function MusicCard({ music }: MusicCardProps) {
  const typeEmojis = {
    album: "💿",
    song: "🎵",
    playlist: "📻",
  };

  const typeColors = {
    album: "bg-purple-100 text-purple-800",
    song: "bg-pink-100 text-pink-800",
    playlist: "bg-indigo-100 text-indigo-800",
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 bg-white">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 font-inconsolata">
          {music.title}
        </h3>
        <span className="text-sm text-gray-500 font-inconsolata">
          {music.type}
        </span>
      </div>
      <p className="text-gray-600 font-semibold font-inconsolata">
        {music.artist}
      </p>
    </div>
  );
}

export default function MusicSection() {
  return (
    <section className="min-h-screen flex items-center justify-center page-container">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
            Music Rotation
          </h1>
          <p className="text-xl text-gray-600 mb-6 font-inconsolata">
            Current soundtrack to my coding sessions and daily life
          </p>
          <Link
            href="/music"
            className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-semibold transition-colors duration-200 border-b border-orange-500 hover:border-orange-600"
          >
            View Full Music Archive
            <ArrowRightIcon className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicData.map((music, index) => (
            <MusicCard key={index} music={music} />
          ))}
        </div>
      </div>
    </section>
  );
}
