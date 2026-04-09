# 🔄 UPDATE PROMPT — Samakan Persis dengan Drakorz.com
### Tambahan & Pembaruan untuk prompt-drakorz-nextjs-antigravity.md
**Update ini menggantikan TAHAP 2, TAHAP 3 (Footer), TAHAP 6 (Detail), dan menambah halaman legal baru**

---

## 📐 ANALISIS DESAIN DRAKORZ.COM (Hasil Riset)

Sebelum masuk ke prompt, ini detail desain yang sudah dianalisis dari drakorz.com:

**Warna:**
- Background utama: ~#0a0a0a (hitam sangat pekat)
- Surface card: ~#111111
- Border/divider: ~#1e1e1e
- Teks utama: #ffffff
- Teks sekunder: #999999
- Accent: merah/oranye untuk rating dan badge
- Rating stars: kuning/emas

**Navigasi:** Drama | Movie | Kategori | Top Drama + Search bar
**Footer:** 3 kolom — Informasi | Kategori | Navigasi + deskripsi bawah
**Detail page:** Title (Tahun) + Tabs INFO/EPISODE/CAST/TRAILER + Info metadata + Sinopsis + Rekomendasi

---

## 🎨 UPDATE TAHAP 2 — Design System Persis Drakorz.com

**[PROMPT 2 BARU — Ganti Prompt 2 lama dengan ini]**

```
Update design system DramaHub agar tampilannya persis seperti drakorz.com.
Berdasarkan analisis langsung dari website drakorz.com, gunakan spesifikasi berikut:

BAGIAN 1 — src/app/globals.css (GANTI SELURUH ISI LAMA):

@import "tailwindcss";

@custom-variant dark (&:where([data-theme=dark], [data-theme=dark] *));

@theme {
  /* ===== WARNA — IDENTIK DRAKORZ.COM ===== */
  
  /* Background layers — hitam pekat seperti drakorz */
  --color-bg: #0a0a0a;
  --color-surface: #111111;
  --color-surface-2: #161616;
  --color-surface-3: #1e1e1e;
  --color-surface-hover: #222222;
  
  /* Border & divider — hampir tak terlihat, subtle */
  --color-border: #1e1e1e;
  --color-border-light: rgba(255, 255, 255, 0.06);
  
  /* Teks */
  --color-text: #f0f0f0;
  --color-text-muted: #999999;
  --color-text-faint: #555555;
  
  /* Accent — merah seperti drakorz */
  --color-accent: #dc2626;
  --color-accent-hover: #b91c1c;
  --color-accent-soft: rgba(220, 38, 38, 0.12);
  
  /* Rating & star — kuning seperti drakorz */
  --color-star: #f59e0b;
  --color-star-bg: rgba(245, 158, 11, 0.15);
  
  /* Badge warna */
  --color-badge-tv: #1d4ed8;      /* Biru untuk TV */
  --color-badge-movie: #dc2626;    /* Merah untuk Movie */
  --color-badge-ongoing: #16a34a;  /* Hijau untuk Ongoing */
  --color-badge-ended: #525252;    /* Abu untuk Ended */
  
  /* ===== TIPOGRAFI ===== */
  --font-display: 'Poppins', sans-serif;
  --font-body: 'Inter', sans-serif;
  
  /* ===== SPACING ===== */
  --container-max: 1280px;
  --container-padding: 1rem;
  
  /* ===== RADIUS ===== */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-full: 9999px;
  
  /* ===== SHADOW ===== */
  --shadow-card: 0 2px 8px rgba(0, 0, 0, 0.6);
  --shadow-hover: 0 8px 24px rgba(0, 0, 0, 0.8);
  --shadow-navbar: 0 1px 0 rgba(255, 255, 255, 0.05);
  
  /* ===== TRANSISI ===== */
  --transition: 200ms ease;
  --transition-slow: 350ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* Import Font — sama seperti yang dipakai drakorz */
@import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300..700;1,14..32,300..700&family=Poppins:wght@600;700;800&display=swap');

/* ===== BASE RESET ===== */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

html {
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-body);
  font-size: 15px;
  line-height: 1.6;
  min-height: 100dvh;
}

/* ===== SCROLLBAR CUSTOM — DRAKORZ STYLE ===== */
::-webkit-scrollbar { width: 4px; height: 4px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 2px; }
::-webkit-scrollbar-thumb:hover { background: #555; }

/* ===== LINK ===== */
a { color: inherit; text-decoration: none; transition: color var(--transition); }

/* ===== IMAGE ===== */
img { display: block; max-width: 100%; height: auto; }

/* ===== INPUT ===== */
input, button, select { font: inherit; }
button { cursor: pointer; background: none; border: none; color: inherit; }

/* ===== UTILITIES ===== */
.line-clamp-1 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; }
.line-clamp-2 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; }
.line-clamp-3 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; }
.line-clamp-4 { overflow: hidden; display: -webkit-box; -webkit-line-clamp: 4; -webkit-box-orient: vertical; }

/* Container */
.container {
  max-width: var(--container-max);
  margin-inline: auto;
  padding-inline: var(--container-padding);
}

/* ===== ANIMASI ===== */
@keyframes shimmer {
  0% { background-position: -400px 0; }
  100% { background-position: 400px 0; }
}
.skeleton {
  background: linear-gradient(90deg, #161616 25%, #222 50%, #161616 75%);
  background-size: 400px 100%;
  animation: shimmer 1.4s ease-in-out infinite;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
}
.fade-in { animation: fadeInUp 0.35s ease forwards; }

@keyframes spin {
  to { transform: rotate(360deg); }
}
.spin { animation: spin 0.8s linear infinite; }

/* ===== KOMPONEN DASAR ===== */

/* Button Primary — merah seperti drakorz */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: var(--color-accent);
  color: white;
  padding: 10px 20px;
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 14px;
  transition: background var(--transition);
}
.btn-primary:hover { background: var(--color-accent-hover); }

/* Button Secondary — transparan border */
.btn-secondary {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: transparent;
  color: var(--color-text);
  padding: 10px 20px;
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-md);
  font-weight: 500;
  font-size: 14px;
  transition: all var(--transition);
}
.btn-secondary:hover {
  background: var(--color-surface-2);
  border-color: rgba(255,255,255,0.15);
}

/* Badge */
.badge {
  display: inline-flex;
  align-items: center;
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}
.badge-tv { background: var(--color-badge-tv); color: white; }
.badge-movie { background: var(--color-badge-movie); color: white; }
.badge-ongoing { background: var(--color-badge-ongoing); color: white; }
.badge-ended { background: var(--color-badge-ended); color: #ccc; }

/* Genre pill — seperti drakorz */
.genre-pill {
  display: inline-block;
  padding: 4px 12px;
  border: 1px solid rgba(255,255,255,0.15);
  border-radius: var(--radius-full);
  font-size: 12px;
  color: var(--color-text-muted);
  transition: all var(--transition);
}
.genre-pill:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}

/* Section title — dengan garis merah di kiri, persis drakorz */
.section-title {
  font-family: var(--font-display);
  font-size: 18px;
  font-weight: 700;
  color: var(--color-text);
  padding-left: 12px;
  border-left: 3px solid var(--color-accent);
  line-height: 1;
}

/* Star rating */
.stars {
  display: inline-flex;
  gap: 2px;
  color: var(--color-star);
  font-size: 14px;
}

/* Rating score badge */
.rating-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  background: rgba(245, 158, 11, 0.15);
  color: var(--color-star);
  padding: 3px 8px;
  border-radius: var(--radius-sm);
  font-size: 12px;
  font-weight: 600;
}

/* ===== MEDIA CARD — PERSIS DRAKORZ ===== */
.media-card {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
  background: var(--color-surface);
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
}
.media-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
}
.media-card-poster {
  aspect-ratio: 2/3;
  width: 100%;
  object-fit: cover;
  display: block;
}
.media-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.9) 100%);
  opacity: 0;
  transition: opacity var(--transition);
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px;
}
.media-card:hover .media-card-overlay { opacity: 1; }
.media-card-badge-tl {
  position: absolute;
  top: 8px;
  left: 8px;
}
.media-card-badge-tr {
  position: absolute;
  top: 8px;
  right: 8px;
}
.media-card-info {
  padding: 8px 4px 4px;
}
.media-card-title {
  font-size: 13px;
  font-weight: 600;
  color: var(--color-text);
  line-height: 1.3;
}
.media-card-year {
  font-size: 11px;
  color: var(--color-text-muted);
  margin-top: 3px;
}
```

