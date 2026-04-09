"use client";

import Link from "next/link";
import Image from "next/image";
import { IMG_BASE } from "@/lib/tmdb";
import { getYear } from "@/lib/utils";

export default function MediaCard({ item, type }) {
  const mediaType = type || item.media_type || "tv";
  const title = item.name || item.title || "Untitled";
  const date = item.first_air_date || item.release_date;
  const poster = item.poster_path
    ? `${IMG_BASE}/w342${item.poster_path}`
    : null;
  const rating = item.vote_average ? item.vote_average.toFixed(1) : "—";

  return (
    <Link
      href={`/detail/${mediaType}/${item.id}`}
      className="group relative block rounded-[8px] overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-[1.03]"
    >
      {/* Poster */}
      <div className="relative aspect-[2/3] bg-[#1c1c1c]">
        {poster ? (
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#1c1c1c] to-[#252525]">
            <span className="text-xs text-[#666] text-center px-2">
              {title}
            </span>
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <span className="bg-[#e50914] text-white text-xs font-bold px-3 py-1.5 rounded">
            ▶ Tonton
          </span>
          <span className="border border-white/50 text-white text-xs px-3 py-1.5 rounded">
            ℹ Info
          </span>
        </div>

        {/* Type badge */}
        <span
          className={`absolute top-2 left-2 text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
            mediaType === "movie"
              ? "bg-[#e50914] text-white"
              : "bg-blue-600 text-white"
          }`}
        >
          {mediaType === "movie" ? "Movie" : "TV"}
        </span>

        {/* Rating badge */}
        <span className="absolute top-2 right-2 bg-black/70 text-[#f5a623] text-[11px] font-semibold px-1.5 py-0.5 rounded flex items-center gap-0.5">
          ⭐ {rating}
        </span>
      </div>

      {/* Info */}
      <div className="mt-2 px-0.5">
        <h3 className="text-sm font-semibold text-white line-clamp-2 leading-snug">
          {title}
        </h3>
        <p className="text-xs text-[#b3b3b3] mt-1">{getYear(date)}</p>
      </div>
    </Link>
  );
}
