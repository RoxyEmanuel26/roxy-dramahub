import Link from "next/link";

export default function SectionHeader({ title, href }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="border-l-4 border-[#e50914] pl-3 text-lg md:text-xl font-bold font-[family-name:var(--font-display)] text-white">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-sm text-[#e50914] hover:underline font-medium shrink-0"
        >
          Lihat Semua →
        </Link>
      )}
    </div>
  );
}
