"use client";
import Link from "next/link";

const SITE_NAME = "RoxyDrakor";
const SITE_YEAR = new Date().getFullYear();

const INFO_LINKS = [
  { href: "/tentang-kami",     label: "Tentang Kami" },
  { href: "/kontak",           label: "Kontak" },
  { href: "/dmca-disclaimer",  label: "DMCA Disclaimer" },
  { href: "/kebijakan-privasi",label: "Kebijakan Privasi" },
  { href: "/syarat-ketentuan", label: "Syarat & Ketentuan" },
];

const GENRE_LINKS = [
  { href: "/drama?genre=10749", label: "Romance" },
  { href: "/drama?genre=35",    label: "Comedy" },
  { href: "/drama?genre=18",    label: "Drama" },
  { href: "/drama?genre=9648",  label: "Thriller" },
  { href: "/drama?genre=10765", label: "Fantasy" },
  { href: "/drama?genre=27",    label: "Horror" },
  { href: "/drama?genre=10759", label: "Action" },
  { href: "/movie",             label: "Movie" },
];

const NAV_LINKS = [
  { href: "/drama",    label: "Drama" },
  { href: "/movie",    label: "Movie" },
  { href: "/kategori", label: "Kategori" },
  { href: "/top",      label: "Top Drama" },
  { href: "/search",   label: "Pencarian" },
];

function FooterLink({ href, children }) {
  return (
    <li>
      <Link
        href={href}
        style={{
          color: "#666",
          fontSize: 13,
          textDecoration: "none",
          lineHeight: 1.6,
          transition: "color 0.18s",
          display: "inline-block",
        }}
        onMouseEnter={e => e.currentTarget.style.color = "#dc2626"}
        onMouseLeave={e => e.currentTarget.style.color = "#666"}
      >
        {children}
      </Link>
    </li>
  );
}

function FooterColTitle({ children }) {
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginBottom: 14,
    }}>
      <span style={{
        display: "block",
        width: 3,
        height: 14,
        background: "#dc2626",
        borderRadius: 2,
        flexShrink: 0,
      }} />
      <h3 style={{
        color: "#e0e0e0",
        fontFamily: "Poppins, sans-serif",
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        margin: 0,
      }}>
        {children}
      </h3>
    </div>
  );
}

export default function Footer() {
  return (
    <footer style={{
      background: "#080808",
      borderTop: "1px solid #141414",
      marginTop: "auto",
    }}>
      {/* ── TOP SECTION ── */}
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "48px 1rem 32px" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: "32px 24px",
        }}>
          {/* ── BRAND COLUMN ── */}
          <div style={{ gridColumn: "span 1" }}>
            {/* Logo */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", marginBottom: 16 }}>
              <div style={{
                width: 34, height: 34,
                background: "#dc2626",
                borderRadius: 7,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 14px rgba(220,38,38,0.4)",
                flexShrink: 0,
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 2h7.5c2.5 0 4 1.4 4 3.5 0 1.6-.9 2.8-2.3 3.3L15 16h-2.8l-2.5-6.8H5.5V16H3V2zm2.5 2v4h4.5c1.2 0 2-.7 2-2s-.8-2-2-2H5.5z" fill="white"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: 17,
                color: "#fff",
                letterSpacing: "-0.3px",
                lineHeight: 1,
              }}>
                Roxy<span style={{ color: "#dc2626" }}>Drakor</span>
              </span>
            </Link>
            <p style={{
              color: "#4a4a4a",
              fontSize: 12,
              lineHeight: 1.8,
              maxWidth: 220,
              margin: 0,
            }}>
              Platform streaming drama Korea subtitle Indonesia gratis. Nikmati ribuan judul drakor terbaru dan klasik tanpa biaya.
            </p>

            {/* Genre pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 14 }}>
              {["Romance","Thriller","Fantasy","Comedy"].map(g => (
                <span key={g} style={{
                  display: "inline-block",
                  padding: "3px 10px",
                  border: "1px solid #222",
                  borderRadius: 99,
                  fontSize: 11,
                  color: "#555",
                }}>
                  {g}
                </span>
              ))}
            </div>
          </div>

          {/* ── INFORMASI ── */}
          <div>
            <FooterColTitle>Informasi</FooterColTitle>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {INFO_LINKS.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>

          {/* ── KATEGORI ── */}
          <div>
            <FooterColTitle>Kategori</FooterColTitle>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {GENRE_LINKS.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>

          {/* ── NAVIGASI ── */}
          <div>
            <FooterColTitle>Navigasi</FooterColTitle>
            <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap: 9 }}>
              {NAV_LINKS.map(l => <FooterLink key={l.href} href={l.href}>{l.label}</FooterLink>)}
            </ul>
          </div>
        </div>
      </div>

      {/* ── DIVIDER + COPYRIGHT ── */}
      <div style={{
        borderTop: "1px solid #111",
        padding: "16px 1rem",
        maxWidth: 1280,
        margin: "0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: 8,
      }}>
        <p style={{ color: "#333", fontSize: 12, margin: 0 }}>
          © {SITE_YEAR} <span style={{ color: "#444" }}>{SITE_NAME}</span>. All Rights Reserved.
        </p>
        <p style={{ color: "#2a2a2a", fontSize: 11, margin: 0 }}>
          Data by&nbsp;
          <a
            href="https://www.themoviedb.org"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#333", textDecoration: "none" }}
            onMouseEnter={e => e.currentTarget.style.color = "#dc2626"}
            onMouseLeave={e => e.currentTarget.style.color = "#333"}
          >
            TMDB
          </a>
        </p>
      </div>
    </footer>
  );
}
