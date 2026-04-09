# 🚀 Master Prompt Guide: DramaHub — Next.js 15 + Tailwind CSS v4
### Website Drama Korea Clone (Drakorz.com) — Versi Framework
**Stack:** Next.js 15 (App Router) · Tailwind CSS v4 · TMDB API · VidSrc Embed · Vercel Deploy

---

## ⚡ KENAPA NEXT.JS vs HTML BIASA?

| Fitur | HTML Biasa | Next.js 15 |
|-------|-----------|------------|
| SEO | ❌ Buruk (data di-render JS) | ✅ Server-side rendering |
| Kecepatan | ❌ Lambat (fetch di browser) | ✅ Data di-fetch di server |
| Routing | ❌ Manual (url params) | ✅ Otomatis (file-based) |
| Image Optimize | ❌ Manual | ✅ next/image otomatis |
| API Key Aman | ❌ Kelihatan di browser | ✅ Tersembunyi di server |
| Dark Mode | ❌ Manual | ✅ next-themes |
| Komponen | ❌ Copy-paste HTML | ✅ Reusable React components |

---

## ⚙️ PERSIAPAN SEBELUM MULAI

1. **Node.js** versi 18+ sudah terinstall (`node --version`)
2. **TMDB API Key** sudah didapat dari themoviedb.org
3. **Google Antigravity** sudah dibuka
4. Buat folder kosong bernama `dramahub` di komputer

---

## 🏗️ TAHAP 1 — Init Project Next.js + Instalasi Dependency

**[PROMPT 1 — Copy ke Antigravity PERTAMA]**

```
Buatkan project Next.js 15 bernama "dramahub" untuk website streaming drama Korea.
Jalankan perintah berikut secara berurutan di terminal:

LANGKAH 1 - Buat project Next.js 15:
npx create-next-app@latest dramahub --js --app --tailwind --eslint --src-dir --import-alias "@/*" --no-turbopack

(Pilihan: JavaScript bukan TypeScript, gunakan App Router, gunakan Tailwind, gunakan ESLint, gunakan src dir)

LANGKAH 2 - Masuk ke folder project:
cd dramahub

LANGKAH 3 - Install package tambahan:
npm install next-themes axios clsx lucide-react @radix-ui/react-dialog @radix-ui/react-tabs swiper

Penjelasan package:
- next-themes: dark/light mode management
- axios: HTTP request ke TMDB API
- clsx: conditional className utility
- lucide-react: icon library (modern, ringan)
- @radix-ui/react-dialog: modal/popup accessible
- @radix-ui/react-tabs: tab component accessible
- swiper: carousel/slider untuk hero banner

LANGKAH 4 - Buat file environment:
Buat file .env.local di root project dengan isi:
TMDB_API_KEY=GANTI_DENGAN_API_KEY_KAMU
NEXT_PUBLIC_SITE_NAME=DramaHub
NEXT_PUBLIC_SITE_URL=http://localhost:3000

LANGKAH 5 - Buat struktur folder di dalam src/:
src/
├── app/
│   ├── layout.js          (Root layout dengan Navbar & Footer)
│   ├── page.js            (Homepage)
│   ├── globals.css        (Global styles + Tailwind)
│   ├── drama/
│   │   └── page.js        (Daftar Drama)
│   ├── movie/
│   │   └── page.js        (Daftar Movie)
│   ├── top/
│   │   └── page.js        (Top Drama & Movie)
│   ├── search/
│   │   └── page.js        (Halaman Search)
│   ├── detail/
│   │   └── [type]/
│   │       └── [id]/
│   │           └── page.js  (Detail Drama/Movie)
│   └── watch/
│       └── [type]/
│           └── [id]/
│               └── page.js  (Halaman Streaming)
├── components/
│   ├── layout/
│   │   ├── Navbar.js
│   │   ├── Footer.js
│   │   └── ThemeProvider.js
│   ├── ui/
│   │   ├── MediaCard.js      (Card drama/movie)
│   │   ├── MediaGrid.js      (Grid layout card)
│   │   ├── HeroBanner.js     (Carousel hero)
│   │   ├── SectionHeader.js  (Judul section + link "Lihat Semua")
│   │   ├── EpisodeList.js    (List episode di halaman watch)
│   │   ├── VideoPlayer.js    (Embed iframe player)
│   │   ├── ServerSelector.js (Tombol pilih server video)
│   │   ├── SkeletonCard.js   (Loading placeholder)
│   │   ├── Pagination.js     (Komponen pagination)
│   │   └── Badge.js          (Badge genre, tipe, rating)
│   └── features/
│       ├── FilterSidebar.js  (Filter genre, tahun, network)
│       └── SearchBar.js      (Search input dengan suggestion)
└── lib/
    ├── tmdb.js               (Semua fungsi API TMDB)
    ├── embed.js              (Fungsi generate embed URL)
    └── utils.js              (Helper functions)

Buat semua folder dan file tersebut (isi placeholder dulu), kemudian jalankan:
npm run dev

Pastikan project berjalan di http://localhost:3000 tanpa error.
```

---

## 🎨 TAHAP 2 — Global Styles, Theme & Design System

