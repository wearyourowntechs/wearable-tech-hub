// =============================================================
// FOOTER — Dark Precision design
// Affiliate disclosure + links + brand
// =============================================================

import { Link } from "wouter";
import { Zap, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer
      style={{
        background: "oklch(0.09 0.008 265)",
        borderTop: "1px solid oklch(0.20 0.008 265)",
      }}
    >
      {/* Affiliate Disclosure Banner */}
      <div
        className="py-3"
        style={{
          background: "oklch(0.85 0.18 195 / 0.08)",
          borderBottom: "1px solid oklch(0.85 0.18 195 / 0.15)",
        }}
      >
        <div className="container">
          <p
            className="text-xs text-center"
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "oklch(0.55 0.01 285)",
            }}
          >
            <span style={{ color: "oklch(0.85 0.18 195)" }}>Disclosure:</span>{" "}
            WearableTech Hub is a participant in the Amazon Services LLC Associates Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to Amazon.com. As an Amazon Associate, we earn from qualifying purchases at no extra cost to you.
          </p>
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{
                  background: "oklch(0.85 0.18 195 / 0.15)",
                  border: "1px solid oklch(0.85 0.18 195 / 0.4)",
                }}
              >
                <Zap size={16} style={{ color: "oklch(0.85 0.18 195)" }} />
              </div>
              <span
                className="text-lg font-bold"
                style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
              >
                WearableTech<span style={{ color: "oklch(0.85 0.18 195)" }}>Hub</span>
              </span>
            </div>
            <p
              className="text-sm leading-relaxed"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "oklch(0.55 0.01 285)",
              }}
            >
              Expert reviews and buying guides for the best wearable technology. We test every product so you don't have to.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "oklch(0.85 0.18 195)",
              }}
            >
              Categories
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/category/smartwatches", label: "Smartwatches" },
                { href: "/category/fitness-trackers", label: "Fitness Trackers" },
                { href: "/category/smart-rings", label: "Smart Rings" },
                { href: "/category/smart-glasses", label: "Smart Glasses" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-sm transition-colors hover:text-white"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "oklch(0.55 0.01 285)",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "oklch(0.85 0.18 195)",
              }}
            >
              Resources
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/reviews", label: "All Reviews" },
                { href: "/buying-guides", label: "Buying Guides" },
                { href: "/compare", label: "Compare Products" },
                { href: "/about", label: "About Us" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-sm transition-colors hover:text-white"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "oklch(0.55 0.01 285)",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4
              className="text-sm font-semibold mb-4 uppercase tracking-wider"
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                color: "oklch(0.85 0.18 195)",
              }}
            >
              Legal
            </h4>
            <ul className="space-y-2">
              {[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/affiliate-disclosure", label: "Affiliate Disclosure" },
                { href: "/contact", label: "Contact" },
              ].map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>
                    <span
                      className="text-sm transition-colors hover:text-white"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "oklch(0.55 0.01 285)",
                      }}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          style={{ borderTop: "1px solid oklch(0.20 0.008 265)" }}
        >
          <p
            className="text-xs"
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              color: "oklch(0.45 0.01 285)",
            }}
          >
            © 2025 WearableTech Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-1">
            <a
              href="https://www.amazon.com?tag=wearabletech-20"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs transition-colors hover:text-white"
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: "oklch(0.45 0.01 285)",
              }}
            >
              Shop on Amazon <ExternalLink size={10} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
