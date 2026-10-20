import React from "react";
import SiteLayout from "./components/SiteLayout";
import { ShopProvider } from "./contexts/ShopContext";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import Compare from "./pages/Compare";
import ProductDetail from "./pages/ProductDetail";
import Guides from "./pages/Guides";
import Information from "./pages/Information";
import Finder from "./pages/Finder";
import ComparisonIndex from "./pages/ComparisonIndex";
import ComparisonStory from "./pages/ComparisonStory";
import { comparisonStories } from "./data/comparisons";
import { products, guides } from "./data/catalog";
import { categories } from "./data/site";

export function pageForPath(path: string, fallback?: React.ReactNode): React.ReactNode {
  if (path === "/") return <Home />;
  if (path === "/explore" || path === "/reviews") return <Explore />;
  if (path === "/saved") return <Explore savedOnly />;
  if (path === "/compare") return <Compare />;
  if (path === "/comparisons") return <ComparisonIndex />;
  if (path === "/find-your-fit") return <Finder />;
  if (path === "/guides" || path === "/buying-guides") return <Guides />;
  if (path === "/legal") return <Information kind="privacy" />;
  if (path === "/about" || path === "/disclosure" || path === "/privacy") return <Information kind={path.slice(1) as "about" | "disclosure" | "privacy"} />;
  const segments = path.split("/").filter(Boolean);
  if (segments.length === 2 && segments[0] === "category" && categories.some((category) => category.id === segments[1])) return <Explore categoryId={segments[1]} />;
  if (segments.length === 2 && ["product", "products"].includes(segments[0])) {
    const product = products.find((item) => item.id === segments[1]);
    if (product) return <ProductDetail product={product} />;
  }
  if (segments.length === 2 && segments[0] === "guides") {
    const guide = guides.find((item) => item.id === segments[1]);
    if (guide) return <Guides guide={guide} />;
  }
  if (segments.length === 2 && segments[0] === "comparisons") {
    const story = comparisonStories.find((item) => item.id === segments[1]);
    if (story) return <ComparisonStory story={story} />;
  }
  return fallback || <Information kind="404" />;
}
export default function App({ path = "/", fallback }: { path?: string; fallback?: React.ReactNode }) {
  const normalized = path.replace(/\/$/, "") || "/";
  return <ShopProvider><SiteLayout path={normalized}>{pageForPath(normalized, fallback)}</SiteLayout></ShopProvider>;
}
