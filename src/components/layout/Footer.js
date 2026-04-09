import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1c1c1c] mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-[#e50914] rounded-md flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-white">
                  <polygon points="8,4 8,20 20,12" />
                </svg>
              </div>
              <span className="text-xl font-bold text-[#e50914] font-[family-name:var(--font-display)]">
                DramaHub
              </span>
            </Link>
            <p className="text-sm text-[#666] leading-relaxed">
              Nonton Drama Korea Subtitle Indonesia. Temukan dan tonton drama
              Korea favorit kamu secara gratis.
            </p>
            <p className="text-xs text-[#444] mt-4">
              ⚠️ Disclaimer: DramaHub tidak menyimpan atau menghost konten video
              apapun. Semua video berasal dari pihak ketiga.
            </p>
          </div>

          {/* Menu */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Menu
            </h3>
            <ul className="space-y-2">
              {[
                { href: "/", label: "Beranda" },
                { href: "/drama", label: "Drama Korea" },
                { href: "/movie", label: "Movie Korea" },
                { href: "/top", label: "Top Drama" },
                { href: "/search?q=", label: "Pencarian" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#888] hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Genre */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white mb-4">
              Genre Populer
            </h3>
            <ul className="space-y-2">
              {[
                { id: 10749, name: "Romance" },
                { id: 18, name: "Drama" },
                { id: 35, name: "Comedy" },
                { id: 9648, name: "Thriller" },
                { id: 10765, name: "Fantasy" },
              ].map((g) => (
                <li key={g.id}>
                  <Link
                    href={`/drama?genre=${g.id}`}
                    className="text-sm text-[#888] hover:text-white transition-colors"
                  >
                    {g.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1c1c1c] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#444]">
            © {new Date().getFullYear()} DramaHub. Semua hak cipta dilindungi.
          </p>
          <p className="text-xs text-[#444]">
            Powered by{" "}
            <a
              href="https://www.themoviedb.org"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#666] hover:text-white"
            >
              TMDB API
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
