// =============================================================
// DEALS & DISCOUNTS PAGE — Dark Precision design
// Limited-time offers and flash sales
// =============================================================

import { motion } from "framer-motion";
import { Link } from "wouter";
import { Zap, Clock, TrendingDown, ExternalLink } from "lucide-react";
import { getActiveDeals, getTopDeals } from "@/lib/deals";

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

export default function DealsPage() {
  const topDeals = getTopDeals(6);
  const allDeals = getActiveDeals();

  const getDaysLeft = (expiresAt: string) => {
    const now = new Date();
    const expiry = new Date(expiresAt);
    const diff = expiry.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  const getBadgeColor = (badge?: string) => {
    switch (badge) {
      case "flash-sale":
        return "oklch(0.85 0.18 195)"; // Cyan
      case "today-only":
        return "oklch(0.65 0.22 25)"; // Red
      default:
        return "oklch(0.75 0.18 145)"; // Green
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="container py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
            >
              Limited-Time Offers
            </span>
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Deals & Discounts
          </h1>
          <p
            className="text-lg max-w-2xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
          >
            Save big on premium wearable tech. These deals won't last long — grab yours before they're gone!
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12"
        >
          {[
            { icon: Zap, label: "Active Deals", value: allDeals.length },
            { icon: TrendingDown, label: "Avg Discount", value: `${Math.round(allDeals.reduce((sum, d) => sum + d.discount, 0) / allDeals.length)}%` },
            { icon: Clock, label: "Expiring Soon", value: allDeals.filter((d) => getDaysLeft(d.expiresAt) <= 3).length },
          ].map(({ icon: Icon, label, value }, i) => (
            <motion.div
              key={label}
              variants={fadeUp}
              custom={i}
              className="p-4 rounded-xl"
              style={{
                background: "oklch(0.13 0.008 265)",
                border: "1px solid oklch(0.18 0.008 265)",
              }}
            >
              <div className="flex items-center gap-3">
                <Icon size={20} style={{ color: "oklch(0.85 0.18 195)" }} />
                <div>
                  <p
                    className="text-xs"
                    style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
                  >
                    {label}
                  </p>
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                  >
                    {value}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Deals Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={staggerContainer}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDeals.map((deal, i) => {
              const daysLeft = getDaysLeft(deal.expiresAt);
              return (
                <motion.div key={deal.id} variants={fadeUp} custom={i}>
                  <a href={deal.amazonUrl} target="_blank" rel="noopener noreferrer">
                    <div
                      className="group relative overflow-hidden rounded-xl transition-all duration-300 hover:shadow-lg"
                      style={{
                        background: "oklch(0.13 0.008 265)",
                        border: "1px solid oklch(0.18 0.008 265)",
                      }}
                    >
                      {/* Image */}
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={deal.image}
                          alt={deal.productName}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div
                          className="absolute inset-0"
                          style={{
                            background: "linear-gradient(to top, oklch(0.09 0.008 265 / 0.8) 0%, transparent 100%)",
                          }}
                        />

                        {/* Discount Badge */}
                        <div
                          className="absolute top-3 right-3 px-3 py-1 rounded-lg font-bold text-sm"
                          style={{
                            background: getBadgeColor(deal.badge),
                            color: "oklch(0.09 0.008 265)",
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        >
                          -{deal.discount}%
                        </div>

                        {/* Badge Label */}
                        {deal.badge && (
                          <div
                            className="absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold uppercase"
                            style={{
                              background: "oklch(0.09 0.008 265 / 0.9)",
                              color: getBadgeColor(deal.badge),
                              fontFamily: "'Space Grotesk', sans-serif",
                            }}
                          >
                            {deal.badge === "flash-sale" && "⚡ Flash Sale"}
                            {deal.badge === "today-only" && "🔥 Today Only"}
                            {deal.badge === "limited-time" && "⏰ Limited Time"}
                          </div>
                        )}
                      </div>

                      {/* Content */}
                      <div className="p-4">
                        <p
                          className="text-xs mb-1"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
                        >
                          {deal.brand}
                        </p>
                        <h3
                          className="text-lg font-bold mb-2 line-clamp-2"
                          style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                        >
                          {deal.productName}
                        </h3>

                        {/* Price */}
                        <div className="flex items-center gap-2 mb-3">
                          <span
                            className="text-2xl font-bold"
                            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                          >
                            ${deal.salePrice}
                          </span>
                          <span
                            className="text-sm line-through"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
                          >
                            ${deal.originalPrice}
                          </span>
                        </div>

                        {/* Description */}
                        <p
                          className="text-xs mb-3 line-clamp-2"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
                        >
                          {deal.description}
                        </p>

                        {/* Expires */}
                        <div
                          className="flex items-center gap-1 mb-4 text-xs"
                          style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.22 25)" }}
                        >
                          <Clock size={12} />
                          {daysLeft === 0 ? "Expires today" : `Expires in ${daysLeft} day${daysLeft !== 1 ? "s" : ""}`}
                        </div>

                        {/* CTA Button */}
                        <button
                          className="w-full py-2 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2"
                          style={{
                            background: "oklch(0.85 0.18 195)",
                            color: "oklch(0.09 0.008 265)",
                            fontFamily: "'Space Grotesk', sans-serif",
                          }}
                        >
                          View Deal <ExternalLink size={14} />
                        </button>
                      </div>
                    </div>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* No Deals Message */}
        {allDeals.length === 0 && (
          <div className="text-center py-12">
            <p
              className="text-lg"
              style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.55 0.01 285)" }}
            >
              No active deals at the moment. Check back soon!
            </p>
          </div>
        )}

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p
            className="text-sm mb-4"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
          >
            Want to stay updated on new deals?
          </p>
          <Link href="/">
            <span
              className="inline-block px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg"
              style={{
                background: "oklch(0.85 0.18 195)",
                color: "oklch(0.09 0.008 265)",
                fontFamily: "'Space Grotesk', sans-serif",
              }}
            >
              Subscribe to Our Newsletter
            </span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
