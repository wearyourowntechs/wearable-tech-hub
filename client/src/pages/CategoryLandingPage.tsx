// =============================================================
// CATEGORY LANDING PAGE — SEO-optimized category pages
// =============================================================

import { useRoute } from "wouter";
import { motion } from "framer-motion";
import { Star, CheckCircle, HelpCircle, ShoppingCart } from "lucide-react";
import { products } from "@/lib/products";
import { categoryPages } from "@/lib/categoryPages";
import ProductCard from "@/components/ProductCard";
import NotFound from "./NotFound";

export default function CategoryLandingPage() {
  const [, params] = useRoute("/category/:slug");
  const slug = params?.slug as string;

  const categoryPage = Object.values(categoryPages).find((c) => c.slug === slug);
  const categoryProducts = products.filter((p) => p.category === categoryPage?.id);

  if (!categoryPage) {
    return <NotFound />;
  }

  return (
    <div className="min-h-screen pt-16">
      {/* Meta Tags */}
      <head>
        <title>{categoryPage.title}</title>
        <meta name="description" content={categoryPage.metaDescription} />
        <meta property="og:title" content={categoryPage.title} />
        <meta property="og:description" content={categoryPage.metaDescription} />
      </head>

      {/* Hero Section */}
      <div
        className="py-16 md:py-24"
        style={{
          background: "oklch(0.13 0.008 265)",
          borderBottom: "1px solid oklch(0.20 0.008 265)",
        }}
      >
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
              <span
                className="text-xs font-semibold uppercase tracking-widest"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
              >
                Category Guide
              </span>
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold mb-4"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
            >
              {categoryPage.heroTitle}
            </h1>
            <p
              className="text-lg md:text-xl max-w-2xl"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
            >
              {categoryPage.heroSubtitle}
            </p>
          </motion.div>
        </div>
      </div>

      <div className="container py-16">
        {/* Overview Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="max-w-3xl">
            <p
              className="text-base leading-relaxed mb-6"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.01 285)" }}
            >
              {categoryPage.overview}
            </p>
          </div>
        </motion.section>

        {/* Key Benefits */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Key Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {categoryPage.keyBenefits.map((benefit, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="flex gap-3 p-4 rounded-lg"
                style={{
                  background: "oklch(0.15 0.008 265)",
                  border: "1px solid oklch(0.20 0.008 265)",
                }}
              >
                <CheckCircle
                  size={20}
                  style={{ color: "oklch(0.85 0.18 195)", flexShrink: 0, marginTop: "2px" }}
                />
                <p
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.01 285)" }}
                >
                  {benefit}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Featured Products */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.slice(0, 6).map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
          {categoryProducts.length > 6 && (
            <div className="text-center mt-8">
              <p
                style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
              >
                Showing 6 of {categoryProducts.length} products
              </p>
            </div>
          )}
        </motion.section>

        {/* Buying Tips */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Buying Guide
          </h2>
          <div className="space-y-4">
            {categoryPage.buyingTips.map((tip, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 rounded-lg"
                style={{
                  background: "oklch(0.15 0.008 265)",
                  border: "1px solid oklch(0.20 0.008 265)",
                }}
              >
                <p
                  className="font-semibold mb-2"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  Tip {idx + 1}
                </p>
                <p
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.01 285)" }}
                >
                  {tip}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* FAQ Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2
            className="text-2xl md:text-3xl font-bold mb-8"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {categoryPage.faqItems.map((item, idx) => (
              <motion.details
                key={idx}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 rounded-lg cursor-pointer group"
                style={{
                  background: "oklch(0.15 0.008 265)",
                  border: "1px solid oklch(0.20 0.008 265)",
                }}
              >
                <summary className="flex items-center gap-3 font-semibold">
                  <HelpCircle
                    size={18}
                    style={{ color: "oklch(0.85 0.18 195)", flexShrink: 0 }}
                  />
                  <span
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                  >
                    {item.question}
                  </span>
                </summary>
                <p
                  className="mt-3 ml-9"
                  style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.75 0.01 285)" }}
                >
                  {item.answer}
                </p>
              </motion.details>
            ))}
          </div>
        </motion.section>

        {/* CTA Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="p-8 md:p-12 rounded-xl text-center"
          style={{
            background: "oklch(0.15 0.008 265)",
            border: "1px solid oklch(0.20 0.008 265)",
          }}
        >
          <h3
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Ready to Find Your Perfect {categoryPage.heroTitle.split(" ").slice(0, 2).join(" ")}?
          </h3>
          <p
            className="mb-6 text-lg"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
          >
            Browse all {categoryProducts.length} products in this category with detailed reviews and comparisons.
          </p>
          <a
            href={`/category/${slug}`}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all"
            style={{
              background: "oklch(0.85 0.18 195)",
              color: "oklch(0.13 0.008 265)",
            }}
          >
            <ShoppingCart size={18} />
            Browse All Products
          </a>
        </motion.section>
      </div>
    </div>
  );
}
