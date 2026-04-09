import { searchMulti } from "@/lib/tmdb";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Search } from "lucide-react";
import MediaGrid from "@/components/ui/MediaGrid";
import Pagination from "@/components/ui/Pagination";
import SearchInput from "@/components/features/SearchInput";
import { Suspense } from "react";

export async function generateMetadata({ searchParams }) {
  const sp = await searchParams;
  return {
    title: sp?.q ? `Hasil Pencarian: ${sp.q}` : "Pencarian",
  };
}

export default async function SearchPage({ searchParams }) {
  const sp = await searchParams;
  const query = sp?.q || "";
  const filterType = sp?.type || "all";
  const page = sp?.page || 1;

  if (!query) redirect("/");

  const data = await searchMulti(query, page);

  let results = (data?.results || []).filter(
    (item) => item.media_type === "tv" || item.media_type === "movie"
  );

  if (filterType === "tv") {
    results = results.filter((i) => i.media_type === "tv");
  } else if (filterType === "movie") {
    results = results.filter((i) => i.media_type === "movie");
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 py-8">
      {/* Search bar */}
      <Suspense fallback={null}>
        <SearchInput initialQuery={query} />
      </Suspense>

      {/* Filter tabs */}
      <div className="flex gap-2 mt-4 mb-6">
        {[
          { key: "all", label: "Semua" },
          { key: "tv", label: "Drama TV" },
          { key: "movie", label: "Movie" },
        ].map((tab) => (
          <Link
            key={tab.key}
            href={`/search?q=${encodeURIComponent(query)}&type=${tab.key}`}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              filterType === tab.key
                ? "bg-[#e50914] text-white"
                : "border border-[#444] text-[#b3b3b3] hover:border-white hover:text-white"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <>
          <p className="text-sm text-[#b3b3b3] mb-4">
            {data.total_results} hasil untuk &ldquo;{query}&rdquo;
          </p>
          <MediaGrid items={results} />
          <Suspense fallback={null}>
            <Pagination
              currentPage={parseInt(page)}
              totalPages={Math.min(data?.total_pages || 1, 50)}
            />
          </Suspense>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-24 gap-4">
          <Search size={64} className="text-[#333]" />
          <h2 className="text-xl font-semibold">
            Tidak ada hasil untuk &ldquo;{query}&rdquo;
          </h2>
          <p className="text-[#666]">
            Coba kata kunci lain atau periksa ejaan
          </p>
          <Link
            href="/"
            className="bg-[#e50914] text-white px-6 py-2 rounded mt-2"
          >
            Kembali ke Beranda
          </Link>
        </div>
      )}
    </div>
  );
}
