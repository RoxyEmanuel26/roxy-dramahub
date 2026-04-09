import { getDiscoverTV } from "@/lib/tmdb";
import PageHero from "@/components/ui/PageHero";
import MediaGrid from "@/components/ui/MediaGrid";
import Pagination from "@/components/ui/Pagination";
import FilterSidebar from "@/components/features/FilterSidebar";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Drama Korea",
  description: "Daftar lengkap drama Korea terbaru dan terpopuler.",
};

export default async function DramaPage({ searchParams }) {
  const sp = await searchParams;
  const page = sp?.page || 1;
  const genre = sp?.genre || "";
  const year = sp?.year || "";
  const sort = sp?.sort || "first_air_date.desc";
  const network = sp?.network || "";

  const params = {
    sort_by: sort,
    page,
    "vote_count.gte": 5,
    ...(genre && { with_genres: genre }),
    ...(year && { first_air_date_year: year }),
    ...(network && { with_networks: network }),
  };

  const data = await getDiscoverTV(params);

  return (
    <>
      <PageHero title="Daftar Drama Korea" breadcrumb={["Beranda", "Drama"]} />

      <div className="flex gap-6 px-4 md:px-8 lg:px-16 py-8">
        <Suspense fallback={null}>
          <FilterSidebar
            type="tv"
            currentFilters={{ genre, year, sort, network }}
          />
        </Suspense>

        <div className="flex-1 min-w-0">
          <p className="text-sm text-[#b3b3b3] mb-4">
            Menampilkan {data?.results?.length || 0} dari{" "}
            {(data?.total_results || 0).toLocaleString("id-ID")} drama
          </p>

          <MediaGrid items={data?.results || []} type="tv" />

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
