"use client";
import { useState } from "react";
import { Star } from "lucide-react";

export default function StarRating({ voteAverage, voteCount }) {
  const [hovered, setHovered] = useState(0);
  const rating = voteAverage ? (voteAverage / 2).toFixed(1) : 0;
  
  // Create array of 5 stars
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);

  return (
    <div className="flex items-center gap-3 my-2">
      <div className="stars flex gap-1" onMouseLeave={() => setHovered(0)}>
        {stars.map((star) => (
          <button
            key={star}
            className="focus:outline-none transition-transform hover:scale-110"
            onMouseEnter={() => setHovered(star)}
          >
            <Star
              size={18}
              fill={star <= (hovered || rating) ? "#f59e0b" : "transparent"}
              color={star <= (hovered || rating) ? "#f59e0b" : "#555"}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {(voteAverage > 0 || voteCount > 0) && (
        <div className="flex items-center gap-2">
          <span className="rating-badge">{voteAverage?.toFixed(1)}</span>
          <span className="text-xs text-[#888]">{voteCount} votes</span>
        </div>
      )}
    </div>
  );
}