BAGIAN 2 — src/components/layout/Navbar.js (GANTI SELURUH ISI):
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, X, Menu, Tv, Film, Grid3X3, TrendingUp } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef(null);

  // Deteksi scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Focus search saat dibuka
  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
  }, [searchOpen]);

  function handleSearch(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  const navLinks = [
    { href: "/drama", label: "Drama", icon: <Tv size={16} /> },
    { href: "/movie", label: "Movie", icon: <Film size={16} /> },
    { href: "/kategori", label: "Kategori", icon: <Grid3X3 size={16} /> },
    { href: "/top", label: "Top Drama", icon: <TrendingUp size={16} /> },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#0a0a0a]/98 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.05)]" : "bg-transparent"
        }`}
      >
        <div className="container">
          <div className="flex items-center justify-between h-14 gap-4">
            
            {/* LOGO — persis gaya drakorz */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              {/* SVG Logo: D dalam kotak merah */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="5" fill="#dc2626"/>
                <text x="14" y="20" textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="Poppins, sans-serif">D</text>
              </svg>
              <span style={{fontFamily: "Poppins, sans-serif"}} className="text-white font-bold text-lg tracking-tight">
                DramaHub
              </span>
            </Link>

            {/* NAVIGASI DESKTOP */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname.startsWith(link.href)
                      ? "text-white bg-white/8"
                      : "text-[#999] hover:text-white hover:bg-white/5"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* KANAN: SEARCH + HAMBURGER */}
            <div className="flex items-center gap-2">
              {/* Search bar */}
              {searchOpen ? (
                <form onSubmit={handleSearch} className="flex items-center">
                  <input
                    ref={searchRef}
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Cari drama, movie..."
                    className="bg-[#1e1e1e] text-white placeholder:text-[#555] border border-[#2a2a2a] rounded-l-md px-3 py-1.5 text-sm outline-none focus:border-[#dc2626] w-48 md:w-64 transition-all"
                  />
                  <button type="submit" className="bg-[#dc2626] hover:bg-[#b91c1c] text-white px-3 py-1.5 rounded-r-md transition-colors">
                    <Search size={16} />
                  </button>
                  <button type="button" onClick={() => setSearchOpen(false)} className="ml-2 text-[#999] hover:text-white p-1">
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  className="text-[#999] hover:text-white p-2 rounded-md hover:bg-white/5 transition-colors"
                  aria-label="Buka pencarian"
                >
                  <Search size={18} />
                </button>
              )}
              
              {/* Hamburger mobile */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden text-[#999] hover:text-white p-2 rounded-md hover:bg-white/5 transition-colors"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>

          {/* MOBILE MENU */}
          {mobileOpen && (
            <nav className="md:hidden border-t border-[#1e1e1e] py-2 pb-4">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    pathname.startsWith(link.href)
                      ? "text-white bg-white/5"
                      : "text-[#999] hover:text-white"
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>
      </header>
      
      {/* Spacer agar konten tidak ketutup navbar */}
      <div className="h-14" />
    </>
  );
}
```

---

## 🦶 UPDATE FOOTER — Persis Drakorz.com

**[PROMPT FOOTER BARU — Ganti komponen Footer lama]**

```
Ganti seluruh isi src/components/layout/Footer.js dengan footer yang IDENTIK dengan drakorz.com.

Berdasarkan analisis drakorz.com, footer memiliki:
- 3 kolom: Informasi | Kategori | Navigasi
- Deskripsi panjang di bawah kolom Navigasi
- Copyright di paling bawah
- Background sangat gelap (#080808 atau #0a0a0a)
- Warna teks muted

KODE FOOTER:

import Link from "next/link";

const SITE_NAME = "DramaHub";
const SITE_YEAR = new Date().getFullYear();

const INFO_LINKS = [
  { href: "/tentang-kami", label: "Tentang Kami" },
  { href: "/kontak", label: "Kontak" },
  { href: "/dmca-disclaimer", label: "DMCA Disclaimer" },
  { href: "/kebijakan-privasi", label: "Kebijakan Privasi" },
  { href: "/syarat-ketentuan", label: "Syarat & Ketentuan" },
];

const GENRE_LINKS = [
  { href: "/drama?genre=10749", label: "Romance" },
  { href: "/drama?genre=35", label: "Comedy" },
  { href: "/drama?genre=18", label: "Drama" },
  { href: "/drama?genre=9648", label: "Thriller" },
  { href: "/drama?genre=10765", label: "Fantasy" },
  { href: "/drama?genre=27", label: "Horror" },
  { href: "/drama?genre=10759", label: "Action" },
  { href: "/movie", label: "Movie" },
];

const NAV_LINKS = [
  { href: "/drama", label: "Drama" },
  { href: "/movie", label: "Movie" },
  { href: "/kategori", label: "Kategori" },
  { href: "/top", label: "Top Drama" },
  { href: "/search", label: "Pencarian" },
];

const SITE_DESCRIPTION = `${SITE_NAME} adalah platform streaming drama korea subtitle Indonesia yang menyediakan berbagai judul drama korea terbaik, mulai dari drakor terbaru hingga drakor klasik. ${SITE_NAME} menghadirkan kualitas video terbaik dan dapat dinikmati secara gratis. ${SITE_NAME} juga berkomitmen untuk menyediakan layanan nonton drama korea berkualitas tanpa biaya langganan apa pun, sehingga semua penggemar drakor dapat menikmati tayangan favorit mereka dengan mudah.`;

export default function Footer() {
  return (
    <footer style={{ background: "#080808", borderTop: "1px solid #161616" }}>
      <div className="container py-10">
        
        {/* 3 KOLOM UTAMA */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* KOLOM 1 — INFORMASI */}
          <div>
            <h3 style={{ color: "#f0f0f0", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>
              Informasi
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {INFO_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "#888", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#dc2626"}
                    onMouseLeave={e => e.target.style.color = "#888"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 2 — KATEGORI */}
          <div>
            <h3 style={{ color: "#f0f0f0", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>
              Kategori
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
              {GENRE_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "#888", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#dc2626"}
                    onMouseLeave={e => e.target.style.color = "#888"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* KOLOM 3 — NAVIGASI */}
          <div>
            <h3 style={{ color: "#f0f0f0", fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: "15px", marginBottom: "14px" }}>
              Navigasi
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{ color: "#888", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={e => e.target.style.color = "#dc2626"}
                    onMouseLeave={e => e.target.style.color = "#888"}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            {/* Deskripsi site di kolom navigasi */}
            <p style={{ color: "#555", fontSize: "12px", lineHeight: "1.7" }}>
              {SITE_DESCRIPTION}
            </p>
          </div>
        </div>

        {/* DIVIDER */}
        <div style={{ borderTop: "1px solid #161616", marginTop: "32px", paddingTop: "20px" }}>
          <p style={{ color: "#444", fontSize: "12px", textAlign: "center" }}>
            © {SITE_YEAR} by {SITE_NAME}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

---

## 📄 TAHAP BARU — Halaman Legal (5 Halaman)

**[PROMPT HALAMAN LEGAL — Masukkan setelah Footer selesai]**

```
Buatkan 5 halaman legal di Next.js App Router, persis seperti drakorz.com.
Gunakan layout yang sama: header tipis + konten artikel + footer.

BUAT FILE: src/app/(legal)/layout.js
Layout khusus halaman legal:
export default function LegalLayout({ children }) {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "60px 24px 80px" }}>
      {children}
    </div>
  );
}

