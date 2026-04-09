"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IMG_BASE } from "@/lib/tmdb";
import { formatDate } from "@/lib/utils";

export default function DetailTabs({
  type,
  id,
  detail,
  credits,
  videos,
  season1,
}) {
  const [activeTab, setActiveTab] = useState("info");
  const [seasonData, setSeasonData] = useState(season1);
  const [selectedSeason, setSelectedSeason] = useState(1);
  const [loadingSeason, setLoadingSeason] = useState(false);

  const tabs = [
    { key: "info", label: "Info" },
    ...(type === "tv" ? [{ key: "episode", label: "Episode" }] : []),
    { key: "cast", label: "Cast" },
    { key: "trailer", label: "Trailer" },
  ];

  async function changeSeason(num) {
    setSelectedSeason(num);
    setLoadingSeason(true);
    try {
      const res = await fetch(`/api/tmdb/tv/${id}/season/${num}`);
      const data = await res.json();
      setSeasonData(data);
    } catch {}
    setLoadingSeason(false);
  }

  const trailers = (videos?.results || []).filter(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );
  const cast = (credits?.cast || []).slice(0, 12);

  return (
    <div className="py-4">
      {/* Tab nav */}
      <div className="flex gap-4 border-b border-[#1e1e1e] mb-6 sticky top-14 bg-[#0a0a0a]/95 backdrop-blur-sm z-20 pt-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-2 py-3 text-sm font-semibold border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-[#dc2626] text-white"
                : "border-transparent text-[#999] hover:text-white"
            }`}
          >
            {tab.label.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Info tab */}
      {activeTab === "info" && (
        <div className="fade-in max-w-3xl">
          <div className="bg-[#111111] rounded-xl p-6 border border-[#1e1e1e]">
            <h3 className="section-title mb-4 bg-transparent border-0 padding-0 !text-lg !pl-0">Informasi Lengkap</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-[#666]">Judul Asli</span>
                <p className="text-white">
                  {detail.original_name || detail.original_title}
                </p>
              </div>
              <div>
                <span className="text-[#666]">Status</span>
                <p className="text-white">{detail.status}</p>
              </div>
              <div>
                <span className="text-[#666]">Skor TMDB</span>
                <p className="text-[#f5a623] font-bold text-xl">
                  {detail.vote_average?.toFixed(1)} / 10
                </p>
              </div>
              <div>
                <span className="text-[#666]">Popularitas</span>
                <p className="text-white">
                  {detail.popularity?.toFixed(0)}
                </p>
              </div>
              {detail.production_companies?.length > 0 && (
                <div>
                  <span className="text-[#666]">Studio</span>
                  <p className="text-white">
                    {detail.production_companies
                      .map((c) => c.name)
                      .join(", ")}
                  </p>
                </div>
              )}
              {detail.homepage && (
                <div>
                  <span className="text-[#666]">Website</span>
                  <a
                    href={detail.homepage}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#e50914] hover:underline block truncate"
                  >
                    {detail.homepage}
                  </a>
                </div>
              )}
            </div>
            {detail.overview && (
              <div className="mt-6">
                <span className="text-[#666] text-sm">Sinopsis Lengkap</span>
                <p className="text-[#b3b3b3] text-sm mt-1 leading-relaxed">
                  {detail.overview}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Episode tab */}
      {activeTab === "episode" && type === "tv" && (
        <div className="fade-in">
          {/* Season selector */}
          {detail.seasons?.length > 0 && (
            <select
              value={selectedSeason}
              onChange={(e) => changeSeason(Number(e.target.value))}
              className="bg-[#111111] border border-[#1e1e1e] rounded-lg px-3 py-2 text-sm text-white mb-4 outline-none focus:border-[#dc2626] transition-colors"
            >
              {detail.seasons
                .filter((s) => s.season_number > 0)
                .map((s) => (
                  <option key={s.season_number} value={s.season_number}>
                    Season {s.season_number} ({s.episode_count} ep)
                  </option>
                ))}
            </select>
          )}

          {loadingSeason ? (
            <div className="space-y-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="skeleton h-20 rounded-lg" />
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {(seasonData?.episodes || []).map((ep) => (
                <Link
                  key={ep.episode_number}
                  href={`/watch/tv/${id}?season=${selectedSeason}&episode=${ep.episode_number}`}
                  className="flex items-center gap-4 p-3 rounded-xl bg-[#111111] border border-[#1e1e1e] hover:bg-[#161616] hover:border-[#dc2626]/50 transition-all group"
                >
                  <div className="w-28 h-16 bg-[#161616] rounded-lg overflow-hidden shrink-0 relative">
                    {ep.still_path ? (
                      <Image
                        src={`${IMG_BASE}/w185${ep.still_path}`}
                        alt={ep.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                        sizes="112px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-[#444] text-xs">
                        Ep {ep.episode_number}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-white text-lg">▶</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">
                      Ep {ep.episode_number} — {ep.name || `Episode ${ep.episode_number}`}
                    </p>
                    <p className="text-xs text-[#666] mt-0.5">
                      {formatDate(ep.air_date)}
                      {ep.vote_average > 0 && ` • ⭐ ${ep.vote_average.toFixed(1)}`}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Cast tab */}
      {activeTab === "cast" && (
        <div className="fade-in grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {cast.map((person) => (
            <div key={person.id} className="text-center group">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-[#111111] border border-[#1e1e1e] group-hover:border-[#dc2626] transition-colors relative mb-3">
                {person.profile_path ? (
                  <Image
                    src={`${IMG_BASE}/w185${person.profile_path}`}
                    alt={person.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                    sizes="96px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#444] text-2xl">
                    👤
                  </div>
                )}
              </div>
              <p className="text-sm font-medium mt-2 text-white truncate">
                {person.name}
              </p>
              <p className="text-xs text-[#666] truncate">
                {person.character}
              </p>
            </div>
          ))}

          {cast.length === 0 && (
            <p className="text-[#666] col-span-full text-center py-8">
              Data cast belum tersedia.
            </p>
          )}
        </div>
      )}

      {/* Trailer tab */}
      {activeTab === "trailer" && (
        <div className="fade-in grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {trailers.map((v) => (
            <a
              key={v.key}
              href={`https://www.youtube.com/watch?v=${v.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-video bg-[#111111] rounded-xl overflow-hidden border border-[#1e1e1e]"
            >
              <Image
                src={`https://img.youtube.com/vi/${v.key}/mqdefault.jpg`}
                alt={v.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors flex items-center justify-center">
                <div className="w-14 h-14 bg-[#dc2626] rounded-full flex items-center justify-center scale-90 group-hover:scale-100 shadow-lg transition-transform">
                  <span className="text-white text-xl ml-1">▶</span>
                </div>
              </div>
              <p className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-xs text-white truncate">
                {v.name}
              </p>
            </a>
          ))}

          {trailers.length === 0 && (
            <p className="text-[#666] col-span-full text-center py-8">
              Trailer belum tersedia.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
