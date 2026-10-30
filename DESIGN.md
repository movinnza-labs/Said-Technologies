# DESIGN.md — SAID Technologies Website

Single source of truth for the visual design and UX of the SAID Technologies corporate website.

- **Product source:** PRD.md. Until PRD.md exists, the source is the approved client brief: the content and page structure are final, and only the design changes.
- **Content rule:** Do not rewrite, shorten or reorder approved copy. Design decisions must fit the existing text, not the other way round.
- **Scope:** 116 static pages under `said-html/`, one shared stylesheet (`assets/site.css`) and one script (`assets/islands.js`).

---

## 1. Visual Direction and Principles

**Direction:** A clean, confident B2B and institutional look. Deep navy carries authority, one strong brand blue drives action, and real photography of Indian workplaces and classrooms provides warmth. The site should read like a serious systems integrator, not a startup landing page.

### Principles

1. **Content first.** Text is approved and fairly long. Layout must make long copy easy to scan through hierarchy, spacing and line length. Do not cut the copy.
2. **One accent, used on purpose.** Brand blue marks interactive elements and key emphasis only. Everything else is navy, neutral grey or white.
3. **Structure over decoration.** Use grids, numbering (01, 02, 03), dividers and section rhythm to organise information. No ornamental shapes.
4. **Real media over illustration.** Use photos, product shots and short loops supplied by the client. Until they arrive, use labelled placeholders, never stock 3D art or AI imagery.
5. **Predictable patterns.** The same kind of content always looks the same: every service card, scope list and CTA band uses the same component on every page.
6. **Keep what works.** Breadcrumbs, numbered cards, the three-step "Understand / Plan / Enable" approach and the closing CTA band already work. Refine them; do not replace them.

### Avoid

- Purple-to-blue gradients, glowing blobs, glassmorphism and floating 3D icons
- Emoji or generic line icons used as decoration on every card
- Centred text for anything longer than two lines
- Several competing accent colours on one screen
- Testimonials, logos, statistics or claims that the client has not supplied (this is a compliance rule as well as a design rule)

---

## 2. Colour

Tokens already exist in `site.css`. Keep these names. When the client supplies the SAID logo, adjust only `brand-*` values to match it, check contrast again and leave the rest of the system unchanged.

### Core palette

| Token | Hex | Use |
|---|---|---|
| `ink-950` | `#06122A` | Footer background, darkest surfaces |
| `ink-900` | `#0B1D3A` | Primary text on light, hero and CTA band backgrounds, `theme-color` |
| `ink-800` | `#132A4E` | Hover surfaces on dark backgrounds |
| `ink-700` | `#24406B` | Secondary text on light backgrounds |
| `ink-600` | `#3B5580` | Muted text, metadata |
| `brand-50` | `#EEF3FF` | Tinted section background, selected menu item |
| `brand-100` | `#DCE6FF` | Card hover tint, tag background |
| `brand-200` | `#B8CBFF` | Borders on tinted areas |
| `brand-300` | `#8EABFB` | Links and accents on dark backgrounds |
| `brand-500` | `#3A63E3` | Focus ring |
| `brand-600` | `#2449C4` | **Primary action:** buttons, links, active nav |
| `brand-700` | `#1D3A9C` | Primary hover and pressed state |
| `brand-800` | `#1A3178` | Text on `brand-50` |

### Neutrals and feedback

| Role | Value | Use |
|---|---|---|
| Surface | `#FFFFFF` | Default page background |
| Surface-alt | `#F6F8FB` | Alternating sections |
| Border | `#E3E8F0` | Card and input borders, dividers |
| Error | `red-600` / bg `red-50` | Form errors only |
| Success | `#157F3D` / bg `#ECFDF3` | Form success only |
| Warning | `#B45309` / bg `#FFFBEB` | Draft and notice banners (for example "Demonstration form") |

### Rules

