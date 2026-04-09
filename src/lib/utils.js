import { clsx } from "clsx";

export function cn(...inputs) {
  return clsx(inputs);
}

export function formatDate(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function getYear(dateStr) {
  if (!dateStr) return "—";
  return new Date(dateStr).getFullYear();
}

export function getRatingColor(rating) {
  if (rating >= 8) return "text-green-400";
  if (rating >= 6) return "text-yellow-400";
  return "text-red-400";
}

export const TV_GENRES = [
  { id: 10759, name: "Aksi & Petualangan" },
  { id: 35, name: "Komedi" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 9648, name: "Misteri" },
  { id: 10749, name: "Romantis" },
  { id: 27, name: "Horor" },
  { id: 10762, name: "Anak-anak" },
];

export const MOVIE_GENRES = [
  { id: 28, name: "Aksi" },
  { id: 35, name: "Komedi" },
  { id: 18, name: "Drama" },
  { id: 10749, name: "Romantis" },
  { id: 53, name: "Thriller" },
  { id: 14, name: "Fantasi" },
  { id: 27, name: "Horor" },
  { id: 80, name: "Kriminal" },
  { id: 10752, name: "Perang" },
  { id: 99, name: "Dokumenter" },
];

export const NETWORKS = [
  { id: 213, name: "Netflix" },
  { id: 1706, name: "tvN" },
  { id: 343, name: "MBC" },
  { id: 356, name: "KBS2" },
  { id: 399, name: "SBS" },
  { id: 2285, name: "JTBC" },
  { id: 3290, name: "Disney+" },
];

export const SORT_TV = [
  { value: "first_air_date.desc", label: "Terbaru" },
  { value: "popularity.desc", label: "Terpopuler" },
  { value: "vote_average.desc", label: "Rating Tertinggi" },
  { value: "name.asc", label: "A — Z" },
];

export const SORT_MOVIE = [
  { value: "release_date.desc", label: "Terbaru" },
  { value: "popularity.desc", label: "Terpopuler" },
  { value: "vote_average.desc", label: "Rating Tertinggi" },
  { value: "title.asc", label: "A — Z" },
];
