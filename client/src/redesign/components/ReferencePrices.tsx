import { ArrowUpRight } from "lucide-react";
import { referencePrices } from "../data/reference-prices";
import { featuredProducts } from "../data/catalog";

export default function ReferencePrices() {
  return <section id="reference-prices" className="reference-prices">
    <h2>Reference prices, not live offers.</h2>
    <p>Our price-range filter uses the historical manufacturer figures below. It does not query Amazon prices, and a product’s current offer may be higher or lower. The values are for the starting or named variant, exclude any ongoing membership, and are not equivalent current-market comparisons.</p>
    <div className="reference-price-list">
      {featuredProducts.map((product) => {
        const reference = referencePrices[product.id];
        return <div key={product.id}><strong>{product.name}</strong><span>${reference.usd.toFixed(2)} · {reference.label}</span><a className="inline-link" href={reference.source} target="_blank" rel="noopener noreferrer">Manufacturer source <ArrowUpRight size={13} /></a></div>;
      })}
    </div>
  </section>;
}
