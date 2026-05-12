// =============================================================
// BUYING GUIDES PAGE — Dark Precision design
// Structured guides for different wearable categories
// =============================================================

import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Clock, BookOpen } from "lucide-react";

const guides = [
  {
    id: "best-smartwatch-2025",
    title: "Best Smartwatches of 2025",
    subtitle: "The Definitive Buying Guide",
    description:
      "From the Apple Watch Ultra 2 to the Garmin Fēnix 8, we break down every major smartwatch to help you find the perfect match for your lifestyle, budget, and ecosystem.",
    category: "Smartwatches",
    readTime: "12 min read",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/smartwatch-category-WKqFe94BYAPt8V4kiLX3gD.webp",
    sections: [
      "Who should buy a smartwatch?",
      "Apple Watch vs Android Wear",
      "Key features to look for",
      "Budget vs premium picks",
      "Our top 5 recommendations",
    ],
    href: "/category/smartwatches",
  },
  {
    id: "best-fitness-tracker-2025",
    title: "Best Fitness Trackers of 2025",
    subtitle: "From Budget Bands to Pro Monitors",
    description:
      "Not everyone needs a full smartwatch. Fitness trackers offer focused health monitoring at a lower price. We compare the Fitbit Charge 6, WHOOP 5.0, and more.",
    category: "Fitness Trackers",
    readTime: "10 min read",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/fitness-tracker-category-UCmKXj65PpLEG8nAygtcUJ.webp",
    sections: [
      "Fitness tracker vs smartwatch",
      "Sleep tracking accuracy compared",
      "GPS: built-in vs connected",
      "Subscription models explained",
      "Best picks by use case",
    ],
    href: "/category/fitness-trackers",
  },
  {
    id: "best-smart-ring-2025",
    title: "Best Smart Rings of 2025",
    subtitle: "The Discreet Health Tracker",
    description:
      "Smart rings are the most discreet wearables available. We compare the Oura Ring 4, Samsung Galaxy Ring, and RingConn Gen 2 to find the best option for you.",
    category: "Smart Rings",
    readTime: "8 min read",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/smart-ring-category-XsL2zS3BjHhGtUciiyt9UJ.webp",
    sections: [
      "What can a smart ring actually track?",
      "Subscription vs no-subscription rings",
      "Sizing and comfort guide",
      "Battery life comparison",
      "Oura Ring 4 vs Galaxy Ring",
    ],
    href: "/category/smart-rings",
  },
  {
    id: "best-smart-glasses-2025",
    title: "Best Smart Glasses of 2025",
    subtitle: "AI-Powered Eyewear Reviewed",
    description:
      "Smart glasses have finally gone mainstream. The Ray-Ban Meta Wayfarer and Amazon Echo Frames bring AI assistants to your face. Here's what you need to know.",
    category: "Smart Glasses",
    readTime: "9 min read",
    image: "https://d2xsxph8kpxj0f.cloudfront.net/310519663651644589/cNZFBcai4VvVZ9Us6eXbuZ/ar-glasses-category-gNZrUvSeoACDzBCrWXLhBw.webp",
    sections: [
      "Smart glasses vs AR glasses",
      "Camera privacy considerations",
      "Audio quality compared",
      "AI assistant integration",
      "Style and frame options",
    ],
    href: "/category/smart-glasses",
  },
];

const quickTips = [
  {
    title: "Define Your Primary Use Case",
    body: "Are you a serious athlete, a casual health tracker, or a tech enthusiast? Your answer determines whether you need a Garmin Fēnix or an Amazfit Balance.",
  },
  {
    title: "Consider Your Ecosystem",
    body: "Apple Watch works best with iPhone. Samsung Galaxy Watch integrates deeply with Galaxy phones. Most other watches work cross-platform.",
  },
  {
    title: "Battery Life vs Features",
    body: "More features generally mean shorter battery life. The Apple Watch lasts ~18 hours; the Garmin Fēnix 8 lasts 28 days. Choose accordingly.",
  },
  {
    title: "Watch for Subscription Costs",
    body: "WHOOP requires $30/month. Oura Ring requires $5.99/month. Fitbit Premium is optional but unlocks key features. Factor these into your budget.",
  },
];