- Body text is `ink-900` on white. Secondary text is `ink-700`, never lighter than `ink-600` on white.
- On navy backgrounds, use white for headings, `#C9D4E8` for body text and `brand-300` for links.
- Use brand blue for interaction. Do not use it for large background fills except the primary button.
- Use only three section backgrounds: white, surface-alt and `ink-900`. Do not add more.
- Every text and background pair must meet WCAG 2.2 AA (see Section 10).

---

## 3. Typography

| Role | Font | Weight |
|---|---|---|
| Display and headings | Plus Jakarta Sans | 700 (H1, H2), 600 (H3, H4) |
| Body, UI, forms | Inter | 400 body, 500 labels and nav, 600 buttons |

Fallback: `system-ui, "Segoe UI", Roboto, Arial, sans-serif`. Load fonts with `font-display: swap`.

### Type scale

Mobile size is shown first and desktop (64rem and wider) second.

| Style | Size | Line height | Use |
|---|---|---|---|
| Display | 36 → 56px | 1.1 | Home hero H1 only |
| H1 | 32 → 44px | 1.15 | Page title |
| H2 | 26 → 34px | 1.2 | Section title |
| H3 | 20 → 22px | 1.3 | Card and step titles |
| H4 | 17 → 18px | 1.4 | Sub-groups, footer headings |
| Lead | 18 → 20px | 1.6 | First paragraph under H1 and H2 |
| Body | 16 → 17px | 1.65 | Paragraphs |
| Small | 14px | 1.5 | Metadata, helper text, breadcrumbs |
| Eyebrow | 13px, uppercase, 0.08em tracking, 600 | 1.4 | Section label above H2 (for example "What We Do") |

### Rules

- Keep paragraph width at 65–72 characters (`max-width: 42rem`).
- Use one H1 per page and do not skip heading levels.
- The tagline under an H1 (for example "Build Controls Into Cloud Adoption") uses the Lead style in `ink-700`. It is not a second heading.
- Display numbers such as "01" and "Step 02" use Plus Jakarta Sans 700 in `brand-600` with tabular figures.
- Do not use all-caps for sentences. Uppercase is for eyebrows only.

---

## 4. Spacing and Layout

### Spacing scale

The base unit is 4px. Use only these values: **4, 8, 12, 16, 24, 32, 48, 64, 96, 128**.

| Context | Mobile | Desktop |
|---|---|---|
| Section vertical padding | 64px | 96px |
| Hero vertical padding | 48px | 96px |
| Eyebrow to H2 | 8px | 8px |
| H2 to lead | 16px | 16px |
| Section header to content | 32px | 48px |
| Card padding | 24px | 32px |
| Grid gap | 16px | 24px (cards), 32px (columns) |

### Grid and container

- Container max width: 1240px (`80rem` minus gutters), centred.
- Side gutter: 16px below 40rem, 24px from 40rem, 32px from 64rem.
- 12-column grid on desktop, 6 on tablet, 4 on mobile.
- Two-column text and media sections use a 7/5 or 6/6 split. Media can sit on either side but must alternate down the page.

### Breakpoints

Keep the existing ones.

| Name | Min width | Typical change |
|---|---|---|
| `sm` | 40rem / 640px | Two-column card grids |
| `md` | 48rem / 768px | Side-by-side form fields |
| `lg` | 64rem / 1024px | Desktop navigation, multi-column layouts |
| `xl` | 80rem / 1280px | Full container width |
| `2xl` | 96rem / 1536px | Larger outer margins only; content does not widen |

### Shape and depth

- Radius: 6px for inputs, tags and small buttons; 12px for cards and media; 16px for large feature panels. No pill-shaped cards.
- Use borders before shadows. Cards have a 1px `border` at rest. On hover, add the shadow `0 8px 24px rgba(11,29,58,.08)` and change the border to `brand-200`.
- Use only one shadow level, plus the menu panel shadow `0 16px 40px rgba(6,18,42,.16)`.

---

## 5. Reusable Components