CSS untuk halaman legal (tambahkan ke globals.css):
.legal-page h1 {
  font-family: Poppins, sans-serif;
  font-size: 28px;
  font-weight: 700;
  color: #f0f0f0;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #1e1e1e;
}
.legal-page h2 {
  font-family: Poppins, sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: #e0e0e0;
  margin-top: 28px;
  margin-bottom: 12px;
}
.legal-page h3 {
  font-size: 15px;
  font-weight: 600;
  color: #d0d0d0;
  margin-top: 20px;
  margin-bottom: 8px;
}
.legal-page p {
  color: #888;
  font-size: 14px;
  line-height: 1.8;
  margin-bottom: 14px;
}
.legal-page ul {
  list-style: none;
  padding: 0;
  margin-bottom: 14px;
}
.legal-page ul li {
  color: #888;
  font-size: 14px;
  line-height: 1.8;
  padding-left: 16px;
  position: relative;
}
.legal-page ul li::before {
  content: "•";
  position: absolute;
  left: 0;
  color: #dc2626;
}
.legal-page a { color: #dc2626; }
.legal-page a:hover { text-decoration: underline; }
.legal-page strong { color: #e0e0e0; }

---

FILE 1 — src/app/(legal)/syarat-ketentuan/page.js:

export const metadata = {
  title: "Syarat & Ketentuan - DramaHub",
  description: "Syarat dan ketentuan penggunaan layanan DramaHub"
};

export default function SyaratKetentuan() {
  return (
    <div className="legal-page">
      <h1>Syarat & Ketentuan</h1>
      
      <p>
        Dengan mengakses dan menggunakan situs <strong>DramaHub</strong>, Anda dianggap 
        telah membaca, memahami, dan menyetujui ketentuan layanan berikut:
      </p>

      <h3>1. Penggunaan Layanan</h3>
      <p>
        DramaHub hanya boleh digunakan untuk keperluan pribadi dan non-komersial. 
        Pengguna dilarang menggunakan situs ini untuk aktivitas ilegal, mencurigakan, 
        penipuan, spam, atau bentuk penyalahgunaan lainnya yang dapat merugikan pihak 
        lain maupun operasional situs.
      </p>

      <h3>2. Konten</h3>
      <p>
        DramaHub tidak memiliki atau mengunggah konten video secara langsung. Seluruh 
        konten disediakan oleh pihak ketiga atau sumber eksternal dan dapat dihapus, 
        diubah, atau diperbarui sewaktu-waktu tanpa pemberitahuan.
      </p>

      <h3>3. Tanggung Jawab Pengguna</h3>
      <p>
        Pengguna bertanggung jawab penuh atas aktivitas yang dilakukan saat mengakses 
        DramaHub. Segala risiko yang timbul dari penggunaan situs menjadi tanggung jawab 
        masing-masing pengguna.
      </p>

      <h3>4. Iklan dan Tautan Pihak Ketiga</h3>
      <p>
        DramaHub dapat menampilkan iklan atau tautan ke situs pihak ketiga. Kami tidak 
        memiliki kontrol atas isi, layanan, maupun kebijakan situs tersebut dan tidak 
        bertanggung jawab atas dampak atau kerugian yang mungkin terjadi.
      </p>

      <h3>5. Perubahan Layanan</h3>
      <p>
        DramaHub berhak untuk mengubah, memperbarui, membatasi, atau menghentikan 
        sebagian maupun seluruh layanan kapan saja tanpa pemberitahuan sebelumnya.
      </p>

      <h3>6. Pembatasan Tanggung Jawab</h3>
      <p>
        DramaHub tidak menjamin bahwa layanan akan selalu tersedia tanpa gangguan, 
        bebas dari kesalahan, atau sepenuhnya aman. Penggunaan situs sepenuhnya 
        menjadi risiko pengguna.
      </p>

      <h3>7. Persetujuan</h3>
      <p>
        Dengan tetap menggunakan DramaHub, Anda dianggap menyetujui seluruh Syarat & 
        Ketentuan yang berlaku di situs ini.
      </p>
    </div>
  );
}

---

FILE 2 — src/app/(legal)/kebijakan-privasi/page.js:

export const metadata = {
  title: "Kebijakan Privasi - DramaHub",
  description: "Kebijakan privasi dan perlindungan data pengguna DramaHub"
};

export default function KebijakanPrivasi() {
  return (
    <div className="legal-page">
      <h1>Kebijakan Privasi</h1>
      
      <p>
        Kebijakan Privasi ini menjelaskan bagaimana <strong>DramaHub</strong> mengumpulkan, 
        menggunakan, dan melindungi informasi pengguna saat mengakses dan menggunakan situs kami. 
        Dengan menggunakan DramaHub, Anda dianggap telah membaca, memahami, dan menyetujui 
        kebijakan privasi ini.
      </p>

      <h2>Informasi yang Kami Kumpulkan</h2>
      <p>DramaHub dapat mengumpulkan beberapa jenis informasi, antara lain:</p>
      <ul>
        <li>Informasi non-pribadi seperti alamat IP, jenis perangkat, browser, sistem operasi, dan halaman yang diakses</li>
        <li>Data penggunaan situs untuk keperluan analisis, statistik, dan peningkatan layanan</li>
        <li>Cookie dan teknologi serupa untuk meningkatkan pengalaman pengguna</li>
      </ul>
      <p>
        DramaHub tidak mengharuskan pengguna untuk membuat akun atau memberikan informasi 
        pribadi secara langsung untuk menikmati layanan streaming di situs kami.
      </p>

      <h2>Penggunaan Informasi</h2>
      <p>Informasi yang dikumpulkan digunakan untuk:</p>
      <ul>
        <li>Menjaga dan meningkatkan performa situs DramaHub</li>
        <li>Menganalisis aktivitas pengguna untuk pengembangan fitur dan konten</li>
        <li>Menyediakan pengalaman menonton yang lebih cepat, nyaman, dan relevan</li>
        <li>Menjaga keamanan sistem serta mencegah penyalahgunaan layanan</li>
      </ul>

      <h2>Cookie</h2>
      <p>DramaHub menggunakan cookie untuk:</p>
      <ul>
        <li>Menyimpan preferensi pengguna</li>
        <li>Memahami pola penggunaan situs</li>
        <li>Meningkatkan kecepatan dan kenyamanan saat mengakses layanan</li>
      </ul>
      <p>
        Pengguna dapat menonaktifkan cookie melalui pengaturan browser masing-masing. 
        Namun, beberapa fitur situs mungkin tidak berfungsi secara optimal jika cookie 
        dinonaktifkan.
      </p>

      <h2>Iklan Pihak Ketiga</h2>
      <p>
        DramaHub dapat menampilkan iklan dari pihak ketiga untuk mendukung operasional layanan. 
        Pihak ketiga tersebut mungkin menggunakan cookie, JavaScript, atau teknologi lainnya 
        untuk menampilkan iklan yang relevan kepada pengguna.
      </p>
      <p>
        DramaHub tidak memiliki kontrol atas cookie atau teknologi yang digunakan oleh pengiklan 
        pihak ketiga. Pengguna disarankan untuk membaca kebijakan privasi masing-masing penyedia iklan.
      </p>

      <h2>Perlindungan Data Pengguna</h2>
      <p>
        Kami berupaya menjaga keamanan informasi pengguna dengan menerapkan langkah-langkah teknis 
        dan operasional yang wajar untuk mencegah akses, perubahan, atau penyalahgunaan data 
        secara tidak sah.
      </p>
      <p>
        DramaHub tidak menjual, menyewakan, atau membagikan data pengguna kepada pihak lain 
        tanpa alasan yang sah atau kewajiban hukum.
      </p>

      <h2>Persetujuan Pengguna</h2>
      <p>
        Dengan menggunakan DramaHub, Anda menyetujui Kebijakan Privasi ini serta ketentuan 
        yang berlaku di situs kami. DramaHub dapat memperbarui kebijakan ini sewaktu-waktu 
        tanpa pemberitahuan terlebih dahulu.
      </p>
    </div>
  );
}

---

FILE 3 — src/app/(legal)/dmca-disclaimer/page.js:

export const metadata = {
  title: "DMCA Disclaimer - DramaHub",
  description: "Kebijakan DMCA dan disclaimer konten DramaHub"
};

export default function DmcaDisclaimer() {
  return (
    <div className="legal-page">
      <h1>DMCA Disclaimer</h1>

      <h2>DMCA (Digital Millennium Copyright Act)</h2>
      <p>
        <strong>DramaHub</strong> menghormati hak kekayaan intelektual dan berkomitmen 
        untuk mematuhi ketentuan DMCA serta peraturan hak cipta yang berlaku.
      </p>
      <p>
        Jika Anda adalah pemilik hak cipta atau perwakilan resmi dan menemukan konten 
        di DramaHub yang dianggap melanggar hak cipta, silakan ajukan pemberitahuan 
        DMCA dengan menyertakan informasi berikut:
      </p>
      <ul>
        <li>Identitas pemilik hak cipta atau perwakilan resminya</li>
        <li>URL halaman di DramaHub yang memuat konten yang dianggap melanggar</li>
        <li>Pernyataan bahwa Anda memiliki keyakinan dengan itikad baik bahwa penggunaan materi tersebut tidak diizinkan oleh pemilik hak cipta</li>
        <li>Pernyataan bahwa informasi yang diberikan adalah akurat dan Anda berwenang bertindak atas nama pemilik hak cipta</li>
      </ul>
      <p>
        Setelah menerima laporan DMCA yang valid, kami akan meninjau dan mengambil tindakan 
        yang diperlukan, termasuk menghapus atau menonaktifkan akses ke konten tersebut.
      </p>
      <p>
        Permohonan DMCA dapat dikirim melalui halaman <a href="/kontak">Kontak</a> yang 
        tersedia di situs DramaHub.
      </p>

      <h2>Disclaimer</h2>
      <p>
        DramaHub adalah situs penyedia informasi dan konten hiburan berupa streaming drama 
        Korea subtitle Indonesia yang tersedia secara online. <strong>Kami tidak menyimpan 
        file video di server kami sendiri.</strong> Semua konten yang ditampilkan di DramaHub 
        bersumber dari pihak ketiga dan hanya disematkan (embedded) dari berbagai sumber 
        publik yang tersedia di internet.
      </p>
      <p>
        DramaHub tidak bertanggung jawab atas hak cipta, keakuratan, atau isi dari konten 
        yang berasal dari pihak ketiga tersebut. Segala bentuk klaim hak cipta, pelanggaran, 
        atau masalah hukum terkait konten sepenuhnya menjadi tanggung jawab pihak penyedia 
        sumber asli.
      </p>
    </div>
  );
}

---

FILE 4 — src/app/(legal)/kontak/page.js:

export const metadata = {
  title: "Kontak - DramaHub",
  description: "Hubungi kami untuk kerja sama, iklan, atau laporan DMCA"
};

export default function Kontak() {
  return (
    <div className="legal-page">
      <h1>Kontak</h1>
      
      <p>
        Jika Anda memiliki pertanyaan, kerja sama, atau keperluan lain terkait{" "}
        <strong>DramaHub</strong>, silakan menghubungi kami melalui informasi di bawah 
        ini sesuai dengan kebutuhan Anda.
      </p>

      <h2>Kontak Iklan & Kerja Sama</h2>
      <p>DramaHub terbuka untuk berbagai bentuk kerja sama, termasuk:</p>
      <ul>
        <li>Pemasangan iklan</li>
        <li>Kerja sama promosi</li>
        <li>Partnership konten</li>
        <li>Media dan sponsorship</li>
      </ul>
      <p>
        Silakan hubungi kami melalui:<br />
        Email: 📧 <a href="mailto:iklan@dramahub.com">iklan@dramahub.com</a>
      </p>
      <p>
        Kami akan meninjau setiap penawaran dan menghubungi Anda kembali jika terdapat 
        kecocokan kerja sama.
      </p>

      <h2>Kontak DMCA & Hak Cipta</h2>
      <p>
        DramaHub menghormati hak cipta dan kekayaan intelektual. Jika Anda adalah pemilik 
        hak cipta atau perwakilan resmi dan menemukan konten yang dianggap melanggar hak 
        cipta di DramaHub, silakan menghubungi kami melalui:
      </p>
      <p>
        Email: 📧 <a href="mailto:dmca@dramahub.com">dmca@dramahub.com</a>
      </p>
      <p>Mohon sertakan informasi berikut dalam laporan DMCA Anda:</p>
      <ul>
        <li>Identitas pemilik hak cipta atau perwakilan resmi</li>
        <li>URL konten yang dilaporkan</li>
        <li>Bukti kepemilikan hak cipta</li>
        <li>Pernyataan bahwa laporan diajukan dengan itikad baik</li>
      </ul>
      <p>
        Kami akan menindaklanjuti laporan DMCA yang valid secepat mungkin sesuai dengan 
        ketentuan yang berlaku.
      </p>
    </div>
  );
}

---

FILE 5 — src/app/(legal)/tentang-kami/page.js:

export const metadata = {
  title: "Tentang Kami - DramaHub",
  description: "Tentang DramaHub, platform streaming drama Korea subtitle Indonesia"
};

export default function TentangKami() {
  return (
    <div className="legal-page">
      <h1>Tentang Kami</h1>

      <p>
        <strong>DramaHub</strong> hadir sebagai rumah bagi para pecinta drama Korea di 
        Indonesia. Kami memahami bahwa setiap cerita memiliki makna, setiap episode 
        menghadirkan emosi, dan setiap penonton berhak mendapatkan pengalaman menonton 
        terbaik. Karena itu, DramaHub diciptakan sebagai platform streaming drama Korea 
        subtitle Indonesia yang mengutamakan kenyamanan, kualitas, dan kemudahan akses 
        dalam satu tempat.
      </p>

      <p>
        Melalui koleksi drama yang lengkap, mulai dari rilisan terbaru, judul terpopuler, 
        hingga serial klasik favorit sepanjang masa, DramaHub berkomitmen menjadi destinasi 
        utama hiburan digital Anda. Didukung oleh server yang cepat dan stabil, kualitas 
        video jernih, serta subtitle Indonesia yang akurat, kami memastikan setiap momen 
        menonton terasa lancar tanpa gangguan.
      </p>

      <p>
        Bagi kami, hiburan bukan sekadar tontonan, tetapi juga jembatan yang menghubungkan 
        cerita, budaya, dan emosi. Oleh karena itu, DramaHub berusaha menghadirkan layanan 
        yang dapat dinikmati oleh semua kalangan, kapan saja dan di mana saja, termasuk 
        bagi masyarakat di wilayah yang memiliki keterbatasan akses terhadap bioskop atau 
        layanan streaming premium.
      </p>

      <p>
        Dengan semangat inovasi dan perkembangan teknologi, kami terus meningkatkan performa 
        platform, memperbarui konten secara berkala, serta menghadirkan fitur-fitur yang 
        memudahkan pengguna. DramaHub bukan hanya tempat menonton drakor, tetapi juga ruang 
        nyaman untuk menikmati hiburan tanpa batas.
      </p>
    </div>
  );
}
```

---

## 📄 UPDATE DETAIL PAGE — Persis Seperti Positively Yours

**[PROMPT UPDATE TAHAP 6 — Ganti Prompt 6 lama dengan ini]**

```
Update halaman detail (src/app/detail/[type]/[id]/page.js) agar tampilannya IDENTIK 
dengan halaman https://drakorz.com/tv/positively-yours/

BERDASARKAN ANALISIS HALAMAN POSITIVELY YOURS DI DRAKORZ.COM:
- Format judul: "Judul Drama (Tahun)"
- Info atas: Tanggal Rilis | Network badge yang bisa diklik
- Rating: Bintang interaktif (0-10) + jumlah vote
- Genre: tags yang linkable ke halaman genre
- Tabs: INFO | EPISODE | CAST | TRAILER (dengan icon)
- Info kanan: Judul Lain (Korean title + romaji), Tanggal Rilis - End Date, Total Season, Total Episode, Durasi Rata-rata, Share buttons
- Tag: #ongoing atau status lain
- Sections: "Mungkin Kamu Menyukainya" + Comment section + "Rekomendasi Untuk Kamu"

LAYOUT DETAIL PAGE:

export async function generateMetadata({ params }) {
  const detail = await getDetail(params.type, params.id);
  const title = detail.name || detail.title;
  const year = new Date(detail.first_air_date || detail.release_date).getFullYear();
  return {
    title: `${title} (${year}) Subtitle Indonesia - DramaHub`,
    description: detail.overview?.slice(0, 155),
    openGraph: {
      title: `${title} - DramaHub`,
      images: detail.poster_path ? [`https://image.tmdb.org/t/p/w500${detail.poster_path}`] : []
    }
  };
}

HERO SECTION (background = backdrop image):
<section style={{ position: "relative", minHeight: "420px" }}>
  {/* Background backdrop blur */}
  <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
    <Image
      src={`https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`}
      alt=""
      fill
      style={{ objectFit: "cover", filter: "brightness(0.2) blur(2px)" }}
    />
  </div>
  {/* Gradient overlay dari bawah */}
  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #0a0a0a 0%, #0a0a0a 20%, transparent 60%)" }} />
  
  {/* KONTEN UTAMA */}
  <div className="container" style={{ position: "relative", zIndex: 1, paddingTop: "32px", paddingBottom: "32px" }}>
    <div style={{ display: "flex", gap: "32px", flexWrap: "wrap" }}>
      
      {/* POSTER */}
      <div style={{ width: "200px", shrink: 0 }}>
        <Image
          src={`https://image.tmdb.org/t/p/w342${detail.poster_path}`}
          alt={title}
          width={200}
          height={300}
          style={{ borderRadius: "8px", boxShadow: "0 8px 32px rgba(0,0,0,0.8)" }}
        />
      </div>

      {/* INFO KANAN */}
      <div style={{ flex: 1, minWidth: "280px" }}>
        
        {/* Baris tanggal + network */}
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px", fontSize: "14px", color: "#888" }}>
          <span>{formatDate(detail.first_air_date || detail.release_date)}</span>
          {detail.networks?.[0] && (
            <Link href={`/network/${slugify(detail.networks[0].name)}`}
              style={{ background: "#1e1e1e", color: "#ccc", padding: "3px 10px", borderRadius: "4px", fontSize: "12px", fontWeight: 600 }}>
              {detail.networks[0].name}
            </Link>
          )}
        </div>

        {/* JUDUL BESAR */}
        <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 800, color: "#f0f0f0", lineHeight: 1.2, marginBottom: "16px" }}>
          {detail.name || detail.title}
        </h1>

        {/* RATING BINTANG (interaktif) */}
        <StarRating voteAverage={detail.vote_average} voteCount={detail.vote_count} />

        {/* GENRE TAGS */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", margin: "16px 0" }}>
          {detail.genres?.map(genre => (
            <Link key={genre.id} href={`/${params.type === "tv" ? "drama" : "movie"}?genre=${genre.id}`}
              className="genre-pill">
              {genre.name}
            </Link>
          ))}
        </div>

        {/* SINOPSIS */}
        <div style={{ marginBottom: "16px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: 600, color: "#ccc", marginBottom: "8px" }}>Sinopsis</h3>
          <SynopsisExpand text={detail.overview} />
        </div>

        {/* STATUS TAG */}
        {detail.status === "Returning Series" && (
          <Link href="/tag/ongoing" style={{ display: "inline-block", background: "#1e1e1e", color: "#16a34a", padding: "4px 12px", borderRadius: "4px", fontSize: "12px", border: "1px solid #16a34a33", marginBottom: "16px" }}>
            Ongoing
          </Link>
        )}

        {/* INFO TAMBAHAN — persis drakorz */}
        <div style={{ fontSize: "13px", color: "#888", lineHeight: 2 }}>
          {detail.original_name && (
            <div><span style={{ color: "#555" }}>Judul Lain</span>{" "}
              <span style={{ color: "#ccc" }}>{detail.original_name}</span>
            </div>
          )}
          <div><span style={{ color: "#555" }}>Tanggal Rilis</span>{" "}
            <span style={{ color: "#ccc" }}>
              {formatDate(detail.first_air_date || detail.release_date)}
              {detail.last_air_date && detail.status !== "Returning Series" && ` - ${formatDate(detail.last_air_date)}`}
            </span>
          </div>
          {params.type === "tv" && (
            <>
              <div><span style={{ color: "#555" }}>Total Season</span>{" "}
                <span style={{ color: "#ccc" }}>{detail.number_of_seasons}</span>
              </div>
              <div><span style={{ color: "#555" }}>Total Episode</span>{" "}
                <span style={{ color: "#ccc" }}>{detail.number_of_episodes} Episode</span>
              </div>
            </>
          )}
          {detail.episode_run_time?.[0] && (
            <div><span style={{ color: "#555" }}>Durasi Rata-rata</span>{" "}
              <span style={{ color: "#ccc" }}>{detail.episode_run_time[0]} menit</span>
            </div>
          )}
        </div>

        {/* SHARE BUTTONS — persis drakorz */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "16px", fontSize: "12px", color: "#555" }}>
          <span>Bagikan</span>
          <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + `/detail/${params.type}/${params.id}`)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ background: "#1877f2", color: "white", padding: "4px 10px", borderRadius: "4px", fontSize: "11px" }}>
            Facebook
          </a>
          <a href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(process.env.NEXT_PUBLIC_SITE_URL + `/detail/${params.type}/${params.id}`)}`}
            target="_blank" rel="noopener noreferrer"
            style={{ background: "#1da1f2", color: "white", padding: "4px 10px", borderRadius: "4px", fontSize: "11px" }}>
            Twitter
          </a>
          <a href={`whatsapp://send?text=${encodeURIComponent(title + " - " + process.env.NEXT_PUBLIC_SITE_URL + `/detail/${params.type}/${params.id}`)}`}
            style={{ background: "#25d366", color: "white", padding: "4px 10px", borderRadius: "4px", fontSize: "11px" }}>
            WhatsApp
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

