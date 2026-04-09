import Link from "next/link";

export default function SectionHeader({ title, href }) {
  return (
    <div className="flex items-center justify-between mb-5">
      <h2 className="section-title">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="text-sm text-[#dc2626] hover:underline font-medium shrink-0"
        >
          Lihat Semua →
        </Link>
      )}
    </div>
  );
}
