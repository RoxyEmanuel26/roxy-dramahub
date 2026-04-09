/**
 * DramaHub — Global Configuration
 * Replace TMDB_API_KEY with your own key from themoviedb.org
 */
const CONFIG = {
  TMDB_API_KEY: "GANTI_DENGAN_API_KEY_KAMU",
  TMDB_BASE_URL: "https://api.themoviedb.org/3",
  TMDB_IMAGE_BASE: "https://image.tmdb.org/t/p/",
  TMDB_POSTER_SIZE: "w500",
  TMDB_BACKDROP_SIZE: "w1280",
  TMDB_PROFILE_SIZE: "w185",
  TMDB_STILL_SIZE: "w300",
  SITE_NAME: "DramaHub",
  SITE_TAGLINE: "Nonton Drama Korea Subtitle Indonesia",
  DEFAULT_LANGUAGE: "id-ID",
  ITEMS_PER_PAGE: 20,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes in ms
  EMBED_SERVERS: {
    server1: { name: "VidSrc", label: "Server 1 — VidSrc" },
    server2: { name: "2Embed", label: "Server 2 — 2Embed" },
    server3: { name: "SuperEmbed", label: "Server 3 — SuperEmbed" }
  }
};

/** TMDB Genre ID mapping for TV */
const GENRE_MAP_TV = {
  "Action": 10759,
  "Romance": 10749,
  "Comedy": 35,
  "Thriller": 9648,
  "Fantasy": 10765,
  "Drama": 18,
  "Mystery": 9648,
  "Horror": 27,
  "Historical": 36,
  "Medical": 18,
  "School": 18
};

/** TMDB Genre ID mapping for Movie */
const GENRE_MAP_MOVIE = {
  "Action": 28,
  "Romance": 10749,
  "Comedy": 35,
  "Thriller": 53,
  "Fantasy": 14,
  "Drama": 18,
  "Mystery": 9648,
  "Horror": 27,
  "Crime": 80,
  "War": 10752,
  "Documentary": 99
};

/** TMDB Network IDs */
const NETWORK_MAP = {
  "Netflix": 213,
  "tvN": 1706,
  "MBC": 343,
  "KBS": 356,
  "SBS": 399,
  "JTBC": 2285,
  "Disney+": 2739,
  "Apple TV+": 2552
};

/** Genre ID → Name lookup (combined) */
const GENRE_NAMES = {
  10759: "Action & Adventure",
  10749: "Romance",
  35: "Comedy",
  9648: "Mystery",
  10765: "Sci-Fi & Fantasy",
  18: "Drama",
  27: "Horror",
  36: "History",
  28: "Action",
  53: "Thriller",
  14: "Fantasy",
  80: "Crime",
  10752: "War",
  99: "Documentary",
  16: "Animation",
  878: "Science Fiction",
  12: "Adventure",
  37: "Western",
  10402: "Music",
  10751: "Family",
  10768: "War & Politics"
};
