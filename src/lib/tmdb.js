const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const LANG = "id-ID";

export const IMG_BASE = "https://image.tmdb.org/t/p";

async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", LANG);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
  return res.json();
}

/* ── Trending ── */
export const getTrending = (type = "tv", time = "week") =>
  tmdbFetch(`/trending/${type}/${time}`);

/* ── On Air (Korean TV) ── */
export const getOnAir = () =>
  tmdbFetch("/tv/on_the_air", { with_origin_country: "KR" });

/* ── Discover ── */
export const getDiscoverTV = (params = {}) =>
  tmdbFetch("/discover/tv", { with_origin_country: "KR", ...params });

export const getDiscoverMovie = (params = {}) =>
  tmdbFetch("/discover/movie", { with_origin_country: "KR", ...params });

/* ── Detail ── */
export const getDetail = (type, id) => tmdbFetch(`/${type}/${id}`);
export const getCredits = (type, id) => tmdbFetch(`/${type}/${id}/credits`);
export const getVideos = (type, id) => tmdbFetch(`/${type}/${id}/videos`);
export const getSeason = (id, season) =>
  tmdbFetch(`/tv/${id}/season/${season}`);
export const getRecommendations = (type, id) =>
  tmdbFetch(`/${type}/${id}/recommendations`);
export const getSimilar = (type, id) =>
  tmdbFetch(`/${type}/${id}/similar`);

/* ── Search ── */
export const searchMulti = (query, page = 1) =>
  tmdbFetch("/search/multi", { query, page });

/* ── Rankings ── */
export const getTopRated = (type) =>
  tmdbFetch(`/${type}/top_rated`, { with_origin_country: "KR" });
export const getPopular = (type) =>
  tmdbFetch(`/${type}/popular`, { with_origin_country: "KR" });
