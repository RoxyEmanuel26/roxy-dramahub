"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Search, X } from "lucide-react";

export default function SearchInput({ initialQuery = "" }) {
  const router = useRouter();
  const [query, setQuery] = useState(initialQuery);

  function handleSubmit(e) {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="relative max-w-2xl">
      <Search
        size={20}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-[#666]"
      />
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari drama atau movie Korea..."
        autoFocus
        className="w-full bg-[#1c1c1c] border border-[#333] rounded-lg pl-12 pr-10 py-3.5 text-white placeholder-[#666] outline-none focus:border-[#e50914] text-base"
      />
      {query && (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666] hover:text-white"
        >
          <X size={18} />
        </button>
      )}
    </form>
  );
}
