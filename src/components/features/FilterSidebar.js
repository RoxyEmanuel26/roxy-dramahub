"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useCallback } from "react";
import { TV_GENRES, MOVIE_GENRES, NETWORKS, SORT_TV, SORT_MOVIE } from "@/lib/utils";

export default function FilterSidebar({ type = "tv", currentFilters = {} }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const genres = type === "tv" ? TV_GENRES : MOVIE_GENRES;
  const sortOptions = type === "tv" ? SORT_TV : SORT_MOVIE;

  const [selectedGenre, setSelectedGenre] = useState(currentFilters.genre || "");
  const [selectedYear, setSelectedYear] = useState(currentFilters.year || "");
  const [selectedNetwork, setSelectedNetwork] = useState(currentFilters.network || "");
  const [selectedSort, setSelectedSort] = useState(
    currentFilters.sort || sortOptions[0].value
  );
  const [mobileOpen, setMobileOpen] = useState(false);

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedGenre) params.set("genre", selectedGenre);
    if (selectedYear) params.set("year", selectedYear);
    if (selectedNetwork) params.set("network", selectedNetwork);
    if (selectedSort) params.set("sort", selectedSort);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    setMobileOpen(false);
  }, [selectedGenre, selectedYear, selectedNetwork, selectedSort, router, pathname]);

  const resetFilters = useCallback(() => {
    setSelectedGenre("");
    setSelectedYear("");
    setSelectedNetwork("");
    setSelectedSort(sortOptions[0].value);
    router.push(pathname);
    setMobileOpen(false);
  }, [router, pathname, sortOptions]);

  const years = [];
  for (let y = 2026; y >= 2010; y--) years.push(y);

  const filterContent = (
    <div className="space-y-6">
      {/* Genre */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Genre
        </h3>
        <div className="space-y-2">
          {genres.map((g) => (
            <label
              key={g.id}
              className="flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-white cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedGenre.split(",").includes(String(g.id))}
                onChange={(e) => {
                  const current = selectedGenre
                    ? selectedGenre.split(",")
                    : [];
                  if (e.target.checked) {
                    setSelectedGenre([...current, String(g.id)].join(","));
                  } else {
                    setSelectedGenre(
                      current.filter((id) => id !== String(g.id)).join(",")
                    );
                  }
                }}
                className="rounded accent-[#e50914]"
              />
              {g.name}
            </label>
          ))}
        </div>
      </div>

      {/* Year */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Tahun Rilis
        </h3>
        <select
          value={selectedYear}
          onChange={(e) => setSelectedYear(e.target.value)}
          className="w-full bg-[#252525] border border-[#333] rounded px-3 py-2 text-sm text-white outline-none focus:border-[#e50914]"
        >
          <option value="">Semua Tahun</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      </div>

      {/* Network (TV only) */}
      {type === "tv" && (
        <div>
          <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
            Network
          </h3>
          <div className="space-y-2">
            {NETWORKS.map((n) => (
              <label
                key={n.id}
                className="flex items-center gap-2 text-sm text-[#b3b3b3] hover:text-white cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={selectedNetwork.split(",").includes(String(n.id))}
                  onChange={(e) => {
                    const current = selectedNetwork
                      ? selectedNetwork.split(",")
                      : [];
                    if (e.target.checked) {
                      setSelectedNetwork(
                        [...current, String(n.id)].join(",")
                      );
                    } else {
                      setSelectedNetwork(
                        current.filter((id) => id !== String(n.id)).join(",")
                      );
                    }
                  }}
                  className="rounded accent-[#e50914]"
                />
                {n.name}
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Sort */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
          Urutan
        </h3>
        <select
          value={selectedSort}
          onChange={(e) => setSelectedSort(e.target.value)}
          className="w-full bg-[#252525] border border-[#333] rounded px-3 py-2 text-sm text-white outline-none focus:border-[#e50914]"
        >
          {sortOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2">
        <button
          onClick={applyFilters}
          className="flex-1 bg-[#e50914] hover:bg-[#c40812] text-white text-sm font-medium py-2.5 rounded-[6px] transition-colors"
        >
          Terapkan
        </button>
        <button
          onClick={resetFilters}
          className="flex-1 border border-[#444] hover:border-white text-white text-sm py-2.5 rounded-[6px] transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop */}
      <aside className="hidden md:block w-64 shrink-0 sticky top-20 self-start bg-[#141414] rounded-lg p-5">
        {filterContent}
      </aside>

      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="md:hidden fixed bottom-6 right-6 z-40 bg-[#e50914] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-xl text-lg"
      >
        ⚙
      </button>

      {/* Mobile sheet */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/70"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-[#141414] rounded-t-2xl p-6 max-h-[80vh] overflow-y-auto animate-fadeInUp">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold">Filter</h3>
              <button
                onClick={() => setMobileOpen(false)}
                className="text-[#666] hover:text-white"
              >
                ✕
              </button>
            </div>
            {filterContent}
          </div>
        </div>
      )}
    </>
  );
}
