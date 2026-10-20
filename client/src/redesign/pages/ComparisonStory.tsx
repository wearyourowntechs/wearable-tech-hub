import { ArrowRight, ArrowUpRight } from "lucide-react";
import { AmazonButton } from "../components/ProductCard";
import { Disclosure } from "../components/SiteLayout";
import { featuredProducts, type Product } from "../data/catalog";
import type { ComparisonStory as ComparisonStoryType } from "../data/comparisons";
import { productImages } from "../data/site";

function isProduct(product: Product | undefined): product is Product {
  return Boolean(product);
}

export default function ComparisonStory({
  story,
}: {
  story: ComparisonStoryType;
}) {
  // Deliberately resolve against the independently sourced featured shortlist, never inherited catalog entries.
  const products = story.productIds
    .map(productId =>
      featuredProducts.find(product => product.id === productId)
    )
    .filter(isProduct);
  const comparisonLink = `/compare?products=${story.productIds.join(",")}`;

  return (
    <article className="wrap story-page">
      <header className="story-header">
        <nav className="story-breadcrumbs" aria-label="Breadcrumb">
          <a href="/">Home</a>
          <span>/</span>
          <a href="/compare">Compare</a>
          <span>/</span>
          <span>{story.title}</span>
        </nav>
        <span className="eyebrow">{story.kicker}</span>
        <h1>{story.title}</h1>
        <p className="story-description">{story.description}</p>
        <div className="story-verdict">
          <span>SHORT VERDICT</span>
          <p>{story.verdict}</p>
        </div>
      </header>

      <section
        className="story-product-briefs"
        aria-label="Products in this comparison"
      >
        {products.map(product => (
          <article className="story-product-brief" key={product.id}>
            <div className="story-product-image">
              <img
                src={productImages[product.id] || product.image}
                alt={product.name}
                width="360"
                height="360"
              />
            </div>
            <div className="story-product-copy">
              <span className="eyebrow">{product.brand}</span>
              <h2>{product.name}</h2>
              <p>{product.summary}</p>
              <span className="story-evidence-label">
                Evidence: manufacturer-published product information
              </span>
              <div className="story-product-actions">
                <a
                  className="story-review-link"
                  href={`/product/${product.id}`}
                >
                  Read review <ArrowRight size={15} />
                </a>
                {product.sourceUrl &&
                product.catalogOrigin !== "existing-catalog" ? (
                  <a
                    className="story-source-link"
                    href={product.sourceUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Manufacturer details <ArrowUpRight size={14} />
                  </a>
                ) : null}
              </div>
              <AmazonButton product={product} className="story-amazon" />
              <span className="paid-link">
                Paid link · Check current price and availability on Amazon.
              </span>
            </div>
          </article>
        ))}
      </section>

      <section
        className="story-decision"
        aria-labelledby="story-decision-title"
      >
        <div className="story-decision-heading">
          <span className="eyebrow">AT-A-GLANCE</span>
          <h2 id="story-decision-title">
            The decision points that change the fit.
          </h2>
        </div>
        <div className="story-table-scroll">
          <table className="story-decision-table">
            <caption className="sr-only">
              Decision points for {story.title}
            </caption>
            <thead>
              <tr>
                <th scope="col">Consideration</th>
                {products.map(product => (
                  <th scope="col" key={product.id}>
                    {product.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Best fit</th>
                {products.map(product => (
                  <td key={product.id}>{product.useCase}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Phone compatibility</th>
                {products.map(product => (
                  <td key={product.id}>{product.compatibility}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Key features</th>
                {products.map(product => (
                  <td key={product.id}>
                    {product.features.join(", ") || "See manufacturer details"}
                  </td>
                ))}
              </tr>
              <tr>
                <th scope="row">Battery estimate</th>
                {products.map(product => (
                  <td key={product.id}>{product.battery}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Important consideration</th>
                {products.map(product => (
                  <td key={product.id}>{product.weaknesses[0]}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
        <p className="story-table-note">
          Battery estimates are manufacturer statements under differing
          conditions, rather than directly comparable lab results. Actual
          battery life varies with settings and use.
        </p>
      </section>

      <section className="story-editorial" aria-label="Editorial comparison">
        {story.sections.map((section, index) => (
          <section className="story-editorial-section" key={section.title}>
            <span className="story-section-number">0{index + 1}</span>
            <div>
              <h2>{section.title}</h2>
              <p>{section.text}</p>
            </div>
          </section>
        ))}
      </section>

      <aside className="story-next-step">
        <div>
          <span className="eyebrow">COMPARE YOUR WAY</span>
          <h2>Want to change the decision lens?</h2>
          <p>
            Open the interactive comparison to place these products beside
            another wearable from the featured shortlist.
          </p>
        </div>
        <a className="button primary" href={comparisonLink}>
          Open interactive comparison <ArrowRight size={17} />
        </a>
      </aside>
      <p className="story-wellness-note">
        Sleep and heart-rate features provide wellness information, not medical
        advice or diagnosis. Confirm compatibility, regional availability, and
        manufacturer terms before purchasing.
      </p>
      <Disclosure compact />
    </article>
  );
}
