"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getEmbedUrl, SERVERS } from "@/lib/embed";
import { IMG_BASE } from "@/lib/tmdb";
import { formatDate } from "@/lib/utils";
import Badge from "@/components/ui/Badge";

export default function WatchClient({
  detail,
  type,
  id,
  season: initSeason,
  episode: initEpisode,
  seasonData: initSeasonData,
}) {
  const router = useRouter();
  const title = detail?.name || detail?.title || "";
  const genres = detail?.genres || [];

  const [activeServer, setActiveServer] = useState("VidSrc");
  const [currentSeason, setCurrentSeason] = useState(initSeason);
  const [currentEpisode, setCurrentEpisode] = useState(initEpisode);
  const [seasonData, setSeasonData] = useState(initSeasonData);
  const [loadingEps, setLoadingEps] = useState(false);
  const [showToast, setShowToast] = useState(true);
  const [mobileEpsOpen, setMobileEpsOpen] = useState(false);

  const embedUrl = getEmbedUrl(type, id, activeServer, currentSeason, currentEpisode);

  const episodes = seasonData?.episodes || [];
  const currentEpData = episodes.find(
    (ep) => ep.episode_number === currentEpisode
  );
  const totalSeasons = detail?.number_of_seasons || 1;

  // Toast auto-dismiss
  useEffect(() => {
    if (showToast) {
      const t = setTimeout(() => setShowToast(false), 5000);
      return () => clearTimeout(t);
    }
  }, [showToast]);

  // Keyboard shortcuts
  useEffect(() => {
    function onKey(e) {
      if (e.key === "ArrowLeft") prevEpisode();
      if (e.key === "ArrowRight") nextEpisode();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  const switchEpisode = useCallback(
    (s, e) => {
      setCurrentSeason(s);
      setCurrentEpisode(e);
      router.replace(`/watch/${type}/${id}?season=${s}&episode=${e}`, {
        scroll: false,
      });
    },
    [router, type, id]
  );

  function prevEpisode() {
    if (currentEpisode > 1) switchEpisode(currentSeason, currentEpisode - 1);
  }
  function nextEpisode() {
    if (currentEpisode < episodes.length)
      switchEpisode(currentSeason, currentEpisode + 1);
  }

  async function changeSeason(num) {
    setLoadingEps(true);
    try {
      const res = await fetch(`/api/tmdb/tv/${id}/season/${num}`);
      const data = await res.json();
      setSeasonData(data);
      setCurrentSeason(num);
      setCurrentEpisode(1);
      router.replace(`/watch/${type}/${id}?season=${num}&episode=1`, {
        scroll: false,
      });
    } catch {}
    setLoadingEps(false);
  }

  return (
    <div className="px-4 md:px-8 lg:px-12 py-4">
      {/* Toast */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-[#1c1c1c] border border-[#333] text-sm text-[#b3b3b3] px-4 py-3 rounded-lg shadow-xl max-w-xs animate-fadeInUp">
          💡 Jika video tidak muncul, coba ganti server di bawah player
          <button
            onClick={() => setShowToast(false)}
            className="ml-3 text-[#666] hover:text-white"
          >
            ✕
          </button>
        </div>
      )}

      <div className="flex gap-4">
        {/* Left — Player */}
        <div className="flex-1 min-w-0">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#b3b3b3] mb-2 flex-wrap">
            <Link href="/" className="hover:text-white">Roxy Drakor</Link>
            <span className="text-[#444]">›</span>
            <Link href={`/detail/${type}/${id}`} className="hover:text-white truncate max-w-[200px]">
              {title}
            </Link>
            {type === "tv" && (
              <>
                <span className="text-[#444]">›</span>
                <span className="text-white">
                  S{currentSeason} Ep{currentEpisode}
                </span>
              </>
            )}
          </div>

          {/* Episode title + nav */}
          <div className="flex items-center justify-between mb-3">
            <h1 className="text-lg md:text-xl font-bold truncate font-[family-name:var(--font-display)]">
              {type === "tv"
                ? `Episode ${currentEpisode}${
                    currentEpData?.name ? ` — ${currentEpData.name}` : ""
                  }`
                : title}
            </h1>
            {type === "tv" && (
              <div className="flex gap-2 shrink-0 ml-3">
                <button
                  onClick={prevEpisode}
                  disabled={currentEpisode <= 1}
                  className="px-3 py-1.5 text-xs border border-[#444] rounded hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  ← Prev
                </button>
                <button
                  onClick={nextEpisode}
                  disabled={currentEpisode >= episodes.length}
                  className="px-3 py-1.5 text-xs border border-[#444] rounded hover:border-white disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Next →
                </button>
              </div>
            )}
          </div>

          {/* Player */}
          <div className="relative w-full bg-black rounded-lg overflow-hidden" style={{ paddingTop: "56.25%" }}>
            <iframe
              key={embedUrl}
              src={embedUrl}
              className="absolute top-0 left-0 w-full h-full border-0"
              allowFullScreen
              allow="autoplay; encrypted-media"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Server selector */}
          <div className="flex items-center gap-2 mt-4 flex-wrap">
            <span className="text-sm text-[#b3b3b3] mr-1">Pilih Server:</span>
            {Object.keys(SERVERS[type] || {}).map((server) => (
              <button
                key={server}
                onClick={() => setActiveServer(server)}
                className={`px-4 py-2 rounded text-sm transition-colors ${
                  activeServer === server
                    ? "border border-[#e50914] text-[#e50914] bg-[#e50914]/10"
                    : "border border-[#444] text-[#b3b3b3] hover:border-white hover:text-white"
                }`}
              >
                {server} {activeServer === server && "(Aktif)"}
              </button>
            ))}
          </div>

          {/* Info below player */}
          <div className="mt-6 bg-[#141414] rounded-lg p-4">
            <h2 className="font-bold text-white">{title}</h2>
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {genres.slice(0, 3).map((g) => (
                <Badge key={g.id} variant="genre">{g.name}</Badge>
              ))}
              {detail?.vote_average && (
                <span className="text-[#f5a623] text-sm">
                  ⭐ {detail.vote_average.toFixed(1)}
                </span>
              )}
            </div>
            <p className="text-sm text-[#b3b3b3] mt-3 line-clamp-3">
              {detail?.overview || "Sinopsis belum tersedia."}
            </p>
          </div>

          {/* Mobile episode toggle */}
          {type === "tv" && (
            <button
              onClick={() => setMobileEpsOpen(!mobileEpsOpen)}
              className="md:hidden w-full mt-4 bg-[#1c1c1c] text-white py-3 rounded-lg text-sm font-medium"
            >
              {mobileEpsOpen ? "Tutup Daftar Episode ▲" : "Daftar Episode ▼"}
            </button>
          )}

          {/* Mobile episode list */}
          {type === "tv" && mobileEpsOpen && (
            <div className="md:hidden mt-2 bg-[#141414] rounded-lg max-h-80 overflow-y-auto">
              {episodes.map((ep) => (
                <button
                  key={ep.episode_number}
                  onClick={() => {
                    switchEpisode(currentSeason, ep.episode_number);
                    setMobileEpsOpen(false);
                  }}
                  className={`flex items-center gap-3 w-full px-4 py-3 text-left text-sm hover:bg-[#1c1c1c] ${
                    ep.episode_number === currentEpisode
                      ? "border-l-2 border-[#e50914] bg-[#1c1c1c]"
                      : ""
                  }`}
                >
                  <span className="text-[#666] shrink-0 w-8">
                    Ep {ep.episode_number}
                  </span>
                  <span className="truncate text-white">
                    {ep.name || `Episode ${ep.episode_number}`}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Disclaimer */}
          <p className="text-xs text-[#444] text-center mt-8 pb-4">
            Roxy Drakor tidak menyimpan atau menghost konten video apapun. Video
            disediakan oleh penyedia layanan pihak ketiga.
          </p>
        </div>

        {/* Right — Episode Sidebar (desktop) */}
        {type === "tv" && (
          <aside className="hidden md:block w-72 shrink-0">
            <div className="sticky top-20 bg-[#141414] rounded-lg overflow-hidden">
              <div className="p-3 border-b border-[#1c1c1c] flex items-center justify-between">
                <h3 className="text-sm font-bold">Daftar Episode</h3>
                {totalSeasons > 1 && (
                  <select
                    value={currentSeason}
                    onChange={(e) => changeSeason(Number(e.target.value))}
                    className="bg-[#252525] border border-[#333] rounded px-2 py-1 text-xs text-white outline-none"
                  >
                    {Array.from({ length: totalSeasons }, (_, i) => i + 1).map(
                      (s) => (
                        <option key={s} value={s}>
                          Season {s}
                        </option>
                      )
                    )}
                  </select>
                )}
              </div>

              <div className="max-h-[600px] overflow-y-auto">
                {loadingEps ? (
                  <div className="p-3 space-y-2">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div key={i} className="skeleton h-14 rounded" />
                    ))}
                  </div>
                ) : (
                  episodes.map((ep) => (
                    <button
                      key={ep.episode_number}
                      onClick={() =>
                        switchEpisode(currentSeason, ep.episode_number)
                      }
                      className={`flex items-center gap-3 w-full px-3 py-2.5 text-left hover:bg-[#1c1c1c] transition-colors ${
                        ep.episode_number === currentEpisode
                          ? "border-l-2 border-[#e50914] bg-[#1c1c1c]"
                          : ""
                      }`}
                    >
                      <div className="w-20 h-12 bg-[#1c1c1c] rounded overflow-hidden shrink-0 relative">
                        {ep.still_path ? (
                          <Image
                            src={`${IMG_BASE}/w185${ep.still_path}`}
                            alt={`Ep ${ep.episode_number}`}
                            fill
                            className="object-cover"
                            sizes="80px"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#444] text-[10px]">
                            Ep {ep.episode_number}
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-medium text-white truncate">
                          Ep {ep.episode_number} —{" "}
                          {ep.name || `Episode ${ep.episode_number}`}
                        </p>
                        <p className="text-[10px] text-[#666] mt-0.5">
                          {formatDate(ep.air_date)}
                        </p>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </aside>
        )}
      </div>
    </div>
  );
}
