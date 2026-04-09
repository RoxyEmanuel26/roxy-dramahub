"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef, useMemo } from "react";
import { Search, Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "next-themes";

const NAV_LINKS = [
  { href: "/", label: "Beranda" },
  { href: "/drama", label: "Drama" },
  { href: "/movie", label: "Movie" },
  { href: "/top", label: "Top Drama" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);
  const debounceRef = useRef(null);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(searchQuery)}`
        );
        const data = await res.json();
        setSuggestions(
          (data.results || [])
            .filter((i) => i.media_type === "tv" || i.media_type === "movie")
            .slice(0, 5)
        );
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 400);
  }, [searchQuery]);

  function handleSearchSubmit(e) {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setShowSuggestions(false);
    }
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0d0d0d]/95 backdrop-blur-sm shadow-lg"
          : "bg-gradient-to-b from-black/80 to-transparent"
      }`}
    >
      <nav className="flex items-center justify-between px-4 md:px-8 lg:px-16 h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-[#e50914] rounded-md flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
              <polygon points="8,4 8,20 20,12" />
            </svg>
          </div>
          <span className="text-xl font-bold text-[#e50914] font-[family-name:var(--font-display)]">
            DramaHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#e50914]"
                  : "text-[#b3b3b3] hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="relative" ref={searchRef}>
            {searchOpen ? (
              <form onSubmit={handleSearchSubmit} className="flex items-center">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => suggestions.length > 0 && setShowSuggestions(true)}
                  onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  placeholder="Cari drama..."
                  autoFocus
                  className="w-48 bg-[#1c1c1c] border border-[#333] rounded-l px-3 py-1.5 text-sm text-white placeholder-[#666] outline-none focus:border-[#e50914]"
                />
                <button
                  type="button"
                  onClick={() => {
                    setSearchOpen(false);
                    setSearchQuery("");
                    setSuggestions([]);
                  }}
                  className="bg-[#1c1c1c] border border-l-0 border-[#333] rounded-r px-2 py-1.5 text-[#666] hover:text-white"
                >
                  <X size={16} />
                </button>

                {/* Suggestions dropdown */}
                {showSuggestions && suggestions.length > 0 && (
                  <div className="absolute top-full right-0 mt-1 w-72 bg-[#1c1c1c] border border-[#333] rounded-lg shadow-xl overflow-hidden">
                    {suggestions.map((item) => (
                      <button
                        key={`${item.media_type}-${item.id}`}
                        type="button"
                        onMouseDown={() => {
                          router.push(
                            `/detail/${item.media_type}/${item.id}`
                          );
                          setSearchOpen(false);
                          setShowSuggestions(false);
                        }}
                        className="flex items-center gap-3 w-full px-3 py-2 hover:bg-[#252525] text-left"
                      >
                        <div className="w-8 h-12 bg-[#252525] rounded overflow-hidden shrink-0">
                          {item.poster_path && (
                            <img
                              src={`https://image.tmdb.org/t/p/w92${item.poster_path}`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm text-white truncate">
                            {item.name || item.title}
                          </p>
                          <p className="text-xs text-[#666] uppercase">
                            {item.media_type}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </form>
            ) : (
              <button
                onClick={() => setSearchOpen(true)}
                className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
              >
                <Search size={20} />
              </button>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 text-[#b3b3b3] hover:text-white transition-colors"
          >
            {mounted ? (
              theme === "dark" ? <Sun size={18} /> : <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-2 text-[#b3b3b3] hover:text-white md:hidden"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0d0d0d]/98 backdrop-blur-md border-t border-[#1c1c1c] animate-fadeInUp">
          <div className="flex flex-col px-6 py-4 gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-base font-medium py-2 ${
                  pathname === link.href
                    ? "text-[#e50914]"
                    : "text-[#b3b3b3] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
