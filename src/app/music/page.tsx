"use client";

import Link from "next/link";
import SearchableIndex from "../../components/searchable-index";
import { allMusicData, MusicItem } from "../../data/personal-data";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";

function MusicCard({ music, index }: { music: MusicItem; index: number }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
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
      {music.link && (
        <div className="mt-3">
          <a
            href={music.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-orange-500 hover:text-orange-600 text-sm font-medium border-b border-orange-500 hover:border-orange-600"
          >
            Listen →
          </a>
        </div>
      )}
    </div>
  );
}

export default function MusicIndexPage() {
  return (
    <div className="relative">
      {/* Back Button */}
      <Link
        href="/me"
        className="fixed top-8 left-8 z-50 p-2 bg-white border border-gray-200 rounded-full hover:border-orange-500 transition-colors duration-200"
      >
        <ArrowLeftIcon className="w-5 h-5 text-gray-600 hover:text-orange-500" />
      </Link>

      <SearchableIndex
        title="Music Archive"
        items={allMusicData}
        searchFields={["title", "artist"]}
        placeholder="Search by song/album title or artist..."
        renderItem={(music, index) => (
          <MusicCard key={index} music={music} index={index} />
        )}
      />
    </div>
  );
}
