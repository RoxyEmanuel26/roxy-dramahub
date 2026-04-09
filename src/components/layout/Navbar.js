"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Search, X, Menu, Tv, Film, Grid3X3, TrendingUp, ChevronDown } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileOpen, setMobileOpen] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (searchOpen) setTimeout(() => searchRef.current?.focus(), 50);
  }, [searchOpen]);

  // Tutup mobile menu saat route berubah
  useEffect(() => { setMobileOpen(false); setSearchOpen(false); }, [pathname]);

  // Lock body scroll saat mobile menu terbuka
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  function handleSearch(e) {
    e.preventDefault();
    const q = searchQuery.trim();
    if (q) {
      router.push(`/search?q=${encodeURIComponent(q)}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  }

  const navLinks = [
    { href: "/drama",   label: "Drama",     icon: <Tv size={15} /> },
    { href: "/movie",   label: "Movie",     icon: <Film size={15} /> },
    { href: "/kategori",label: "Kategori",  icon: <Grid3X3 size={15} /> },
    { href: "/top",     label: "Top Drama", icon: <TrendingUp size={15} /> },
  ];

  const isActive = (href) => pathname === href || pathname.startsWith(href + "/");

  return (
    <>
      {/* ── NAVBAR ── */}
      <header
        style={{
          position: "fixed",
          top: 0, left: 0, right: 0,
          zIndex: 100,
          transition: "background 0.3s ease, box-shadow 0.3s ease",
          background: scrolled
            ? "rgba(10,10,10,0.97)"
            : "linear-gradient(to bottom, rgba(0,0,0,0.85) 0%, transparent 100%)",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          boxShadow: scrolled ? "0 1px 0 rgba(255,255,255,0.06)" : "none",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56, gap: 16 }}>

            {/* ── LOGO ── */}
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0, textDecoration: "none" }}>
              <div style={{
                width: 32, height: 32,
                background: "#dc2626",
                borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 12px rgba(220,38,38,0.45)",
              }}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <path d="M3 2h7.5c2.5 0 4 1.4 4 3.5 0 1.6-.9 2.8-2.3 3.3L15 16h-2.8l-2.5-6.8H5.5V16H3V2zm2.5 2v4h4.5c1.2 0 2-.7 2-2s-.8-2-2-2H5.5z" fill="white"/>
                </svg>
              </div>
              <span style={{
                fontFamily: "Poppins, sans-serif",
                fontWeight: 800,
                fontSize: 18,
                color: "#fff",
                letterSpacing: "-0.3px",
                lineHeight: 1,
              }}>
                Roxy<span style={{ color: "#dc2626" }}>Drakor</span>
              </span>
            </Link>

            {/* ── NAVIGASI DESKTOP ── */}
            <nav style={{ display: "flex", alignItems: "center", gap: 2, marginLeft: 8 }} className="hide-mobile">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                    padding: "6px 12px",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    textDecoration: "none",
                    transition: "all 0.18s ease",
                    color: isActive(link.href) ? "#fff" : "#aaa",
                    background: isActive(link.href) ? "rgba(255,255,255,0.08)" : "transparent",
                    borderBottom: isActive(link.href) ? "2px solid #dc2626" : "2px solid transparent",
                  }}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── KANAN: SEARCH + HAMBURGER ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginLeft: "auto" }}>
              {/* Search expanded */}
              {searchOpen ? (
                <form onSubmit={handleSearch} style={{ display: "flex", alignItems: "center", gap: 0 }}>
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    background: "#1a1a1a",
                    border: "1px solid #dc2626",
                    borderRadius: 8,
                    overflow: "hidden",
                    boxShadow: "0 0 0 3px rgba(220,38,38,0.15)",
                  }}>
                    <span style={{ padding: "0 10px", color: "#666", display: "flex" }}>
                      <Search size={15} />
                    </span>
                    <input
                      ref={searchRef}
                      type="text"
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      placeholder="Cari drama, movie..."
                      style={{
                        background: "transparent",
                        border: "none",
                        outline: "none",
                        color: "#fff",
                        fontSize: 13,
                        padding: "8px 0",
                        width: 220,
                      }}
                    />
                    <button
                      type="submit"
                      style={{
                        background: "#dc2626",
                        border: "none",
                        color: "#fff",
                        padding: "8px 14px",
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 600,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={e => e.currentTarget.style.background = "#b91c1c"}
                      onMouseLeave={e => e.currentTarget.style.background = "#dc2626"}
                    >
                      Cari
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    style={{ marginLeft: 8, color: "#888", background: "none", border: "none", cursor: "pointer", display: "flex", padding: 6 }}
                  >
                    <X size={16} />
                  </button>
                </form>
              ) : (
                <button
                  onClick={() => setSearchOpen(true)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    borderRadius: 8,
                    color: "#ccc",
                    padding: "6px 12px",
                    cursor: "pointer",
                    fontSize: 13,
                    transition: "all 0.18s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.color = "#ccc"; }}
                  aria-label="Buka pencarian"
                >
                  <Search size={15} />
                  <span className="hide-mobile" style={{ fontSize: 13 }}>Cari</span>
                </button>
              )}

              {/* Hamburger */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                style={{
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 36, height: 36,
                  borderRadius: 8,
                  background: mobileOpen ? "rgba(220,38,38,0.15)" : "rgba(255,255,255,0.06)",
                  border: `1px solid ${mobileOpen ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.1)"}`,
                  color: mobileOpen ? "#dc2626" : "#ccc",
                  cursor: "pointer",
                  transition: "all 0.18s",
                }}
                className="show-mobile-flex"
                aria-label="Menu"
              >
                {mobileOpen ? <X size={18} /> : <Menu size={18} />}
              </button>
            </div>
          </div>
        </div>

        {/* ── INDICATOR BAR — garis tipis bawah navbar ── */}
        <div style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          height: 1,
          background: scrolled ? "rgba(255,255,255,0.06)" : "transparent",
        }} />
      </header>

      {/* ── MOBILE MENU OVERLAY ── */}
      {mobileOpen && (
        <div
          style={{
            position: "fixed", inset: 0, zIndex: 99,
            background: "rgba(0,0,0,0.7)",
            backdropFilter: "blur(4px)",
          }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE MENU PANEL ── */}
      <div
        style={{
          position: "fixed",
          top: 56, left: 0, right: 0,
          zIndex: 99,
          background: "#0e0e0e",
          borderBottom: "1px solid #1e1e1e",
          transform: mobileOpen ? "translateY(0)" : "translateY(-110%)",
          transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.6)",
          paddingBottom: 16,
        }}
      >
        {/* Search mobile */}
        <div style={{ padding: "12px 16px" }}>
          <form onSubmit={handleSearch}>
            <div style={{
              display: "flex", alignItems: "center",
              background: "#1a1a1a",
              border: "1px solid #2a2a2a",
              borderRadius: 8,
              overflow: "hidden",
            }}>
              <span style={{ padding: "0 10px", color: "#555", display: "flex" }}><Search size={15} /></span>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Cari drama, movie..."
                style={{
                  flex: 1, background: "transparent", border: "none",
                  outline: "none", color: "#fff", fontSize: 14,
                  padding: "10px 0",
                }}
              />
              <button type="submit" style={{ background: "#dc2626", border: "none", color: "#fff", padding: "10px 16px", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
                Cari
              </button>
            </div>
          </form>
        </div>

        {/* Nav links mobile */}
        <nav>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "13px 20px",
                textDecoration: "none",
                color: isActive(link.href) ? "#fff" : "#999",
                background: isActive(link.href) ? "rgba(220,38,38,0.08)" : "transparent",
                borderLeft: isActive(link.href) ? "3px solid #dc2626" : "3px solid transparent",
                fontSize: 14,
                fontWeight: isActive(link.href) ? 600 : 400,
                transition: "all 0.15s",
              }}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Spacer */}
      <div style={{ height: 56 }} />

      {/* Responsive helpers */}
      <style>{`
        @media (max-width: 767px) {
          .hide-mobile { display: none !important; }
          .show-mobile-flex { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-mobile-flex { display: none !important; }
        }
      `}</style>
    </>
  );
}
