import { getDiscoverTV, getDiscoverMovie } from "@/lib/tmdb";
import TopClient from "@/components/features/TopClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Top Drama & Movie Korea",
  description:
    "Top 100 drama dan movie Korea dengan rating tertinggi sepanjang masa.",
};

export default async function TopPage() {
  const [topTV, topMovie] = await Promise.all([
    getDiscoverTV({
      sort_by: "vote_average.desc",
      "vote_count.gte": 300,
      page: 1,
    }),
    getDiscoverMovie({
      sort_by: "vote_average.desc",
      "vote_count.gte": 300,
      page: 1,
    }),
  ]);

  return (
    <TopClient
      initialTV={topTV?.results || []}
      initialMovie={topMovie?.results || []}
      totalPagesTV={Math.min(topTV?.total_pages || 1, 5)}
      totalPagesMovie={Math.min(topMovie?.total_pages || 1, 5)}
    />
  );
}
