Help me craft a busness website for Dream Clean in Macon GA. 



Tech Notes:

This should be a static astro site to be hosted on something like s3/cloudflare/github pages. https://astro.build/


Source Materal: 

https://www.facebook.com/p/Dream-Clean-Housekeeping-Company-LLC-61550656630177

Info:
Housekeeping company offering renewed tranquility to all of Middle Georgia.

SEO and deployment conventions:

- Production is https://www.dreamcleanmacon.com/ on Cloudflare Pages. The apex redirects to www with paths and query strings preserved.
- Keep Astro output static. Generate dist/404.html so Cloudflare does not serve the homepage for missing URLs.
- Public marketing pages must remain crawlable. public/robots.txt references the canonical production sitemap-index.xml; @astrojs/sitemap generates the sitemap and excludes the 404 page.
- PR previews must allow crawling and send X-Robots-Tag: noindex, nofollow. Do not block crawling in robots.txt while relying on a noindex header.
- Keep page titles, descriptions, canonical URLs, and structured data consistent with visible content. Structured data must contain only confirmed facts; do not invent addresses, hours, pricing, guarantees, or review ratings.
- Use Organization and Service markup with the available facts. Do not imply LocalBusiness rich-result eligibility without the required verified business details.
- AGENTS.md is repository guidance, not a public marketing asset. AI text files are optional and are not a substitute for useful HTML content.
- The quote form remains an inactive mockup. Use phone links for active quote CTAs until form processing is explicitly requested.
- Verify changes with npm run check, npm run build, and actionlint. Check generated robots/sitemap/JSON-LD and real preview HTTP status and indexing headers before merging SEO changes.
