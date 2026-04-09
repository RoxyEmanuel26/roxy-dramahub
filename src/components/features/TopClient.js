"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMG_BASE } from "@/lib/tmdb";
import { getYear } from "@/lib/utils";

export default function TopClient({
  initialTV,
  initialMovie,
  totalPagesTV,
  totalPagesMovie,
}) {
  const [activeTab, setActiveTab] = useState("tv");
  const [tvItems, setTvItems] = useState(initialTV);
  const [movieItems, setMovieItems] = useState(initialMovie);
  const [tvPage, setTvPage] = useState(1);
  const [moviePage, setMoviePage] = useState(1);
  const [loading, setLoading] = useState(false);

  const items = activeTab === "tv" ? tvItems : movieItems;
  const currentPage = activeTab === "tv" ? tvPage : moviePage;
  const totalPages =
    activeTab === "tv" ? totalPagesTV : totalPagesMovie;

  async function loadMore() {
    const nextPage = currentPage + 1;
    setLoading(true);
    try {
      const type = activeTab === "tv" ? "discover/tv" : "discover/movie";
      const res = await fetch(
        `/api/tmdb/${type}?with_origin_country=KR&sort_by=vote_average.desc&vote_count.gte=300&page=${nextPage}`
      );
      const data = await res.json();
      if (activeTab === "tv") {
        setTvItems((prev) => [...prev, ...(data.results || [])]);
        setTvPage(nextPage);
      } else {
        setMovieItems((prev) => [...prev, ...(data.results || [])]);
        setMoviePage(nextPage);
      }
    } catch {}
    setLoading(false);
  }

  function getRankStyle(rank) {
    if (rank <= 3)
      return "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black";
    if (rank <= 10) return "bg-gradient-to-br from-gray-300 to-gray-500 text-black";
    return "bg-[#333] text-white";
  }

  return (
    <div className="px-4 md:px-8 lg:px-16">
      {/* Hero */}
      <div className="relative h-36 -mx-4 md:-mx-8 lg:-mx-16 mb-8 bg-gradient-to-r from-[#e50914]/20 to-transparent flex items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)]">
          🏆 Top Drama & Movie Korea
        </h1>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-2 mb-8">
        <button
          onClick={() => setActiveTab("tv")}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "tv"
              ? "bg-[#e50914] text-white"
              : "bg-[#1c1c1c] text-[#b3b3b3] hover:text-white"
          }`}
        >
          Top TV Drama
        </button>
        <button
          onClick={() => setActiveTab("movie")}
          className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            activeTab === "movie"
              ? "bg-[#e50914] text-white"
              : "bg-[#1c1c1c] text-[#b3b3b3] hover:text-white"
          }`}
        >
          Top Movie
        </button>
      </div>

      {/* Ranked list */}
      <div className="max-w-4xl mx-auto space-y-2">
        {items.map((item, i) => {
          const rank = i + 1;
          const title = item.name || item.title;
          const date = item.first_air_date || item.release_date;
          const poster = item.poster_path
            ? `${IMG_BASE}/w92${item.poster_path}`
            : null;
          const rating = item.vote_average?.toFixed(1) || "—";
          const ratingPct = (item.vote_average || 0) * 10;

          return (
            <Link
              key={item.id}
              href={`/detail/${activeTab}/${item.id}`}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-[#1c1c1c] transition-colors group"
            >
              {/* Rank */}
              <span
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-bold shrink-0 ${getRankStyle(rank)}`}
              >
                {rank}
              </span>

              {/* Poster */}
              <div className="w-[50px] h-[75px] bg-[#1c1c1c] rounded overflow-hidden shrink-0 relative">
                {poster ? (
                  <Image
                    src={poster}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="50px"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#444] text-[8px]">
                    {title}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="font-medium text-white group-hover:text-[#e50914] transition-colors truncate">
                  {title}
                </p>
                <p className="text-xs text-[#666] mt-0.5">
                  {getYear(date)}
                  {item.vote_count &&
                    ` • ${item.vote_count.toLocaleString("id-ID")} votes`}
                </p>
              </div>

              {/* Rating bar */}
              <div className="hidden sm:flex items-center gap-3 shrink-0">
                <div className="w-24 bg-[#1c1c1c] rounded-full h-2 overflow-hidden">
                  <div
                    style={{ width: `${ratingPct}%` }}
                    className="h-2 bg-gradient-to-r from-[#e50914] to-[#f5a623] rounded-full"
                  />
                </div>
                <span className="text-xl font-bold text-[#f5a623] w-10 text-right">
                  {rating}
                </span>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Load more */}
      {currentPage < totalPages && (
        <div className="flex justify-center mt-8 pb-8">
          <button
            onClick={loadMore}
            disabled={loading}
            className="border border-[#444] hover:border-white text-white px-8 py-3 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
          >
            {loading ? "Memuat..." : "Muat 20 Lagi ↓"}
          </button>
        </div>
      )}
    </div>
  );
}
