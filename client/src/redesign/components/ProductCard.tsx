import { ArrowRight, ArrowUpRight, Bookmark, Check, Plus } from "lucide-react";
import { amazonProductLink, AMAZON_PRODUCT_TARGETS } from "../../../../shared/affiliate";
import { Product } from "../data/catalog";
import { productImages } from "../data/site";
import { useShop } from "../contexts/ShopContext";

export function AmazonButton({ product, className = "" }: { product: Product; className?: string }) {
  return <a className={`amazon-button ${className}`} href={amazonProductLink(product.id, product.name)} target="_blank" rel="sponsored noopener noreferrer">{AMAZON_PRODUCT_TARGETS[product.id] ? "Check price on Amazon" : "Find model on Amazon"} <ArrowUpRight size={16} aria-hidden="true" /></a>;
}
export default function ProductCard({ product }: { product: Product }) {
  const { saved, compared, toggleSaved, toggleCompared } = useShop();
  const isSaved = saved.includes(product.id);
  const isCompared = compared.includes(product.id);
  const batteryShort: Record<string, string> = {
    "apple-watch-series-10": "Up to 18 hours", "oura-ring-4": "Typically 5–8 days",
    "garmin-venu-3": "Up to 14 days*", "sony-linkbuds-fit": "Up to 21 hours with case",
  };
  const inherited = product.catalogOrigin === "existing-catalog";
  return <article className={`product-card ${inherited ? "catalog-inherited" : "sourced-pick"}`}>
    <div className="product-stage">
      <span className="product-label">{product.label}</span>
      <button className={`save-button ${isSaved ? "selected" : ""}`} onClick={() => toggleSaved(product.id)} aria-label={`${isSaved ? "Unsave" : "Save"} ${product.name}`} aria-pressed={isSaved}><Bookmark size={18} fill={isSaved ? "currentColor" : "none"} /></button>
      <a href={`/product/${product.id}`} aria-label={`Read about ${product.name}`}><img src={productImages[product.id] || product.image} alt={product.name} loading="lazy" width="400" height="400" /></a>
      <button className={`compare-mini ${isCompared ? "selected" : ""}`} onClick={() => toggleCompared(product.id)} aria-pressed={isCompared}>{isCompared ? <Check size={13} /> : <Plus size={13} />} Compare</button>
    </div>
    <div className="product-info">
      <span className="eyebrow product-brand">{product.brand} · {inherited ? "CATALOG LISTING" : "SOURCED EDITORIAL PICK"}</span>
      <h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
      <p>{product.tagline}</p>
      <div className="product-spec"><span>{inherited ? "Catalog battery note" : "Battery estimate"}</span><strong title={product.battery}>{batteryShort[product.id] || product.battery}</strong></div>
      <a className="card-review-link" href={`/product/${product.id}`}>{inherited ? "Explore this model" : "Read our verdict"}<ArrowRight size={14} /></a>
      <AmazonButton product={product} />
      <span className="paid-link">Paid link · Current offers and variants on Amazon</span>
      {product.id === "garmin-venu-3" && <span className="paid-link">*Default smartwatch mode; no activity or music.</span>}
      {inherited && <span className="catalog-evidence-note">Verify specifications for your exact model.</span>}
    </div>
  </article>;
}
