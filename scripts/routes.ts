import fs from "node:fs/promises";
import { pageRoutes } from "../client/src/redesign/data/routes";
await fs.writeFile("client/public/manus-routes.json", JSON.stringify({ routes: [...pageRoutes.map(({ path, title }) => ({ path, title })), {path: "/deals", title: "Deals"}, {path: "/blog", title: "Blog"}, {path: "/blog/:slug", title: "Blog article"}, {path: "/category-landing/:id", title: "Category guide"}, {path: "/seo-reviews", title: "Editorial archive"}, {path: "/review/:slug", title: "Review article"}, {path: "/social-media-manager", title: "Social media manager"}] }, null, 2) + "\n");
console.log(`Declared ${pageRoutes.length} public routes.`);