Each component has one definition. Pages compose components and must not restyle them locally.

### 5.1 Buttons

| Variant | Look | Use |
|---|---|---|
| Primary | `brand-600` fill, white text, hover `brand-700` | One main action per section (for example "Discuss Your Requirement") |
| Secondary | White fill, 1px `ink-900` border, `ink-900` text, hover `brand-50` fill | Second action beside a primary |
| On-dark primary | White fill, `ink-900` text | Primary action on navy |
| On-dark secondary | Transparent, 1px white/40% border, white text | Second action on navy |
| Text link | `brand-600`, 600, arrow "→" that moves 2px on hover | "Learn more", "Explore", "View All Solutions" |

- Height: 48px (44px minimum on mobile). Horizontal padding: 24px. Radius: 6px.
- Use verbs from the approved copy and keep the existing labels.
- Show no more than two buttons side by side. On mobile they stack at full width.

### 5.2 Section header

The section header is an eyebrow, an H2 and an optional lead, left-aligned. It can have an optional text link on the right, such as "View All Solutions". Every content section uses this; do not invent new header styles.

### 5.3 Cards

| Card | Contents | Used on |
|---|---|---|
| Numbered service card | Number, H3, two-line summary, text link | Home "What We Do" (10), "Education" (7), category pages |
| Industry card | Industry name and one-line tagline; optional image on top | Industries grid, mega menu |
| Related solution card | "Enterprise Service" tag, H3, summary, link | Related Solutions on detail pages |
| Scope item | Number and short label in a compact tile | "Scope Areas" lists |
| Step card | "Step 01" label, H3, text; connected by a line on desktop | "From Requirement to Implementation" |
| Blog card | 16:9 image, category tag, title (2 lines max), excerpt (3 lines max), date, reading time | Blogs index, home insights strip |
| Case study card | 4:3 image, industry tag, title, one-line outcome, link | Case studies index, related on detail pages |

Rules:

- The whole card is clickable through a single link (stretched link). Do not put nested links inside a card.
- Cards in one row have equal height and keep the link at the bottom.
- Clamp text by line count rather than cutting approved copy in the source.

### 5.4 Media

- **Image:** 12px radius, fixed aspect ratio (16:9 hero and feature, 4:3 cards, 1:1 people) with `object-fit: cover`.
- **Placeholder:** `surface-alt` box at the final aspect ratio, with a centred small label "Image: [description]". This keeps the existing "replace with" notes visible to the team but neutral for visitors.
- **Services loop (requested GIF):** Deliver it as a short muted MP4 or WebM loop (6–10 seconds, under 1.5 MB) with a poster image, not as a GIF. It plays automatically only when `prefers-reduced-motion` is not set, and it has a visible pause button.
- **Video (when supplied):** Shows a poster with a play button and loads the player only on click. Captions are required.

### 5.5 CTA band

The CTA band is a full-width `ink-900` section with an H2, one line of lead text and an on-dark primary button. It appears once at the end of every page and uses the approved "Let's Discuss…" copy.

### 5.6 Breadcrumbs

Breadcrumbs appear on every page except Home. They sit above the H1 in Small style with a "/" separator. The current page is plain text with `aria-current="page"`.

### 5.7 Tags

Tags are 13px text, 600 weight, `brand-50` background, `brand-800` text and 6px radius. They are not clickable unless they link to a filtered list.

### 5.8 Notice banner

The notice banner uses the warning colours, an icon and one line of text, for example "Demonstration form…" or "Draft — not approved legal text". Remove it once the condition no longer applies.

---

## 6. Navigation

### 6.1 Header (desktop, 64rem and wider)

- Height is 72px. The header is sticky and has a white background. After scrolling 8px, it gains a 1px bottom border.
- On the left is the logo (text wordmark until the SAID logo arrives, max height 40px). In the centre, in a **horizontal row**, are What We Do, Industries, Education, Who We Are, Careers and Insights. On the right is a primary button labelled "Contact Us".
- Nav items use Inter 500 at 15px in `ink-900`. The active section has a 2px `brand-600` underline. Hover shows the same underline at 50% opacity.

