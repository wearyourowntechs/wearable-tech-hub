// Owner-corrected Amazon Associates ID. Preserve in every update and deployment.
export const AMAZON_ASSOCIATE_TAG = "weyoowte-20";
export const AMAZON_MARKETPLACE = "https://www.amazon.com";

// Exact US product pages inspected Oct 20, 2026. No prices/stock are cached here.
export const AMAZON_PRODUCT_TARGETS: Record<string, { asin: string; variant: string }> = {
  "apple-watch-series-10": { asin: "B0DGJ5KQL7", variant: "42mm GPS, Jet Black, Black Sport Band S/M; check condition and variant" },
  "garmin-venu-3": { asin: "B0CDC6H66Y", variant: "45mm, Black; confirm the exact offer" },
  "oura-ring-4": { asin: "B0D9WT1S2T", variant: "Silver, initially size 10; use Oura sizing and select your size" },
  "sony-linkbuds-fit": { asin: "B0DGVWF79V", variant: "Black LinkBuds Fit; confirm the exact offer" },
};
export function amazonLink(query: string): string {
  const url = new URL("/s", AMAZON_MARKETPLACE);
  url.searchParams.set("k", query);
  url.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
  return url.toString();
}
export function amazonProductLink(productId: string, productName: string): string {
  const target = AMAZON_PRODUCT_TARGETS[productId];
  if (!target) return amazonLink(productName);
  const url = new URL(`/dp/${target.asin}`, AMAZON_MARKETPLACE);
  url.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
  return url.toString();
}
/** Never assume an opaque short link's embedded tag or regional destination. */
export function withAffiliateTag(value: string, fallbackQuery = "wearable technology"): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || !["amazon.com", "www.amazon.com"].includes(url.hostname)) return amazonLink(fallbackQuery);
    url.searchParams.set("tag", AMAZON_ASSOCIATE_TAG);
    return url.toString();
  } catch {
    return amazonLink(fallbackQuery);
  }
}
