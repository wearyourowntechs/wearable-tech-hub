import { referencePrices } from "./reference-prices";
import type { Product } from "./catalog";
export interface ProductFilters {
  query: string;
  brand: string;
  compatibility: string;
  budget: string;
  feature: string;
  category: string;
  priceRange: string;
}
export function matchesReferenceRange(id: string, range: string): boolean {
  if (!range) return true;
  const price = referencePrices[id]?.usd;
  if (price === undefined) return false;
  if (range === "under250") return price < 250;
  if (range === "250to400") return price >= 250 && price <= 400;
  if (range === "over400") return price > 400;
  return true;
}
export function filterProducts(products: Product[], filters: ProductFilters): Product[] {
  return products.filter((product) => {
    const categoryMatches = !filters.category || product.category === filters.category || (filters.category === "fitness-trackers" && product.features.includes("Heart rate"));
    const text = `${product.name} ${product.brand} ${product.summary} ${product.features.join(" ")}`.toLowerCase();
    return categoryMatches && (!filters.brand || product.brand === filters.brand) && (!filters.compatibility || product.compatibility.includes(filters.compatibility)) && (!filters.budget || product.budget === filters.budget) && (!filters.feature || product.features.includes(filters.feature)) && matchesReferenceRange(product.id, filters.priceRange) && text.includes(filters.query.toLowerCase());
  });
}