**[PROMPT 2 — Masukkan setelah Prompt 1 selesai]**

```
Buatkan design system lengkap untuk DramaHub dengan dark theme Netflix-style.

BAGIAN 1 — src/app/globals.css:
Konfigurasi Tailwind CSS v4 dan custom CSS variables:

@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme {
  --color-bg: #0d0d0d;
  --color-surface: #141414;
  --color-surface-2: #1c1c1c;
  --color-surface-3: #252525;
  --color-accent: #e50914;
  --color-accent-hover: #c40812;
  --color-accent-secondary: #f5a623;
  --color-text: #ffffff;
  --color-text-muted: #b3b3b3;
  --color-text-faint: #666666;
  --color-border: rgba(255,255,255,0.1);
  --color-overlay: rgba(0,0,0,0.7);
  
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  --radius-card: 8px;
  --radius-btn: 6px;
  --radius-badge: 4px;
  
  --shadow-card: 0 4px 20px rgba(0,0,0,0.5);
  --shadow-hover: 0 8px 30px rgba(0,0,0,0.7);
  
  --transition-base: 200ms ease;
  --transition-smooth: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Poppins:wght@600;700;800&display=swap');

/* Base */
body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  -webkit-font-smoothing: antialiased;
}

/* Scrollbar custom dark */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: var(--color-surface); }
::-webkit-scrollbar-thumb { background: #444; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #666; }

/* Line clamp utilities */
.line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }

/* Shimmer loading animation */
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
.skeleton {
  background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

/* Fade in animation */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn { animation: fadeIn 0.4s ease forwards; }

BAGIAN 2 — src/components/layout/ThemeProvider.js:
"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
export default function ThemeProvider({ children }) {
  return (
    <NextThemesProvider attribute="data-theme" defaultTheme="dark" enableSystem={false}>
      {children}
    </NextThemesProvider>
  );
}

BAGIAN 3 — src/app/layout.js:
Buat root layout dengan:
- Import font dari Google Fonts (Inter + Poppins) via next/font/google
- Wrap dengan ThemeProvider
- Include Navbar di atas
- Include Footer di bawah
- Metadata default (title: "DramaHub", description: "Nonton Drama Korea Subtitle Indonesia")
- className body: "min-h-screen bg-[#0d0d0d] text-white"

BAGIAN 4 — src/lib/tmdb.js:
Buat file helper TMDB API dengan semua fungsi:

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = process.env.TMDB_API_KEY;
const LANG = "id-ID";
export const IMG_BASE = "https://image.tmdb.org/t/p";

// Fungsi fetch base
async function tmdbFetch(endpoint, params = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  url.searchParams.set("api_key", API_KEY);
  url.searchParams.set("language", LANG);
  Object.entries(params).forEach(([k, v]) => url.searchParams.set(k, v));
  const res = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`TMDB Error: ${res.status}`);
  return res.json();
}

// Export semua fungsi yang dibutuhkan:
export const getTrending = (type = "tv", time = "week") => tmdbFetch(`/trending/${type}/${time}`);
export const getOnAir = () => tmdbFetch("/tv/on_the_air", { with_origin_country: "KR" });
export const getDiscoverTV = (params = {}) => tmdbFetch("/discover/tv", { with_origin_country: "KR", ...params });
export const getDiscoverMovie = (params = {}) => tmdbFetch("/discover/movie", { with_origin_country: "KR", ...params });
export const getDetail = (type, id) => tmdbFetch(`/${type}/${id}`);
export const getCredits = (type, id) => tmdbFetch(`/${type}/${id}/credits`);
export const getVideos = (type, id) => tmdbFetch(`/${type}/${id}/videos`);
export const getSeason = (id, season) => tmdbFetch(`/tv/${id}/season/${season}`);
export const getRecommendations = (type, id) => tmdbFetch(`/${type}/${id}/recommendations`);
export const getSimilar = (type, id) => tmdbFetch(`/${type}/${id}/similar`);
export const searchMulti = (query, page = 1) => tmdbFetch("/search/multi", { query, page });
export const getTopRated = (type) => tmdbFetch(`/${type}/top_rated`, { with_origin_country: "KR" });
export const getPopular = (type) => tmdbFetch(`/${type}/popular`, { with_origin_country: "KR" });

BAGIAN 5 — src/lib/embed.js:
export const SERVERS = {
  tv: {
    "VidSrc": (id, s, e) => `https://vidsrc.me/embed/tv/${id}/${s}/${e}`,
    "2Embed": (id, s, e) => `https://www.2embed.cc/embedtv/${id}&s=${s}&e=${e}`,
    "SuperEmbed": (id, s, e) => `https://multiembed.mov/?video_id=${id}&s=${s}&e=${e}`,
  },
  movie: {
    "VidSrc": (id) => `https://vidsrc.me/embed/movie/${id}`,
    "2Embed": (id) => `https://www.2embed.cc/embed/${id}`,
    "SuperEmbed": (id) => `https://multiembed.mov/?video_id=${id}`,
  }
};

