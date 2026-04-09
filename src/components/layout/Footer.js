"use client";
import Link from "next/link";

const SITE_NAME = "Roxy Drakor";
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
