const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const LANG = "id-ID";

export const IMG_BASE = "https://image.tmdb.org/t/p";

async function tmdbFetch(endpoint, params = {}) {
  if (!API_KEY || API_KEY === "GANTI_DENGAN_API_KEY_KAMU" || API_KEY === "your_tmdb_api_key_here") {
    console.warn("[Roxy Drakor] TMDB_API_KEY belum diset. Buka .env.local dan masukkan API key dari themoviedb.org");
    return { results: [], total_pages: 0, total_results: 0 };
  }

  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", LANG);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  });

  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });

  if (!res.ok) {
    if (res.status === 401) {
      console.error("[Roxy Drakor] TMDB API key tidak valid (401 Unauthorized). Periksa kembali API key di .env.local");
      return { results: [], total_pages: 0, total_results: 0 };
    }
    throw new Error(`TMDB Error: ${res.status}`);
  }

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
