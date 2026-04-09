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
              {/* SVG Logo: R dalam kotak merah */}
              <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                <rect width="28" height="28" rx="5" fill="#dc2626"/>
                <text x="14" y="20" textAnchor="middle" fill="white" fontSize="16" fontWeight="800" fontFamily="Poppins, sans-serif">R</text>
              </svg>
              <span style={{fontFamily: "Poppins, sans-serif"}} className="text-white font-bold text-lg tracking-tight">
                Roxy Drakor
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
