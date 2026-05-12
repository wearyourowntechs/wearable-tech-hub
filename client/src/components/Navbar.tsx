// =============================================================
// NAVBAR — Dark Precision design
// Sticky header with logo, category nav, and search
// =============================================================

import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Zap, Search, ChevronDown } from "lucide-react";
import { categories } from "@/lib/products";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: isScrolled
          ? "oklch(0.11 0.008 265 / 0.95)"
          : "oklch(0.11 0.008 265 / 0.7)",
        backdropFilter: "blur(16px)",
        borderBottom: isScrolled
          ? "1px solid oklch(0.25 0.008 265)"
          : "1px solid transparent",
      }}
    >
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 group">
              <div
                className="w-8 h-8 rounded flex items-center justify-center"
                style={{
                  background: "oklch(0.85 0.18 195 / 0.15)",
                  border: "1px solid oklch(0.85 0.18 195 / 0.4)",
                }}
              >
                <Zap
                  size={16}
                  style={{ color: "oklch(0.85 0.18 195)" }}
                  className="group-hover:scale-110 transition-transform"
                />
              </div>
              <div>
                <span
                  className="text-lg font-bold leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.94 0.005 65)" }}
                >
                  WearableTech
                </span>
                <span
                  className="text-lg font-bold leading-none"
                  style={{ fontFamily: "'Space Grotesk', sans-serif", color: "oklch(0.85 0.18 195)" }}
                >
                  Hub
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/" active={location === "/"}>
              Home
            </NavLink>
            <div className="relative group">
              <button
                className="flex items-center gap-1 px-3 py-2 text-sm rounded transition-colors"
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 500,
                  color: "oklch(0.75 0.01 285)",
                }}
              >
                Categories <ChevronDown size={14} />
              </button>
              {/* Dropdown */}
              <div
                className="absolute top-full left-0 w-56 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 translate-y-1 group-hover:translate-y-0"
                style={{
                  background: "oklch(0.15 0.008 265)",
                  border: "1px solid oklch(0.25 0.008 265)",
                  boxShadow: "0 16px 48px oklch(0 0 0 / 0.5)",
                }}
              >
                {categories.map((cat) => (
                  <Link key={cat.id} href={`/category/${cat.id}`}>
                    <div
                      className="px-4 py-2.5 text-sm transition-colors hover:bg-white/5"
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        color: "oklch(0.75 0.01 285)",
                      }}
                    >
                      <div style={{ color: "oklch(0.94 0.005 65)", fontWeight: 500 }}>
                        {cat.name}
                      </div>
                      <div className="text-xs mt-0.5" style={{ color: "oklch(0.55 0.01 285)" }}>
                        {cat.productCount} products
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <NavLink href="/reviews" active={location === "/reviews"}>
              Reviews
            </NavLink>
            <NavLink href="/buying-guides" active={location === "/buying-guides"}>
              Buying Guides
            </NavLink>
            <NavLink href="/compare" active={location === "/compare"}>
              Compare
            </NavLink>
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            <button
              className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded text-sm transition-colors"
              style={{
                background: "oklch(0.19 0.008 265)",
                border: "1px solid oklch(0.25 0.008 265)",
                color: "oklch(0.55 0.01 285)",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              <Search size={14} />
              <span>Search...</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 rounded"
              style={{ color: "oklch(0.94 0.005 65)" }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{
            background: "oklch(0.13 0.008 265)",
            borderColor: "oklch(0.25 0.008 265)",
          }}
        >
          <div className="container py-4 flex flex-col gap-1">
            {[
              { href: "/", label: "Home" },
              { href: "/category/smartwatches", label: "Smartwatches" },
              { href: "/category/fitness-trackers", label: "Fitness Trackers" },
              { href: "/category/smart-rings", label: "Smart Rings" },
              { href: "/category/smart-glasses", label: "Smart Glasses" },
              { href: "/reviews", label: "Reviews" },
              { href: "/buying-guides", label: "Buying Guides" },
              { href: "/compare", label: "Compare" },
            ].map((item) => (
              <Link key={item.href} href={item.href}>
                <div
                  className="px-3 py-2.5 rounded text-sm"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 500,
                    color: location === item.href ? "oklch(0.85 0.18 195)" : "oklch(0.75 0.01 285)",
                    background: location === item.href ? "oklch(0.85 0.18 195 / 0.1)" : "transparent",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link href={href}>
      <span
        className="px-3 py-2 text-sm rounded transition-colors relative"
        style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontWeight: 500,
          color: active ? "oklch(0.85 0.18 195)" : "oklch(0.75 0.01 285)",
          background: active ? "oklch(0.85 0.18 195 / 0.1)" : "transparent",
        }}
      >
        {children}
        {active && (
          <span
            className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
            style={{ background: "oklch(0.85 0.18 195)" }}
          />
        )}
      </span>
    </Link>
  );
}