### 6.2 Mega menu (TeamComputers-style flyout)

The menu opens on hover after a 150ms intent delay, on click, or on Enter or Space. It is a full-width panel below the header.

```
┌──────────────────────────────────────────────────────────────────────┐
│ Column A: main items      │ Column B: sub-items of hovered A item    │
│ ───────────────────────── │ ──────────────────────────────────────── │
│ ▸ Infrastructure Solutions│  Data Centre Solutions                   │
│   Cloud Solutions         │  Audio-Visual Solutions                  │
│   Managed Services        │  End-User Devices                        │
│   Staffing Solutions      │  Device Lifecycle Management             │
│   …                       │  …                                       │
│                           │  View Infrastructure Solutions →         │
│ All Solutions →           │                    [optional promo/image] │
└──────────────────────────────────────────────────────────────────────┘
```

- **Column A** lists the main categories. The hovered or focused item gets a `brand-50` background, a `brand-600` left bar and a "▸" marker.
- **Column B** shows that item's submenu **to the right**. The first item in Column A is selected by default when the menu opens.
- A category with no children (for example Google Workspace) shows its one-line summary and a "View" link in Column B.
- Industries has no second level, so it shows a single grid of nine items, each with its tagline.
- Who We Are, Careers, Insights and Contact use a simple two-column panel with the section intro line on the left and links on the right.
- Under Insights, the Blog and Case Studies entries show their one-line descriptions from the approved copy.
- A diagonal hover tolerance (about 300ms) keeps Column B from switching while the pointer moves toward it.
- The menu closes on Escape (focus returns to the trigger), on a click outside it, or when the pointer leaves the header and panel for 200ms.

### 6.3 Mobile and tablet navigation (below 64rem)

- The header is 64px tall with the logo and a 44×44 menu button.
- The menu opens as a full-height drawer from the right with an accordion: main sections expand to categories, and categories expand to pages. Only one section is open at a time.
- "Contact Us" is a fixed primary button at the bottom of the drawer.
- While the drawer is open, the page behind it does not scroll and focus stays inside the drawer.

### 6.4 Footer

The footer uses an `ink-950` background and has four columns on desktop: brand and tagline, Company, Enterprise Solutions and Education. Contact details and the legal links (Privacy Policy and Terms of Use) sit in a bottom row. On mobile, the columns stack and the link groups become accordions.

---

## 7. Forms

The site has two forms: **Contact enquiry** and **Career application**.

### Layout

- Single column on mobile, two columns from 48rem for short fields (name and organisation, email and phone). Long fields span the full width.
- Labels sit above fields. Do not use placeholders as labels.
- Required fields are marked with "*" and a visually hidden "required". Optional fields are labelled "(optional)", as in the current copy.
- Group related fields in a `fieldset` with a `legend`, for example "Area of Interest" and "Preferred contact method".

### Field styling

- Height is 48px with a 1px `border` and 6px radius. Text is 16px, which prevents zoom on iOS.
- Focus shows a 2px `brand-500` ring with a 2px offset. Hover changes the border to `ink-600`.
- Radio buttons and checkboxes are 20px with the whole label clickable. Enquiry type (Business or Education) displays as two selectable tiles.
- Dependent selects (Solution type → Area → Specific solution) are disabled with the helper text "Choose a solution type first" until the earlier choice is made.
- The résumé upload is a drop zone with a "Choose file" button. It shows accepted types (PDF, DOC, DOCX), the 5 MB maximum and the chosen file name with a remove button.

### Validation

- Validate a field when it loses focus and validate all fields on submit. Do not validate while the user is still typing.
- An error shows a `red-600` border and an icon with the message below the field (`aria-describedby`). The message says how to fix it, for example "Enter an email address like name@company.com".
- On a failed submit, show an error summary at the top with links to each field and move focus to the summary.
- The honeypot field ("website") stays visually hidden and out of the tab order.

