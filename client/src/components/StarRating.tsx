import { Star } from "lucide-react";
import { useState } from "react";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readOnly?: boolean;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function StarRating({
  rating,
  onRatingChange,
  readOnly = false,
  size = "md",
  showLabel = true,
}: StarRatingProps) {
  const [hoverRating, setHoverRating] = useState(0);

  const sizeMap = {
    sm: { star: 16, gap: 2 },
    md: { star: 20, gap: 4 },
    lg: { star: 24, gap: 6 },
  };

  const { star: starSize, gap: gapSize } = sizeMap[size];

  return (
    <div className="flex items-center gap-2">
      <div
        className="flex gap-1"
        style={{ gap: `${gapSize}px` }}
        onMouseLeave={() => setHoverRating(0)}
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => !readOnly && onRatingChange?.(star)}
            onMouseEnter={() => !readOnly && setHoverRating(star)}
            disabled={readOnly}
            className={`transition-all ${readOnly ? "cursor-default" : "cursor-pointer hover:scale-110"}`}
            aria-label={`Rate ${star} stars`}
          >
            <Star
              size={starSize}
              fill={star <= (hoverRating || rating) ? "oklch(0.85 0.18 195)" : "none"}
              color={star <= (hoverRating || rating) ? "oklch(0.85 0.18 195)" : "oklch(0.40 0.01 285)"}
              strokeWidth={1.5}
            />
          </button>
        ))}
      </div>
      {showLabel && (
        <span
          className="text-sm font-medium"
          style={{ color: "oklch(0.65 0.01 285)" }}
        >
          {rating > 0 ? `${rating}.0` : "Rate this"}
        </span>
      )}
    </div>
  );
}
