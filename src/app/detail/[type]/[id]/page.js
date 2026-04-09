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
    return { title: "Detail — DramaHub" };
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
      <section className="relative min-h-[60vh] flex items-end -mt-16">
        {backdrop && (
          <Image
            src={backdrop}
            alt={title}
            fill
            className="object-cover brightness-[0.3]"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/60 to-transparent" />

        <div className="relative z-10 w-full px-4 md:px-8 lg:px-16 pb-10 pt-24">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster */}
            <div className="w-48 md:w-64 shrink-0 mx-auto md:mx-0">
              {poster ? (
                <Image
                  src={poster}
                  alt={title}
                  width={256}
                  height={384}
                  className="rounded-xl shadow-2xl w-full"
                  priority
                />
              ) : (
                <div className="aspect-[2/3] bg-[#1c1c1c] rounded-xl flex items-center justify-center">
                  <span className="text-[#666] text-sm">{title}</span>
                </div>
              )}

              {/* Buttons below poster (mobile) */}
              <div className="mt-4 space-y-2 md:hidden">
                <Link
                  href={
                    type === "tv"
                      ? `/watch/${type}/${id}?season=1&episode=1`
                      : `/watch/${type}/${id}`
                  }
                  className="block w-full bg-[#e50914] hover:bg-[#c40812] text-white text-center font-semibold py-3 rounded-lg transition-colors"
                >
                  ▶ Tonton Sekarang
                </Link>
              </div>
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-2">
                <Badge variant={type === "movie" ? "type-movie" : "type-tv"}>
                  {type === "movie" ? "MOVIE" : "TV SERIES"}
                </Badge>
                {status && (
                  <Badge
                    variant={
                      status === "Returning Series" || status === "In Production"
                        ? "status-ongoing"
                        : "status-ended"
                    }
                  >
                    {status === "Returning Series"
                      ? "ONGOING"
                      : status === "Ended"
                      ? "TAMAT"
                      : status}
                  </Badge>
                )}
              </div>

              {originalTitle && originalTitle !== title && (
                <p className="text-sm text-[#b3b3b3] mb-1">{originalTitle}</p>
              )}

              <h1 className="text-2xl md:text-4xl font-bold font-[family-name:var(--font-display)] leading-tight">
                {title}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mt-3">
                <span className="text-2xl font-bold text-[#f5a623]">
                  ⭐ {rating}
                </span>
                <span className="text-sm text-[#666]">
                  / 10 • {(detail.vote_count || 0).toLocaleString("id-ID")} votes
                </span>
              </div>

              {/* Info grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-2 mt-4 text-sm">
                <div>
                  <span className="text-[#666]">Tahun</span>
                  <p className="text-white font-medium">{getYear(date)}</p>
                </div>
                {network && (
                  <div>
                    <span className="text-[#666]">Network</span>
                    <p className="text-white font-medium">{network}</p>
                  </div>
                )}
                {type === "tv" && episodes && (
                  <div>
                    <span className="text-[#666]">Episode</span>
                    <p className="text-white font-medium">
                      {episodes} Episode ({seasons} Season)
                    </p>
                  </div>
                )}
                {runtime && (
                  <div>
                    <span className="text-[#666]">Durasi</span>
                    <p className="text-white font-medium">{runtime} menit</p>
                  </div>
                )}
                <div>
                  <span className="text-[#666]">Negara</span>
                  <p className="text-white font-medium">Korea Selatan</p>
                </div>
              </div>

              {/* Genres */}
              <div className="flex flex-wrap gap-2 mt-4">
                {genres.map((g) => (
                  <Badge key={g.id} variant="genre">
                    {g.name}
                  </Badge>
                ))}
              </div>

              {/* Synopsis */}
              <p className="text-[#b3b3b3] text-sm md:text-base mt-4 line-clamp-4 leading-relaxed">
                {detail.overview || "Sinopsis belum tersedia."}
              </p>

              {/* Desktop buttons */}
              <div className="hidden md:flex items-center gap-3 mt-6">
                <Link
                  href={
                    type === "tv"
                      ? `/watch/${type}/${id}?season=1&episode=1`
                      : `/watch/${type}/${id}`
                  }
                  className="bg-[#e50914] hover:bg-[#c40812] text-white font-semibold px-6 py-3 rounded-lg transition-colors"
                >
                  ▶ Tonton Sekarang
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <DetailTabs
        type={type}
        id={id}
        detail={detail}
        credits={credits}
        videos={videos}
        season1={season1}
      />

      {/* Recommendations */}
      {recommendations?.results?.length > 0 && (
        <section className="px-4 md:px-8 lg:px-16 py-8">
          <SectionHeader title="Mungkin Kamu Suka" />
          <MediaGrid
            items={recommendations.results.slice(0, 10)}
            type={type}
          />
        </section>
      )}

      {/* Similar */}
      {similar?.results?.length > 0 && (
        <section className="px-4 md:px-8 lg:px-16 py-8">
          <SectionHeader title="Drama Serupa" />
          <MediaGrid items={similar.results.slice(0, 10)} type={type} />
        </section>
      )}
    </>
  );
}