TABS (INFO | EPISODE | CAST | TRAILER):
Gunakan Radix UI Tabs, letakkan tepat di bawah hero section.
Styling tab aktif: border-bottom 2px solid #dc2626, warna putih
Styling tab inactive: warna #888, hover putih

TAB INFO: 
- Tidak perlu (info sudah di hero)
- Isi dengan info TMDB tambahan: Production Companies, Original Country, TMDB Score

TAB EPISODE (hanya untuk TV):
- EpisodeList component (Client) dengan dropdown season
- List episode: flex row — thumbnail 120x68 + info + tombol Tonton
- Tombol tonton → link ke /watch/tv/{id}?season={s}&episode={e}

TAB CAST:
- Grid cast: 2 baris horizontal scroll di mobile, 4-6 kolom di desktop
- Foto circular, nama, nama karakter

TAB TRAILER:
- Grid 2-3 kolom thumbnail YouTube
- Klik → modal dengan YouTube embed

SECTION "MUNGKIN KAMU MENYUKAINYA":
- Judul section dengan garis merah kiri
- Grid horizontal scroll: 10 rekomendasi dari TMDB /recommendations

SECTION KOMENTAR:
- Simple comment section (gunakan Disqus atau komentar sederhana)
- Placeholder: <div style={{padding: "40px", textAlign: "center", color: "#555", background: "#111", borderRadius: "8px"}}>
    <p>Be the First to Comment!</p>
  </div>

