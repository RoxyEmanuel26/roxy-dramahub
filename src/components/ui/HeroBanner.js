"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";
import Badge from "./Badge";
import { IMG_BASE } from "@/lib/tmdb";

export default function HeroBanner({ items = [] }) {
  if (!items.length) return null;

  return (
    <section className="relative -mt-16">
      <Swiper
        modules={[Autoplay, EffectFade, Pagination]}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        effect="fade"
        loop
        pagination={{ clickable: true }}
        className="w-full h-[55vh] md:h-[70vh] lg:h-[80vh]"
      >
        {items.slice(0, 10).map((item) => {
          const title = item.name || item.title;
          const backdrop = item.backdrop_path
            ? `${IMG_BASE}/w1280${item.backdrop_path}`
            : null;
          const genres = (item.genre_ids || []).slice(0, 3);
          const rating = item.vote_average
            ? item.vote_average.toFixed(1)
            : null;

          return (
            <SwiperSlide key={item.id}>
              <div className="relative w-full h-full">
                {/* Background image */}
                {backdrop && (
                  <Image
                    src={backdrop}
                    alt={title}
                    fill
                    className="object-cover"
                    priority
                    sizes="100vw"
                  />
                )}

                {/* Gradients */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-transparent to-transparent" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-16 max-w-2xl z-10">
                  <Badge variant="trending">🔥 TRENDING</Badge>

                  <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)] mt-3 line-clamp-2 leading-tight">
                    {title}
                  </h2>

                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    {rating && (
                      <span className="text-[#f5a623] text-sm font-semibold">
                        ⭐ {rating}
                      </span>
                    )}
                    {GENRE_MAP.filter((g) => genres.includes(g.id))
                      .slice(0, 3)
                      .map((g) => (
                        <Badge key={g.id} variant="genre">
                          {g.name}
                        </Badge>
                      ))}
                  </div>

                  <p className="text-sm md:text-base text-[#b3b3b3] mt-3 line-clamp-3 leading-relaxed">
                    {item.overview || "Sinopsis belum tersedia."}
                  </p>

                  <div className="flex items-center gap-3 mt-5">
                    <Link
                      href={`/watch/tv/${item.id}?season=1&episode=1`}
                      className="bg-[#e50914] hover:bg-[#c40812] text-white font-semibold px-5 py-2.5 rounded-[6px] text-sm transition-colors"
                    >
                      ▶ Tonton Sekarang
                    </Link>
                    <Link
                      href={`/detail/tv/${item.id}`}
                      className="border border-white/40 hover:border-white text-white px-5 py-2.5 rounded-[6px] text-sm transition-colors"
                    >
                      ℹ Detail
                    </Link>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}

const GENRE_MAP = [
  { id: 10759, name: "Action" },
  { id: 10749, name: "Romance" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi" },
  { id: 9648, name: "Mystery" },
  { id: 27, name: "Horror" },
  { id: 10762, name: "Kids" },
  { id: 16, name: "Animation" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 10768, name: "War" },
  { id: 37, name: "Western" },
  { id: 10751, name: "Family" },
  { id: 36, name: "History" },
  { id: 10763, name: "News" },
  { id: 10764, name: "Reality" },
  { id: 10766, name: "Soap" },
  { id: 10767, name: "Talk" },
  { id: 28, name: "Action" },
  { id: 14, name: "Fantasy" },
  { id: 53, name: "Thriller" },
];
