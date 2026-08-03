# Design Direction

A short, useful summary of the visual language for the redesign — not
generic AI prose, but the concrete decisions that shape every component.

## 1. Source of inspiration

The Paperfolio template (community V0 clone of Brix Templates' Paperfolio)
for: layout rhythm, bold outlined cards, hard offset shadows, coloured
highlight blocks behind words, capability strip, alternating editorial
sections, generous whitespace.

**Not copied from Paperfolio**: the avatar, the John Carter identity,
the demo client logos, the demo testimonials, the newsletter block, the
footer logo JPEG, the article images, the design-mode PNGs. Every
illustration and copy line in this redesign is original or migrated from
Aditya's source repository.

## 2. Palette (CSS variables)

| Token | Value | Role |
|---|---|---|
| `--paper` | `#FAF9F6` | Page background — warm off-white |
| `--white` | `#FFFFFF` | Cards, surfaces |
| `--ink` | `#0B0B0B` | Primary text, outlines |
| `--ink-muted` | `#5E5E5F` | Secondary text |
| `--line` | `#0B0B0B` | Borders (1.5–2px) |
| `--coral` | `#FF4A60` | Primary accent (CTAs, highlight blocks) |
| `--blue` | `#1C92FF` | Secondary accent (highlight blocks) |
| `--yellow` | `#FFC431` | Tertiary accent (background panels) |
| `--violet` | `#5C42FB` | Quaternary accent (used sparingly) |

The palette is a **controlled system**. Coral carries the brand; blue and
yellow rotate as highlight/backing panels; violet is reserved for the
smallest accent moments. No component invents a new colour.

## 3. Typography

- **Family**: `Onest` (via `next/font/google`) for headings and body.
  Onest is a clean, geometric sans-serif with strong display weight —
  the right amount of personality for a credible-but-memorable
  portfolio. Fallbacks: system sans-serif.
- **Display weight**: 700–800, tightly tracked (`letter-spacing: -0.02em`
  on large display sizes).
- **Body weight**: 400–500.
- **Micro-labels**: small uppercase tracked labels (`text-xs tracking-[0.2em] uppercase`) used sparingly for section eyebrows.
- **Fluid scale**: every heading uses `clamp()` so type scales smoothly
  between mobile and desktop without breakpoint jumps.
- **No tiny body text**: minimum body size is 16px; secondary text 14px
  only for metadata.

## 4. Layout primitives

- **Container**: max-width `80rem` (1280px), horizontal padding
  `clamp(1.25rem, 5vw, 3rem)`.
- **Section vertical rhythm**: `padding-block: clamp(4rem, 8vw, 7rem)`.
- **Grid**: 12-column on desktop, collapses to single column on mobile.
- **Card**: rounded `1rem` (16px), 1.5px solid `--line` border, white
  surface, optional hard offset shadow `4px 4px 0 0 var(--ink)`.
- **Highlight block**: an inline element behind a word or phrase with
  `--coral`, `--blue`, or `--yellow` background, 0.15em padding around
  the text, no border. Used for one or two words per heading, never
  whole lines.

## 5. Visual signatures

1. **Bold black outlines** on every card, button, and surface.
2. **Hard offset shadows** (no blur) on primary cards and CTAs — `4px 4px 0 0 var(--ink)`.
3. **Coloured highlight rectangles** behind key words in display
   headings — coral for the name, blue for outcomes.
4. **Editorial project frames** — original SVG browser-frame
   illustrations with project monograms and accent panels, never fake
   screenshots.
5. **Alternating image/text layout** on selected-work cards.
6. **Capability strip** — a horizontally-moving marquee of real phrases
   ("Strategy-led design", "Corporate websites", etc.) with
   `prefers-reduced-motion` pause.
7. **Sticky rounded navigation** — a pill-shaped floating nav with a
   circular "A" monogram, strong outline, sticky after scroll.
8. **Paper texture** — a very subtle CSS-only dotted/grain texture on
   the page background, applied via a `::before` pseudo-element at
   ~3% opacity. No images.

## 6. Motion

- **Hero reveal**: fast (≤400ms) fade-up of the headline, highlight
  blocks wipe in with a 100ms stagger.
- **Section reveals**: 16px fade-up, 400ms, `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Card hover**: translateY(-2px) and shadow grows by 2px. No scale, no
  rotate, no bouncing.
- **Project image reveal**: clip-path inset reveal on enter view.
- **Mobile menu**: slide-down + fade, body scroll lock, focus trap,
  Escape to close.
- **Capability strip**: CSS keyframe `translateX` marquee, paused under
  `prefers-reduced-motion`.
- **No smooth-scroll library** (Lenis omitted to keep bundle small);
  native `scroll-behavior: smooth` is enough.
- **All motion respects `prefers-reduced-motion`** — every Framer Motion
  variant checks the user preference.

## 7. Component primitives

| Primitive | Purpose |
|---|---|
| `Container` | Max-width + horizontal padding |
| `Section` | Vertical rhythm wrapper |
| `SectionLabel` | Uppercase tracked eyebrow with accent dot |
| `Card` | Outlined rounded surface with optional shadow |
| `Button` | Primary (coral, hard shadow), secondary (outlined), text link with arrow |
| `Badge` | Small pill for status/tags |
| `Highlight` | Inline coloured block behind text |
| `ProjectFrame` | Reusable SVG browser frame for project visuals |
| `Monogram` | Circular "A" mark |
| `Marquee` | CSS-only infinite scroller |
| `Reveal` | Framer Motion in-view fade-up wrapper |

## 8. Responsive strategy

- Mobile-first; every layout starts single-column.
- Breakpoints: `sm` 640, `md` 768, `lg` 1024, `xl` 1280, `2xl` 1536.
- Hero collage recomposes on mobile (single column, smaller frames)
  rather than shrinking.
- Navigation collapses to a hamburger below `lg`.
- Project cards switch from alternating two-column to stacked
  single-column at `md`.
- No horizontal scroll at any width — verified at 360, 390, 768, 1024,
  1280, 1440, 1920.

## 9. Accessibility

- WCAG 2.2 AA target.
- Skip-to-content link as the first focusable element.
- Visible focus ring (2px coral outline + 2px offset) on every
  interactive element.
- Keyboard-accessible mobile menu (focus trap, Escape, restore focus on
  close).
- Keyboard-accessible project filters (arrow keys, `aria-pressed`).
- All form fields have explicit `<label>` associations.
- Status communicated with text, never colour alone.
- Decorative SVGs have `aria-hidden="true"`; meaningful images have
  descriptive alt text.
- `prefers-reduced-motion` short-circuits every animation.
- Minimum touch target: 44×44px.

## 10. What this design is not

- Not a dark theme. The source is dark; the redesign is light.
- Not a SaaS purple-gradient site.
- Not a glassmorphism site.
- Not a copy of Paperfolio. The visual grammar is inspired by it; every
  component, illustration and word is original or migrated from
  Aditya's source.
