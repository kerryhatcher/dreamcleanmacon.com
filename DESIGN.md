---
name: Dream Clean
description: A calm property brochure for housekeeping in Middle Georgia.
colors:
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
  field-padding: "12px"
  pair-gap: "24px"
  section-block: "100px"
  section-block-mobile: "60px"
  mobile-gutter: "22px"
components:
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

**Creative North Star: "The Open House"**

Dream Clean uses the calm of a property brochure: a warm paper ground, forest lettering, generous serif statements, and photographs given room to breathe. Thin rules organize the page without enclosing every item in a card. The existing thought-bubble logo remains the business identity.

The system records the implemented, user-selected reference at `mock-ups/0.png`, with the homepage contract in `.impeccable/surfaces/src-pages-index-astro.md` and shipping review in `.impeccable/review/finish-review.md`. The location line and numbered service destinations are specifically pinned homepage details; they are not requirements for every future surface.

**Key Characteristics:**

- Warm cream paper and forest ink, with blue contact accents.
- Large high-contrast serif statements and clear practical form typography.
- Flat rectangular actions, thin dividers, and open columns.
- Architectural illustration distinguished from actual cleaning photographs.

## Colors

The palette feels quiet and domestic, with contact blue providing a recognizable path to conversation. Normative values are in the frontmatter; CSS primitives are defined in `src/styles/global.css`.

### Primary

- **Forest Ink** (`ink`): main text, solid quote actions, and the reversed review field.
- **Forest Hover** (`button-hover`): action feedback without introducing another accent.
- **Quiet Forest** (`button-disabled`): inactive form submission.

### Secondary

- **Contact Blue** (`blue`): phone numbers, text actions, focus outlines, and input accents.

### Neutral

- **Cream Paper** (`paper`): page ground and text on forest surfaces.
- **Fine Rule** (`rule`): hairline structure between groups and columns.
- **Muted Forest** (`muted`): explanatory copy and field help.
- **Field Paper** (`field-background`) and **Field Stroke** (`field-border`): readable outlined form controls.
- **Light Review Rule** (`review-rule`) and **Light Review Detail** (`review-muted`): separators and secondary attribution on the dark review field.

**The Contact Color Rule.** Use blue for contact actions and focus feedback; keep major reading surfaces paper and forest.

## Typography

**Display Font:** self-hosted Playfair Display, with Georgia and serif fallbacks.
**Body Font:** Georgia for inherited narrative, navigation, actions, and review quotations; system-ui for longer explanatory copy and form controls.

Playfair Display was selected for its nearest matching metrics and high-contrast character against the pinned composition. It is a deliberate reference match, rather than a default recommendation for unrelated projects.

### Hierarchy

- **Display:** the two-line hero statement uses the frontmatter desktop role. At 900px and below it becomes `clamp(40px, 12.4vw, 84px)` with line-height 1.06.
- **Headline:** section statements use the frontmatter headline role. At 900px and below they become `clamp(36px, 9.5vw, 50px)` with line-height 1.13.
- **Title:** Georgia subsection headings use the title role, becoming 30px on mobile.
- **Body:** practical section copy uses the body role, with a maximum line length of 65ch and 16px mobile size. The opening explanation uses larger Georgia text, becoming 20px with line-height 1.4 on mobile.
- **Label:** system-ui labels keep forms readable. Input text stays 16px; helper text is 12px with line-height 1.5.
- **Navigation and actions:** Georgia carries the brochure character into functional elements. Desktop header navigation is 1.43vw; mobile navigation is 15px. Mobile primary actions are 21px.

**The Two Voices Rule.** Use expressive serif type for statements and narrative, and system-ui for practical explanations, attribution, and form details.

## Layout

Desktop uses open asymmetric columns: the hero pairs a flexible headline with a 31% explanation column, separated by a 6% gap. Lower sections have 100px block padding and 6.3% horizontal gutters; at 1800px and above, lower content gutters maintain a 1570px content measure. Paired work photographs use a 24px gap. Service descriptions and review columns use thin rules rather than detached card containers.

