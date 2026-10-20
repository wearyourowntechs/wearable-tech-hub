import { ArrowRight, ArrowUpRight, Bookmark, Check, Plus, Scale } from "lucide-react";
import { featuredProducts, products, Product } from "../data/catalog";
import { productImages } from "../data/site";
import { AmazonButton } from "../components/ProductCard";
import { Disclosure } from "../components/SiteLayout";
import { useShop } from "../contexts/ShopContext";

const uniqueProducts = (items: Product[]) =>
  items.filter((item, index, all) => all.findIndex((candidate) => candidate.id === item.id) === index);

export default function ProductDetail({ product }: { product: Product }) {
  const { saved, compared, toggleSaved, toggleCompared } = useShop();
  const isCatalogOverview = product.catalogOrigin === "existing-catalog";
  const evidenceStatus = isCatalogOverview
    ? "Catalog overview — verify exact model"
    : "Specification-based review · not hands-on tested";
  const alternatives = uniqueProducts([
    ...featuredProducts.filter((item) => item.category === product.category && item.id !== product.id),
    ...products.filter((item) => item.category === product.category && item.id !== product.id),
    ...featuredProducts.filter((item) => item.id !== product.id),
  ]).slice(0, 2);
  const specifications = [
    ["Category", product.category.replaceAll("-", " ")],
    ["Battery estimate", product.battery],
    ["Phone compatibility", product.compatibility],
    ["Editorial fit", product.useCase],
    ...Object.entries(product.specs || {}).filter(([name]) => name !== "Battery"),
  ];

  return (
    <div className="wrap inner-page product-detail">
      <div className="breadcrumbs">
        <a href="/">Home</a>
        <span>/</span>
        <a href="/explore">Wearables</a>
        <span>/</span>
        <span>{product.name}</span>
      </div>

      <section className="product-detail-top" aria-labelledby="product-title">
        <div className="detail-product-stage">
          <span className="product-label">{product.label}</span>
          <img src={productImages[product.id] || product.image} alt={product.name} width="600" height="600" />
        </div>
        <div className="detail-product-copy">
          <span className="eyebrow">{product.brand} · PRODUCT OVERVIEW</span>
          <h1 id="product-title">{product.name}</h1>
          <p className="detail-tagline">{product.tagline}</p>
          <p className="detail-summary">{product.summary}</p>
          <p className={`detail-evidence-status ${isCatalogOverview ? "catalog-overview" : "specification-review"}`}>
            {evidenceStatus}
          </p>
          <div className="detail-quick-specs" aria-label="At a glance">
            <div><span>Battery estimate</span><strong>{product.battery}</strong></div>
            <div><span>Phone compatibility</span><strong>{product.compatibility}</strong></div>
            <div><span>Best fit</span><strong>{product.useCase}</strong></div>
          </div>
          <div className="detail-primary-cta">
            <AmazonButton product={product} className="detail-amazon detail-amazon-top" />
            <span className="paid-link">Paid link · Check the exact variant and current availability on Amazon.</span>
          </div>
          <Disclosure compact />
          <div className="detail-actions" aria-label="Save or compare this product">
            <button className="button secondary" aria-pressed={saved.includes(product.id)} onClick={() => toggleSaved(product.id)}>
              <Bookmark size={16} fill={saved.includes(product.id) ? "currentColor" : "none"} />
              {saved.includes(product.id) ? "Saved to your picks" : "Save this pick"}
            </button>
            <button className="button secondary" aria-pressed={compared.includes(product.id)} onClick={() => toggleCompared(product.id)}>
              <Scale size={17} />
              {compared.includes(product.id) ? "Added to comparison" : "Add to comparison"}
            </button>
          </div>
        </div>
      </section>

      <nav className="product-detail-anchors" aria-label="On this page">
        <a href="#verdict">Verdict</a>
        <a href="#specifications">Specifications</a>
        <a href="#alternatives">Alternatives</a>
      </nav>

      <section id="verdict" className="product-verdict-section" aria-labelledby="verdict-heading">
        <div className="product-section-heading">
          <span className="eyebrow">QUICK VERDICT</span>
          <h2 id="verdict-heading">What the published details point to.</h2>
        </div>
        <div className="product-verdict-grid">
          <article className="quick-verdict-card">
            <h3><Check size={18} aria-hidden="true" /> Quick verdict</h3>
            {isCatalogOverview ? (
              <p>{product.summary}</p>
            ) : (
              <p>Based on the supplied specifications, {product.name} is most relevant for {product.useCase}</p>
            )}
          </article>
          <article className="best-for-card">
            <h3>Best for</h3>
            <p>{product.useCase}</p>
          </article>
          <article className="skip-for-card">
            <h3>Who should skip or pause</h3>
            <ul>
              {product.weaknesses.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </article>
        </div>
        <div className="detail-after-verdict-cta">
          <AmazonButton product={product} className="detail-amazon detail-amazon-after-verdict" />
          <span className="paid-link">Paid link · Confirm fit, compatibility, and the exact model before checkout.</span>
        </div>
      </section>

      <section className="product-editorial product-summary-section" aria-labelledby="summary-heading">
        <div className="product-summary-copy">
          <span className="eyebrow">{isCatalogOverview ? "RETAINED CATALOG NOTES" : "EDITORIAL OVERVIEW"}</span>
          <h2 id="summary-heading">Summary</h2>
          {product.review.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p className="editorial-caveat">
            {isCatalogOverview
              ? "This retained catalog overview is not a current verification or a hands-on test. Confirm the exact model, variant, compatibility, and current manufacturer information before buying."
              : "This is a specification-based editorial review, not a hands-on test. Wellness features are not a substitute for professional medical advice, and availability, features, and compatibility can vary."}
          </p>
          <p className="detail-methodology-note"><strong>Methodology:</strong> We summarize the supplied catalog information and clearly separate it from hands-on testing or live offer data.</p>
          {product.sourceUrl && (
            <a href={product.sourceUrl} target="_blank" rel="noopener noreferrer" className="inline-link detail-source-link">
              Read the listed manufacturer specifications <ArrowUpRight size={15} />
            </a>
          )}
        </div>
        <aside className="product-tradeoffs" aria-label="Strengths and limitations">
          <div className="verdict-card">
            <h3><Check size={18} aria-hidden="true" /> What stands out</h3>
            <ul>{product.strengths.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <div className="verdict-card consideration">
            <h3><Plus size={18} aria-hidden="true" /> Limitations to weigh</h3>
            <ul>{product.weaknesses.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </aside>
      </section>

      <section id="specifications" className="product-specifications-section" aria-labelledby="specifications-heading">
        <div className="product-section-heading">
          <span className="eyebrow">AT A GLANCE</span>
          <h2 id="specifications-heading">Specifications and fit notes</h2>
        </div>
        <div className="detail-specification-box">
          {specifications.map(([name, value]) => (
            <div key={name} className="detail-specification-item">
              <span>{name}</span>
              <strong>{value}</strong>
            </div>
          ))}
          <div className="detail-specification-item detail-feature-list">
            <span>Listed features</span>
            <strong>{product.features.length ? product.features.join(" · ") : "Not specified in the catalog"}</strong>
          </div>
        </div>
        <p className="comparison-note">Battery statements are manufacturer or catalog estimates with conditions that vary by settings and use. Compare the stated scenario, not just the headline figure.</p>
      </section>

      <section id="alternatives" className="product-alternatives-section" aria-labelledby="alternatives-heading">
        <div className="product-section-heading product-alternatives-heading">
          <div>
            <span className="eyebrow">KEEP COMPARING</span>
            <h2 id="alternatives-heading">Alternatives to consider</h2>
          </div>
          <a className="inline-link" href={`/compare?products=${product.id}`}>Compare this product <ArrowRight size={16} /></a>
        </div>
        <div className="product-alternative-grid">
          {alternatives.map((alternative) => (
            <article key={alternative.id} className="detail-alternative-card">
              <img src={productImages[alternative.id] || alternative.image} alt={alternative.name} width="240" height="240" loading="lazy" />
              <div>
                <span className="eyebrow">{alternative.brand}</span>
                <h3><a href={`/product/${alternative.id}`}>{alternative.name}</a></h3>
                <p>{alternative.useCase}</p>
                <a className="inline-link" href={`/product/${alternative.id}`}>View product overview <ArrowRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <div className="product-mobile-sticky" aria-label={`Shop ${product.name}`}>
        <AmazonButton product={product} className="detail-amazon detail-amazon-mobile-sticky" />
        <span className="paid-link">Paid link</span>
      </div>
    </div>
  );
}
