import fs from "node:fs/promises";
import path from "node:path";
import { renderPage } from "../client/src/redesign/entry-server";
import { pageRoutes } from "../client/src/redesign/data/routes";

const output = path.resolve("dist/public");
const template = await fs.readFile(path.join(output, "index.html"), "utf8");
const origin = process.env.PUBLIC_SITE_ORIGIN || "https://wearyourowntechs.com";
if (origin && !/^https:\/\/[a-z0-9.-]+(?::\d+)?\/?$/i.test(origin)) throw new Error("PUBLIC_SITE_ORIGIN must be a real HTTPS publication origin.");
await fs.writeFile(path.join(output, "legacy.html"), template);
for (const route of [...pageRoutes.filter((page) => page.path !== "/legal"), { path: "/404", title: "Page not found", description: "Page not found" }]) {
  const rendered = renderPage(template, route.path, origin);
  const file = route.path === "/" ? path.join(output, "index.html") : route.path === "/404" ? path.join(output, "404.html") : path.join(output, route.path.slice(1), "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, rendered.html);
}
const legacyPages = [{path: "/deals", title: "Deals"}, {path: "/blog", title: "Blog"}, {path: "/blog/:slug", title: "Blog article"}, {path: "/category-landing/:id", title: "Category guide"}, {path: "/seo-reviews", title: "Editorial archive"}, {path: "/review/:slug", title: "Review article"}, {path: "/social-media-manager", title: "Social media manager"}];
const manifest = { routes: [...pageRoutes.map(({path,title})=>({path,title})), ...legacyPages] };
await fs.writeFile(path.join(output, "manus-routes.json"), JSON.stringify(manifest, null, 2));
if (origin) {
  const xmlEscape = (s: string) => s.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const canonical = (value: string) => value.startsWith("/products/") ? value.replace("/products/", "/product/") : value === "/explore" ? "/reviews" : value === "/guides" ? "/buying-guides" : value;
  const sitemapUrls = new Set(pageRoutes.filter((route)=>!route.noindex).map((route)=>new URL(canonical(route.path), origin).toString()));
  try {
    const original = await fs.readFile(path.join(output, "sitemap.xml"), "utf8");
    for (const match of original.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      const url = new URL(match[1]);
      if (url.origin === new URL(origin).origin && /^\/(?:deals|blog(?:\/[^/]+)?|category-landing\/[^/]+|seo-reviews|review\/[^/]+|legal)$/.test(url.pathname)) sitemapUrls.add(url.toString());
    }
  } catch { /* A new deployment need not have a prior sitemap. */ }
  const urls = Array.from(sitemapUrls).map((url)=>`<url><loc>${xmlEscape(url)}</loc></url>`).join("\n");
  await fs.writeFile(path.join(output, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`);
  await fs.writeFile(path.join(output, "robots.txt"), `User-agent: *\nAllow: /\nDisallow: /saved\nDisallow: /social-media-manager\nSitemap: ${new URL("/sitemap.xml", origin)}\n`);
}
console.log(`Static rendered ${pageRoutes.length} routes with meaningful HTML and per-route metadata.`);
