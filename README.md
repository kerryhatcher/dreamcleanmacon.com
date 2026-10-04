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
- Manual runs deploy only when run against `main`.

All builds use the production canonical URL. Preview builds add `X-Robots-Tag: noindex, nofollow` and a disallow-all `robots.txt`. Preview URLs are public and persist after a PR closes; old preview deployments can be removed from the Cloudflare dashboard. They do not affect production.

### One-time credential setup

In [repository Actions secrets](https://github.com/kerryhatcher/dreamcleanmacon.com/settings/secrets/actions), add `CLOUDFLARE_API_TOKEN`. Create a custom Cloudflare API token with **Account → Cloudflare Pages → Edit**, scoped to the account above. No DNS permission is needed for the CI token. The account ID is public configuration, already stored in the workflow and Wrangler config.

The Pages project must have `main` as its production branch. It has been created as a Direct Upload project; do not connect it to Cloudflare's Git build integration. The workflow replaces the previous GitHub Pages deployment, so GitHub Pages is no longer the deployment target.

### Custom domain

Associate `www.dreamcleanmacon.com` with the Pages project under **Workers & Pages → dream-clean-macon → Custom domains**. Its proxied DNS record is:

| Type | Name | Target |
| --- | --- | --- |
| CNAME | `www` | `dream-clean-macon.pages.dev` |

Domain association and DNS are both required. Cloudflare validates the hostname and provisions HTTPS; wait for the custom domain status to become **Active**. The apex `dreamcleanmacon.com` is separate; this setup serves the requested `www` hostname.

After adding the secret and merging the workflow, use **Actions → Deploy to Cloudflare Pages → Run workflow** on `main` for the initial production deployment, or push a commit to `main`. Open a PR to check its preview environment.

### Local deployment

With a suitably scoped Cloudflare token in your environment (or `npx wrangler login`):

```sh
npm run check
npm run build
npx wrangler pages deploy dist --branch main
# A separate preview, without changing production:
npx wrangler pages deploy dist --branch local-preview
```

References: [Cloudflare CI deployment guide](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), [custom domains](https://developers.cloudflare.com/pages/configuration/custom-domains/), and [Wrangler Action](https://github.com/cloudflare/wrangler-action).

## Quote form

The form is intentionally an inactive HTML mockup, per the client's instruction. The homepage asks only for name, phone number, and email address. The detailed pre-clean questionnaire in `info/intake_form.jpg` is retained as source material for a later intake process. Its submit button is disabled; there is no action URL, submit handler, storage, or submission request. Phone contact remains available. Service links lead to the same inline contact form.

## Photos and content

The homepage follows the approved `mock-ups/0.png` reference. Its opening interior image is generated illustrative imagery, separate from the actual work shown below it.

The work section uses supplied oven and stovetop before/after pairs and a refrigerator comparison. The About section uses the supplied team portrait. Original files remain in `info/`; selected originals are copied to `public/images/`, and Astro creates responsive WebP versions at build time. Image origins and generation prompts are recorded in `.impeccable/asset-sources.json` and `.impeccable/build/interior-prompt.json`, and embedded in the selected originals. The postbuild script preserves provenance in JSON sidecars beside the optimized WebP files. Reviews are transcribed excerpts from the supplied Facebook screenshots and customer-review graphic; source records live in `.impeccable/content-sources.md`.

Product context is in `PRODUCT.md`. The confirmed homepage brief and selected direction are in `.impeccable/surfaces/src-pages-index-astro.md`.
