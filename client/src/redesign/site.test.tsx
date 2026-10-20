import { describe, expect, it } from "vitest";
import { amazonLink, amazonProductLink, withAffiliateTag, AMAZON_ASSOCIATE_TAG, AMAZON_PRODUCT_TARGETS } from "../../../shared/affiliate";
import { products, featuredProducts } from "./data/catalog";
import { products as legacyProducts } from "./data/legacy-products";
import { pageRoutes } from "./data/routes";
import { comparisonStories, getRecommendations } from "./data/comparisons";
import { filterProducts, matchesReferenceRange, ProductFilters } from "./data/filter";
import { renderPage } from "./entry-server";
const template = '<html><head><title>Site</title><meta name="description" content="Site" /></head><body><div id="root"></div></body></html>';
const defaults: ProductFilters = { query: "", category: "", brand: "", compatibility: "", budget: "", feature: "", priceRange: "" };

describe("corrected owner affiliate ID", () => {
  it("locks the exact user-corrected ID", () => {
    expect(AMAZON_ASSOCIATE_TAG).toBe("weyoowte-20");
    for (const product of products) {
      const url = new URL(amazonProductLink(product.id, product.name));
      expect(url.hostname).toBe("www.amazon.com");
      expect(url.searchParams.get("tag")).toBe("weyoowte-20");
      if (!AMAZON_PRODUCT_TARGETS[product.id]) expect(url.searchParams.get("k")).toBe(product.name);
    }
  });
  it("uses verified direct destinations only for the sourced shortlist", () => {
    for (const product of featuredProducts) expect(new URL(amazonProductLink(product.id, product.name)).pathname).toMatch(/^\/dp\/[A-Z0-9]{10}$/);
  });
  it("prevents tag injection and replaces earlier tags", () => {
    expect(new URL(amazonLink("watch&tag=other-20")).searchParams.get("tag")).toBe("weyoowte-20");
    expect(new URL(withAffiliateTag("https://www.amazon.com/dp/B0CDC6H66Y?tag=other-20&tag=again-20")).searchParams.getAll("tag")).toEqual(["weyoowte-20"]);
  });
  it("does not treat a short link or another marketplace as a verified US product", () => {
    expect(new URL(withAffiliateTag("https://amzn.to/example", "Garmin Venu 3")).pathname).toBe("/s");
    expect(new URL(withAffiliateTag("https://www.amazon.ca/dp/B0CDC6H66Y", "Garmin Venu 3")).hostname).toBe("www.amazon.com");
    expect(new URL(withAffiliateTag("https://www.amazon.com.evil.example/item")).hostname).toBe("www.amazon.com");
  });
});

describe("catalog and established URLs", () => {
  it("preserves every owner-catalog product ID and established singular URL", () => {
    for (const legacy of legacyProducts) {
      expect(products.some((product) => product.id === legacy.id)).toBe(true);
      expect(pageRoutes.some((route) => route.path === `/product/${legacy.id}`)).toBe(true);
    }
    expect(new Set(products.map((p) => p.id)).size).toBe(products.length);
  });
  it("separates inherited catalog entries from sourced picks", () => {
    const inherited = products.find((p) => p.catalogOrigin === "existing-catalog")!;
    const html = renderPage(template, `/product/${inherited.id}`).html;
    expect(html).toContain("Catalog overview — verify exact model");
    expect(html).not.toContain('href=""');
    expect(html).not.toContain("Expert Score");
  });
});

describe("meaningful public rendering", () => {
  for (const route of pageRoutes) {
    it(`renders content and correctly tagged shopping links at ${route.path}`, () => {
      const { html, status } = renderPage(template, route.path);
      expect(status).toBe(200);
      expect(html).toContain("<h1");
      expect(html).toContain('data-prerendered="true"');
      expect(html).not.toContain('rel="canonical"');
      expect(html).not.toContain("100K+");
      expect(html).not.toContain("We test every product");
      for (const match of html.matchAll(/href="(https:\/\/www\.amazon\.com\/(?:dp\/|s(?:\?|\/))[^\"]*)"/g)) {
        expect(new URL(match[1].replaceAll("&amp;", "&")).searchParams.get("tag")).toBe("weyoowte-20");
      }
    });
  }
  it("returns a noindex 404 for unknown or extra detail path segments", () => {
    for (const path of ["/product/not-real", "/product/oura-ring-4/not-real"]) {
      const result = renderPage(template, path);
      expect(result.status).toBe(404);
      expect(result.html).toContain('content="noindex,follow"');
      expect(result.html).toContain("This page isn’t here.");
    }
  });
  it("creates canonical metadata only with a confirmed publication origin", () => {
    expect(renderPage(template, "/comparisons", "https://wearyourowntechs.com").html).toContain('href="https://wearyourowntechs.com/comparisons"');
  });
  it("renders the actual historical-price source anchor", () => {
    expect(renderPage(template, "/disclosure").html).toContain('id="reference-prices"');
  });
});

describe("useful search and documented filters", () => {
  it("finds the sourced ring with case-insensitive search", () => {
    expect(filterProducts(featuredProducts, { ...defaults, query: "OURA" }).map((p) => p.id)).toEqual(["oura-ring-4"]);
  });
  it("does not invent Android compatibility for unverified catalog entries", () => {
    expect(filterProducts(products, { ...defaults, compatibility: "Android" })).toHaveLength(3);
  });
  it("filters sourced noise cancellation and reference ranges", () => {
    expect(filterProducts(featuredProducts, { ...defaults, feature: "Noise cancellation" }).map((p) => p.id)).toEqual(["sony-linkbuds-fit"]);
    expect(filterProducts(products, { ...defaults, priceRange: "under250" }).map((p) => p.id)).toEqual(["sony-linkbuds-fit"]);
    expect(matchesReferenceRange("garmin-venu-3", "over400")).toBe(true);
  });
  it("has a real empty search outcome", () => expect(filterProducts(products, { ...defaults, query: "does not exist" })).toHaveLength(0));
});

describe("explainable finder and editorial comparisons", () => {
  it("never recommends Apple Watch to Android users", () => {
    for (const goal of ["everyday", "fitness", "sleep", "audio"]) for (const charging of ["daily", "less-often"]) {
      expect(getRecommendations({ goal, phone: "android", charging }).some((r) => r.productId === "apple-watch-series-10")).toBe(false);
    }
  });
  it("returns only wearable audio for an audio goal", () => {
    expect(getRecommendations({ goal: "audio", phone: "iphone", charging: "daily" }).map((r) => r.productId)).toEqual(["sony-linkbuds-fit"]);
  });
  it("provides a limited sourced shortlist with explanations", () => {
    for (const goal of ["everyday", "fitness", "sleep", "audio"]) {
      const results = getRecommendations({ goal, phone: "iphone", charging: "less-often" });
      expect(results.length).toBeGreaterThan(0);
      expect(results.length).toBeLessThanOrEqual(2);
      for (const result of results) {
        expect(featuredProducts.some((p) => p.id === result.productId)).toBe(true);
        expect(result.reason.length).toBeGreaterThan(20);
      }
    }
  });
  it("contains three substantive, distinct comparisons with real product targets", () => {
    expect(comparisonStories).toHaveLength(3);
    expect(new Set(comparisonStories.map((s) => s.id)).size).toBe(3);
    for (const story of comparisonStories) {
      expect(story.sections).toHaveLength(3);
      for (const id of story.productIds) expect(featuredProducts.some((p) => p.id === id)).toBe(true);
    }
  });
});
