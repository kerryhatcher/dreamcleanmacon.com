---
name: Dream Clean
description: Property Lookbook homepage with retained Open House service-page styling.
colors:
  home-paper: "#faf8f3"
  home-ink: "#17283a"
  home-blue: "#245d8f"
  home-rule: "#b0b6b6"
  home-muted: "#4d5e6a"
  home-panel: "#efeee7"
  home-review-muted: "#c5d3dc"
  paper: "#f7f5ef"
  ink: "#20362e"
  blue: "#3866a7"
  rule: "#65716a"
  muted: "#4c6055"
  button-hover: "#345344"
  button-disabled: "#56665b"
  field-background: "#fcfbf7"
  field-border: "#859185"
  review-rule: "#a9b4a9"
  review-muted: "#d6ddd2"
typography:
  home-display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(56px, 6.25vw, 96px)"
    fontWeight: 400
    lineHeight: 1.05
    letterSpacing: "-0.035em"
  home-title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(28px, 2.5vw, 38px)"
    fontWeight: 400
    lineHeight: 1.15
  home-body:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  home-label:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  home-field:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
  home-action:
    fontFamily: "Manrope, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 600
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "7.5vw"
    fontWeight: 400
    lineHeight: 0.93
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(40px, 4.2vw, 64px)"
    fontWeight: 400
    lineHeight: 1.09
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Georgia, serif"
    fontSize: "clamp(28px, 2.5vw, 38px)"
    fontWeight: 400
    lineHeight: 1.15
  body:
    fontFamily: "system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "system-ui, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  field:
    fontFamily: "system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
rounded:
  square: "0"
spacing:
  home-comparison-gap: "8px"
  home-gutter: "max(6.3%, calc((100vw - 1570px) / 2))"
  field-padding: "12px"
  pair-gap: "24px"
  section-block: "100px"
  section-block-mobile: "60px"
  mobile-gutter: "22px"
components:
  home-button-primary:
    backgroundColor: "{colors.home-blue}"
    textColor: "{colors.home-paper}"
    typography: "{typography.home-action}"
    rounded: "{rounded.square}"
    padding: "17px 24px"
  home-button-primary-hover:
    backgroundColor: "{colors.home-ink}"
    textColor: "{colors.home-paper}"
  home-input:
    backgroundColor: "{colors.field-background}"
    textColor: "{colors.home-ink}"
    typography: "{typography.home-field}"
    rounded: "{rounded.square}"
    padding: "{spacing.field-padding}"
    width: "100%"
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "1.2vw 2.1vw"
  button-primary-hover:
    backgroundColor: "{colors.button-hover}"
    textColor: "{colors.paper}"
  button-disabled:
    backgroundColor: "{colors.button-disabled}"
    textColor: "{colors.paper}"
    rounded: "{rounded.square}"
    padding: "20px 26px"
  text-link:
    textColor: "{colors.blue}"
    padding: "12px 0"
  input:
    backgroundColor: "{colors.field-background}"
    textColor: "{colors.ink}"
    typography: "{typography.field}"
    rounded: "{rounded.square}"
    padding: "{spacing.field-padding}"
    width: "100%"
  review-panel:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.paper}"
---

# Design System: Dream Clean

## Overview

**Creative North Star: "The Property Lookbook" (homepage); "The Open House" (retained service pages).**

The approved homepage combines warm ivory, navy ink, restrained blue actions, large Playfair Display statements, practical Manrope text, real cleaning photographs, and fine rules. Property clients lead the composition; homeowners remain prominent through navigation, the opening home invitation, service details, recommendations, and phone actions. Preserve the supplied thought-bubble logo.

This is a scoped system. `home-*` frontmatter tokens describe `.commercial-home` in `src/styles/home.css`; unprefixed tokens describe retained `src/styles/global.css`. Shared serif section headings retain the `headline` role on the homepage. The service pages use shared CSS plus `src/layouts/ServicePage.astro`, without homepage overrides or Manrope. The earlier `mock-ups/0.png` composition is historical homepage evidence, superseded by the Property Lookbook selection recorded in `.impeccable/questions/6db84e2f.answer.json` and `.impeccable/mocks/decision/lookbook.png`. Later user crop and width instructions govern the implemented homepage.

**Key Characteristics:**

- Large serif statements and clear practical typography.
- Square actions, open columns, and one-pixel rules.
- Authentic supplied work photography and existing business identity.
- Homepage navy/ivory; retained service-page forest/cream.

## Colors

Normative values live in the frontmatter. Homepage variables locally override shared paper, ink, blue, rule, and muted values; this documentation does not change global CSS.

### Primary

Homepage uses `home-ink` Navy Ink for reading and the manager-review field, and `home-blue` Contact Blue for actions, contact links, and focus. Primary action hover becomes Navy Ink. Service pages retain Forest Ink (`ink`), Contact Blue (`blue`), and Forest Hover (`button-hover`).

### Neutral

Homepage uses Warm Ivory (`home-paper`), Fine Rule (`home-rule`), Muted Navy (`home-muted`), soft invitation/recommendation panels (`home-panel`), and light manager attribution (`home-review-muted`). Service pages retain Cream Paper (`paper`), Forest Rule (`rule`), and Muted Forest (`muted`). Shared controls retain Field Paper (`field-background`) and Field Stroke (`field-border`). Legacy review and disabled-state tokens remain extracted shared CSS states, not an indication that the active quote form is disabled.

