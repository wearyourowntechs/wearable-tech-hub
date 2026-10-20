import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Scale, X } from "lucide-react";
import { products, Product } from "../data/catalog";
import { productImages } from "../data/site";
import { AmazonButton } from "../components/ProductCard";
import { Disclosure } from "../components/SiteLayout";
import { useShop } from "../contexts/ShopContext";

const defaultIds = ["apple-watch-series-10", "garmin-venu-3", ""];
const knownIds = new Set(products.map((product) => product.id));

type QuerySelection = { explicit: boolean; ids: string[] };

function validUniqueIds(ids: string[]) {
  return Array.from(new Set(ids.filter((id) => knownIds.has(id)))).slice(0, 3);
}

function asColumns(ids: string[]) {
  return [...validUniqueIds(ids), ...Array(3).fill("")].slice(0, 3);
}

function readQuerySelection(): QuerySelection {
  if (typeof window === "undefined") return { explicit: false, ids: [] };
  const requested = new URLSearchParams(window.location.search).get("products");
  return { explicit: requested !== null, ids: requested ? validUniqueIds(requested.split(",")) : [] };
}

function evidenceStatus(product: Product) {
  return product.catalogOrigin === "existing-catalog"
    ? "Catalog overview — verify exact model"
    : "Specification-based review · not hands-on tested";
}

function batteryCaveat(product: Product) {
  return product.weaknesses.find((item) => /battery|charge|runtime|hours|days|case/i.test(item))
    || (product.catalogOrigin === "existing-catalog"
      ? "Verify the exact model’s current battery details."
      : "Review the stated usage conditions before comparing battery estimates.");
}

