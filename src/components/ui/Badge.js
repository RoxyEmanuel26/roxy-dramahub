import { cn } from "@/lib/utils";

const variants = {
  genre:
    "border border-white/30 text-white/80 hover:bg-white/10 rounded-full px-3 py-1 text-xs transition-colors cursor-pointer",
  "type-tv": "bg-blue-600 text-white rounded px-2 py-0.5 text-xs font-bold",
  "type-movie": "bg-[#e50914] text-white rounded px-2 py-0.5 text-xs font-bold",
  "status-ongoing": "bg-green-600 text-white rounded px-2 py-0.5 text-xs",
  "status-ended": "bg-gray-600 text-white rounded px-2 py-0.5 text-xs",
  rating:
    "bg-black/70 text-[#f5a623] rounded px-2 py-0.5 text-xs flex items-center gap-1",
  trending:
    "bg-[#e50914] text-white rounded px-2.5 py-1 text-xs font-bold animate-pulse-badge",
};

export default function Badge({ children, variant = "genre", className }) {
  return (
    <span className={cn(variants[variant] || variants.genre, className)}>
      {children}
    </span>
  );
}
