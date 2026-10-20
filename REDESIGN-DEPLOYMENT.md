# Comparison-first wearable redesign

The new frontend lives under `client/src/redesign`; the old application is preserved in `client/src/LegacyApp.tsx` and loaded lazily for existing deals, blog, category-landing, SEO-archive, review-article, social-manager and full legal pages. Existing backend/auth/database code remains in place except the targeted affiliate parsing and static-routing fixes.

The confirmed Amazon Associates ID is **weyoowte-20**, centralized in `shared/affiliate.ts`. Four sourced shortlist products use inspected direct US destinations, with condition/size/variant cautions. All other catalog models use named-model Amazon.com searches. Correct tracking does not guarantee commissions; eligibility and Amazon rules still apply.

## Build and deployment

The existing standard `pnpm build` now builds the frontend, generates meaningful public HTML and metadata, then bundles the existing server. Static Cloudflare output remains **dist/public**; `pnpm build:static` builds that output alone. Dependencies use pinned pnpm 10.18.0 with reviewed lifecycle permissions and preserved patch/override settings. No credentials belong in build commands.

Canonical and sharing metadata default to **https://wearyourowntechs.com** for this existing-site source. Set `PUBLIC_SITE_ORIGIN` only when deploying this branch at a different intended public origin. Alias pages remain accessible but point canonically to singular `/product/:id`, `/reviews` and `/buying-guides` paths. The sitemap preserves existing same-origin legacy URLs. Saved picks and the pre-existing social manager are excluded from crawler discovery via robots rules.

The old global `/* /index.html 200` redirect has been replaced with explicit legacy-only rewrites to `legacy.html`. **Do not restore that catch-all:** it would serve Home HTML over generated reviews and cause hydration conflicts. Express follows the same legacy-shell behavior and serves a proper 404 for unknown non-legacy routes. `/legal` retains the original full legal page, loaded from the empty-root legacy shell.

## Existing checks and limits

The new public code has a separate `tsconfig.redesign.json` and `vitest.redesign.config.ts` so it can be checked without concealing unrelated legacy diagnostics. The redesign's 168 regression tests pass and its focused TypeScript check passes. A full application production build succeeds. The original repository still has seven unrelated TypeScript errors in unchanged AnalyticsDashboard, ApprovalQueue, SocialMediaManager and post-generator files; these are not introduced or repaired by this frontend redesign. The new frontend does not depend on those admin modules.

No new analytics provider is connected. Measure visitors, outbound clicks and eligible orders using your existing analytics and Amazon Associates reports after deployment. The publication layout alone is not evidence of higher conversions.

This work is submitted as a review branch/PR. Creating the PR does not deploy it, change production main, or alter DNS. Deploy the reviewed commit through the existing host when ready; avoid deploying a separate duplicate site as if it replaced the current domain.