### Submission

- While submitting, disable the button, show a spinner and change the label to "Sending…".
- On success, replace the form with a success panel that says "Thank you" and what happens next, and move focus to that panel.
- On a server error, keep all entered data, show the error banner and keep the button available to try again.

---

## 8. Loading, Empty and Error States

| Situation | Treatment |
|---|---|
| Page load | Static pages load with no spinner. Images use reserved aspect-ratio boxes so the layout does not shift, with a `surface-alt` background until the image loads. |
| Video or loop loading | Show the poster image. Never show a blank black box. |
| Form submitting | The button shows a spinner and "Sending…". Fields become read-only. |
| Form success | Inline success panel (see Section 7). |
| Form failure | Error banner: "We couldn't send your message. Please try again, or email us at [address]." The entered data is kept. |
| Empty blogs or case studies | Use the existing approved copy ("No articles have been published yet…") in a centred panel with the "Explore Our Solutions" button. Never show an empty grid. |
| Few items | The grid stays left-aligned. Do not stretch one card to full width. |
| 404 | Simple page with the H1, one line of text, a primary link to Home, a secondary link to Contact and the main nav. |
| No JavaScript | Navigation links still work: the top-level items are real links. Forms show a fallback line with an email address. |

---

## 9. Interactions and Motion

- **Duration:** 150ms for colour and border changes, 200ms for menus and accordions, and 300ms at most for anything else.
- **Easing:** `cubic-bezier(0.4, 0, 0.2, 1)`.
- **Hover:** Cards lift by 2px and gain the shadow. Links show an underline. Text-link arrows move 2px. Nothing else animates on hover.
- **Scroll reveal:** Section content fades in and moves up 12px once, when it first enters the viewport. Do not animate numbers, use parallax or apply stagger longer than 60ms per item.
- **Menus:** The panel fades in and moves down 4px. Column B changes content instantly without sliding.
- **Reduced motion:** When `prefers-reduced-motion: reduce` is set, turn off reveals and auto-playing loops. Keep colour transitions.
- **Do not** use carousels for important content, auto-advancing sliders, hover-only information or cursor effects.

---

## 10. Responsive Behaviour

| Pattern | Mobile (below 40rem) | Tablet (40–64rem) | Desktop (64rem and wider) |
|---|---|---|---|
| Header | Logo and menu button | Logo and menu button | Horizontal nav and mega menu |
| Service cards (10) | 1 column | 2 columns | 3 columns; or 2 columns beside a sticky intro |
| Education cards (7) | 1 column | 2 columns | 3 columns with intro and image in the first slot |
| Industries (9) | 1 column list | 2 columns | 3×3 grid |
| Blog cards | 1 column | 2 columns | 3 columns |
| Case study cards | 1 column | 2 columns | 3 columns, or 4 at 80rem and wider |
| Steps | Vertical with a connector line on the left | Vertical | 3 columns with a horizontal connector |
| Text and media | Media below text | Media below text | Side by side |
| Forms | 1 column | 2 columns for short fields | 2 columns with a side info panel |
| Footer | Accordions | 2 columns | 4 columns |

- There must be no horizontal scrolling at 320px.
- Touch targets are at least 44×44px.
- Use responsive `srcset` images. A mobile phone should never download a desktop-size image.

---

## 11. Accessibility (WCAG 2.2 AA)

