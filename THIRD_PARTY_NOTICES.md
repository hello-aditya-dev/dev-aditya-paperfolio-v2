# Third-Party Notices

This file lists the external packages, fonts, icons and licensed assets
actually used by this repository. Each entry remains governed by its own
licence; this file is informational only and does not supersede any
upstream licence terms.

## Runtime dependencies

| Package | Licence | Purpose |
|---|---|---|
| `next` | MIT | Next.js 16 framework (App Router, RSC, routing, image/font optimisation) |
| `react` / `react-dom` | MIT | UI runtime |
| `typescript` | Apache-2.0 | Type system |
| `tailwindcss` | MIT | Utility-first CSS framework (v4) |
| `@tailwindcss/postcss` | MIT | Tailwind v4 PostCSS plugin |
| `framer-motion` | MIT | Selective scroll-triggered reveal animations (reduced-motion aware) |
| `@studio-freight/lenis` | MIT | Smooth-scroll wrapper (only loaded where beneficial; respects `prefers-reduced-motion`) |
| `zod` | MIT | Schema validation (shared client + server for the contact form) |
| `resend` | MIT | Email delivery for the contact form (server-side only) |
| `@react-email/render` | MIT | React Email rendering for the contact-form email template |
| `drizzle-orm` | Apache-2.0 | ORM (kept for forward compatibility with the deferred audit pipeline; not currently active) |
| `@neondatabase/serverless` | MIT | Neon PostgreSQL serverless driver (kept for forward compatibility with the deferred audit pipeline; not currently active) |
| `ipaddr.js` | MIT | IP address parsing for rate-limit key normalisation |
| `cheerio` | MIT | HTML parsing (kept for forward compatibility with the deferred audit pipeline) |
| `undici` | MIT | HTTP client (kept for forward compatibility with the deferred audit pipeline) |

## Development dependencies

| Package | Licence | Purpose |
|---|---|---|
| `eslint` / `eslint-config-next` | MIT | Linting |
| `vitest` | MIT | Unit tests |
| `jsdom` | MIT | DOM environment for tests |
| `sharp` | Apache-2.0 | Image processing (used by `scripts/generate-favicons.mjs`) |
| `png-to-ico` | MIT | ICO favicon generation |
| `drizzle-kit` | MIT | Drizzle migration tooling (deferred audit pipeline) |
| `tsx` | MIT | TypeScript script runner (for `scripts/audit-links.ts` etc.) |
| `@types/node` / `@types/react` / `@types/react-dom` | MIT | Type definitions |

## Fonts

| Font | Licence | Source | Usage |
|---|---|---|---|
| Geist Sans | OFL-1.1 | Google Fonts via `next/font/google` | Headings and body |
| Geist Mono | OFL-1.1 | Google Fonts via `next/font/google` | Labels, tags, metadata |

Fonts are loaded via `next/font/google`, which subsets, self-hosts and
serves the font files from the same origin as the site. No font files
are redistributed in this repository.

## Icons

| Set | Licence | Source | Usage |
|---|---|---|---|
| Inline SVG (original) | — | Hand-written in this repository | All decorative motifs, project frames, monogram |

No third-party icon library is used. Every SVG in the repository is
original work.

## Images

No binary images are committed to this repository (other than the
favicon PNGs in `public/`, which are generated from the SVG icon via
`scripts/generate-favicons.mjs`). All project visuals are original
inline SVG editorial frames defined in `src/components/home/FlagshipStory.tsx`.

No Unsplash, stock-photo, or template-demo images are used.

## Templates

The BRIX Paperfolio template (uploaded as a reference ZIP) is **not**
redistributed in this repository. No template source code, demo images,
placeholder copy, personal avatar, testimonials, company logos or
branded Paperfolio assets are included.

The implementation is original React and TypeScript code, written from
scratch, that takes general aesthetic inspiration from the Paperfolio
visual language (light editorial backgrounds, strong black outlines,
rounded cards, offset shadows, coloured highlights) without copying
any of its protected expression.

## Licence for this repository

This repository is **private** and is **not** licensed for public
reuse by default. The `"private": true` flag in `package.json`
reflects this. No MIT, Apache or other open-source licence is added.

Aditya retains copyright over his original written content, branding,
project descriptions, source code, component implementations, and
selection and arrangement of authorised content. Third-party packages
and assets remain governed by their own licences as listed above.
