"use client";
import { useState } from "react";

export default function SynopsisExpand({ text }) {
  const [expanded, setExpanded] = useState(false);
  
  if (!text) {
    return <p className="text-sm text-[#888] italic">Tidak ada sinopsis.</p>;
  }

  // If text is short, just show it
  if (text.length < 200) {
    return <p className="text-sm text-[#ccc] leading-relaxed">{text}</p>;
  }

  return (
    <div>
      <p className={`text-sm text-[#ccc] leading-relaxed ${!expanded ? "line-clamp-3" : ""}`}>
        {text}
      </p>
      <button 
        onClick={() => setExpanded(!expanded)}
        className="text-[#dc2626] hover:text-[#f87171] text-xs font-semibold mt-1 transition-colors"
      >
        {expanded ? "Sembunyikan" : "Baca lebih..."}
      </button>
    </div>
  );
}
