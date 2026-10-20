import { lazy, Suspense } from "react";
import { useLocation } from "wouter";
import PublicApp from "./redesign/App";
import CookieConsent from "./components/CookieConsent";
const LegacyApp = lazy(() => import("./LegacyApp"));
const legacyPattern = /^\/(?:deals|blog(?:\/[^/]+)?|category-landing\/[^/]+|seo-reviews|review\/[^/]+|social-media-manager|legal)$/;

export default function App() {
  const [location] = useLocation();
  const path = location.replace(/\/$/, "") || "/";
  if (legacyPattern.test(path)) {
    return <Suspense fallback={<div className="wrap inner-page" role="status">Loading this page…</div>}><LegacyApp /></Suspense>;
  }
  return <><PublicApp path={path} /><CookieConsent /></>;
}
