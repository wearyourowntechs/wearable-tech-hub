// =============================================================
// PRODUCT CARD — Dark Precision design
// Glowing card hover effect, star ratings, Amazon CTA
// =============================================================

import { Star, ExternalLink, ShoppingCart } from "lucide-react";
import { Link } from "wouter";
import type { Product } from "@/lib/products";

interface ProductCardProps {
  product: Product;
  variant?: "default" | "compact" | "featured";
}

function StarRating({ rating, size = 12 }: { rating: number; size?: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={size}
          fill={star <= Math.round(rating) ? "#FFD700" : "transparent"}
          style={{
            color: star <= Math.round(rating) ? "#FFD700" : "oklch(0.35 0.008 265)",
          }}
        />
      ))}
    </div>
  );
}

function Badge({ type }: { type: string }) {
  if (!type) return null;
  const styles: Record<string, { label: string; className: string }> = {
    "editors-choice": { label: "Editor's Choice", className: "badge-editors-choice" },
    "best-value": { label: "Best Value", className: "badge-best-value" },
    "new": { label: "New", className: "badge-new" },
    "top-rated": { label: "Top Rated", className: "badge-editors-choice" },
  };
  const s = styles[type];
  return (
    <span className={`px-2 py-0.5 rounded text-xs ${s.className}`}>
      {s.label}
    </span>
  );
}

export default function ProductCard({ product, variant = "default" }: ProductCardProps) {
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  if (variant === "compact") {
    return (
      <Link href={`/product/${product.id}`}>
        <div
          className="card-hover flex gap-3 p-3 rounded-lg cursor-pointer"
          style={{
            background: "oklch(0.15 0.008 265)",
            border: "1px solid oklch(0.22 0.008 265)",
          }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-16 h-16 object-cover rounded-md flex-shrink-0"
          />
          <div className="flex-1 min-w-0">
            <p
              className="text-xs mb-0.5"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)", fontWeight: 600 }}
            >
              {product.brand}
            </p>
            <p
              className="text-sm font-semibold leading-tight truncate"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
            >
              {product.name}
            </p>
            <div className="flex items-center gap-2 mt-1">
              <StarRating rating={product.rating} size={10} />
              <span
                className="text-xs"
                style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.85 0.18 195)" }}
              >
                ${product.price}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div
      className="card-hover rounded-xl overflow-hidden flex flex-col"
      style={{
        background: "oklch(0.15 0.008 265)",
        border: "1px solid oklch(0.22 0.008 265)",
      }}
    >
      {/* Image */}
      <Link href={`/product/${product.id}`}>
        <div className="relative overflow-hidden aspect-[4/3]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />

          {/* Discount badge */}
          {discount && (
            <div
              className="absolute top-3 right-3 px-2 py-0.5 rounded text-xs font-bold"
              style={{
                background: "oklch(0.65 0.22 25)",
                color: "white",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              -{discount}%
            </div>
          )}
          {/* Gradient overlay */}
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to top, oklch(0.15 0.008 265 / 0.6) 0%, transparent 50%)",
            }}
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div>
            <p
              className="text-xs font-semibold uppercase tracking-wider mb-1"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
            >
              {product.brand}
            </p>
            <Link href={`/product/${product.id}`}>
              <h3
                className="text-base font-bold leading-tight hover:text-cyan-400 transition-colors"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                {product.name}
              </h3>
            </Link>
          </div>
        </div>

        <p
          className="text-sm leading-relaxed mb-3 flex-1"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
        >
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={product.rating} />
          <span
            className="text-xs"
            style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.85 0.18 195)" }}
          >
            {product.rating.toFixed(1)}
          </span>
          <span
            className="text-xs"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.01 285)" }}
          >
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Key specs */}
        <div
          className="grid grid-cols-2 gap-1.5 mb-4 p-3 rounded-lg"
          style={{ background: "oklch(0.11 0.008 265)" }}
        >
          {Object.entries(product.specs)
            .slice(0, 2)
            .map(([key, value]) => (
              <div key={key}>
                <p
                  className="text-xs"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.01 285)" }}
                >
                  {key}
                </p>
                <p
                  className="text-xs font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.75 0.01 285)" }}
                >
                  {value}
                </p>
              </div>
            ))}
        </div>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span
                className="text-xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                ${product.price}
              </span>
              {product.originalPrice && (
                <span
                  className="text-sm line-through"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.01 285)" }}
                >
                  ${product.originalPrice}
                </span>
              )}
            </div>
          </div>
          <a
            href={product.amazonUrl}
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="btn-amazon flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold"
            onClick={(e) => e.stopPropagation()}
          >
            <ShoppingCart size={14} />
            Amazon
            <ExternalLink size={11} />
          </a>
        </div>
      </div>
    </div>
  );
}

export { StarRating, Badge };
