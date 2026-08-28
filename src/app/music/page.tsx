"use client";

import Link from "next/link";
import SearchableIndex from "../../components/searchable-index";
import { allMusicData, MusicItem } from "../../data/personal-data";
import { ArrowUpRight, Disc3, ListMusic, Music2 } from "lucide-react";

function MusicCard({ music }: { music: MusicItem }) {
  const Icon = music.type === "album" ? Disc3 : music.type === "playlist" ? ListMusic : Music2;

  return (
    <article className="flex min-h-52 flex-col rounded-2xl border border-black/10 bg-white/65 p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4 text-xs text-neutral-500">
        <span className="inline-flex items-center gap-2 capitalize">
          <Icon aria-hidden="true" className="h-3.5 w-3.5 stroke-[1.5]" /> {music.type}
        </span>
      </div>
      <h2 className="mt-7 font-serif text-2xl font-medium leading-tight tracking-[-0.025em] text-neutral-950">{music.title}</h2>
      <p className="mt-2 text-sm text-neutral-600">{music.artist}</p>
      {music.link ? (
        <Link
          href={music.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex min-h-10 items-end justify-between gap-2 pt-7 text-xs font-medium text-neutral-600 transition hover:text-neutral-950"
        >
          Listen <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      ) : (
        <span className="mt-auto pt-7 text-xs text-neutral-400">Kept for the record</span>
      )}
    </article>
  );
}

export default function MusicIndexPage() {
  return (
    <SearchableIndex
      title="Listening notes."
      eyebrow="Music archive"
      description="Albums, songs, and playlists that stayed in rotation long enough to leave a mark."
      itemLabel="record"
      items={allMusicData}
      searchFields={["title", "artist"]}
      placeholder="Search title or artist…"
      renderItem={(music, index) => <MusicCard key={`${music.title}-${index}`} music={music} />}
    />
  );
}
