# Dream Clean

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static Astro site, as required by the project brief. Production is hosted on Cloudflare Pages at https://www.dreamcleanmacon.com/. The apex redirects to www with paths and queries preserved. Astro output remains static.

## Users

- Homeowners seeking housekeeping in Macon and Middle Georgia.
- Commercial clients seeking move-in/move-out cleaning, including apartment complexes and Airbnb properties.

These audiences and the move-in/move-out use case were confirmed by the user. Specific residential service packages and any additional commercial services remain undecided.

## Product Purpose

Create a business website for Dream Clean in Macon, Georgia. The business describes itself as a “Housekeeping company offering renewed tranquility to all of Middle Georgia.”

The website should help the confirmed audiences understand the business and request a quote through a form or phone call. The user confirmed both inquiry methods. The active contact form posts to Formspree at https://formspree.io/f/xeaoybzw. Formspree shows a confirmation page; the request does not confirm a booking or availability.

## Operating Context

The supplied source is the business Facebook page:
https://www.facebook.com/p/Dream-Clean-Housekeeping-Company-LLC-61550656630177

Saved Facebook screenshots are available in `info/`. The live Facebook page could not be retrieved during initialization; details transcribed from screenshots are source evidence and should be checked for currency before publication.

`info/fb_about.png` lists the business as Dream Clean Housekeeping Company, LLC and shows phone number (678) 232-8614 and Facebook Messenger as contact options.

`info/details.png` lists Macon, Georgia, and these service counties: Houston, Crawford, Peach, Baldwin, Jones, Putnam, Bibb, Monroe, and Wilkinson. It also identifies the business as women-owned.

## Capabilities and Constraints

- Deliver a static site built with Astro.
- Address both homeowners and the confirmed commercial move-in/move-out audience.
- Offer the active Formspree quote-request form and phone contact. Pricing, availability, service packages, and booking arrangements must be discussed with the business.
- The quote form requires name and email and accepts optional phone and cleaning-needs details. Keep the detailed questions from `info/intake_form.jpg` as reference for a later intake process; they do not belong on the homepage.
- The earlier form mockup was superseded by the active standard HTML POST form. Keep phone links as an alternative.
- Do not invent service guarantees, insurance or bonding status, prices, availability, staff biographies, or additional service offerings.

## Brand Commitments

Use the established Dream Clean business name and the supplied `logo.png` as existing brand assets. Preserve the business's stated purpose of offering renewed tranquility to Middle Georgia. No additional voice or visual requirements were established during initialization.

## Evidence on Hand

- `AGENTS.md`: business brief, static Astro requirement, production and preview SEO conventions, Formspree endpoint, and Facebook source.
- `logo.png`: supplied Dream Clean Housekeeping Co. logo.
- `info/intake_form.jpg`: user-selected source for quote form fields. Its pre-clean questionnaire says responses are confidential and that some items concern extra or special supplies rather than price. A published form must have an actual submission and data-handling process consistent with that statement.
- `info/`: supplied business photos, Facebook screenshots, and review screenshots (`reviews-1.png` through `reviews-7.png`). Inspect individual assets before selecting or quoting them.
- `info/details.png`: screenshot showing 100% recommendation from 17 reviews at the time captured. Treat this as dated evidence, not a current rating.
- `info/fb_about.png`: banner depicting a 2025 Best of Georgia regional winner badge. Verify the award scope and attribution before publishing a claim.

## Product Principles

- Make the relevant cleaning services clear to both residential and commercial visitors.
- Keep business details grounded in confirmed information and supplied evidence.
- Help prospective clients reach the business through the chosen inquiry method once it is established.
- Keep the site portable across static hosting providers.

## Current SEO content and deployment

The homepage links to dedicated housekeeping and move-in / move-out cleaning pages. Content uses confirmed service types, supplied work photos, phone number, and nine service counties. Preparation advice describes topics to discuss rather than promising unverified tasks, supplies, or availability.

The user supplied the Google Business listing: https://share.google/Nra2FQnO7CS2KkM4b. Its public phone and website match. Its description mentions deep and general commercial cleaning beyond the currently confirmed website scope; confirm those offerings before expanding site claims. Listing review counts and hours are not copied into structured data.

PR previews allow crawling and send `X-Robots-Tag: noindex, nofollow`. A deployment verifier checks actual HTTP responses. The production Pages hostname redirects through an exact-host Cloudflare Bulk Redirect; preview subdomains are excluded.

## Confirmed property-manager experience — October 4, 2026

The user confirmed extensive experience with property managers and understanding their needs and schedules, and stated “No job too big or too small.” The approved homepage leads with apartment and Airbnb property clients while keeping housekeeping for homes prominent. These statements do not establish additional service categories, capacity guarantees, availability, or package commitments.
