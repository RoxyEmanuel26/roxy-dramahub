export default function SkeletonCard() {
  return (
    <div>
      <div className="aspect-[2/3] skeleton rounded-[8px]" />
      <div className="mt-2 space-y-1.5">
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="skeleton h-3 w-1/3 rounded" />
      </div>
    </div>
  );
}