export function getEmbedUrl(type, id, server = "VidSrc", season = 1, episode = 1) {
  if (type === "tv") return SERVERS.tv[server](id, season, episode);
  return SERVERS.movie[server](id);
}
```

---

## 🧩 TAHAP 3 — Komponen UI Reusable

**[PROMPT 3 — Masukkan setelah Prompt 2 selesai]**

```
Buatkan semua komponen UI reusable untuk DramaHub. Gunakan Tailwind CSS v4 utility classes.

KOMPONEN 1 — src/components/ui/MediaCard.js:
"use client";
Komponen card untuk drama/movie dengan props:
- id, title, posterPath, releaseDate, voteAverage, type ("tv"/"movie"), mediaType

Tampilan card:
- Link ke /detail/{type}/{id} saat diklik
- Wrapper: relative, rounded-[8px], overflow-hidden, group cursor-pointer
- Poster image: pakai next/image, aspect ratio 2:3, object-cover
  src: IMG_BASE + "/w342" + posterPath (fallback: gradient abu jika null)
- Hover overlay: absolute inset, bg-black/60, opacity-0 group-hover:opacity-100, transition 300ms
  Di dalam overlay: tombol "▶ Tonton" (merah) dan "ℹ Info" (transparan)
- Badge tipe di pojok kiri atas: "TV" warna biru, "MOVIE" warna merah, text-xs font-bold px-2 py-1
- Badge rating di pojok kanan atas: "⭐ 8.5", bg-black/70, text-xs, px-2 py-1
- Judul di bawah poster: font-semibold text-sm line-clamp-2 mt-2 text-white
- Tahun rilis: text-xs text-[#b3b3b3] mt-1
- Semua hover transition smooth

KOMPONEN 2 — src/components/ui/SkeletonCard.js:
Placeholder loading card (ukuran sama dengan MediaCard):
- Div dengan aspect ratio 2:3, class "skeleton rounded-[8px]"
- Dua baris teks skeleton di bawah
- Gunakan Tailwind: bg-[#1c1c1c] animate-pulse

KOMPONEN 3 — src/components/ui/MediaGrid.js:
"use client";
Props: items (array), loading (bool), skeletonCount (number, default 20)
- CSS Grid: grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4
- Jika loading: tampilkan array SkeletonCard sebanyak skeletonCount
- Jika items ada: map dan render MediaCard
- Jika items kosong dan tidak loading: tampilkan empty state

KOMPONEN 4 — src/components/ui/SectionHeader.js:
Props: title, href (optional)
- Flex row, justify-between, items-center, mb-4
- Kiri: judul dengan garis merah di kiri (border-l-4 border-[#e50914] pl-3), font Poppins
- Kanan (jika ada href): Link "Lihat Semua →" warna merah, hover underline

KOMPONEN 5 — src/components/ui/Badge.js:
Props: children, variant ("genre"/"type"/"status"/"rating")
- Variants:
  genre: border border-white/30 text-white/80 hover:bg-white/10 rounded-full px-3 py-1 text-xs
  type tv: bg-blue-600 text-white rounded px-2 py-0.5 text-xs font-bold
  type movie: bg-red-600 text-white rounded px-2 py-0.5 text-xs font-bold
  status ongoing: bg-green-600 text-white rounded px-2 py-0.5 text-xs
  status ended: bg-gray-600 text-white rounded px-2 py-0.5 text-xs
  rating: bg-black/70 text-yellow-400 rounded px-2 py-0.5 text-xs flex items-center gap-1

KOMPONEN 6 — src/components/ui/Pagination.js:
"use client";
Props: currentPage, totalPages, onPageChange
- Tampilkan: [← Prev] [1] [2] ... [10] [Next →]
- Max tampilkan 5 nomor halaman (dengan ellipsis jika banyak)
- Active page: bg-[#e50914] text-white
- Inactive: bg-[#1c1c1c] text-white hover:bg-[#252525]
- Disabled Prev/Next: opacity-50 cursor-not-allowed

KOMPONEN 7 — src/components/layout/Navbar.js:
"use client";
Fitur:
- Fixed top, z-50, w-full
- Background: transparent → bg-[#0d0d0d]/95 backdrop-blur-sm saat scroll (pakai useEffect + scroll listener)
- Kiri: Logo SVG merah + teks "DramaHub" (Poppins Bold)
  Logo SVG: bentuk play button segitiga dalam lingkaran, warna merah (#e50914)
- Tengah (hidden di mobile): Link menu: Beranda | Drama | Movie | Top Drama
  Active link: text-[#e50914], inactive: text-[#b3b3b3] hover:text-white
- Kanan:
  * Search icon (lucide-react Search) → klik expand search bar
  * Search bar expandable: input text, animasi width 0 → 200px
  * Hamburger menu (lucide-react Menu) → hanya di mobile (md:hidden)
- Mobile menu: slide-down drawer saat hamburger diklik, semua link menu di sini
- Import dan gunakan usePathname dari next/navigation untuk active link

KOMPONEN 8 — src/components/layout/Footer.js:
3 kolom:
- Kolom 1: Logo + deskripsi singkat + "Disclaimer: Kami tidak menyimpan konten video"
- Kolom 2: Menu (Beranda, Drama, Movie, Top Drama, Search)
- Kolom 3: Genre populer (Romance, Action, Comedy, Thriller, Fantasy) sebagai links ke /drama?genre=X
- Bawah: copyright + "Powered by TMDB API"
- Background: bg-[#0a0a0a], border-top: border-[#1c1c1c]
```

---

## 🏠 TAHAP 4 — Homepage (app/page.js)

**[PROMPT 4 — Masukkan setelah Prompt 3 selesai]**

```
Buatkan Homepage DramaHub di src/app/page.js sebagai React Server Component.

KARENA INI SERVER COMPONENT: ambil data langsung di dalam komponen (bukan useEffect).
Gunakan Promise.all untuk fetch paralel semua data sekaligus.

DATA YANG DIAMBIL (semua dari lib/tmdb.js):
const [trending, onAir, latestTV, latestMovie, topRated] = await Promise.all([
  getTrending("tv", "week"),
  getOnAir(),
  getDiscoverTV({ sort_by: "first_air_date.desc", "vote_count.gte": 10 }),
  getDiscoverMovie({ sort_by: "release_date.desc", "vote_count.gte": 10 }),
  getDiscoverTV({ sort_by: "vote_average.desc", "vote_count.gte": 500 })
]);

STRUKTUR HALAMAN:

1. HERO BANNER — Komponen HeroBanner (Client Component terpisah):
   src/components/ui/HeroBanner.js ("use client")
   
   Props: items (array 10 drama trending pertama)
   
   Implementasi dengan Swiper.js:
   - import Swiper dan modul Autoplay, EffectFade, Pagination
   - SwiperSlide per item:
     * Background fullscreen: next/image dengan backdrop (w1280), fill, object-cover
     * Gradient overlay: absolute inset-0, bg-gradient-to-r from-black/90 via-black/50 to-transparent
     * Gradient bawah: bg-gradient-to-t from-black via-transparent
     * Konten (absolute, bottom-0 left-0, p-8 md:p-16, max-w-2xl):
       - Badge "TRENDING" (merah berkedip: animate-pulse)
       - Judul (font Poppins, text-3xl md:text-5xl, font-bold, line-clamp-2)
       - Genre pills (3 genre pertama)
       - Rating dengan bintang
       - Sinopsis (line-clamp-3, text-[#b3b3b3], text-sm md:text-base)
       - 2 tombol: [▶ Tonton Sekarang] Link ke /watch/tv/{id}/season/1/ep/1
                   [ℹ Detail] Link ke /detail/tv/{id}
   - Swiper config: autoplay delay 6000, effect fade, loop true
   - Custom pagination dots di bawah (override CSS Swiper)
   
2. SECTION "Episode Terbaru":
   <SectionHeader title="Episode Terbaru" href="/drama?filter=on-air" />
   <MediaGrid items={onAir.results.slice(0,12)} />
   
3. SECTION "Drama Terbaru":
   <SectionHeader title="Drama Terbaru" href="/drama" />
   <MediaGrid items={latestTV.results.slice(0,10)} />

4. SECTION "Movie Terbaru":
   <SectionHeader title="Movie Terbaru" href="/movie" />
   <MediaGrid items={latestMovie.results.slice(0,10)} />
   
5. SECTION "Top Rating Sepanjang Masa":
   <SectionHeader title="Top Rating Sepanjang Masa" href="/top" />
   Layout LIST (bukan grid) - horizontal scroll di mobile:
   Setiap item: rank number + MediaCard kecil
   Tampilkan 10 item dari topRated.results
   Rank 1-3: warna emas, 4-10: warna perak

TAMBAHAN:
- Setiap section dibungkus <section className="px-4 md:px-8 lg:px-16 py-8">
- Antar section ada jarak yang konsisten
- Tambahkan metadata di page.js:
  export const metadata = {
    title: "DramaHub - Nonton Drama Korea Subtitle Indonesia",
    description: "Nonton streaming drama Korea terbaru dengan subtitle Indonesia"
  };
```

---

## 📺 TAHAP 5 — Halaman Drama & Movie (app/drama/page.js & app/movie/page.js)

**[PROMPT 5 — Masukkan setelah Prompt 4 selesai]**

```
Buatkan halaman daftar drama dan movie dengan sistem filter lengkap.

FILE 1 — src/app/drama/page.js (Server Component):
Baca search params dari props:
export default async function DramaPage({ searchParams }) {
  const page = searchParams.page || 1;
  const genre = searchParams.genre || "";
  const year = searchParams.year || "";
  const sort = searchParams.sort || "first_air_date.desc";
  const network = searchParams.network || "";
  
  const params = {
    sort_by: sort,
    page,
    ...(genre && { with_genres: genre }),
    ...(year && { first_air_date_year: year }),
    ...(network && { with_networks: network }),
  };
  
  const data = await getDiscoverTV(params);
  
  return (
    <main>
      <PageHero title="Daftar Drama Korea" breadcrumb={["Beranda", "Drama"]} />
      <div className="flex gap-6 px-4 md:px-8 lg:px-16 py-8">
        <FilterSidebar type="tv" currentFilters={{ genre, year, sort, network }} />
        <div className="flex-1">
          <p className="text-[#b3b3b3] text-sm mb-4">
            Menampilkan {data.results.length} dari {data.total_results.toLocaleString("id-ID")} drama
          </p>
          <MediaGrid items={data.results} />
          <Pagination 
            currentPage={parseInt(page)} 
            totalPages={Math.min(data.total_pages, 100)}
          />
        </div>
      </div>
    </main>
  );
}

FILE 2 — src/components/features/FilterSidebar.js ("use client"):
Props: type ("tv"/"movie"), currentFilters
State: selectedFilters (useState dari currentFilters)

Gunakan useRouter dan usePathname dari next/navigation untuk update URL:
function applyFilter(newFilter) {
  const params = new URLSearchParams();
  Object.entries({...selectedFilters, ...newFilter, page: 1}).forEach(([k,v]) => {
    if (v) params.set(k, v);
  });
  router.push(`${pathname}?${params.toString()}`);
}

FILTER ITEMS:

GENRE TV (TMDB Genre IDs):
const TV_GENRES = [
  { id: 10759, name: "Aksi & Petualangan" },
  { id: 35, name: "Komedi" },
  { id: 18, name: "Drama" },
  { id: 10765, name: "Sci-Fi & Fantasy" },
  { id: 9648, name: "Misteri" },
  { id: 10749, name: "Romantis" },
  { id: 27, name: "Horor" },
  { id: 10762, name: "Anak-anak" },
];

NETWORK IDs:
const NETWORKS = [
  { id: 213, name: "Netflix" },
  { id: 1706, name: "tvN" },
  { id: 343, name: "MBC" },
  { id: 356, name: "KBS2" },
  { id: 399, name: "SBS" },
  { id: 2285, name: "JTBC" },
  { id: 3290, name: "Disney+" },
];

TAHUN: dari 2026 sampai 2010

SORT:
- Terbaru: first_air_date.desc
- Terpopuler: popularity.desc
- Rating Tertinggi: vote_average.desc
- A-Z: name.asc

UI FilterSidebar:
- Width: w-64, shrink-0
- Sticky: sticky top-20 self-start (agar tidak ikut scroll)
- Background: bg-[#141414] rounded-lg p-4
- Setiap filter group: judul bold + daftar pilihan
- Genre: checkbox list
- Network: checkbox list
- Tahun: select dropdown
- Sort: select dropdown
- Tombol [Terapkan Filter] merah + [Reset] transparan

FILE 3 — src/app/movie/page.js:
SAMA dengan drama/page.js tapi:
- Ganti getDiscoverTV → getDiscoverMovie
- Filter genre movie berbeda (gunakan TMDB movie genre IDs)
- Filter network diganti dengan: Bioskop (without_genres), Netflix, dll
- Default sort: release_date.desc
- Label "drama" → "movie"

Buat PageHero component kecil untuk banner atas:
src/components/ui/PageHero.js
- Height: h-36 bg-gradient-to-r from-[#e50914]/20 to-transparent
- Judul h1 besar (font Poppins)
- Breadcrumb di bawah judul
```

---

## 📄 TAHAP 6 — Halaman Detail (app/detail/[type]/[id]/page.js)

**[PROMPT 6 — Masukkan setelah Prompt 5 selesai]**

```
Buatkan halaman detail drama/movie di src/app/detail/[type]/[id]/page.js
Ini Server Component — fetch data di server.

export async function generateMetadata({ params }) {
  const detail = await getDetail(params.type, params.id);
  return {
    title: `${detail.name || detail.title} - DramaHub`,
    description: detail.overview,
    openGraph: {
      images: [`https://image.tmdb.org/t/p/w500${detail.poster_path}`]
    }
  };
}

export default async function DetailPage({ params }) {
  const { type, id } = params;
  
  const [detail, credits, videos, recommendations, similar] = await Promise.all([
    getDetail(type, id),
    getCredits(type, id),
    getVideos(type, id),
    getRecommendations(type, id),
    getSimilar(type, id),
  ]);
  
  // Jika drama (tv), ambil season 1
  const season1 = type === "tv" ? await getSeason(id, 1) : null;
  
  return (...);
}

LAYOUT HALAMAN DETAIL:

1. HERO SECTION (relative, min-height: 60vh):
   - Background: next/image backdrop fullwidth, object-cover, brightness-30
   - Gradient: absolute inset-0, from-[#0d0d0d] via-[#0d0d0d]/70 to-transparent (dari bawah)
   - Konten di atas background (relative z-10, flex, pt-20 pb-12 px-4 md:px-16):
   
   KIRI — Poster (w-48 md:w-64 shrink-0):
   - next/image poster (w342), rounded-[8px], shadow-2xl
   - Di bawah poster (hanya di mobile): tombol Tonton + Watchlist
   
   KANAN — Info (flex-1 md:pl-8 mt-4 md:mt-0):
   - Row badges: [TV SERIES/MOVIE] [ONGOING/COMPLETED]
   - Judul asli Korea (text-sm text-[#b3b3b3])
   - Judul Indonesia (text-2xl md:text-4xl font-bold font-Poppins)
   - Rating bintang (5 bintang visual) + "X vote"
   - Grid info 2 kolom:
     Tahun | Network | Episode (jika TV) | Durasi | Studio | Negara
   - Genre pills (flex-wrap gap-2)
   - Sinopsis (text-[#b3b3b3] line-clamp-4)
   - Tombol (hanya desktop):
     [▶ Tonton Sekarang] → Link ke /watch/{type}/{id}
     [+ Watchlist] → localStorage logic (Client Component)
     [Share] → Web Share API

2. TABS SECTION (sticky top-16):
   Gunakan @radix-ui/react-tabs:
   Tab: Info | Episode | Cast | Trailer
   
   TAB INFO:
   - Tabel info lengkap 2 kolom
   - TMDB Score besar
   
   TAB EPISODE (hanya jika type="tv"):
   - Select dropdown untuk pilih season
   - List episode: grid atau list
   - Setiap episode: thumbnail (16:9, w185), nomor ep, judul, tanggal, tombol Tonton
   - Saat klik Tonton: navigasi ke /watch/tv/{id}?season={s}&episode={e}
   - Data episode dari season1 (fetch season lain jika season dropdown berubah)
   - Untuk switch season: buat "use client" component EpisodeList.js
     yang fetch season baru saat dropdown berubah

   TAB CAST:
   - Grid 4-6 kolom: foto lingkaran (w92), nama, nama karakter
   - Maksimal tampilkan 12 cast utama
   
   TAB TRAILER:
   - Grid thumbnail trailer YouTube
   - Klik: tampilkan YouTube embed di modal (@radix-ui/react-dialog)
   - Filter hanya type "Trailer" dari videos.results

3. SECTION REKOMENDASI:
   <SectionHeader title="Mungkin Kamu Suka" />
   <MediaGrid items={recommendations.results.slice(0,10)} />
   
   <SectionHeader title="Drama Serupa" />
   <MediaGrid items={similar.results.slice(0,10)} />
```

---

## ▶️ TAHAP 7 — Halaman Watch/Streaming (app/watch/[type]/[id]/page.js)

**[PROMPT 7 — Masukkan setelah Prompt 6 selesai]**

```
Buatkan halaman streaming di src/app/watch/[type]/[id]/page.js
HALAMAN INI YANG PALING PENTING!

Server Component untuk fetch data:
export default async function WatchPage({ params, searchParams }) {
  const { type, id } = params;
  const season = searchParams.season || 1;
  const episode = searchParams.episode || 1;
  
  const [detail, season1Data] = await Promise.all([
    getDetail(type, id),
    type === "tv" ? getSeason(id, season) : Promise.resolve(null)
  ]);
  
  return (
    <WatchClient
      detail={detail}
      type={type}
      id={id}
      season={parseInt(season)}
      episode={parseInt(episode)}
      seasonData={season1Data}
    />
  );
}

BUAT CLIENT COMPONENT — src/components/features/WatchClient.js:
"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";

Props: detail, type, id, season, episode, seasonData

State:
- activeServer: "VidSrc" (default)
- currentSeason: season
- currentEpisode: episode
- seasonData: seasonData
- loadingEpisodes: false
- embedUrl: computed

Logic:
1. getEmbedUrl dari lib/embed.js
2. Switch server: update activeServer + recompute embedUrl
3. Switch episode: update URL params + update state
4. Switch season: fetch season baru dari TMDB client-side + update state

async function fetchSeason(seasonNum) {
  setLoadingEpisodes(true);
  const res = await fetch(`/api/tmdb/tv/${id}/season/${seasonNum}`);
  const data = await res.json();
  setSeasonData(data);
  setLoadingEpisodes(false);
}

BUAT API ROUTE untuk proxy TMDB (agar API key aman):
src/app/api/tmdb/[...path]/route.js:
import { NextResponse } from "next/server";
export async function GET(request, { params }) {
  const path = params.path.join("/");
  const searchParams = request.nextUrl.searchParams;
  const url = new URL(`https://api.themoviedb.org/3/${path}`);
  url.searchParams.set("api_key", process.env.TMDB_API_KEY);
  url.searchParams.set("language", "id-ID");
  searchParams.forEach((v, k) => url.searchParams.set(k, v));
  const res = await fetch(url.toString());
  const data = await res.json();
  return NextResponse.json(data);
}

LAYOUT WatchClient:

NAVBAR MINIMAL:
- Hanya logo + breadcrumb + link "Kembali ke Detail"

KONTEN UTAMA (flex, gap-4, px-4 md:px-8):

KOLOM KIRI — PLAYER (flex-1):
a) Info di atas player:
   - Breadcrumb: DramaHub > {detail.name} > S{season} Ep{episode}
   - Judul episode dari seasonData
   - Prev/Next episode buttons (disabled jika sudah di ujung)

b) Video Player:
   <div style={{paddingTop: "56.25%", position: "relative"}}>
     <iframe
       key={embedUrl}  // key untuk force remount saat URL berubah
       src={embedUrl}
       style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",border:"none"}}
       allowFullScreen
       allow="autoplay; encrypted-media"
     />
   </div>

c) Server Selector (di bawah player):
   Label "Pilih Server:"
   {Object.keys(SERVERS[type]).map(server => (
     <button
       key={server}
       onClick={() => switchServer(server)}
       className={activeServer === server
         ? "border border-[#e50914] text-[#e50914] bg-[#e50914]/10 px-4 py-2 rounded text-sm"
         : "border border-[#444] text-[#b3b3b3] hover:border-white px-4 py-2 rounded text-sm"
       }
     >
       {server} {activeServer === server && "(Aktif)"}
     </button>
   ))}

d) Info drama di bawah player:
   - Judul + badges genre
   - Rating, tahun, network
   - Sinopsis 3 baris

KOLOM KANAN — EPISODE LIST (w-72, hidden di mobile):
- Background: bg-[#141414] rounded-lg
- Dropdown pilih season (jika drama punya multi-season)
- List episode vertikal dengan overflow-y-auto max-h-[600px]:
  Per item: flex row:
  - Thumbnail kecil 80x50px (w154 TMDB)
  - Ep {nomor} - {judul episode} (line-clamp-1)
  - Tanggal rilis (text-xs text-[#666])
  - Active episode: border-l-2 border-[#e50914] bg-[#1c1c1c]

MOBILE: Episode list jadi accordion/drawer di bawah player (toggle button "Daftar Episode ▼")

TOAST NOTIFICATION:
Saat pertama load, tampilkan toast:
"Jika video tidak muncul, coba ganti server di bawah player"
Auto-dismiss setelah 5 detik.
Implementasi: useEffect + setTimeout + state showToast

DISCLAIMER di bawah halaman:
<p className="text-xs text-[#444] text-center mt-8 pb-4">
  DramaHub tidak menyimpan atau menghost konten video apapun. 
  Video disediakan oleh penyedia layanan pihak ketiga.
</p>
```

---

## 🔍 TAHAP 8 — Halaman Search (app/search/page.js)

**[PROMPT 8 — Masukkan setelah Prompt 7 selesai]**

```
Buatkan halaman search di src/app/search/page.js (Server Component):

export default async function SearchPage({ searchParams }) {
  const query = searchParams.q || "";
  const filter = searchParams.type || "all"; // all, tv, movie
  const page = searchParams.page || 1;
  
  if (!query) redirect("/");
  
  const data = await searchMulti(query, page);
  
  // Filter hasil: hanya tv dan movie (bukan person)
  const results = data.results.filter(item =>
    item.media_type === "tv" || item.media_type === "movie"
  );
  
  return (...);
}

LAYOUT:
1. SEARCH BAR BESAR di atas (Client Component):
   - Pre-filled dengan query saat ini
   - Submit → router.push(/search?q={query})
   - Clear button

2. FILTER TABS:
   [Semua] [Drama TV] [Movie]
   - Klik → update URL ?type=all/tv/movie

3. HASIL:
   - Teks "X hasil untuk '{query}'"
   - MediaGrid dengan hasil yang sudah difilter berdasarkan tab aktif
   - Pagination

4. EMPTY STATE (jika tidak ada hasil):
   <div className="flex flex-col items-center justify-center py-24 gap-4">
     <Search size={64} className="text-[#333]" />
     <h2 className="text-xl font-semibold">Tidak ada hasil untuk "{query}"</h2>
     <p className="text-[#666]">Coba kata kunci lain atau periksa ejaan</p>
     <Link href="/" className="bg-[#e50914] text-white px-6 py-2 rounded">
       Kembali ke Beranda
     </Link>
   </div>

TAMBAHAN — Update Navbar SearchBar (src/components/layout/Navbar.js):
- Buat komponen SearchBar dengan live suggestion
- Saat user mengetik (debounce 400ms), fetch /api/search?q={input}
- Buat API route: src/app/api/search/route.js yang query ke TMDB /search/multi
- Tampilkan dropdown suggestion maksimal 5 item (poster kecil + judul + tipe)
- Klik suggestion → navigasi ke /detail/{type}/{id}
- Enter → navigasi ke /search?q={query}
- Tekan Escape → tutup suggestion
```

---

## 🏆 TAHAP 9 — Halaman Top Drama & Finishing

**[PROMPT 9 — Masukkan setelah Prompt 8 selesai]**

```
Buatkan halaman Top Drama dan lakukan finishing touches.

BAGIAN 1 — src/app/top/page.js (Server Component):
const [topTV, topMovie] = await Promise.all([
  getDiscoverTV({ sort_by: "vote_average.desc", "vote_count.gte": 300, page: 1 }),
  getDiscoverMovie({ sort_by: "vote_average.desc", "vote_count.gte": 300, page: 1 })
]);

Layout:
- Tab switch: [Top Drama] [Top Movie]
- List format (bukan grid) untuk ranking feel:
  Per baris (flex, items-center, gap-4, p-3, rounded, hover:bg-[#1c1c1c]):
  - Rank number: text-3xl font-bold, emas untuk 1-3, perak 4-10, abu >10
  - Poster kecil: 60x90px, rounded
  - Info: judul, genre, network, tahun
  - Rating bar: flex-1, max-w-32:
    <div className="bg-[#1c1c1c] rounded-full h-2 overflow-hidden">
      <div style={{width: `${item.vote_average * 10}%`}} className="h-2 bg-gradient-to-r from-[#e50914] to-[#f5a623]" />
    </div>
    Score besar di kanan: text-2xl font-bold text-[#f5a623]

- Load More button di bawah (fetch halaman berikutnya client-side, append ke list)

BAGIAN 2 — FINISHING: Buat halaman not-found.js dan error.js

src/app/not-found.js:
export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-8xl font-bold text-[#e50914]">404</h1>
      <p className="text-2xl font-semibold">Halaman Tidak Ditemukan</p>
      <p className="text-[#b3b3b3]">Halaman yang kamu cari tidak ada atau telah dipindahkan</p>
      <Link href="/" className="bg-[#e50914] text-white px-6 py-3 rounded-[6px] mt-4">
        Kembali ke Beranda
      </Link>
    </div>
  );
}

src/app/error.js:
"use client";
export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Terjadi Kesalahan</h2>
      <p className="text-[#b3b3b3]">{error.message}</p>
      <button onClick={reset} className="bg-[#e50914] text-white px-6 py-3 rounded">
        Coba Lagi
      </button>
    </div>
  );
}

src/app/loading.js (Global loading UI):
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-[#1c1c1c] border-t-[#e50914] rounded-full animate-spin" />
    </div>
  );
}
```

---

## 🚀 TAHAP 10 — Deploy ke Vercel

**[PROMPT 10 — Prompt Terakhir]**

```
Lakukan persiapan deploy project DramaHub ke Vercel:

LANGKAH 1 — Pastikan next.config.js sudah benar:
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.tmdb.org",
        pathname: "/t/p/**",
      },
      {
        protocol: "https",
        hostname: "img.youtube.com",
      }
    ],
  },
};
module.exports = nextConfig;

LANGKAH 2 — Buat file .gitignore (jika belum ada):
node_modules/
.next/
.env.local
.env
out/

LANGKAH 3 — Buat README.md singkat:
# DramaHub
Website streaming drama Korea dengan subtitle Indonesia.
Built with Next.js 15, Tailwind CSS v4, dan TMDB API.

## Setup
1. Clone repo ini
2. cp .env.example .env.local
3. Isi TMDB_API_KEY di .env.local
4. npm install
5. npm run dev

LANGKAH 4 — Buat .env.example:
TMDB_API_KEY=your_tmdb_api_key_here
NEXT_PUBLIC_SITE_NAME=DramaHub
NEXT_PUBLIC_SITE_URL=https://yourdomain.vercel.app

LANGKAH 5 — Build test lokal sebelum deploy:
npm run build

Jika ada error build, perbaiki dulu sebelum deploy.

LANGKAH 6 — Cara deploy ke Vercel:
Opsi A (CLI):
  npm install -g vercel
  vercel login
  vercel --prod

Opsi B (Dashboard - lebih mudah):
  1. Push kode ke GitHub repository
  2. Buka vercel.com → New Project
  3. Import dari GitHub
  4. Di bagian Environment Variables, tambahkan:
     TMDB_API_KEY = (api key kamu)
  5. Klik Deploy
  6. Website live dalam 1-2 menit!

OPTIMASI TAMBAHAN sebelum deploy:
1. Tambahkan <Suspense> wrapper di homepage untuk streaming SSR
2. Pastikan semua Client Components ada "use client" di baris pertama
3. Cek semua Image tag sudah pakai next/image
4. Cek semua Link sudah pakai next/link
5. Jalankan: npm run lint — pastikan tidak ada error ESLint

Setelah build sukses dan tidak ada error, project siap untuk deploy!
```

---

## 📊 PERBEDAAN VERSI HTML vs NEXT.JS

| Aspek | Versi HTML | Versi Next.js |
|-------|-----------|--------------|
| SEO | ❌ Data tidak terindex Google | ✅ Server Rendering, Google bisa baca |
| API Key | ❌ Terlihat di browser | ✅ Aman di server (env variable) |
| Routing | ❌ URL params manual | ✅ File-based routing otomatis |
| Image | ❌ Manual lazy load | ✅ next/image auto optimize + WebP |
| Loading | ❌ Flash of content | ✅ Suspense + Skeleton bawaan |
| Deploy | ✅ Drag & drop Netlify | ✅ Vercel 1 klik (lebih powerful) |
| Skalabilitas | ❌ Susah di-maintain | ✅ Component architecture |
| Cache | ❌ Manual sessionStorage | ✅ next fetch cache otomatis |

---

## 🔗 REFERENSI URL PENTING

- TMDB API Docs: https://developer.themoviedb.org/docs
- Next.js 15 Docs: https://nextjs.org/docs
- Tailwind CSS v4: https://tailwindcss.com/docs/v4-beta
- VidSrc Docs: https://vidsrc.me/
- Deploy ke Vercel: https://vercel.com/docs

---

*Guide ini dibuat khusus untuk Google Antigravity (Gemini-powered). Total 10 prompt menghasilkan website drama Korea profesional setara produksi.*