export default function BuyingGuidesPage() {
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
              Expert Guidance
            </span>
          </div>
          <h1
            className="text-3xl md:text-4xl font-bold mb-2"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
          >
            Buying Guides
          </h1>
          <p
            className="text-base max-w-xl"
            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
          >
            Not sure which wearable to buy? Our in-depth guides break down every category so you can make a confident, informed purchase.
          </p>
        </div>
      </div>

      <div className="container py-12">
        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {guides.map((guide, i) => (
            <motion.div
              key={guide.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Link href={guide.href}>
                <div
                  className="card-hover rounded-xl overflow-hidden cursor-pointer"
                  style={{
                    background: "oklch(0.15 0.008 265)",
                    border: "1px solid oklch(0.22 0.008 265)",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={guide.image}
                      alt={guide.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background: "linear-gradient(to bottom, transparent 40%, oklch(0.15 0.008 265 / 0.9) 100%)",
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className="px-2 py-1 rounded text-xs font-semibold"
                        style={{
                          background: "oklch(0.85 0.18 195 / 0.15)",
                          border: "1px solid oklch(0.85 0.18 195 / 0.3)",
                          color: "oklch(0.85 0.18 195)",
                          fontFamily: "'Space Grotesk', sans-serif",
                        }}
                      >
                        {guide.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock size={12} style={{ color: "oklch(0.45 0.01 285)" }} />
                      <span
                        className="text-xs"
                        style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.45 0.01 285)" }}
                      >
                        {guide.readTime}
                      </span>
                    </div>
                    <h2
                      className="text-lg font-bold mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                    >
                      {guide.title}
                    </h2>
                    <p
                      className="text-xs mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)", fontWeight: 600 }}
                    >
                      {guide.subtitle}
                    </p>
                    <p
                      className="text-sm leading-relaxed mb-4"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
                    >
                      {guide.description}
                    </p>

                    {/* Sections */}
                    <div
                      className="p-3 rounded-lg mb-4"
                      style={{ background: "oklch(0.11 0.008 265)" }}
                    >
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-2 flex items-center gap-1.5"
                        style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.55 0.01 285)" }}
                      >
                        <BookOpen size={11} /> What's Covered
                      </p>
                      <ul className="space-y-1">
                        {guide.sections.map((section) => (
                          <li
                            key={section}
                            className="text-xs flex items-center gap-1.5"
                            style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.65 0.01 285)" }}
                          >
                            <span style={{ color: "oklch(0.85 0.18 195)" }}>→</span> {section}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center gap-1.5 text-sm font-semibold" style={{ color: "oklch(0.85 0.18 195)", fontFamily: "'Space Grotesk', sans-serif" }}>
                      Read Guide <ArrowRight size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Quick Tips */}
        <div
          className="rounded-2xl p-8"
          style={{
            background: "oklch(0.13 0.008 265)",
            border: "1px solid oklch(0.20 0.008 265)",
          }}
        >
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-6" style={{ background: "oklch(0.85 0.18 195)" }} />
            <h2
              className="text-xl font-bold"
              style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
            >
              Quick Buying Tips
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {quickTips.map((tip, i) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-4 rounded-xl"
                style={{
                  background: "oklch(0.15 0.008 265)",
                  border: "1px solid oklch(0.22 0.008 265)",
                }}
              >
                <div className="flex items-start gap-3">
                  <div
                    className="w-6 h-6 rounded flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "oklch(0.85 0.18 195 / 0.15)",
                      border: "1px solid oklch(0.85 0.18 195 / 0.3)",
                    }}
                  >
                    <span
                      className="text-xs font-bold"
                      style={{ fontFamily: "'JetBrains Mono', monospace", color: "oklch(0.85 0.18 195)" }}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h3
                      className="text-sm font-bold mb-1"
                      style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                    >
                      {tip.title}
                    </h3>
                    <p
                      className="text-xs leading-relaxed"
                      style={{ fontFamily: "'DM Sans', sans-serif", color: "oklch(0.60 0.01 285)" }}
                    >
                      {tip.body}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
