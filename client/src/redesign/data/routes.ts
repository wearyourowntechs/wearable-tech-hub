import { categories } from "./site";
import { products, guides } from "./catalog";
import { comparisonStories } from "./comparisons";
export type PageInfo = { path: string; title: string; description: string; noindex?: boolean };
export const pageRoutes: PageInfo[] = [
  { path: "/", title: "Wear Your Own Techs | Clear Wearable Comparisons", description: "Find a wearable that fits your routine. Read clear reviews, compare watches and rings, understand practical trade-offs, and build your shortlist." },
  { path: "/reviews", title: "Wearable Reviews & Model Directory | Wear Your Own Techs", description: "Browse wearable models and sourced editorial picks. Compare compatibility, battery assumptions, trade-offs and practical fit before choosing." },
  { path: "/explore", title: "Explore Wearable Models | Wear Your Own Techs", description: "Search watches, rings, glasses and wearable audio. Filter the existing catalog and sourced shortlist by brand, category and documented features." },
  { path: "/compare", title: "Compare Wearables Side by Side | Wear Your Own Techs", description: "Compare up to three wearable models. See practical fit, battery assumptions, compatibility, features, limitations and evidence notes side by side." },
  { path: "/comparisons", title: "Wearable Comparisons & Clear Verdicts | Wear Your Own Techs", description: "Watch or ring? Apple Watch or Garmin? Read focused, specification-based wearable comparisons and understand which choice matches your priorities." },
  { path: "/find-your-fit", title: "Find Your Wearable Fit | Wear Your Own Techs", description: "Answer three practical questions about your phone, goal and charging preference. Get an explainable wearable shortlist with honest trade-offs." },
  { path: "/saved", title: "Your Saved Wearable Picks | Wear Your Own Techs", description: "Revisit your browser-local wearable shortlist, read product evidence and compare practical differences before you buy.", noindex: true },
  { path: "/guides", title: "Wearable Buying Guides | Wear Your Own Techs", description: "Learn how to choose a wearable format, understand watches versus rings, and check fit, accessories, compatibility and ongoing ownership costs." },
  { path: "/buying-guides", title: "Wearable Buying Guides | Wear Your Own Techs", description: "Practical wearable buying guides: choose a watch, ring or tracker, understand ongoing costs, and check accessories and exact model compatibility." },
  { path: "/about", title: "Our Wearable Review Approach | Wear Your Own Techs", description: "Read how our specification-based editorial shortlist and clearly marked inherited catalog information support more informed wearable choices." },
  { path: "/disclosure", title: "Affiliate Disclosure & Price Sources | Wear Your Own Techs", description: "Understand our Amazon Associates links, reference-price sources, editorial evidence labels, and the limitations of specification-based comparisons." },
  { path: "/privacy", title: "Privacy & Browser Preferences | Wear Your Own Techs", description: "Read how local saved products, comparison choices, external Amazon links, website hosting and fonts work on Wear Your Own Techs." },
  { path: "/legal", title: "Privacy & Legal Information | Wear Your Own Techs", description: "Read how browser preferences, third-party shopping links and editorial information work, with clear affiliate disclosure and no medical advice." },
  ...categories.map((category) => ({ path: `/category/${category.id}`, title: `${category.name} Models & Advice | Wear Your Own Techs`, description: `Explore ${category.name.toLowerCase()} and compare model notes, practical requirements and purchase considerations. Evidence labels make the source basis clear.` })),
  ...products.flatMap((product) => ["product", "products"].map((prefix) => ({ path: `/${prefix}/${product.id}`, title: `${product.name} Review & Fit | Wear Your Own Techs`, description: `${product.name}: read an editorial or retained catalog overview, practical specifications, strengths, limitations and alternatives before choosing.` }))),
  ...guides.map((guide) => ({ path: `/guides/${guide.id}`, title: `${guide.title} | Wear Your Own Techs`, description: guide.description })),
  ...comparisonStories.map((story) => ({ path: `/comparisons/${story.id}`, title: `${story.title} | Wear Your Own Techs`, description: story.description })),
];
export function getPageInfo(path: string): PageInfo {
  return pageRoutes.find((page) => page.path === path) || { path, title: "Page Not Found | Wear Your Own Techs", description: "This page could not be found. Browse wearable reviews, clear comparisons and buying guides to find the technology that fits your routine.", noindex: true };
}
