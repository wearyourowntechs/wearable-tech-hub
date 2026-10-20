import React, { useState } from "react";
import { ArrowRight, ArrowUpRight, Bookmark, Check, Circle, Headphones, Menu, Search, ShieldCheck, Watch, Activity, X, Cable, Scale, Glasses } from "lucide-react";
import { primaryCategories } from "../data/site";
import { products } from "../data/catalog";
import { useShop } from "../contexts/ShopContext";

export function CategoryIcon({ type, size = 24 }: { type: string; size?: number }) {
  const Icon = ({ watch: Watch, activity: Activity, ring: Circle, audio: Headphones, accessory: Cable, glasses: Glasses } as Record<string, typeof Watch>)[type] || Watch;
  return <Icon size={size} strokeWidth={1.5} aria-hidden="true" />;
}
export function Disclosure({ compact = false }: { compact?: boolean }) {
  return <p className={`disclosure ${compact ? "compact" : ""}`}><ShieldCheck size={15} aria-hidden="true" /><span>As an Amazon Associate I earn from qualifying purchases. <a href="/disclosure">How our links work <ArrowUpRight size={12} /></a></span></p>;
}
function Wordmark() {
  return <a className="wordmark" href="/" aria-label="Wear Your Own Techs home"><img src="/logo.svg" alt="" width="39" height="39" /><span>wear your own<span className="wordmark-bottom">techs<span className="wordmark-dot">.</span></span></span></a>;
}
export default function SiteLayout({ children, path }: { children: React.ReactNode; path: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { saved, compared, clearCompared, notice } = useShop();
  const suggestions = products.filter((p) => `${p.name} ${p.brand} ${p.tagline}`.toLowerCase().includes(query.toLowerCase())).slice(0, 6);
  return <>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <div className="top-strip">Compare the trade-offs. Find your fit.<a href="/find-your-fit">Your shortlist starts here <ArrowRight size={12} /></a></div>
    <header className="site-header"><div className="header-inner"><Wordmark />
      <nav className={menuOpen ? "main-nav open" : "main-nav"} aria-label="Main navigation">
        <a className={path.startsWith("/comparisons") || path === "/compare" ? "active" : ""} href="/comparisons">Comparisons</a>
        <a className={path === "/reviews" || path.startsWith("/product") || path.startsWith("/category") || path === "/explore" ? "active" : ""} href="/reviews">Reviews & models</a>
        <a className={path.startsWith("/guides") || path === "/buying-guides" ? "active" : ""} href="/buying-guides">Buying guides</a>
        <a className={path === "/about" ? "active" : ""} href="/about">Our approach</a>
      </nav>
      <div className="header-actions"><button className="icon-button" aria-label={searchOpen ? "Close search" : "Search wearables"} aria-expanded={searchOpen} onClick={() => { setSearchOpen(!searchOpen); setMenuOpen(false); }}>{searchOpen ? <X size={20} /> : <Search size={20} />}</button><a className="icon-button saved-link" href="/saved" aria-label={`Saved picks (${saved.length})`}><Bookmark size={20} />{saved.length > 0 && <span>{saved.length}</span>}</a><span className="header-divider" /><a className="header-cta" href="/find-your-fit">Find my fit <ArrowUpRight size={15} /></a><button className="icon-button menu-toggle" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => { setMenuOpen(!menuOpen); setSearchOpen(false); }}>{menuOpen ? <X size={23} /> : <Menu size={23} />}</button></div>
    </div>
    {searchOpen && <div className="search-panel"><div className="wrap"><form action="/reviews" role="search"><Search size={22} /><label className="sr-only" htmlFor="global-search">Search wearable technology</label><input autoFocus id="global-search" name="q" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find a product, brand, or feature…" /><button className="button primary" type="submit">Search <ArrowRight size={16} /></button></form><div className="search-suggestions"><span className="eyebrow">{query ? "MATCHING MODELS" : "START WITH THESE"}</span>{suggestions.length ? suggestions.map((p) => <a key={p.id} href={`/product/${p.id}`}>{p.name}<ArrowUpRight size={15} /></a>) : <p>No model matches yet. Try a broader search.</p>}</div></div></div>}
    </header>
    <main id="main-content">{children}</main>
    <footer className="site-footer"><div className="wrap footer-main"><div className="footer-brand"><Wordmark /><p>Less guessing.<br />Better choosing.</p><span className="domain-label">wearyourowntechs.com</span></div><div className="footer-column"><h3>Explore wearables</h3>{primaryCategories.map((category) => <a key={category.id} href={`/category/${category.id}`}>{category.name}</a>)}<a href="/reviews">All categories & models</a></div><div className="footer-column"><h3>Make an informed choice</h3><a href="/comparisons">Editorial comparisons</a><a href="/compare">Build a comparison</a><a href="/find-your-fit">Find your fit</a><a href="/buying-guides">Buying guides</a><a href="/saved">Your saved picks</a><a href="/about">Our approach</a></div><div className="footer-note"><span className="eyebrow">CLEAR SOURCES. CLEAR DISCLOSURES.</span><p>As an Amazon Associate I earn from qualifying purchases.</p><p>Our editorial shortlist uses published specifications, not hands-on testing. Inherited catalog information is marked where it has not been independently verified.</p><a href="/disclosure">Read our affiliate disclosure <ArrowUpRight size={14} /></a></div></div><div className="wrap footer-bottom"><span>© 2026 Wear Your Own Techs</span><span>Know why it fits.</span><div><a href="/legal">Privacy & legal</a><a href="/disclosure">Affiliate disclosure</a></div></div></footer>
    {compared.length > 0 && path !== "/compare" && <div className="compare-tray"><Scale size={19} /><span><strong>{compared.length} pick{compared.length > 1 ? "s" : ""}</strong> to compare</span><a href={`/compare?products=${compared.join(",")}`}>Compare now <ArrowRight size={16} /></a><button onClick={clearCompared} aria-label="Clear comparison"><X size={17} /></button></div>}
    <div className={`toast-message ${notice ? "visible" : ""}`} role="status" aria-live="polite">{notice && <><Check size={16} /> {notice}</>}</div>
  </>;
}
