# Dream Clean HTP review — 2026-11-01

Scope: www.dreamcleanmacon.com. Reviewed the complete source inventory, latest relevant snapshots, all four saved audit summaries, the latest complete audit detail, and saved repository history for October 1–November 1. Older snapshots were not used for trend claims.

## Findings and changes

- The complete Seosmith run finished November 1 at 07:06:40 UTC: three HTML pages, 64 resources, no HTTP/fetch errors, 80 warnings. Six warnings are missing CSP/HSTS, ten are images larger than 100 KiB, and 64 concern underscores in generated asset URLs.
- Added Cloudflare Pages response headers: one-year HSTS without subdomain/preload commitments, and baseline CSP protection for base URLs, objects, framing, and form destinations. Formspree remains allowed. This is deliberately not a strict script/XSS policy: Cloudflare injects Zaraz and analytics scripts, which require separate coordination before restricting script sources. Also added nosniff and strict-origin-when-cross-origin referrer policy. The deployment verifier now requires the HSTS and CSP directives on all marketing pages.
- Image components specified responsive candidates but left fallback src at original dimensions. Explicit fallback widths now match the largest candidate, with photo WebP quality 70. The largest generated image is now 101,012 bytes (98.6 KiB), versus 292,588 bytes in the saved audit. All 44 generated WebP assets are below 100 KiB. This measures generated files, not a fresh production audit or a per-visit transfer saving.
- Retained Astro's hashed asset URLs. Their underscores are framework output rather than evidence of a page indexing defect; changing asset naming solely to silence this rule is unwarranted.

## Measurement and follow-up

- Mobile PageSpeed snapshot fetched November 1 at 07:06:52 UTC: performance, accessibility, best practices, and SEO all 100. Remaining lab diagnostics include third-party cache/legacy JavaScript and render-blocking CSS. No measured performance regression justifies a larger rewrite. Mobile CrUX snapshot from October 31 reports insufficient data, not passing field metrics.
- Search Console domain property, October 4–31, fetched November 1: 370 impressions, 16 clicks, 4.32% CTR. Homepage: 325 impressions/16 clicks; housekeeping: 11/0; move-in/move-out: 34/0. Query rows include unrelated geographic searches and very small local samples. Keep existing local service content and evaluate relevant Macon queries after another 28 complete days; do not infer a ranking trend from these totals.
- Bound GA4 property for the same period: 176 active users, 223 sessions, 303 pageviews, 41 organic-search sessions, and one generate_lead key event (October 28). This is not a verified booked job. Tracking changes were committed October 27; commit time alone does not establish deployment time. Preserve the accepted-submission and phone-intent instrumentation and compare subsequent complete reporting periods.
- Bing snapshot fetched November 1 at 03:12 UTC: no section errors; latest crawl row has three indexed pages and zero crawl errors; sitemap status Success with three URLs. No sitemap repair is indicated.
- Business Profile discovery is pending with five failures and google_quota_exceeded. No business location is bound and no profile-change records are saved. Resolve provider quota/collection before drawing local-profile conclusions; website code cannot fix that provider failure.

## Verification

Astro check, static build, actionlint, and all 19 existing Playwright tests passed. Mobile browser checks on all three pages found no overflow or broken images; parsed JSON-LD contains only the existing Organization/Service types. Reviewed homepage rendering with the new CSP applied. Native POST and phone alternatives remain present. Hosted preview status, indexing headers, robots, sitemap, canonicals, JSON-LD and security headers are enforced by the deployment workflow before merge.

Header implementation reference: https://developers.cloudflare.com/pages/configuration/headers/