At 1100px and below, lower section padding becomes 70px and 5%. At 900px and below, hero, section introductions, services, reviews, about, quote, and footer stack. Lower sections use 60px block padding and 22px gutters. Header phone and logo share a row, with all navigation visible on a separate row. Before/after photography remains paired for direct comparison, and the form retains two columns until 370px. At 370px and below, the form becomes one column and hero/section gutters become 18px.

The panoramic image is edge-to-edge, with desktop height 31.38vw and mobile height 270px. Mobile reframes its crop at 42% center. Form fields remain directly in the page; service actions link to the basic contact form without changing entered answers.

## Elevation & Depth

The system has no box shadows. Photography, thin one-pixel rules, and the reversed forest review field provide depth. Actions change background over 0.2 seconds with standard ease. Anchor scrolling is smooth; reduced-motion preference disables smooth scrolling and transitions.

**The Flat Surface Rule.** Separate groups with space, rules, and tonal fields rather than lifted cards.

## Shapes

Controls and photographic edges are rectangular with square corners. Form fields use one-pixel borders and a minimum height of 50px. The supplied thought-bubble logo retains its original silhouette; it does not introduce rounded containers elsewhere. Arrow icons are inline SVG line drawings, normally 26px, with a 1.25 stroke weight.

## Components

### Buttons

Solid forest actions use cream Georgia lettering and an inline northeast arrow. Desktop hero padding is represented in the frontmatter; mobile padding is 17px 22px. Hover uses Forest Hover. Keyboard focus is a 2px Contact Blue outline offset by 6px. The form's full-width button has 20px 26px padding, 23px text on desktop and 21px on mobile, and remains disabled in the current preview.

### Text actions

Contact Blue text with an inline line arrow and 18px gap keeps secondary actions light. Text size is 19px desktop and 17px mobile; hover adds an underline. On the forest review field, actions use Cream Paper. Global links keep a one-pixel underline with a 0.25em offset.

### Inputs / Fields

Field Paper controls use Field Stroke borders, square corners, and 12px padding. Focus changes the border to Contact Blue and retains the global visible outline. Labels sit above fields with a 10px gap, and optional help remains directly below. Two-column groups use 24px vertical and 20px horizontal gaps on desktop, narrowing to 20px and 14px on mobile. Full-width fields span both columns. No custom error or successful-delivery state is implemented.

### Navigation

Desktop navigation is a visible Georgia row separated from the logo and phone by vertical rules. Links have no resting underline; hover uses Contact Blue and focus uses the shared outline. Mobile navigation stays visible, spreads across the second header row, and removes vertical separators. The homepage's separate service strip retains the specifically selected 01/02 destinations, with horizontal separators on mobile.

### Reviews and photographic comparisons

Reviews are open columns on Forest Ink, with pale top rules and attribution below the quotation. They stack on mobile. Before/after figures remain side by side, with matching crops and clearly labeled ruled captions. The generated panoramic room is illustrative; actual work and team photos remain evidence with source records in `.impeccable/asset-sources.json` and `.impeccable/content-sources.md`.

## Do's and Don'ts

### Do:

- **Do** preserve the supplied logo and the high-contrast serif character of the selected reference.
- **Do** use space, thin rules, and tonal fields to organize flat rectangular surfaces.
- **Do** retain visible keyboard focus and reduced-motion behavior.
- **Do** keep illustrative photography distinct from actual work evidence.
- **Do** preserve the pinned location line and numbered service destinations on this homepage.

### Don't:

- **Don't** turn the homepage's pinned location line or numbering into mandatory decoration on every new surface.
- **Don't** replace the existing rectangular action and open-column treatment with lifted or rounded cards.
- **Don't** imply that the disabled contact form sends information or completes a booking.
- **Don't** replace SVG arrows with decorative text glyphs.
