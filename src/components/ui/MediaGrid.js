"use client";

import MediaCard from "./MediaCard";
import SkeletonCard from "./SkeletonCard";

export default function MediaGrid({
  items = [],
  loading = false,
  skeletonCount = 20,
  type,
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-4xl mb-3">📭</p>
        <p className="text-lg font-semibold text-white">Tidak ada konten</p>
        <p className="text-sm text-[#666] mt-1">
          Coba ubah filter atau kata kunci pencarian
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <MediaCard key={`${item.id}-${item.media_type || type}`} item={item} type={type} />
      ))}
    </div>
  );
}
