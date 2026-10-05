---
version: 1
slug: "src-pages-index-astro"
primary_target: "src/pages/index.astro"
related_targets: ["src/styles/home.css"]
---

# Dream Clean commercial-first homepage

Confirmed audience: apartment and Airbnb property clients, with homeowners clearly welcomed.
User confirmed extensive experience with property managers, understanding their needs and schedules, and “No job too big or too small.” Source: current conversation, October 4, 2026.
Selected direction: The Property Lookbook, selected on decision page (seed af213ca8, challenger luxury-fashion-flagship). User then said “go ahead,” authorizing implementation. Approved composition reference: `.impeccable/mocks/decision/lookbook.png`. Production keeps the existing logo and uses supplied real photographs rather than generated comparison images.

## Direction contract

THESIS: Property-cleaning experience made clear through a large real photographic comparison, with an unmistakable path to housekeeping.
OWN-WORLD: Warm ivory, navy ink, restrained blue actions, monumental Playfair Display, practical self-hosted Manrope, fine rules, unrounded actions, large photographs.
FIRST VIEWPORT: Shallow logo/nav header. Two-line property headline left, apartment/Airbnb scope and property-manager experience right. Real before/after oven spread below left and a visible housekeeping panel right. On mobile stack the introduction, compact comparison, and housekeeping panel; housekeeping also remains in top navigation.
STORY: Property purpose and real work; housekeeping route; manager experience and supplied testimonial; property/home service details; more real photos; home recommendations; local team and counties; inline quote form.
FORM: One standard HTML Formspree POST inquiry form, required name/email, optional phone/message. Quote anchors preserve normal page behavior. Phone links always available. No booking or availability promises. Signature interaction: direct property/home paths with consistent contact actions; subtle hover feedback and reduced-motion-aware scrolling.
CONSTRAINTS: Static Astro. SEO title, description and Organization/Service JSON-LD align with visible facts. No unsupported commercial janitorial scope, pricing, hours, guarantees, or rating claims. CSS scoped to `.commercial-home` keeps service-page layouts intact.
USER REFINEMENT: Align the homepage before/after view. Shared 1.12 aspect ratio, before image at bottom with 1.18 scale from top, after at top. Source image files unchanged. Same framing across breakpoints.
FINISH: Independent screenshot/code review, project check/build/actionlint, design documentation and source provenance.