## Typography

Self-hosted Playfair Display supplies expressive headings. The homepage imports self-hosted Manrope 400 and 600 for practical copy, navigation, labels, and blue actions; homepage h3, legends, and review quotations use Playfair. Service pages retain Georgia narrative/navigation/action text and system-ui practical copy and fields.

Homepage display uses `home-display`; at 1050px and below it becomes `clamp(50px, 6vw, 66px)`, and at 700px and below `clamp(40px, 10.5vw, 64px)` with line-height 1.08. The home invitation uses `clamp(40px, 4vw, 62px)` with line-height 1.07, then 40px below 1050px and 38px below 700px. Section headlines retain the shared `headline` role and its 900px mobile adjustment. Practical copy is limited to 65ch and becomes 16px below 900px; opening text uses `clamp(16px, 1.35vw, 21px)` and line-height 1.5. Labels are 14px, field text 16px, and help 12px. Homepage form submission is 18px Manrope.

Service-page h1 is `clamp(42px, 6vw, 88px)` with line-height 1.08 and max-width 16ch, overriding the shared legacy `display` primitive. Service-page h3 remains Georgia; service primary CTA is 21px with 18px 24px padding.

## Layout

Homepage header, hero, comparison contents, and lower sections share desktop gutters: `home-gutter`, maintaining the 1570px content measure at wide sizes. The header is 104px tall with a full-width bottom rule. Hero columns are flexible plus 31%, separated by 5%; the opening proof uses 3fr/1.1fr columns, with the paired real oven photos on the left and the home invitation on the right. Fine horizontal rules may extend beyond the content measure.

Homepage gutters become 5% below 1100px and 22px below 900px. At 1050px hero columns become 1.5fr/1fr and proof columns 2.4fr/1fr. At 700px the introduction, proof, invitation, experience line, and manager review stack; navigation remains visible below the logo/phone row. Other shared lower-section columns stack at 900px. Shared sections use 100px block padding, 70px below 1100px, and 60px below 900px; form fields remain two columns until 370px. Shared lower-section gutters narrow to 18px below 370px.

Opening comparisons retain an 8px gap and shared 1.12 aspect ratio across breakpoints. Before image: bottom object position, scale 1.18 from top center. After image: top object position. These are the user-confirmed framing refinements; source files remain unchanged. Service-page gallery layouts retain their existing paired comparisons, while service heroes and bodies use their own section spacing.

## Elevation & Depth

No box shadows. Photographs, flat tonal panels, generous space, and fine rules provide depth. Primary actions transition background over .2s ease; anchors scroll smoothly. Reduced-motion preference disables transitions and smooth scrolling. Keyboard focus remains a 2px blue outline offset by 6px.

## Shapes

Controls, actions, and photographic frames have square corners. Fields use one-pixel borders, 12px padding, and minimum 50px height. The supplied logo retains its silhouette. Arrows are inline SVG with 1.25 stroke weight; homepage primary-action icons are 22px, with shared icons typically 26px.

## Components

### Buttons and text actions

Homepage primary actions use blue with ivory Manrope 600 text, 17px 24px padding, and 18px gap; hover uses navy. The active full-width quote submit uses 20px 26px padding and 18px Manrope. Text actions use blue and underline on hover; manager-review actions are ivory. Service pages retain flat forest Georgia actions and blue text links.

### Inputs / Fields

The shared quote component is an active standard HTML POST to `https://formspree.io/f/xeaoybzw`, requiring name/email and accepting optional phone/message. It uses labeled square controls and native required-field validation; no custom delivery/error state is implemented. Formspree confirmation is an inquiry confirmation, not a booking or availability promise. Phone links remain available. Field focus changes the border to the local blue and preserves the visible outline.

### Navigation

Homepage desktop navigation uses 15px Manrope, a visible row with 38px gaps and no nav separator. Mobile navigation remains visible. Retained service navigation is Georgia with desktop vertical separators and a visible mobile row. Homepage property anchors and dedicated housekeeping/service paths preserve ordinary browser behavior.

### Photographs, reviews, and invitation

The homepage opens with the supplied oven pair and a soft home invitation panel; the manager quotation sits on navy, while home recommendations sit on a soft neutral field. It uses only existing supplied production photographs, including stovetop, refrigerator, and team evidence. Sources remain in `.impeccable/asset-sources.json` and `.impeccable/content-sources.md`. The earlier generated interior is historical illustrative imagery and is absent from the current homepage; the generated concept comparison is not production work evidence.

## Do's and Don'ts

- **Do** preserve the supplied logo, real-photo provenance, approved crop, and aligned desktop content gutters.
- **Do** apply homepage tokens only within `.commercial-home`; retain service-page styling unless separately authorized.
- **Do** keep property and home routes obvious, with phone alternatives and active inquiry submission.
- **Do** retain keyboard focus and reduced-motion support.
- **Don't** present concept imagery as a Dream Clean job or introduce new production imagery without a source record.
- **Don't** describe the active quote form as disabled or promise booking availability from submission.
- **Don't** turn the superseded homepage location line, numbered service strip, or panoramic hero into requirements for the Property Lookbook.
