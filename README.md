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

Publish the generated `dist/` directory to a static host. No server adapter or database is required. The Astro configuration assumes the root of `dreamcleanmacon.com`; update `site` and `base` if deploying under a different domain or a GitHub Pages project subdirectory.

## Quote form

The form is intentionally an inactive HTML mockup, per the client's instruction. It includes the seven questions from `info/intake_form.jpg`, name, phone, email, and service interest. Its submit button is disabled; there is no action URL, submit handler, storage, or submission request. Phone contact remains available. Service links preselect the relevant service without clearing other answers.

## Photos and content

The homepage follows the approved `mock-ups/0.png` reference. Its opening interior image is generated illustrative imagery, separate from the actual work shown below it.

The work section uses supplied oven and stovetop before/after pairs and a refrigerator comparison. The About section uses the supplied team portrait. Original files remain in `info/`; selected originals are copied to `public/images/`, and Astro creates responsive WebP versions at build time. Image origins and generation prompts are recorded in `.impeccable/asset-sources.json` and `.impeccable/build/interior-prompt.json`, and embedded in the selected originals. The postbuild script preserves provenance in JSON sidecars beside the optimized WebP files. Reviews are transcribed excerpts from the supplied Facebook screenshots and customer-review graphic; source records live in `.impeccable/content-sources.md`.

Product context is in `PRODUCT.md`. The confirmed homepage brief and selected direction are in `.impeccable/surfaces/src-pages-index-astro.md`.