export default function Compare() {
  const { compared, ready, setCompared, clearCompared } = useShop();
  const [ids, setIds] = useState(defaultIds);
  const [querySelection] = useState<QuerySelection>(readQuerySelection);
  const initialized = useRef(false);

  useEffect(() => {
    if (!ready || initialized.current) return;
    initialized.current = true;

    if (querySelection.explicit) {
      if (querySelection.ids.length) {
        setIds(asColumns(querySelection.ids));
        setCompared(querySelection.ids);
      }
      return;
    }

    const storedIds = validUniqueIds(compared);
    if (storedIds.length) setIds(asColumns(storedIds));
  }, [compared, querySelection, ready, setCompared]);

  const picks = ids.map((id) => products.find((product) => product.id === id));
  const selectedProducts = picks.filter((product): product is Product => Boolean(product));
  const rows: { name: string; value: (product: Product) => string | string[] }[] = [
    { name: "Best fit", value: (product) => product.useCase },
    { name: "Device type", value: (product) => product.category.replaceAll("-", " ") },
    { name: "Phone compatibility", value: (product) => product.compatibility },
    { name: "Battery estimate", value: (product) => product.battery },
    { name: "Battery caveat", value: batteryCaveat },
    { name: "Key features", value: (product) => product.features.length ? product.features : "Not specified in the catalog" },
    { name: "Listed strengths", value: (product) => product.strengths },
    { name: "Limitations to weigh", value: (product) => product.weaknesses },
    {
      name: "Additional listed specifications",
      value: (product) => product.specs
        ? Object.entries(product.specs).map(([name, value]) => `${name}: ${value}`)
        : "—",
    },
    { name: "Evidence status", value: evidenceStatus },
  ];

  const updateSelection = (index: number, id: string) => {
    const next = [...ids];
    next[index] = id;
    setIds(next);
    if (ready) setCompared(validUniqueIds(next));
  };

  const clearSelection = () => {
    setIds(["", "", ""]);
    if (ready) clearCompared();
  };

  return (
    <div className="wrap inner-page compare-page">
      <div className="breadcrumbs">
        <a href="/">Home</a>
        <span>/</span>
        <span>Compare</span>
      </div>

      <div className="page-heading compare-page-heading">
        <span className="eyebrow">THE BIG PICTURE, SIDE BY SIDE</span>
        <h1>Find your better fit.</h1>
        <p>Compare published specifications and catalog notes for up to three wearables before you choose.</p>
      </div>

      <div className="compare-quick-links" aria-label="Start with a popular comparison">
        <span>Try a starting point:</span>
        <a href="/compare?products=apple-watch-series-10,garmin-venu-3">Apple Watch Series 10 + Garmin Venu 3</a>
        <a href="/compare?products=oura-ring-4,apple-watch-series-10">Oura Ring 4 + Apple Watch Series 10</a>
      </div>

      <div className="compare-controls">
        <p className="compare-selection-status" aria-live="polite">
          {ready ? `${selectedProducts.length} of 3 comparison slots selected.` : "Loading your saved comparison choices…"}
        </p>
        <button className="button secondary compare-clear-button" type="button" onClick={clearSelection} disabled={!ready || !selectedProducts.length}>
          <X size={16} aria-hidden="true" /> Clear selection
        </button>
      </div>

      <section className="compare-best-fit" aria-labelledby="best-fit-heading">
        <span className="eyebrow">A SIMPLE READ</span>
        <h2 id="best-fit-heading">Best-fit explanation</h2>
        {selectedProducts.length > 1 ? (
          <div className="compare-best-fit-list">
            {selectedProducts.map((product) => (
              <p key={product.id}><strong>{product.name}:</strong> {product.useCase}</p>
            ))}
          </div>
        ) : selectedProducts.length === 1 ? (
          <p>{selectedProducts[0].useCase} Add another product to see the supplied trade-offs side by side.</p>
        ) : (
          <p>Choose one or more products to compare their stated fit, compatibility, battery context, and limitations.</p>
        )}
      </section>

      <Disclosure />

      <div className="comparison-scroll" aria-busy={!ready}>
        <table className="comparison-table">
          <caption className="sr-only">Wearable specifications, evidence status, and editorial comparison</caption>
          <thead>
            <tr>
              <th scope="col">
                <div className="comparison-intro">
                  <Scale size={29} strokeWidth={1.5} aria-hidden="true" />
                  <h2>A clearer choice.</h2>
                  <p>Select a wearable in each column. A third is optional.</p>
                </div>
              </th>
              {picks.map((product, index) => (
                <th scope="col" key={index} className="comparison-product-heading">
                  <label className="sr-only" htmlFor={`compare-${index}`}>Product {index + 1}</label>
                  <select
                    id={`compare-${index}`}
                    value={ids[index]}
                    disabled={!ready}
                    onChange={(event) => updateSelection(index, event.target.value)}
                  >
                    <option value="">{index === 2 ? "+ Add a third wearable" : "Choose a wearable"}</option>
                    {products.map((candidate) => (
                      <option key={candidate.id} value={candidate.id} disabled={ids.includes(candidate.id) && ids[index] !== candidate.id}>
                        {candidate.name}
                      </option>
                    ))}
                  </select>
                  {product ? (
                    <div className="comparison-product-card">
                      <img src={productImages[product.id] || product.image} alt={product.name} width="200" height="200" />
                      <span className="eyebrow">{product.brand}</span>
                      <h3><a href={`/product/${product.id}`}>{product.name}</a></h3>
                      <p className={`comparison-evidence-status ${product.catalogOrigin === "existing-catalog" ? "catalog-overview" : "specification-review"}`}>
                        {evidenceStatus(product)}
                      </p>
                      <AmazonButton product={product} />
                      <span className="paid-link">Paid link · Check the exact variant and current availability on Amazon.</span>
                    </div>
                  ) : (
                    <div className="comparison-placeholder">
                      <Scale size={32} aria-hidden="true" />
                      <p>{index === 2 ? "Optional third perspective." : "Choose a wearable to begin."}</p>
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <th scope="row">{row.name}</th>
                {picks.map((product, index) => {
                  const value = product ? row.value(product) : "—";
                  return (
                    <td key={index}>
                      {Array.isArray(value) ? <ul>{value.map((item) => <li key={item}>{item}</li>)}</ul> : value}
                    </td>
                  );
                })}
              </tr>
            ))}
            <tr>
              <th scope="row">Manufacturer source</th>
              {picks.map((product, index) => (
                <td key={index}>
                  {product?.sourceUrl ? (
                    <a className="inline-link" href={product.sourceUrl} target="_blank" rel="noopener noreferrer">
                      Read listed specifications <ArrowUpRight size={14} />
                    </a>
                  ) : product ? (
                    <span className="comparison-no-source">No manufacturer source is linked for this catalog entry.</span>
                  ) : "—"}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <p className="comparison-note">Battery statements are published estimates with different conditions and are not directly comparable lab results. Actual life varies with settings and use; charging-case totals and mode-specific claims should be read literally. Existing catalog rows are overviews, not verified current offers, prices, ratings, or review counts.</p>
      <a className="inline-link compare-back-link" href="/explore">Back to all wearables <ArrowRight size={16} /></a>
    </div>
  );
}
