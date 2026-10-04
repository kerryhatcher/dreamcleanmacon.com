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

Publish the generated `dist/` directory to a static host. No server adapter or database is required. Local builds default to the root of `dreamcleanmacon.com`. Set `ASTRO_SITE` and `ASTRO_BASE` to build for another domain or subdirectory.

## GitHub Pages

In the repository's **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source. The workflow in `.github/workflows/deploy.yml` installs the locked dependencies, checks Astro, builds the site (including image provenance), and deploys `dist/` on every push to `main`. It can also be run manually from **Actions → Deploy to GitHub Pages → Run workflow**. No deployment secret is required.

The workflow obtains the origin and base path from GitHub Pages, so assets and the canonical URL work at `https://kerryhatcher.github.io/dreamcleanmacon.com/` or a custom domain configured in Pages settings. To use `dreamcleanmacon.com`, configure it in those settings and set the domain's DNS records as described in [GitHub's custom domain guide](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site). DNS changes are separate from this workflow.

To reproduce the project URL build locally:

```sh
ASTRO_SITE=https://kerryhatcher.github.io ASTRO_BASE=/dreamcleanmacon.com npm run build
```

## Quote form

The form is intentionally an inactive HTML mockup, per the client's instruction. The homepage asks only for name, phone number, and email address. The detailed pre-clean questionnaire in `info/intake_form.jpg` is retained as source material for a later intake process. Its submit button is disabled; there is no action URL, submit handler, storage, or submission request. Phone contact remains available. Service links lead to the same inline contact form.

## Photos and content

The homepage follows the approved `mock-ups/0.png` reference. Its opening interior image is generated illustrative imagery, separate from the actual work shown below it.

The work section uses supplied oven and stovetop before/after pairs and a refrigerator comparison. The About section uses the supplied team portrait. Original files remain in `info/`; selected originals are copied to `public/images/`, and Astro creates responsive WebP versions at build time. Image origins and generation prompts are recorded in `.impeccable/asset-sources.json` and `.impeccable/build/interior-prompt.json`, and embedded in the selected originals. The postbuild script preserves provenance in JSON sidecars beside the optimized WebP files. Reviews are transcribed excerpts from the supplied Facebook screenshots and customer-review graphic; source records live in `.impeccable/content-sources.md`.

Product context is in `PRODUCT.md`. The confirmed homepage brief and selected direction are in `.impeccable/surfaces/src-pages-index-astro.md`.
