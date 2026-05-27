// =============================================================
// HOME PAGE — Dark Precision design
// Hero → Featured Products → Categories → Top Picks → Newsletter
// =============================================================

import { useAuth } from "@/_core/hooks/useAuth";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Shield, Star, TrendingUp, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "wouter";
import ProductCard from "@/components/ProductCard";
import { getTopRatedProducts, categories, getProductsByCategory } from "@/lib/products";

const HERO_IMAGE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/hero-banner-V4mk7MRe5dx89YicUH5c2h.webp";

const CATEGORY_IMAGES: Record<string, string> = {
  smartwatches: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&h=800&fit=crop",
  "fitness-trackers": "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=800&h=800&fit=crop",
  "smart-rings": "https://m.media-amazon.com/images/I/61NRd+-YgGL._AC_SL1500_.jpg",
  "smart-glasses": "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&h=800&fit=crop",
  "vr-headsets": "https://images.unsplash.com/photo-1611532736579-6b16e2b50449?w=800&h=800&fit=crop",
  "kids-wearables": "https://m.media-amazon.com/images/I/71+yTZnhAeL._AC_SL1500_.jpg",
  "pet-tech": "https://m.media-amazon.com/images/I/61iiMRU7DQL._AC_SL1500_.jpg",
  "bluetooth-headsets": "https://m.media-amazon.com/images/I/61hQumf6ufL._AC_SL1500_.jpg",
  "wearable-jewelry": "https://m.media-amazon.com/images/I/612yOMdW8IL._AC_SL1500_.jpg",
  "bluetooth-hats": "https://m.media-amazon.com/images/I/51KKDkDocDL._AC_SL1024_.jpg",
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08 },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();

  const featured = getTopRatedProducts(8);
  
  // Get top-rated product from each category
  const topRated = categories.map(cat => {
    const categoryProducts = getProductsByCategory(cat.id);
    return categoryProducts.sort((a, b) => b.rating - a.rating)[0];
  }).filter(Boolean);

  return (
    <div className="min-h-screen">
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img
            src={HERO_IMAGE}
            alt="Wearable Technology"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(105deg, oklch(0.09 0.008 265 / 0.92) 0%, oklch(0.09 0.008 265 / 0.7) 50%, oklch(0.09 0.008 265 / 0.4) 100%)",
            }}
          />
          {/* Cyan glow overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse at 70% 50%, oklch(0.85 0.18 195 / 0.06) 0%, transparent 60%)",
            }}
          />
        </div>

        {/* Grid texture overlay */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.85 0.18 195) 1px, transparent 1px), linear-gradient(90deg, oklch(0.85 0.18 195) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="container relative z-10 pt-24 pb-16">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2 mb-6"
            >
              <div
                className="h-px w-8"
                style={{ background: "oklch(0.85 0.18 195)" }}
              />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: "oklch(0.85 0.18 195)",
                }}
              >
                Expert Reviews & Buying Guides
              </span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.05] mb-6"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "oklch(0.94 0.005 65)",
                letterSpacing: "-0.03em",
              }}
            >
              The Future
              <br />
              <span className="text-gradient-cyan">On Your Wrist</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
              className="text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "oklch(0.70 0.01 285)",
              }}
            >
              Unbiased reviews, in-depth comparisons, and expert buying guides for smartwatches, fitness trackers, smart rings, and AR glasses.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
              className="flex flex-wrap gap-3"
            >
              <Link href="/category/smartwatches">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                  style={{
                    background: "oklch(0.85 0.18 195)",
                    color: "oklch(0.09 0.008 265)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 0 24px oklch(0.85 0.18 195 / 0.3)",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 40px oklch(0.85 0.18 195 / 0.5)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.boxShadow =
                      "0 0 24px oklch(0.85 0.18 195 / 0.3)";
                  }}
                >
                  Explore Products <ArrowRight size={16} />
                </button>
              </Link>
              <Link href="/buying-guides">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all"
                  style={{
                    background: "oklch(0.85 0.18 195 / 0.1)",
                    border: "1px solid oklch(0.85 0.18 195 / 0.3)",
                    color: "oklch(0.85 0.18 195)",
                    fontFamily: "'Space Grotesk', sans-serif",
                  }}
                >
                  Buying Guides
                </button>
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap gap-6 mt-12"
            >
              {[
                { value: "50+", label: "Products Reviewed" },
                { value: "4.8★", label: "Avg Expert Score" },
                { value: "100K+", label: "Monthly Readers" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div
                    className="text-2xl font-bold"
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      color: "oklch(0.85 0.18 195)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="text-xs"
                    style={{
                      fontFamily: "'DM Sans', sans-serif",
                      color: "oklch(0.55 0.01 285)",
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span
            className="text-xs uppercase tracking-widest"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.45 0.01 285)" }}
          >
            Scroll
          </span>
          <div
            className="w-px h-8 animate-pulse"
            style={{ background: "linear-gradient(to bottom, oklch(0.85 0.18 195 / 0.5), transparent)" }}
          />
        </motion.div>
      </section>

      {/* ── TRUST BAR ─────────────────────────────────────────── */}
      <section
        style={{
          background: "oklch(0.13 0.008 265)",
          borderTop: "1px solid oklch(0.20 0.008 265)",
          borderBottom: "1px solid oklch(0.20 0.008 265)",
        }}
      >
        <div className="container py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Shield, label: "Unbiased Reviews", desc: "No paid placements" },
              { icon: Star, label: "Expert Tested", desc: "Hands-on evaluations" },
              { icon: TrendingUp, label: "Updated Weekly", desc: "Always current" },
              { icon: Zap, label: "Best Prices", desc: "Amazon affiliate links" },
            ].map(({ icon: Icon, label, desc }) => (
              <div key={label} className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "oklch(0.85 0.18 195 / 0.1)",
                    border: "1px solid oklch(0.85 0.18 195 / 0.2)",
                  }}
                >
                  <Icon size={14} style={{ color: "oklch(0.85 0.18 195)" }} />
                </div>
                <div>
                  <p
                    className="text-sm font-semibold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
                  >
                    {desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ─────────────────────────────────── */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="flex items-end justify-between mb-10">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
                  <span
                    className="text-xs font-semibold uppercase tracking-widest"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                  >
                    Hand-Picked
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                >
                  Editor's Top Picks
                </h2>
              </div>
              <Link href="/reviews">
                <span
                  className="hidden md:flex items-center gap-1 text-sm font-medium transition-colors hover:text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  View all reviews <ChevronRight size={16} />
                </span>
              </Link>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {featured.map((product: any, i: any) => (
                <motion.div key={product.id} variants={fadeUp} custom={i + 1}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CATEGORIES ────────────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.008 265)" }}
      >
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  Browse By Type
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                Product Categories
              </h2>
            </motion.div>

            <style>{`
              @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
              }
              .animate-fade-in {
                animation: fadeIn 0.6s ease-in-out forwards;
              }
            `}</style>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {categories.map((category: any, i: any) => (
                <motion.div key={category.id} variants={fadeUp} custom={i + 1}>
                  <Link href={`/category/${category.id}`}>
                    <div
                      className="card-hover relative overflow-hidden rounded-xl aspect-[4/3] group cursor-pointer transition-all duration-300 hover:shadow-2xl"
                      style={{ border: "1px solid oklch(0.22 0.008 265)", boxShadow: "0 0 0 0 oklch(0.85 0.18 195 / 0)" }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 20px 2px oklch(0.85 0.18 195 / 0.3)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLElement).style.boxShadow = "0 0 0 0 oklch(0.85 0.18 195 / 0)";
                      }}
                    >
                      <img
                        src={CATEGORY_IMAGES[category.id as keyof typeof CATEGORY_IMAGES]}
                        alt={category.name}
                        className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110 animate-fade-in"
                        loading="lazy"
                      />
                      <div
                        className="absolute inset-0"
                        style={{
                          background:
                            "linear-gradient(to top, oklch(0.09 0.008 265 / 0.9) 0%, oklch(0.09 0.008 265 / 0.3) 60%, transparent 100%)",
                        }}
                      />
                      <div className="absolute inset-0 p-4 flex flex-col justify-end">
                        <h3
                          className="text-lg font-bold mb-1"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          {category.name}
                        </h3>
                        <p
                          className="text-xs mb-2"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
                        >
                          {category.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <span
                            className="text-xs"
                            style={{
                              fontFamily: "'JetBrains Mono', monospace",
                              color: "oklch(0.85 0.18 195)",
                            }}
                          >
                            {category.productCount} products
                          </span>
                          <ArrowRight
                            size={14}
                            style={{ color: "oklch(0.85 0.18 195)" }}
                            className="group-hover:translate-x-1 transition-transform"
                          />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TOP RATED ─────────────────────────────────────────── */}
      <section className="py-20">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeUp} custom={0} className="mb-10">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
                <span
                  className="text-xs font-semibold uppercase tracking-widest"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  Highest Rated
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                Top Rated Products
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {topRated.map((product, i) => (
                <motion.div key={product.id} variants={fadeUp} custom={i + 1}>
                  <div
                    className="card-hover flex gap-4 p-4 rounded-xl"
                    style={{
                      background: "oklch(0.15 0.008 265)",
                      border: "1px solid oklch(0.22 0.008 265)",
                    }}
                  >
                    <Link href={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
                      />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                          >
                            {product.brand}
                          </p>
                          <Link href={`/product/${product.id}`}>
                            <h3
                              className="text-sm font-bold leading-tight hover:text-cyan-400 transition-colors"
                              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                            >
                              {product.name}
                            </h3>
                          </Link>
                        </div>
                        <span
                          className="text-lg font-bold flex-shrink-0"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          ${product.price}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              size={11}
                              fill={s <= Math.round(product.rating) ? "#FFD700" : "transparent"}
                              style={{ color: s <= Math.round(product.rating) ? "#FFD700" : "oklch(0.35 0.008 265)" }}
                            />
                          ))}
                        </div>
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
                      <div className="flex items-center justify-between mt-3">
                        <p
                          className="text-xs leading-relaxed line-clamp-1"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
                        >
                          {product.description}
                        </p>
                        <a
                          href={product.amazonUrl}
                          target="_blank"
                          rel="noopener noreferrer nofollow"
                          className="btn-amazon flex items-center gap-1 px-3 py-1.5 rounded text-xs font-semibold flex-shrink-0 ml-2"
                        >
                          Buy <ExternalLink size={10} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── BUYING GUIDE CTA ──────────────────────────────────── */}
      <section
        className="py-20"
        style={{ background: "oklch(0.13 0.008 265)" }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl p-8 md:p-12"
            style={{
              background: "linear-gradient(135deg, oklch(0.15 0.008 265) 0%, oklch(0.18 0.01 230) 100%)",
              border: "1px solid oklch(0.85 0.18 195 / 0.2)",
            }}
          >
            {/* Glow effect */}
            <div
              className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl"
              style={{ background: "oklch(0.85 0.18 195 / 0.08)" }}
            />
            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <span
                  className="text-xs font-semibold uppercase tracking-widest mb-3 block"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  Not Sure Where to Start?
                </span>
                <h2
                  className="text-2xl md:text-3xl font-bold mb-3"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                >
                  Read Our Expert Buying Guides
                </h2>
                <p
                  className="text-base max-w-lg"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
                >
                  From budget fitness trackers to premium smartwatches — our guides help you find the perfect wearable for your lifestyle and budget.
                </p>
              </div>
              <Link href="/buying-guides">
                <button
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm whitespace-nowrap transition-all"
                  style={{
                    background: "oklch(0.85 0.18 195)",
                    color: "oklch(0.09 0.008 265)",
                    fontFamily: "'Space Grotesk', sans-serif",
                    boxShadow: "0 0 24px oklch(0.85 0.18 195 / 0.3)",
                  }}
                >
                  Read Buying Guides <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}


