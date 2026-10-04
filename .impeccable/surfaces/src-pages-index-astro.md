---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: []
---

# Dream Clean homepage brief

Status: complete homepage brief explicitly confirmed by the user.
Target: homepage `/` (planned Astro route `src/pages/index.astro`).
Mode: Persuade.

## Job, audience, and outcome

Help homeowners and commercial property clients in Macon and Middle Georgia understand Dream Clean's housekeeping and move-in/move-out cleaning and request a quote. Commercial audiences include apartment complexes and Airbnb properties. Offer a quote-request form and a phone call as the confirmed inquiry methods. Submission requests a conversation about pricing; it does not book a cleaning or promise availability.

## Selected direction

The user selected option 0, The Open House, and supplied `mock-ups/0.png` as the reference. Preserve the existing thought-bubble logo. Use the reference's broad architectural photograph, large serif headline, cream ground, forest ink, restrained blue contact accents, thin rules, and flat rectangular quote action.

Opening composition: logo and navigation above a spacious introduction. Keep “A clean home. A calmer day.” prominent, with an adjacent explanation of housekeeping and property move-in/move-out cleaning and a Request a quote action. A panoramic interior photograph provides the main focal moment. Follow with numbered home/property destinations.

Selection record: seed `650d8dae`, kind `assigned`, selected in chat with the attached reference. Original generated exploration: `.impeccable/mocks/decision/open-house.png` and its exact prompt sidecar. This records direction selection; it is not a direction contract or approval of unshown lower sections.

## Sequence and interactions

1. Introduction, service purpose, quote link, and telephone link.
2. Two service sections: housekeeping for homeowners; move-in/move-out cleaning for commercial property clients. Both lead to the same quote form.
3. Real work photographs and faithfully attributed review excerpts selected from supplied assets. Keep generated concept photography separate from evidence of actual work. Verify any award claim and current business details before publication.
4. Middle Georgia service-area information and a brief factual business introduction.
5. Basic contact form and repeat phone action; footer with business identity and relevant contact links.

Keep navigation and quote links usable without animation. On mobile, stack headline, explanation, quote action, photograph, and service destinations in reading order. Reframe the photograph without horizontal page scrolling. The quote section stays inline and directly addressable, avoiding a modal or forced multistep flow. Motion, if used, should be restrained and respect reduced-motion settings.

## Homepage contact form

Per the user’s latest instruction, ask only for name, phone number, and email address. Keep the detailed questionnaire in `info/intake_form.jpg` as source material for a later intake process.

Build the real HTML form as a nonfunctional mockup, per the user's subsequent instruction. Give the submit button no action, disable it, and label the online form as a preview with calling available. Do not add a submission endpoint, submission handler, storage, delivery states, or a success claim. Entered information is not sent.

## Scope, constraints, and open decisions

This is a homepage planning deliverable; no site implementation, DESIGN.md, or build direction contract is part of shape. The future site uses static Astro output with semantic HTML, accessible form labels, keyboard navigation, visible focus, readable contrast, and responsive images.

Open for future activation: form service and destination, required fields, and data handling. Site launch and hosting provider remain separate decisions. The current deliverable deliberately includes an inactive form. Do not invent guarantees, rates, booking functionality, recurring service packages, or general commercial janitorial services.

## Direction contract

THESIS: A property brochure for cleaning, with one panoramic image and a direct path to home or property care.

OWN-WORLD: Cream ground, forest serif typography, blue contact links, thin rules, rectangular controls, existing thought-bubble logo.

STORY: Visitors understand local housekeeping and move-in/move-out cleaning, see real work and customer words, then fill in their contact details or call.

FIRST VIEWPORT: A shallow logo/navigation header; giant two-line headline left, service explanation and quote action right; panoramic interior below; a narrow caption and numbered service links. Match `mock-ups/0.png` using responsive proportions.

FORM: The Open House, grounded candidate 7, seed `650d8dae`, kind `assigned`, explicitly selected and confirmed in chat. Comp-led reference: `mock-ups/0.png`. Signature interaction: home/property quote links lead to the same basic contact form without changing entered answers; the form stays inline. Motion: restrained hover feedback and reduced-motion-aware anchor scrolling.

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
