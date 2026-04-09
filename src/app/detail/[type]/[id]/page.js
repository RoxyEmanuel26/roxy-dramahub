import Image from "next/image";
import Link from "next/link";
import {
  getDetail,
  getCredits,
  getVideos,
  getRecommendations,
  getSimilar,
  getSeason,
  IMG_BASE,
} from "@/lib/tmdb";
import { getYear } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import SectionHeader from "@/components/ui/SectionHeader";
import MediaGrid from "@/components/ui/MediaGrid";
import DetailTabs from "@/components/features/DetailTabs";
import StarRating from "@/components/ui/StarRating";
import SynopsisExpand from "@/components/ui/SynopsisExpand";
import { ListPlus, Play, Share2, Star } from "lucide-react";

export async function generateMetadata({ params }) {
  const { type, id } = await params;
  try {
    const detail = await getDetail(type, id);
    return {
      title: detail.name || detail.title,
      description: detail.overview,
      openGraph: {
        images: detail.poster_path
          ? [`${IMG_BASE}/w500${detail.poster_path}`]
          : [],
      },
    };
  } catch {
    return { title: "Detail — Roxy Drakor" };
  }
}

export default async function DetailPage({ params }) {
  const { type, id } = await params;

  const [detail, credits, videos, recommendations, similar] = await Promise.all(
    [
      getDetail(type, id),
      getCredits(type, id),
      getVideos(type, id),
      getRecommendations(type, id),
      getSimilar(type, id),
    ]
  );

  let season1 = null;
  if (type === "tv" && detail.seasons?.length > 0) {
    try {
      season1 = await getSeason(id, 1);
    } catch {}
  }

  const title = detail.name || detail.title;
  const originalTitle = detail.original_name || detail.original_title;
  const poster = detail.poster_path
    ? `${IMG_BASE}/w500${detail.poster_path}`
    : null;
  const backdrop = detail.backdrop_path
    ? `${IMG_BASE}/w1280${detail.backdrop_path}`
    : null;
  const rating = detail.vote_average ? detail.vote_average.toFixed(1) : "—";
  const date = detail.first_air_date || detail.release_date;
  const genres = detail.genres || [];
  const status = detail.status;
  const network =
    type === "tv" && detail.networks?.length > 0
      ? detail.networks[0].name
      : null;
  const episodes = detail.number_of_episodes;
  const seasons = detail.number_of_seasons;
  const runtime =
    type === "movie"
      ? detail.runtime
      : detail.episode_run_time?.[0];

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[500px] flex items-end pt-14 pb-8 border-b border-[#1e1e1e]">
        {backdrop && (
          <div className="absolute inset-0 z-0">
            <Image
              src={backdrop}
              alt={title}
              fill
              className="object-cover opacity-20"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/60 to-transparent" />
          </div>
        )}

        <div className="container relative z-10 w-full pt-10">
          <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
            
            {/* Poster */}
            <div className="w-40 sm:w-48 md:w-60 shrink-0 mx-auto md:mx-0">
              {poster ? (
                <Image
                  src={poster}
                  alt={title}
                  width={256}
                  height={384}
                  className="rounded-lg shadow-[0_8px_30px_rgb(0,0,0,0.8)] w-full block"
                  priority
                />
              ) : (
                <div className="aspect-[2/3] bg-[#111] border border-[#1e1e1e] rounded-lg flex items-center justify-center">
                  <span className="text-[#555] text-sm text-center px-4">{title}</span>
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 w-full mt-4 md:mt-2">
              
              {/* Badges */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className={`badge ${type === "movie" ? "badge-movie" : "badge-tv"}`}>
                  {type === "movie" ? "MOVIE" : "TV"}
                </span>
                {status && (
                  <span className={`badge ${status === "Returning Series" || status === "In Production" ? "badge-ongoing" : "badge-ended"}`}>
                    {status === "Returning Series" ? "ONGOING" : status === "Ended" ? "COMPLETED" : status.toUpperCase()}
                  </span>
                )}
                {network && (
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-[#161616] text-[#999] border border-[#1e1e1e]">
                    {network}
                  </span>
                )}
              </div>

              {/* Title & Year */}
              <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-white tracking-tight mb-1">
                {title} <span className="text-[#999] font-normal text-2xl md:text-3xl">({getYear(date)})</span>
              </h1>
              
              {originalTitle && originalTitle !== title && (
                <p className="text-sm text-[#555] mb-2">{originalTitle}</p>
              )}

              {/* Interactive Star Rating */}
              <StarRating voteAverage={detail.vote_average} voteCount={detail.vote_count} />

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 mt-5 mb-6">
                <Link
                  href={type === "tv" ? `/watch/${type}/${id}?season=1&episode=1` : `/watch/${type}/${id}`}
                  className="btn-primary"
                >
                  <Play size={18} fill="currentColor" />
                  Nonton Sekarang
                </Link>
                <button className="btn-secondary" title="Tambah ke Daftar Simpan">
                  <ListPlus size={18} />
                  Simpan
                </button>
                <button className="btn-secondary" title="Bagikan">
                  <Share2 size={18} />
                  Bagikan
                </button>
              </div>

              {/* Genres */}
              {genres.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {genres.map((g) => (
                    <Link key={g.id} href={`/${type}?genre=${g.id}`} className="genre-pill">
                      {g.name}
                    </Link>
                  ))}
                </div>
              )}

              {/* Expandable Synopsis */}
              <div className="mt-4 max-w-3xl">
                <h3 className="text-white font-semibold text-sm mb-2 uppercase tracking-wider">Sinopsis</h3>
                <SynopsisExpand text={detail.overview} />
              </div>
              
              {/* Detailed Info Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 p-4 rounded-xl bg-[#111111] border border-[#1e1e1e]">
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Status</p>
                  <p className="text-sm text-[#f0f0f0] font-medium">{status || "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Rilis</p>
                  <p className="text-sm text-[#f0f0f0] font-medium">{date ? getYear(date) : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Durasi</p>
                  <p className="text-sm text-[#f0f0f0] font-medium">{runtime ? `${runtime} Menit` : "—"}</p>
                </div>
                <div>
                  <p className="text-xs text-[#555] uppercase tracking-wider mb-1">Episode</p>
                  <p className="text-sm text-[#f0f0f0] font-medium">{type === "tv" && episodes ? `${episodes} Ep` : type === "movie" ? "1 Ep" : "—"}</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Info & Rekomendasi Section container */}
      <div className="container py-8 flex flex-col lg:flex-row gap-8">
        
        {/* Kiri: TABS CONTENT (70%) */}
        <div className="flex-1 min-w-0">
          <DetailTabs
            type={type}
            id={id}
            detail={detail}
            credits={credits}
            videos={videos}
            season1={season1}
          />
        </div>

        {/* Kanan: SIDEBAR REKOMENDASI (30%) - mirip gaya MyDramaList / situs drakor */}
        <aside className="w-full lg:w-[320px] shrink-0 space-y-8">
          {/* Recommendations Sidebar Widget */}
          {recommendations?.results?.length > 0 && (
            <div>
              <h2 className="section-title mb-4 bg-[#111111] py-2 px-3 border border-[#1e1e1e] rounded-lg">Rekomendasi</h2>
              <div className="space-y-3">
                {recommendations.results.slice(0, 6).map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/detail/${type}/${item.id}`}
                    className="flex gap-3 p-2 rounded-lg hover:bg-[#111111] hover:border-[#1e1e1e] border border-transparent transition-colors group"
                  >
                    <div className="w-16 h-20 shrink-0 bg-[#161616] rounded overflow-hidden">
                      {item.poster_path ? (
                        <Image
                          src={`${IMG_BASE}/w185${item.poster_path}`}
                          alt={item.title || item.name}
                          width={64}
                          height={96}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 py-1">
                      <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-[#dc2626] transition-colors">
                        {item.title || item.name}
                      </h4>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-xs text-[#f59e0b] flex items-center gap-1">
                          <Star size={10} fill="currentColor" /> {item.vote_average?.toFixed(1) || "-"}
                        </span>
                        <span className="text-xs text-[#555]">{getYear(item.release_date || item.first_air_date)}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
          
          {/* Similar Sidebar Widget */}
          {similar?.results?.length > 0 && (
            <div>
              <h2 className="section-title mb-4 bg-[#111111] py-2 px-3 border border-[#1e1e1e] rounded-lg">Drama Serupa</h2>
              <div className="grid grid-cols-3 gap-2">
                {similar.results.slice(0, 9).map((item) => (
                  <Link 
                    key={item.id} 
                    href={`/detail/${type}/${item.id}`}
                    title={item.title || item.name}
                    className="aspect-[2/3] bg-[#161616] rounded-md overflow-hidden relative group block"
                  >
                    {item.poster_path && (
                      <Image
                        src={`${IMG_BASE}/w185${item.poster_path}`}
                        alt={item.title || item.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-2 text-center text-xs font-medium">
                      <span className="line-clamp-3 leading-tight">{item.title || item.name}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
