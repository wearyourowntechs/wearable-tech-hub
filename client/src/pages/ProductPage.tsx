// =============================================================
// PRODUCT DETAIL PAGE — Dark Precision design
// Full review, specs table, score breakdown, affiliate CTA
// =============================================================

import { motion } from "framer-motion";
import { useParams, Link } from "wouter";
import { Star, Check, X, ExternalLink, ShoppingCart, ArrowLeft, ChevronRight } from "lucide-react";
import { getProductById, getProductsByCategory } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

function ScoreBar({ label, value }: { label: string; value: number }) {
  const pct = (value / 5) * 100;
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span
          className="text-xs"
          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
        >
          {label}
        </span>
        <span
          className="text-xs font-medium"
          style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.85 0.18 195)" }}
        >
          {value.toFixed(1)}
        </span>
      </div>
      <div
        className="h-1.5 rounded-full overflow-hidden"
        style={{ background: "oklch(0.22 0.008 265)" }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="h-full rounded-full"
          style={{
            background: `linear-gradient(90deg, oklch(0.85 0.18 195), oklch(0.75 0.15 220))`,
          }}
        />
      </div>
    </div>
  );
}

export default function ProductPage() {
  const params = useParams<{ id: string }>();
  const product = getProductById(params.id || "");

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <div className="text-center">
          <p
            className="text-xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Product Not Found
          </p>
          <Link href="/">
            <button
              className="px-4 py-2 rounded text-sm"
              style={{
                background: "oklch(0.85 0.18 195)",
                color: "oklch(0.09 0.008 265)",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
              }}
            >
              Back to Home
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const related = getProductsByCategory(product.category)
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const overallScore =
    Object.values(product.score).reduce((a, b) => a + b, 0) /
    Object.values(product.score).length;

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6 text-xs" style={{ fontFamily: "'DM Sans', sans-serif" }}>
          <Link href="/">
            <span style={{ color: "oklch(0.55 0.01 285)" }} className="hover:text-white transition-colors">
              Home
            </span>
          </Link>
          <ChevronRight size={12} style={{ color: "oklch(0.35 0.008 265)" }} />
          <Link href={`/category/${product.category}`}>
            <span style={{ color: "oklch(0.55 0.01 285)" }} className="hover:text-white transition-colors capitalize">
              {product.category.replace("-", " ")}
            </span>
          </Link>
          <ChevronRight size={12} style={{ color: "oklch(0.35 0.008 265)" }} />
          <span style={{ color: "oklch(0.75 0.01 285)" }}>{product.name}</span>
        </div>

        <Link href={`/category/${product.category}`}>
          <button
            className="flex items-center gap-1.5 text-sm mb-8 transition-colors hover:text-white"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.55 0.01 285)" }}
          >
            <ArrowLeft size={14} /> Back to {product.category.replace("-", " ")}
          </button>
        </Link>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
          {/* Left: Image + Score */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="rounded-2xl overflow-hidden mb-4"
                style={{ border: "1px solid oklch(0.22 0.008 265)" }}
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
              </div>

              {/* Score Card */}
              <div
                className="rounded-xl p-5"
                style={{
                  background: "oklch(0.15 0.008 265)",
                  border: "1px solid oklch(0.22 0.008 265)",
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                  >
                    Expert Score
                  </h3>
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                  >
                    {overallScore.toFixed(1)}
                    <span className="text-lg" style={{ color: "oklch(0.45 0.01 285)" }}>/5</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {Object.entries(product.score).map(([key, val]) => (
                    <ScoreBar
                      key={key}
                      label={key.charAt(0).toUpperCase() + key.slice(1)}
                      value={val}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Details */}
          <div className="lg:col-span-3">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              {/* Brand + Badge */}
              <div className="flex items-center gap-3 mb-2">
                <span
                  className="text-sm font-semibold uppercase tracking-wider"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  {product.brand}
                </span>
                {product.badge && (
                  <span
                    className={`px-2 py-0.5 rounded text-xs ${
                      product.badge === "editors-choice" || product.badge === "top-rated"
                        ? "badge-editors-choice"
                        : product.badge === "best-value"
                        ? "badge-best-value"
                        : "badge-new"
                    }`}
                  >
                    {product.badge === "editors-choice"
                      ? "Editor's Choice"
                      : product.badge === "best-value"
                      ? "Best Value"
                      : product.badge === "top-rated"
                      ? "Top Rated"
                      : "New"}
                  </span>
                )}
              </div>

              <h1
                className="text-3xl md:text-4xl font-bold mb-4"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={16}
                      fill={s <= Math.round(product.rating) ? "#FFD700" : "transparent"}
                      style={{ color: s <= Math.round(product.rating) ? "#FFD700" : "oklch(0.35 0.008 265)" }}
                    />
                  ))}
                </div>
                <span
                  className="text-sm font-medium"
                  style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.85 0.18 195)" }}
                >
                  {product.rating.toFixed(1)} / 5.0
                </span>
                <span
                  className="text-sm"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.01 285)" }}
                >
                  ({product.reviewCount.toLocaleString()} reviews)
                </span>
              </div>

              <p
                className="text-base leading-relaxed mb-6"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.70 0.01 285)" }}
              >
                {product.shortDescription}
              </p>

              {/* Price + CTA */}
              <div
                className="flex flex-wrap items-center gap-4 p-5 rounded-xl mb-6"
                style={{
                  background: "oklch(0.15 0.008 265)",
                  border: "1px solid oklch(0.22 0.008 265)",
                }}
              >
                <div>
                  <p
                    className="text-xs mb-1"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.01 285)" }}
                  >
                    Current Price
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span
                      className="text-3xl font-bold"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                    >
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span
                        className="text-base line-through"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.01 285)" }}
                      >
                        ${product.originalPrice}
                      </span>
                    )}
                    {product.originalPrice && (
                      <span
                        className="px-2 py-0.5 rounded text-xs font-bold"
                        style={{
                          background: "oklch(0.65 0.22 25)",
                          color: "white",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        Save ${product.originalPrice - product.price}
                      </span>
                    )}
                  </div>
                </div>
                <a
                  href={product.amazonUrl}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="btn-amazon flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold"
                >
                  <ShoppingCart size={16} />
                  Buy on Amazon
                  <ExternalLink size={12} />
                </a>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "oklch(0.55 0.18 145 / 0.05)",
                    border: "1px solid oklch(0.55 0.18 145 / 0.2)",
                  }}
                >
                  <h4
                    className="text-sm font-semibold mb-3 flex items-center gap-1.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.18 145)" }}
                  >
                    <Check size={14} /> Pros
                  </h4>
                  <ul className="space-y-2">
                    {product.pros.map((pro) => (
                      <li key={pro} className="flex items-start gap-2">
                        <Check
                          size={12}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(0.75 0.18 145)" }}
                        />
                        <span
                          className="text-xs leading-relaxed"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.70 0.01 285)" }}
                        >
                          {pro}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div
                  className="p-4 rounded-xl"
                  style={{
                    background: "oklch(0.65 0.22 25 / 0.05)",
                    border: "1px solid oklch(0.65 0.22 25 / 0.2)",
                  }}
                >
                  <h4
                    className="text-sm font-semibold mb-3 flex items-center gap-1.5"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.22 25)" }}
                  >
                    <X size={14} /> Cons
                  </h4>
                  <ul className="space-y-2">
                    {product.cons.map((con) => (
                      <li key={con} className="flex items-start gap-2">
                        <X
                          size={12}
                          className="mt-0.5 flex-shrink-0"
                          style={{ color: "oklch(0.75 0.22 25)" }}
                        />
                        <span
                          className="text-xs leading-relaxed"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.70 0.01 285)" }}
                        >
                          {con}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Specs Table */}
              <div
                className="rounded-xl overflow-hidden"
                style={{ border: "1px solid oklch(0.22 0.008 265)" }}
              >
                <div
                  className="px-4 py-3"
                  style={{ background: "oklch(0.19 0.008 265)", borderBottom: "1px solid oklch(0.22 0.008 265)" }}
                >
                  <h3
                    className="text-sm font-semibold uppercase tracking-wider"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                  >
                    Full Specifications
                  </h3>
                </div>
                <div>
                  {Object.entries(product.specs).map(([key, value], i) => (
                    <div
                      key={key}
                      className="flex items-center px-4 py-3"
                      style={{
                        background: i % 2 === 0 ? "oklch(0.15 0.008 265)" : "oklch(0.13 0.008 265)",
                        borderBottom: i < Object.keys(product.specs).length - 1 ? "1px solid oklch(0.18 0.008 265)" : "none",
                      }}
                    >
                      <span
                        className="text-xs w-1/3 flex-shrink-0"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
                      >
                        {key}
                      </span>
                      <span
                        className="text-xs font-medium"
                        style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.80 0.01 285)" }}
                      >
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Affiliate Disclosure */}
        <div
          className="p-4 rounded-lg mb-12 text-xs"
          style={{
            background: "oklch(0.85 0.18 195 / 0.05)",
            border: "1px solid oklch(0.85 0.18 195 / 0.15)",
            fontFamily: "'DM Sans', sans-serif",
            color: "oklch(0.50 0.01 285)",
          }}
        >
          <span style={{ color: "oklch(0.85 0.18 195)", fontWeight: 600 }}>Affiliate Disclosure:</span> The links on this page are Amazon affiliate links. If you purchase through these links, Wear Your Own Tech earns a small commission at no extra cost to you. This helps us continue providing free, unbiased reviews.
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-6">
              <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
              <h2
                className="text-xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                Related Products
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
