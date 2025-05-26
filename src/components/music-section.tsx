import { musicData, MusicItem } from "../data/personal-data";

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
    <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-lg font-bold text-gray-800 font-inconsolata">
          {music.title}
        </h3>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            typeColors[music.type]
          }`}
        >
          {typeEmojis[music.type]} {music.type}
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
        <h1 className="text-6xl font-bold text-gray-800 mb-4 font-serif">
          Music Rotation
        </h1>
        <p className="text-xl text-gray-600 mb-12 font-inconsolata">
          Current soundtrack to my coding sessions and daily life
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {musicData.map((music, index) => (
            <MusicCard key={index} music={music} />
          ))}
        </div>
      </div>
    </section>
  );
}