SECTION "REKOMENDASI UNTUK KAMU":
- Judul section dengan garis merah kiri
- Grid card dari /similar endpoint TMDB

BREADCRUMB di paling bawah:
<nav style={{ fontSize: "12px", color: "#555", padding: "16px 0", borderTop: "1px solid #1e1e1e" }}>
  <Link href="/">Home</Link> {" > "}
  <Link href={params.type === "tv" ? "/drama" : "/movie"}>{params.type === "tv" ? "TV" : "Movie"}</Link> {" > "}
  <span style={{ color: "#888" }}>{title}</span>
</nav>

HELPER FUNCTIONS yang perlu dibuat di src/lib/utils.js:
- formatDate(dateString): format "Jan. 17, 2026" dari "2026-01-17"
- slugify(str): konversi "Channel A" → "channel-a"
- StarRating: Client Component dengan bintang interaktif
- SynopsisExpand: Client Component dengan tombol "Baca lebih..." / "Sembunyikan"
```

---

## ✅ CHECKLIST UPDATE YANG PERLU DILAKUKAN

Setelah semua prompt di atas dijalankan, pastikan:

- [ ] globals.css sudah pakai warna #0a0a0a (bukan #0d0d0d lama)
- [ ] Navbar sudah ada 4 menu: Drama | Movie | Kategori | Top Drama
- [ ] Footer sudah ada 3 kolom: Informasi | Kategori | Navigasi
- [ ] Footer sudah ada deskripsi panjang di kolom Navigasi
- [ ] Copyright: "© 2026 by DramaHub. All Rights Reserved."
- [ ] Halaman /syarat-ketentuan sudah bisa diakses
- [ ] Halaman /kebijakan-privasi sudah bisa diakses  
- [ ] Halaman /dmca-disclaimer sudah bisa diakses
- [ ] Halaman /kontak sudah bisa diakses
- [ ] Halaman /tentang-kami sudah bisa diakses
- [ ] Halaman detail format judul: "Judul Drama (Tahun) Subtitle Indonesia"
- [ ] Halaman detail ada: Judul Lain, Tanggal Rilis, Total Season, Total Episode, Durasi
- [ ] Share buttons: Facebook, Twitter, WhatsApp di halaman detail
- [ ] Section "Mungkin Kamu Menyukainya" di halaman detail
- [ ] Section "Rekomendasi Untuk Kamu" di halaman detail
- [ ] Breadcrumb di bawah halaman detail: Home > TV > Judul

---
*Prompt update ini melengkapi file prompt-drakorz-nextjs-antigravity.md sebelumnya.*