- **Contrast:** Body text at least 4.5:1, large text and UI borders at least 3:1. Check this again after the logo colours replace `brand-*`.
- **Keyboard:** Everything works by keyboard. In the mega menu, Tab moves between top items, Enter, Space and Down open a menu, Arrow keys move within the columns, and Escape closes the menu.
- **Focus:** The focus ring is always visible (2px `brand-500` with offset, or white on navy) and is never removed.
- **Skip link:** A "Skip to main content" link is the first focusable element. It already exists; keep it.
- **Landmarks:** One `header`, `nav` (labelled), `main` and `footer` per page. Breadcrumbs use `nav aria-label="Breadcrumb"`.
- **Menus:** Triggers use `aria-expanded` and `aria-controls`. The mobile drawer is a modal dialog with a focus trap.
- **Images:** Meaningful images have alt text that describes the content. Decorative images use `alt=""`. Placeholders have no misleading alt text.
- **Media:** Videos have captions. Loops have a pause control and no audio.
- **Forms:** Use real labels, `aria-invalid` and `aria-describedby` for errors, and an error summary on submit. Announce success with `role="status"`.
- **Language:** `lang="en-IN"` on every page.
- **Zoom:** The layout works at 200% zoom and 400% reflow.

---

## 12. Page-Level Layout Guidance

### Home

1. **Hero** on a white or navy background. Display H1, lead, supporting paragraph, primary button "Explore Our Solutions", secondary button "Explore Education Solutions", and a text line "Have a requirement in mind? Discuss Your Requirement". On the right is a key visual (photo or loop) for the enterprise and education themes.
2. **About** (text and media): eyebrow, H2, two paragraphs and a "Know More About SAID" link.
3. **What We Do:** section header with "View All Solutions", followed by the 10 numbered service cards. **The services loop sits here** as a wide media band above the grid or in the first slot.
4. **Industries:** 3×3 grid of industry cards and an "Explore Industries" link.
5. **Education** on a `surface-alt` background: intro and image, then the 7 numbered cards.
6. **Our Approach:** three step cards.
7. **Insights strip:** the 3 latest blogs and 3 latest case studies, shown only when published items exist. Otherwise hide the section.
8. **Careers** (text and media).
9. **CTA band.**

### Category pages (for example What We Do / Cybersecurity)

Breadcrumb, then H1, tagline and intro with media on the right, then a grid of child solution cards, the Approach steps, Related industries and the CTA band.

### Solution detail pages (about 75 pages)

Breadcrumb, then H1, tagline, intro, primary CTA and a "Part of [Category]" link, with media on the right. After that come **Scope Areas** (numbered tiles, 3 per row on desktop), How We Engage (steps), Related Solutions (3 cards), Relevant industries (tags), a "Back to [Category]" link and the CTA band.

### Industry pages

Breadcrumb, then H1 and tagline with an industry image. After that come the approved priority sections (text blocks alternating with media), a grid of recommended solutions and the CTA band.

### Education landing and sub-pages

These follow the category and detail templates. The Centre of Excellence pages can use a larger feature image at the top.

### Insights

- **Blogs index:** H1 and intro, optional category tags, then a 3-column grid of the 7–8 blog cards.
- **Blog article:** Breadcrumb, then the title, metadata (date, reading time, category) and a 16:9 cover image. The body is 42rem wide with styled H2 and H3, lists, quotes and figures. After the body come 3 related articles and the CTA band.
- **Case studies index:** H1 and intro, then a grid of the 10–12 case study cards with optional filtering by industry.
- **Case study detail:** H1 and a summary panel (Customer type, Industry, Solution area). The fixed sections are **Requirement → Solution → Implementation → Outcome**, matching the approved description. They are followed by related solutions and the CTA band.
- **Events and News:** a list layout with date blocks, using the same empty state.

### Who We Are

Text and media sections for About, Vision, Mission, Core Values (card grid) and Approach (steps), then Capabilities links and the CTA.

### Careers

Intro, Areas of Interest (card grid), Current Openings (a list, or the empty state) and the Share Your Profile form.

### Contact

H1 and intro, then two enquiry cards side by side (Business and Education), each with a "Start…" link that preselects the form. The form sits on the left of a 2:1 split and the corporate contact details panel sits on the right.

### Legal (Privacy Policy, Terms of Use)

Single column of 42rem text with a table of contents on wide screens and the "Draft" notice banner until the client approves the text.
