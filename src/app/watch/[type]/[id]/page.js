import { getDetail, getSeason } from "@/lib/tmdb";
import WatchClient from "@/components/features/WatchClient";

export async function generateMetadata({ params, searchParams }) {
  const { type, id } = await params;
  const sp = await searchParams;
  try {
    const detail = await getDetail(type, id);
    const title = detail.name || detail.title;
    const season = sp?.season || 1;
    const episode = sp?.episode || 1;
    const suffix = type === "tv" ? ` — S${season} Ep${episode}` : "";
    return {
      title: `Nonton ${title}${suffix}`,
      description: `Streaming ${title} subtitle Indonesia di DramaHub.`,
    };
  } catch {
    return { title: "Nonton — DramaHub" };
  }
}

export default async function WatchPage({ params, searchParams }) {
  const { type, id } = await params;
  const sp = await searchParams;
  const season = parseInt(sp?.season) || 1;
  const episode = parseInt(sp?.episode) || 1;

  const [detail, seasonData] = await Promise.all([
    getDetail(type, id),
    type === "tv" ? getSeason(id, season).catch(() => null) : Promise.resolve(null),
  ]);

  return (
    <WatchClient
      detail={detail}
      type={type}
      id={id}
      season={season}
      episode={episode}
      seasonData={seasonData}
    />
  );
}
