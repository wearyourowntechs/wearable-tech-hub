// =============================================================
// COMPARE PAGE — Dark Precision design
// Side-by-side product comparison tool with filters
// =============================================================

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, X, ExternalLink, ShoppingCart, Star } from "lucide-react";
import { products } from "@/lib/products";
import type { Product } from "@/lib/products";

const MAX_COMPARE = 3;

export default function ComparePage() {
  const [selected, setSelected] = useState<Product[]>([]);
  const [search, setSearch] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [minRating, setMinRating] = useState(0);

  const maxPriceInProducts = Math.max(...products.map((p) => p.price), 5000);

  const filtered = products.filter(
    (p) =>
      !selected.find((s) => s.id === p.id) &&
      p.price >= minPrice &&
      p.price <= maxPrice &&
      p.rating >= minRating &&
      (p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.brand.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase()))
  );

  const addProduct = (product: Product) => {
    if (selected.length < MAX_COMPARE) {
      setSelected([...selected, product]);
      setShowPicker(false);
      setSearch("");
    }
  };

  const removeProduct = (id: string) => {
    setSelected(selected.filter((p) => p.id !== id));
  };

  const resetFilters = () => {
    setMinPrice(0);
    setMaxPrice(maxPriceInProducts);
    setMinRating(0);
  };

  const allSpecs = selected.length > 0 ? Object.keys(selected[0].specs) : [];

  return (
    <div className="min-h-screen pt-16">
      {/* Header */}
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
              Side-by-Side
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Compare Products
          </h1>
          <p
            className="text-base"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
          >
            Select up to {MAX_COMPARE} products to compare side-by-side.
          </p>
        </div>
      </div>

      <div className="container py-10">
        {/* Product Slots */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {Array.from({ length: MAX_COMPARE }).map((_, i) => {
            const product = selected[i];
            return (
              <div key={i}>
                {product ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative rounded-xl overflow-hidden"
                    style={{
                      background: "oklch(0.15 0.008 265)",
                      border: "1px solid oklch(0.85 0.18 195 / 0.3)",
                    }}
                  >
                    <button
                      onClick={() => removeProduct(product.id)}
                      className="absolute top-2 right-2 z-10 w-6 h-6 rounded-full flex items-center justify-center transition-colors"
                      style={{
                        background: "oklch(0.65 0.22 25 / 0.8)",
                        color: "white",
                      }}
                    >
                      <X size={12} />
                    </button>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-36 object-cover"
                    />
                    <div className="p-4">
                      <p
                        className="text-xs font-semibold mb-0.5"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                      >
                        {product.brand}
                      </p>
                      <h3
                        className="text-sm font-bold mb-2"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                      >
                        {product.name}
                      </h3>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-lg font-bold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          ${product.price}
                        </span>
                        <a
                          href={product.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="btn-amazon flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold"
                        >
                          <ShoppingCart size={11} /> Buy
                        </a>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <button
                    onClick={() => setShowPicker(true)}
                    className="w-full h-48 rounded-xl flex flex-col items-center justify-center gap-2 transition-all"
                    style={{
                      background: "oklch(0.13 0.008 265)",
                      border: "2px dashed oklch(0.25 0.008 265)",
                      color: "oklch(0.45 0.01 285)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.85 0.18 195 / 0.4)";
                      (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.85 0.18 195)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.25 0.008 265)";
                      (e.currentTarget as HTMLButtonElement).style.color = "oklch(0.45 0.01 285)";
                    }}
                  >
                    <Plus size={24} />
                    <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "0.8rem", fontWeight: 600 }}>
                      Add Product
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* Product Picker Modal */}
        {showPicker && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "oklch(0 0 0 / 0.7)" }}
            onClick={() => setShowPicker(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="w-full max-w-2xl rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
              style={{
                background: "oklch(0.15 0.008 265)",
                border: "1px solid oklch(0.25 0.008 265)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div
                className="flex items-center justify-between p-4"
                style={{ borderBottom: "1px solid oklch(0.22 0.008 265)" }}
              >
                <h3
                  className="font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                >
                  Select a Product
                </h3>
                <button onClick={() => setShowPicker(false)}>
                  <X size={18} style={{ color: "oklch(0.55 0.01 285)" }} />
                </button>
              </div>

              {/* Filters Section */}
              <div className="p-4 border-b" style={{ borderColor: "oklch(0.22 0.008 265)" }}>
                <h4
                  className="text-sm font-semibold mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.01 285)" }}
                >
                  Filter Products
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Search */}
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="px-3 py-2 rounded-lg text-sm outline-none"
                    style={{
                      background: "oklch(0.19 0.008 265)",
                      border: "1px solid oklch(0.25 0.008 265)",
                      color: "oklch(0.94 0.005 65)",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  />

                  {/* Price Range */}
                  <div>
                    <label
                      className="text-xs font-semibold mb-2 block"
                      style={{ color: "oklch(0.75 0.01 285)" }}
                    >
                      Price: ${minPrice} - ${maxPrice}
                    </label>
                    <div className="space-y-1">
                      <input
                        type="range"
                        min="0"
                        max={maxPriceInProducts}
                        value={minPrice}
                        onChange={(e) => setMinPrice(Math.min(Number(e.target.value), maxPrice))}
                        className="w-full"
                        style={{ accentColor: "oklch(0.85 0.18 195)" }}
                      />
                      <input
                        type="range"
                        min="0"
                        max={maxPriceInProducts}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Math.max(Number(e.target.value), minPrice))}
                        className="w-full"
                        style={{ accentColor: "oklch(0.85 0.18 195)" }}
                      />
                    </div>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label
                      className="text-xs font-semibold mb-2 block"
                      style={{ color: "oklch(0.75 0.01 285)" }}
                    >
                      Minimum Rating
                    </label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="w-full px-3 py-2 rounded-lg text-sm"
                      style={{
                        background: "oklch(0.19 0.008 265)",
                        border: "1px solid oklch(0.25 0.008 265)",
                        color: "oklch(0.75 0.01 285)",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      <option value="0">All Ratings</option>
                      <option value="3">3+ Stars</option>
                      <option value="3.5">3.5+ Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="4.5">4.5+ Stars</option>
                    </select>
                  </div>
                </div>

                {/* Reset Button */}
                <button
                  onClick={resetFilters}
                  className="mt-3 px-3 py-1.5 rounded text-xs font-semibold transition-all"
                  style={{
                    background: "oklch(0.20 0.008 265)",
                    color: "oklch(0.75 0.01 285)",
                    border: "1px solid oklch(0.25 0.008 265)",
                  }}
                >
                  Reset Filters
                </button>
              </div>

              {/* Product List */}
              <div className="p-4 overflow-y-auto flex-1">
                <div className="space-y-2">
                  {filtered.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => addProduct(product)}
                      className="w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors"
                      style={{
                        background: "oklch(0.13 0.008 265)",
                        border: "1px solid oklch(0.20 0.008 265)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.85 0.18 195 / 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "oklch(0.20 0.008 265)";
                      }}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <p
                          className="text-xs font-semibold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                        >
                          {product.brand}
                        </p>
                        <p
                          className="text-sm font-bold truncate"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          {product.name}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="flex items-center gap-0.5">
                            <Star size={12} style={{ color: "oklch(0.85 0.18 195)", fill: "oklch(0.85 0.18 195)" }} />
                            <span
                              className="text-xs"
                              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
                            >
                              {product.rating}
                            </span>
                          </div>
                          <span
                            className="text-xs"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
                          >
                            ({product.reviewCount})
                          </span>
                        </div>
                      </div>
                      <span
                        className="text-sm font-bold flex-shrink-0"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                      >
                        ${product.price}
                      </span>
                    </button>
                  ))}
                  {filtered.length === 0 && (
                    <div
                      className="text-center py-8"
                      style={{ color: "oklch(0.55 0.01 285)" }}
                    >
                      <p style={{ fontFamily: "'DM Sans', sans-serif" }}>
                        No products match your filters
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Comparison Table */}
        {selected.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-x-auto rounded-xl"
            style={{
              background: "oklch(0.13 0.008 265)",
              border: "1px solid oklch(0.20 0.008 265)",
            }}
          >
            <table className="w-full">
              <tbody>
                {/* Product Names */}
                <tr style={{ borderBottom: "1px solid oklch(0.20 0.008 265)" }}>
                  <td
                    className="px-4 py-3 font-semibold text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.01 285)" }}
                  >
                    Product
                  </td>
                  {selected.map((product) => (
                    <td key={product.id} className="px-4 py-3 text-center">
                      <p
                        className="font-bold text-sm"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                      >
                        {product.name}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Price */}
                <tr style={{ borderBottom: "1px solid oklch(0.20 0.008 265)" }}>
                  <td
                    className="px-4 py-3 font-semibold text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.01 285)" }}
                  >
                    Price
                  </td>
                  {selected.map((product) => (
                    <td key={product.id} className="px-4 py-3 text-center">
                      <p
                        className="font-bold text-lg"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                      >
                        ${product.price}
                      </p>
                    </td>
                  ))}
                </tr>

                {/* Rating */}
                <tr style={{ borderBottom: "1px solid oklch(0.20 0.008 265)" }}>
                  <td
                    className="px-4 py-3 font-semibold text-sm"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.01 285)" }}
                  >
                    Rating
                  </td>
                  {selected.map((product) => (
                    <td key={product.id} className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Star size={14} style={{ color: "oklch(0.85 0.18 195)", fill: "oklch(0.85 0.18 195)" }} />
                        <span
                          className="font-bold"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          {product.rating}
                        </span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/* Specs */}
                {allSpecs.map((spec) => (
                  <tr key={spec} style={{ borderBottom: "1px solid oklch(0.20 0.008 265)" }}>
                    <td
                      className="px-4 py-3 font-semibold text-sm"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.75 0.01 285)" }}
                    >
                      {spec}
                    </td>
                    {selected.map((product) => (
                      <td
                        key={product.id}
                        className="px-4 py-3 text-center text-sm"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.01 285)" }}
                      >
                        {product.specs[spec as keyof typeof product.specs] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}

                {/* Buy Buttons */}
                <tr>
                  <td className="px-4 py-4" />
                  {selected.map((product) => (
                    <td key={product.id} className="px-4 py-4 text-center">
                      <a
                        href={product.amazonUrl}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all"
                        style={{
                          background: "oklch(0.85 0.18 195)",
                          color: "oklch(0.13 0.008 265)",
                        }}
                      >
                        <ShoppingCart size={14} />
                        Buy on Amazon
                      </a>
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </motion.div>
        )}
      </div>
    </div>
  );
}
