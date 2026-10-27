# Dream Clean Macon

A static Astro website for Dream Clean Housekeeping Company, LLC in Macon, Georgia.

## Develop and build

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
npm run check
npm run build
npm run preview
```

Publish the generated `dist/` directory to a static host. No server adapter or database is required. Local builds default to `https://www.dreamcleanmacon.com/`. Set `ASTRO_SITE` and `ASTRO_BASE` to build for another domain or subdirectory.

## Cloudflare Pages and GitHub Actions

The site uses the **Direct Upload** Cloudflare Pages project `dream-clean-macon` in the Julia Callahan account (`e33f99b627bf3afdbc0311ed464a1e42`). GitHub Actions builds the static site and uploads `dist/`; Cloudflare does not run a second build. Project configuration is in `wrangler.jsonc`.

- Pushes to `main` deploy production at **https://www.dreamcleanmacon.com** (also available at https://dream-clean-macon.pages.dev).
- Pull requests targeting `main` from this repository build and deploy to a separate `pr-<number>` branch. Their stable preview URL is `https://pr-<number>.dream-clean-macon.pages.dev`. New commits update the same preview URL.
- Each deployment is linked from its GitHub environment and the workflow's job summary. Each upload also has an immutable deployment URL.
- Fork pull requests run checks and builds without deploying, because GitHub does not expose repository secrets to them. The workflow uses `pull_request`, never `pull_request_target`.
- Manual production runs deploy only from `main`. To refresh a historical PR preview, run the workflow with `preview_branch=pr-N` from the desired source branch; the input is validated and this always prepares a noindex preview artifact.

The production `dream-clean-macon.pages.dev` hostname is redirected to www through the Cloudflare account Bulk Redirect list `dream_clean_production_redirect`. It preserves paths and query strings with subdomain matching disabled, so previews remain available. This rule is managed outside the static build; domain-level redirects are unsupported in Pages `_redirects`.

All builds use the production canonical URL. Preview builds run `node scripts/prepare-preview.mjs` to add `X-Robots-Tag: noindex, nofollow` and an allow-all `robots.txt` without a sitemap directive. Crawlers must be able to fetch a page to read its `noindex` header. Preview URLs are public and persist after a PR closes; old preview deployments can be removed from the Cloudflare dashboard. They do not affect production. Old previews retain the artifact deployed at that time; the PR #1 artifact contained a crawler block from the original workflow. Refresh the branch preview to apply current indexing rules: `GH_HOST=github.com gh workflow run deploy.yml --ref <source-branch> -f preview_branch=pr-1`.

### One-time credential setup

