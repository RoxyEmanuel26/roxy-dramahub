import { getDiscoverMovie } from "@/lib/tmdb";
import PageHero from "@/components/ui/PageHero";
import MediaGrid from "@/components/ui/MediaGrid";
import Pagination from "@/components/ui/Pagination";
import FilterSidebar from "@/components/features/FilterSidebar";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Movie Korea",
  description: "Daftar lengkap film Korea terbaru dan terpopuler.",
};

export default async function MoviePage({ searchParams }) {
  const sp = await searchParams;
  const page = sp?.page || 1;
  const genre = sp?.genre || "";
  const year = sp?.year || "";
  const sort = sp?.sort || "release_date.desc";

  const params = {
    sort_by: sort,
    page,
    "vote_count.gte": 5,
    ...(genre && { with_genres: genre }),
    ...(year && { primary_release_year: year }),
  };

  const data = await getDiscoverMovie(params);

  return (
    <>
      <PageHero title="Daftar Movie Korea" breadcrumb={["Beranda", "Movie"]} />

      <div className="flex gap-6 px-4 md:px-8 lg:px-16 py-8">
        <Suspense fallback={null}>
          <FilterSidebar
            type="movie"
            currentFilters={{ genre, year, sort }}
          />
        </Suspense>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#b3b3b3] mb-4">
            Menampilkan {data?.results?.length || 0} dari{" "}
            {(data?.total_results || 0).toLocaleString("id-ID")} movie
          </p>

          <MediaGrid items={data?.results || []} type="movie" />

          <Suspense fallback={null}>
            <Pagination
              currentPage={parseInt(page)}
              totalPages={Math.min(data?.total_pages || 1, 100)}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}
