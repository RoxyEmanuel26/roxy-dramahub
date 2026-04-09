# 🎬 DramaHub

Nonton Drama Korea Subtitle Indonesia — Platform streaming gratis untuk drama dan movie Korea.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Data Source**: TMDB API (server-side)
- **Video**: VidSrc, 2Embed, SuperEmbed
- **Icons**: Lucide React
- **Carousel**: Swiper

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Setup environment
cp .env.example .env.local

# 3. Add your TMDB API key to .env.local
# Get free key: https://www.themoviedb.org/settings/api

# 4. Run dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push ke GitHub
2. Import di [vercel.com/new](https://vercel.com/new)
3. Add Environment Variable:
   - **Key**: `TMDB_API_KEY`
   - **Value**: API key dari TMDB
4. Deploy ✅

## Folder Structure

```
src/
├── app/                  # Pages & Routes
│   ├── page.js           # Homepage
│   ├── drama/            # Drama listing
│   ├── movie/            # Movie listing
│   ├── detail/[type]/[id] # Detail page
│   ├── watch/[type]/[id]  # Streaming player
│   ├── search/           # Search results
│   ├── top/              # Top rankings
│   └── api/              # TMDB proxy routes
├── components/
│   ├── layout/           # Navbar, Footer, ThemeProvider
│   ├── ui/               # MediaCard, MediaGrid, HeroBanner, etc.
│   └── features/         # FilterSidebar, WatchClient, DetailTabs
└── lib/                  # tmdb.js, embed.js, utils.js
```

## License

© 2026 DramaHub. Educational use only.
