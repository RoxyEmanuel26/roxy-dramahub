"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useCallback } from "react";
import { SlidersHorizontal, X, ChevronDown, ChevronUp } from "lucide-react";
import { TV_GENRES, MOVIE_GENRES, NETWORKS, SORT_TV, SORT_MOVIE } from "@/lib/utils";

function AccordionSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div style={{ borderBottom: "1px solid #1a1a1a", paddingBottom: open ? 16 : 0 }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "12px 0",
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "#ccc",
        }}
      >
        <span style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.8px",
          textTransform: "uppercase",
          color: "#ccc",
        }}>
          {title}
        </span>
        {open
          ? <ChevronUp size={14} style={{ color: "#555" }} />
          : <ChevronDown size={14} style={{ color: "#555" }} />}
      </button>
      {open && <div>{children}</div>}
    </div>
  );
}

export default function FilterSidebar({ type = "tv", currentFilters = {} }) {
  const router   = useRouter();
  const pathname = usePathname();

  const genres      = type === "tv" ? TV_GENRES : MOVIE_GENRES;
  const sortOptions = type === "tv" ? SORT_TV   : SORT_MOVIE;

  const [selectedGenres,  setSelectedGenres]  = useState(
    currentFilters.genre ? currentFilters.genre.split(",") : []
  );
  const [selectedYear,    setSelectedYear]    = useState(currentFilters.year    || "");
  const [selectedNetwork, setSelectedNetwork] = useState(currentFilters.network || "");
  const [selectedSort,    setSelectedSort]    = useState(currentFilters.sort    || sortOptions[0].value);
  const [mobileOpen,      setMobileOpen]      = useState(false);

  function toggleGenre(id) {
    const sid = String(id);
    setSelectedGenres(prev =>
      prev.includes(sid) ? prev.filter(x => x !== sid) : [...prev, sid]
    );
  }

  function toggleNetwork(id) {
    const sid = String(id);
    const cur = selectedNetwork ? selectedNetwork.split(",") : [];
    setSelectedNetwork(
      cur.includes(sid) ? cur.filter(x => x !== sid).join(",") : [...cur, sid].join(",")
    );
  }

  const applyFilters = useCallback(() => {
    const params = new URLSearchParams();
    if (selectedGenres.length)  params.set("genre",   selectedGenres.join(","));
    if (selectedYear)            params.set("year",    selectedYear);
    if (selectedNetwork)         params.set("network", selectedNetwork);
    if (selectedSort)            params.set("sort",    selectedSort);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}`);
    setMobileOpen(false);
  }, [selectedGenres, selectedYear, selectedNetwork, selectedSort, router, pathname]);

  const resetFilters = useCallback(() => {
    setSelectedGenres([]);
    setSelectedYear("");
    setSelectedNetwork("");
    setSelectedSort(sortOptions[0].value);
    router.push(pathname);
    setMobileOpen(false);
  }, [router, pathname, sortOptions]);

  const years = Array.from({ length: 2026 - 2010 + 1 }, (_, i) => 2026 - i);

  const hasActiveFilters = selectedGenres.length > 0 || selectedYear || selectedNetwork;

  /* ── SHARED FILTER CONTENT ── */
  const filterContent = (
    <div>
      {/* Active filters count */}
      {hasActiveFilters && (
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(220,38,38,0.08)",
          border: "1px solid rgba(220,38,38,0.2)",
          borderRadius: 6,
          padding: "6px 10px",
          marginBottom: 12,
        }}>
          <span style={{ fontSize: 12, color: "#dc2626" }}>
            {selectedGenres.length + (selectedYear ? 1 : 0) + (selectedNetwork ? 1 : 0)} filter aktif
          </span>
          <button
            onClick={resetFilters}
            style={{ fontSize: 11, color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}
          >
            Hapus semua
          </button>
        </div>
      )}

      {/* GENRE */}
      <AccordionSection title="Genre">
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {genres.map(g => {
            const active = selectedGenres.includes(String(g.id));
            return (
              <label
                key={g.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "5px 6px",
                  borderRadius: 5,
                  cursor: "pointer",
                  background: active ? "rgba(220,38,38,0.07)" : "transparent",
                  transition: "background 0.15s",
                }}
              >
                {/* Custom checkbox */}
                <div
                  onClick={() => toggleGenre(g.id)}
                  style={{
                    width: 15, height: 15,
                    border: active ? "2px solid #dc2626" : "2px solid #333",
                    borderRadius: 3,
                    background: active ? "#dc2626" : "transparent",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.15s",
                    cursor: "pointer",
                  }}
                >
                  {active && (
                    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
                      <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
                <span
                  onClick={() => toggleGenre(g.id)}
                  style={{ fontSize: 13, color: active ? "#fff" : "#888", transition: "color 0.15s", userSelect: "none" }}
                >
                  {g.name}
                </span>
              </label>
            );
          })}
        </div>
      </AccordionSection>

      {/* TAHUN */}
      <AccordionSection title="Tahun Rilis">
        <select
          value={selectedYear}
          onChange={e => setSelectedYear(e.target.value)}
          style={{
            width: "100%",
            background: "#161616",
            border: "1px solid #222",
            borderRadius: 6,
            padding: "8px 10px",
            fontSize: 13,
            color: selectedYear ? "#fff" : "#666",
            outline: "none",
            cursor: "pointer",
            appearance: "none",
          }}
        >
          <option value="">Semua Tahun</option>
          {years.map(y => <option key={y} value={y}>{y}</option>)}
        </select>
      </AccordionSection>

      {/* NETWORK — TV only */}
      {type === "tv" && (
        <AccordionSection title="Network">
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {NETWORKS.map(n => {
              const cur = selectedNetwork ? selectedNetwork.split(",") : [];
              const active = cur.includes(String(n.id));
              return (
                <button
                  key={n.id}
                  onClick={() => toggleNetwork(n.id)}
                  style={{
                    padding: "4px 11px",
                    borderRadius: 99,
                    fontSize: 12,
                    border: active ? "1px solid #dc2626" : "1px solid #252525",
                    background: active ? "rgba(220,38,38,0.12)" : "#141414",
                    color: active ? "#fff" : "#666",
                    cursor: "pointer",
                    transition: "all 0.15s",
                    fontWeight: active ? 600 : 400,
                  }}
                >
                  {n.name}
                </button>
              );
            })}
          </div>
        </AccordionSection>
      )}

      {/* URUTAN */}
      <AccordionSection title="Urutan" defaultOpen={true}>
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {sortOptions.map(s => (
            <button
              key={s.value}
              onClick={() => setSelectedSort(s.value)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "6px 8px",
                borderRadius: 5,
                background: selectedSort === s.value ? "rgba(220,38,38,0.07)" : "transparent",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              <div style={{
                width: 12, height: 12,
                borderRadius: "50%",
                border: selectedSort === s.value ? "3px solid #dc2626" : "2px solid #333",
                background: selectedSort === s.value ? "transparent" : "transparent",
                flexShrink: 0,
                transition: "all 0.15s",
              }} />
              <span style={{ fontSize: 13, color: selectedSort === s.value ? "#fff" : "#888" }}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
      </AccordionSection>

      {/* ACTION BUTTONS */}
      <div style={{ display: "flex", gap: 8, paddingTop: 16 }}>
        <button
          onClick={applyFilters}
          style={{
            flex: 1,
            background: "#dc2626",
            border: "none",
            color: "#fff",
            fontSize: 13,
            fontWeight: 700,
            padding: "10px 0",
            borderRadius: 7,
            cursor: "pointer",
            transition: "background 0.15s",
            letterSpacing: "0.3px",
          }}
          onMouseEnter={e => e.currentTarget.style.background = "#b91c1c"}
          onMouseLeave={e => e.currentTarget.style.background = "#dc2626"}
        >
          Terapkan Filter
        </button>
        <button
          onClick={resetFilters}
          style={{
            padding: "10px 14px",
            background: "#161616",
            border: "1px solid #252525",
            color: "#666",
            fontSize: 13,
            borderRadius: 7,
            cursor: "pointer",
            transition: "all 0.15s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#444"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "#666"; e.currentTarget.style.borderColor = "#252525"; }}
          title="Reset filter"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside
        className="hide-on-mobile"
        style={{
          width: 210,
          flexShrink: 0,
          position: "sticky",
          top: 72,
          alignSelf: "flex-start",
          background: "#0e0e0e",
          border: "1px solid #181818",
          borderRadius: 10,
          padding: "4px 16px 16px",
          maxHeight: "calc(100vh - 88px)",
          overflowY: "auto",
          scrollbarWidth: "thin",
          scrollbarColor: "#222 transparent",
        }}
      >
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: 7,
          padding: "14px 0 10px",
          borderBottom: "1px solid #1a1a1a",
          marginBottom: 4,
        }}>
          <SlidersHorizontal size={14} style={{ color: "#dc2626" }} />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.5px", color: "#ddd", textTransform: "uppercase" }}>
            Filter
          </span>
        </div>
        {filterContent}
      </aside>

      {/* ── MOBILE TRIGGER ── */}
      <button
        onClick={() => setMobileOpen(true)}
        className="show-only-mobile"
        style={{
          display: "none",
          position: "fixed",
          bottom: 24,
          right: 20,
          zIndex: 40,
          background: "#dc2626",
          color: "#fff",
          border: "none",
          borderRadius: 99,
          padding: "10px 18px",
          fontSize: 13,
          fontWeight: 700,
          alignItems: "center",
          gap: 7,
          cursor: "pointer",
          boxShadow: "0 4px 20px rgba(220,38,38,0.45)",
          transition: "transform 0.15s",
        }}
        onMouseEnter={e => e.currentTarget.style.transform = "scale(1.04)"}
        onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
      >
        <SlidersHorizontal size={15} />
        Filter{hasActiveFilters && ` (${selectedGenres.length + (selectedYear?1:0) + (selectedNetwork?1:0)})`}
      </button>

      {/* ── MOBILE OVERLAY ── */}
      {mobileOpen && (
        <div
          style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(3px)" }}
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* ── MOBILE SHEET ── */}
      <div
        style={{
          position: "fixed",
          bottom: 0, left: 0, right: 0,
          zIndex: 51,
          background: "#0e0e0e",
          borderRadius: "16px 16px 0 0",
          borderTop: "1px solid #1e1e1e",
          padding: "0 20px 32px",
          maxHeight: "85vh",
          overflowY: "auto",
          transform: mobileOpen ? "translateY(0)" : "translateY(110%)",
          transition: "transform 0.32s cubic-bezier(0.4,0,0.2,1)",
          boxShadow: "0 -8px 40px rgba(0,0,0,0.7)",
        }}
      >
        {/* Sheet handle */}
        <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 8px" }}>
          <div style={{ width: 36, height: 4, background: "#2a2a2a", borderRadius: 99 }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <SlidersHorizontal size={15} style={{ color: "#dc2626" }} />
            <span style={{ fontWeight: 700, fontSize: 15, color: "#fff" }}>Filter</span>
          </div>
          <button
            onClick={() => setMobileOpen(false)}
            style={{ color: "#555", background: "none", border: "none", cursor: "pointer", display: "flex" }}
          >
            <X size={18} />
          </button>
        </div>
        {filterContent}
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 767px) {
          .hide-on-mobile { display: none !important; }
          .show-only-mobile { display: flex !important; }
        }
        @media (min-width: 768px) {
          .show-only-mobile { display: none !important; }
        }
      `}</style>
    </>
  );
}
