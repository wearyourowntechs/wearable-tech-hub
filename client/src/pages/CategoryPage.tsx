// =============================================================
// CATEGORY PAGE — Dark Precision design
// Shows all products in a given category with filter/sort
// =============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { useParams } from "wouter";
import { SlidersHorizontal, ArrowUpDown } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, categories } from "@/lib/products";

const CATEGORY_IMAGES: Record<string, string> = {
  smartwatches: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
  "fitness-trackers": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
  "smart-rings": "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=800&fit=crop",
  "smart-glasses": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
  "vr-headsets": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=800&fit=croph=800https://images.unsplash.com/photo-1552820728-8ac41f1ce891?w=800&h=800&fit=cropfit=crop",
  "kids-wearables": "https://images.unsplash.com/photo-1587300411107-ec48553489af?w=800https://images.unsplash.com/photo-1552053831-71594a27c62d?w=800&h=800&fit=croph=800https://images.unsplash.com/photo-1552053831-71594a27c62d?w=800&h=800&fit=cropfit=crop",
  "pet-tech": "https://images.unsplash.com/photo-1587300411107-ec48553489af?w=800https://images.unsplash.com/photo-1552053831-71594a27c62d?w=800&h=800&fit=croph=800https://images.unsplash.com/photo-1552053831-71594a27c62d?w=800&h=800&fit=cropfit=crop",
  "bluetooth-headsets": "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
  "wearable-jewelry": "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop",
  "bluetooth-hats": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=800&fit=crop",
};

type SortOption = "rating" | "price-asc" | "price-desc" | "reviews";

export default function CategoryPage() {
  const params = useParams<{ id: string }>();
  const categoryId = params.id || "smartwatches";
  const [sort, setSort] = useState<SortOption>("rating");
  const [filterBadge, setFilterBadge] = useState<string>("all");

  const category = categories.find((c) => c.id === categoryId);
  let products = getProductsByCategory(categoryId);

  // Filter
  // Badge filter removed - not available in current product data

  // Sort
  products = [...products].sort((a, b) => {
    if (sort === "rating") return b.rating - a.rating;
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "reviews") return b.reviewCount - a.reviewCount;
    return 0;
  });

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-16">
        <p style={{ color: "oklch(0.55 0.01 285)", fontFamily: "'DM Sans', sans-serif" }}>
          Category not found.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Category Hero */}
      <div
        className="relative h-48 md:h-64 overflow-hidden"
        style={{ borderBottom: "1px solid oklch(0.20 0.008 265)" }}
      >
        <img
          src={CATEGORY_IMAGES[categoryId as keyof typeof CATEGORY_IMAGES]}
          alt={category?.name}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(to right, oklch(0.09 0.008 265 / 0.95) 0%, oklch(0.09 0.008 265 / 0.6) 100%)",
          }}
        />
        <div className="absolute inset-0 flex items-center">
          <div className="container">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  {category.productCount} Products
                </span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                {category.name}
              </h1>
              <p
                className="text-sm max-w-md"
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
              >
                {category.description}
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container py-10">
        {/* Filter/Sort Bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-4 mb-8 p-4 rounded-xl"
          style={{
            background: "oklch(0.15 0.008 265)",
            border: "1px solid oklch(0.22 0.008 265)",
          }}
        >
          {/* Filter badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <SlidersHorizontal size={14} style={{ color: "oklch(0.55 0.01 285)" }} />
            {["all", "editors-choice", "best-value", "top-rated", "new"].map((badge) => (
              <button
                key={badge}
                onClick={() => setFilterBadge(badge)}
                className="px-3 py-1 rounded text-xs font-medium transition-all"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  background: filterBadge === badge ? "oklch(0.85 0.18 195 / 0.15)" : "transparent",
                  border: `1px solid ${filterBadge === badge ? "oklch(0.85 0.18 195 / 0.4)" : "oklch(0.25 0.008 265)"}`,
                  color: filterBadge === badge ? "oklch(0.85 0.18 195)" : "oklch(0.55 0.01 285)",
                }}
              >
                {badge === "all" ? "All" : badge.split("-").map((w) => w[0].toUpperCase() + w.slice(1)).join(" ")}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2">
            <ArrowUpDown size={14} style={{ color: "oklch(0.55 0.01 285)" }} />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortOption)}
              className="text-xs px-3 py-1.5 rounded outline-none"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                background: "oklch(0.19 0.008 265)",
                border: "1px solid oklch(0.25 0.008 265)",
                color: "oklch(0.75 0.01 285)",
              }}
            >
              <option value="rating">Top Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="reviews">Most Reviews</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}>
              No products found for this filter.
            </p>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.07 } } }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.05 } },
                }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