In [repository Actions secrets](https://github.com/kerryhatcher/dreamcleanmacon.com/settings/secrets/actions), add `CLOUDFLARE_API_TOKEN`. Create a custom Cloudflare API token with **Account → Cloudflare Pages → Edit**, scoped to the account above. No DNS permission is needed for the CI token. The account ID is public configuration, already stored in the workflow. Pages does not accept `account_id` in its Wrangler config.

The Pages project must have `main` as its production branch. It has been created as a Direct Upload project; do not connect it to Cloudflare's Git build integration. The workflow replaces the previous GitHub Pages deployment, so GitHub Pages is no longer the deployment target.

### Custom domain

Associate `www.dreamcleanmacon.com` with the Pages project under **Workers & Pages → dream-clean-macon → Custom domains**. Its proxied DNS record is:

| Type | Name | Target |
| --- | --- | --- |
| CNAME | `www` | `dream-clean-macon.pages.dev` |

Domain association and DNS are both required. Cloudflare validates the hostname and provisions HTTPS; wait for the custom domain status to become **Active**. The apex `dreamcleanmacon.com` has a proxied redirect-only A record (`192.0.2.1`) and a Cloudflare Single Redirect to HTTPS `www`, preserving the path and query string. This rule is managed in Cloudflare, separately from the static build.

After adding the secret and merging the workflow, use **Actions → Deploy to Cloudflare Pages → Run workflow** on `main` for the initial production deployment, or push a commit to `main`. Open a PR to check its preview environment.

### Local deployment

With a suitably scoped Cloudflare token in your environment (or `npx wrangler login`):

```sh
npm run check
npm run build
CLOUDFLARE_ACCOUNT_ID=e33f99b627bf3afdbc0311ed464a1e42 npx wrangler pages deploy dist --branch main
# Prepare a separate preview, without changing production:
node scripts/prepare-preview.mjs
CLOUDFLARE_ACCOUNT_ID=e33f99b627bf3afdbc0311ed464a1e42 npx wrangler pages deploy dist --branch local-preview
```

References: [Cloudflare CI deployment guide](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), and [Wrangler Action](https://github.com/cloudflare/wrangler-action).

## Quote form

The quote form retains a standard HTML POST to `https://formspree.io/f/xeaoybzw` when JavaScript is unavailable. With JavaScript, it submits the same fields to Formspree with `Accept: application/json` and displays an accessible inline result. Only a successful HTTP response with `ok: true` confirms receipt. Name and email are required; phone and a cleaning-needs message are optional. Pending and accepted submissions cannot be submitted twice. Errors retain the entered details; an uncertain response advises checking by phone before retrying. A request is an inquiry, not a confirmed booking. The detailed questionnaire in `info/intake_form.jpg` remains reference material for a later intake process.

### Inquiry measurement

`src/scripts/inquiry-tracking.ts` uses the existing Cloudflare Zaraz integration, not a second Google tag. It emits events only on `www.dreamcleanmacon.com` and the three known marketing routes. Localhost and Pages previews cannot emit production inquiry events.

| Event | Trigger | Parameters |
| --- | --- | --- |
| `generate_lead` | Formspree confirms acceptance | `page_path`, `service_type`, `form_id=cleaning_quote`, `contact_method=quote_form` |
| `phone_click` | A telephone link is activated | `page_path`, `service_type`, `link_location` (`header`, `footer`, `quote`, or `content`) |

No names, email addresses, customer phone numbers, messages, query strings, or free-form link text are included in these custom event payloads. Telephone links keep their native behavior. Analytics failure does not block either contact method. A phone click measures intent, not a connected call or qualified lead. JavaScript-disabled submissions still work but do not emit these browser events.

On October 27, 2026, the existing Zaraz GA4 tool (`TItR`, measurement ID `G-Q01TBY2YK7`) was configured as follows:

- Pageview action remains unchanged.
- The `AllTracks` action forwards custom events with `en={{ client.__zarazTrack }}` and client enrichment, with its blanket `conversion=true` removed.
- Its trigger excludes `generate_lead` using `NOT_MATCH_REGEX ^generate_lead$` on `{{ client.__zarazTrack }}`.
- A dedicated `DreamCleanQuoteSuccess` trigger matches `generate_lead` exactly. Its event action forwards `en=generate_lead`, client enrichment, and `conversion=true`. This gives a successful quote exactly one forwarding action.
- GA4 property `557292489` registers `generate_lead` as a key event, once per event, without an invented default monetary value. `phone_click` is an ordinary event.
- Event-scoped custom dimensions `Service type` (`service_type`) and `Phone link location` (`link_location`) expose the fixed service/control categories in GA4 reports.

Zaraz runs in realtime configuration mode, so those settings apply separately from site deployment. Preserve them when editing Cloudflare. After production deployment, use GA4 Realtime/DebugView and actual Formspree submissions to check collection. Do not submit fake customer leads to production or treat a simulated browser test as proof of email delivery.

### Browser tests

Run `npm run build`, `npx playwright install chromium`, then `npm test`. CI installs Chromium and runs the same suite before deploying. Tests proxy production-host URLs to the local build, stub Zaraz, and intercept every Formspree request; they send no real inquiries or analytics. They cover accepted/invalid/rejected/network-failed submissions, duplicate protection, retries, telephone intent, unavailable analytics, production-host restrictions, and native POST without JavaScript.

The default test server is `http://127.0.0.1:4517` and must be unused. For an intentionally started and verified local preview only, `PLAYWRIGHT_REUSE_SERVER=1 npm test` permits reuse outside CI. `--ignore-lock` keeps Astro's test preview in the foreground.

## SEO foundation

- `public/robots.txt` permits public content and advertises the production sitemap. `@astrojs/sitemap` generates `dist/sitemap-index.xml` and its child sitemap with canonical URLs, excluding the 404 page.
- `src/pages/404.astro` builds a top-level `dist/404.html`. Cloudflare Pages uses it for missing URLs with HTTP 404, avoiding its automatic homepage fallback. The error page is marked `noindex` and offers a homepage link and phone contact.
- The homepage supplies a descriptive title, description, canonical URL, Open Graph metadata, and Organization/Service JSON-LD using the visible business facts. It does not claim a public street address, business hours, pricing, or aggregate review rating.
- Structured data identifies the business and services; it does not promise rankings or LocalBusiness rich results. `AGENTS.md` records maintenance rules and is not copied to the public build.
- Dedicated `/housekeeping/` and `/move-in-move-out-cleaning/` pages explain the confirmed services, quote preparation, and property access. Shared business facts live in `src/data/business.ts`. The Google Business listing is linked alongside Facebook. The October 27 audit confirmed Search Console access, all three marketing pages indexed, and a successfully submitted `https://www.dreamcleanmacon.com/sitemap-index.xml`.

CI runs `node scripts/verify-deployment.mjs <origin> <preview|production>` after deployment and fails on incorrect page status, indexing headers, robots rules, canonical metadata, JSON-LD parsing, or sitemap content. Production verification uses the canonical www origin and checks the apex and production Pages redirects; preview verification uses the deployment URL. Run the same command manually to audit a deployment.

Before merging, run `npm run check`, `npm run build`, and `actionlint`. Verify that the preview homepage is HTTP 200 with `X-Robots-Tag: noindex, nofollow`, a missing URL is HTTP 404, `/robots.txt` is text and allows crawling, and `/sitemap-index.xml` is XML linking to canonical production URLs. The preview sitemap still uses production URLs; its robots file omits sitemap discovery.

## Photos and content

The homepage follows the approved `mock-ups/0.png` reference. Its opening interior image is generated illustrative imagery, separate from the actual work shown below it.

The work section uses supplied oven and stovetop before/after pairs and a refrigerator comparison. The About section uses the supplied team portrait. Original files remain in `info/`; selected originals are copied to `public/images/`, and Astro creates responsive WebP versions at build time. Image origins and generation prompts are recorded in `.impeccable/asset-sources.json` and `.impeccable/build/interior-prompt.json`, and embedded in the selected originals. The postbuild script preserves provenance in JSON sidecars beside the optimized WebP files. Reviews are transcribed excerpts from the supplied Facebook screenshots and customer-review graphic; source records live in `.impeccable/content-sources.md`.

Product context is in `PRODUCT.md`. The confirmed homepage brief and selected direction are in `.impeccable/surfaces/src-pages-index-astro.md`.
