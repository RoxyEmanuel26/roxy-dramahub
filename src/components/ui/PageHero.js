import Link from "next/link";

export default function PageHero({ title, breadcrumb = [] }) {
  return (
    <div className="relative h-36 bg-gradient-to-r from-[#e50914]/20 to-transparent flex items-end">
      <div className="px-4 md:px-8 lg:px-16 pb-6 w-full">
        <div className="flex items-center gap-2 text-sm text-[#b3b3b3] mb-2">
          {breadcrumb.map((item, i) => (
            <span key={i} className="flex items-center gap-2">
              {i > 0 && <span className="text-[#444]">›</span>}
              {i < breadcrumb.length - 1 ? (
                <Link
                  href={i === 0 ? "/" : `/${item.toLowerCase()}`}
                  className="hover:text-white transition-colors"
                >
                  {item}
                </Link>
              ) : (
                <span className="text-white">{item}</span>
              )}
            </span>
          ))}
        </div>
        <h1 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)]">
          {title}
        </h1>
      </div>
    </div>
  );
}
