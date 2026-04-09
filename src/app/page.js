import {
  getTrending,
  getOnAir,
  getDiscoverTV,
  getDiscoverMovie,
} from "@/lib/tmdb";
import HeroBanner from "@/components/ui/HeroBanner";
import SectionHeader from "@/components/ui/SectionHeader";
import MediaGrid from "@/components/ui/MediaGrid";
import MediaCard from "@/components/ui/MediaCard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "DramaHub — Nonton Drama Korea Subtitle Indonesia",
  description:
    "Nonton streaming drama Korea terbaru dengan subtitle Indonesia secara gratis.",
};

export default async function HomePage() {
  let trending = { results: [] };
  let onAir = { results: [] };
  let latestTV = { results: [] };
  let latestMovie = { results: [] };
  let topRated = { results: [] };

  try {
    [trending, onAir, latestTV, latestMovie, topRated] = await Promise.all([
      getTrending("tv", "week"),
      getOnAir(),
      getDiscoverTV({ sort_by: "first_air_date.desc", "vote_count.gte": 10 }),
      getDiscoverMovie({ sort_by: "release_date.desc", "vote_count.gte": 10 }),
      getDiscoverTV({ sort_by: "vote_average.desc", "vote_count.gte": 500 }),
    ]);
  } catch (err) {
    console.error("Failed to fetch homepage data:", err.message);
  }

  const trendingKR = (trending?.results || []).filter(
    (item) =>
      item.origin_country?.includes("KR") || item.original_language === "ko"
  );
  const heroItems =
    trendingKR.length > 0
      ? trendingKR
      : (trending?.results || []).slice(0, 10);

  return (
    <>
      {/* Hero */}
      <HeroBanner items={heroItems} />

      {/* Episode Terbaru */}
      <section className="px-4 md:px-8 lg:px-16 py-8">
        <SectionHeader title="📺 Episode Terbaru" href="/drama" />
        <MediaGrid
          items={(onAir?.results || []).slice(0, 12)}
          type="tv"
          skeletonCount={12}
        />
      </section>

      {/* Drama Terbaru */}
      <section className="px-4 md:px-8 lg:px-16 py-8">
        <SectionHeader title="🎬 Drama Terbaru" href="/drama" />
        <MediaGrid
          items={(latestTV?.results || []).slice(0, 10)}
          type="tv"
          skeletonCount={10}
        />
      </section>

      {/* Movie Terbaru */}
      <section className="px-4 md:px-8 lg:px-16 py-8">
        <SectionHeader title="🎥 Movie Terbaru" href="/movie" />
        <MediaGrid
          items={(latestMovie?.results || []).slice(0, 10)}
          type="movie"
          skeletonCount={10}
        />
      </section>

      {/* Top Rating */}
      <section className="px-4 md:px-8 lg:px-16 py-8">
        <SectionHeader title="⭐ Top Rating Sepanjang Masa" href="/top" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {(topRated?.results || []).slice(0, 10).map((item, i) => (
            <div key={item.id} className="relative">
              <span
                className={`absolute -left-1 -top-1 z-10 w-8 h-8 flex items-center justify-center rounded-full text-sm font-bold shadow-lg ${
                  i < 3
                    ? "bg-gradient-to-br from-yellow-400 to-yellow-600 text-black"
                    : "bg-[#333] text-white"
                }`}
              >
                {i + 1}
              </span>
              <MediaCard item={item} type="tv" />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
