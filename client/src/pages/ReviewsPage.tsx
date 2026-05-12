// =============================================================
// REVIEWS PAGE — Dark Precision design
// All product reviews with category tabs
// =============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { products, categories } from "@/lib/products";
import ProductCard from "@/components/ProductCard";

export default function ReviewsPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => b.rating - a.rating);

  return (
    <div className="min-h-screen pt-16">
      {/* Page Header */}
      <div
        className="py-12"
        style={{
          background: "oklch(0.13 0.008 265)",
          borderBottom: "1px solid oklch(0.20 0.008 265)",
        }}
      >
        <div className="container">
          <div className="flex items-center gap-2 mb-2">
            <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
            >
              {products.length} Products Reviewed
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            All Reviews
          </h1>
          <p
            className="mt-2 text-base"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
          >
            Expert, hands-on reviews of the best wearable technology available on Amazon.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[{ id: "all", name: "All Products" }, ...categories].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: activeCategory === cat.id ? "oklch(0.85 0.18 195 / 0.15)" : "oklch(0.15 0.008 265)",
                border: `1px solid ${activeCategory === cat.id ? "oklch(0.85 0.18 195 / 0.4)" : "oklch(0.22 0.008 265)"}`,
                color: activeCategory === cat.id ? "oklch(0.85 0.18 195)" : "oklch(0.60 0.01 285)",
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <motion.div
          key={activeCategory}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
        >
          {sorted.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
