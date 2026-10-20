import React from "react";
import { renderToString } from "react-dom/server";
import App from "./App";
import { getPageInfo, pageRoutes } from "./data/routes";

function escape(value: string): string {
  return value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]!);
}
export function renderPage(template: string, path: string, publicOrigin = ""): { html: string; status: number } {
  const cleanPath = path.replace(/\/$/, "") || "/";
  const info = getPageInfo(cleanPath);
  const title = escape(info.title);
  const description = escape(info.description.slice(0, 160));
  const body = renderToString(<App path={cleanPath} />);
  let html = template.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`).replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${description}" />`).replace('<div id="root"></div>', `<div id="root" data-prerendered="true">${body}</div>`);
  const meta = [
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:type" content="${cleanPath.startsWith("/guides/") ? "article" : "website"}" />`,
    '<meta property="og:site_name" content="Wear Your Own Techs" />',
    '<meta property="og:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519663651644589/lAWCPYVjtRuKyjTq.png" />',
    '<meta name="twitter:card" content="summary" />',
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    '<meta name="twitter:image" content="https://files.manuscdn.com/user_upload_by_module/session_file/310519663651644589/lAWCPYVjtRuKyjTq.png" />',
  ];
  if (publicOrigin) {
    const canonicalPath = cleanPath.startsWith("/products/") ? cleanPath.replace("/products/", "/product/") : cleanPath === "/explore" ? "/reviews" : cleanPath === "/guides" ? "/buying-guides" : cleanPath;
    const canonical = escape(new URL(canonicalPath, publicOrigin).toString());
    meta.push(`<link rel="canonical" href="${canonical}" />`, `<meta property="og:url" content="${canonical}" />`);
  }
  if (info.noindex) meta.push('<meta name="robots" content="noindex,follow" />');
  html = html.replace("</head>", `${meta.join("\n")}\n</head>`);
  return { html, status: pageRoutes.some((route) => route.path === cleanPath) ? 200 : 404 };
}
