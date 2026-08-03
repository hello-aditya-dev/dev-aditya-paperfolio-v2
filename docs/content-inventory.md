# Content Inventory

Audit of `witejackel-eng/dev-aditya.com` (source repo) and `https://dev-aditya-com.vercel.app/`
(content source). This file is the source-of-truth list of every route, link,
project, asset and behaviour that this redesign preserves.

This redesign (`dev-aditya-paperfolio`) is a **targeted refresh** of the source
repo: the same content, structure and routes, with one explicit removal
(the excluded industrial-safety project, per Aditya's instruction) and a UI/UX polish
pass. The visual system is unchanged from the source.

## 1. Public routes (must all remain reachable)

| Route | Source file | Status in redesign |
|---|---|---|
| `/` | `src/app/page.tsx` | Preserved, polished |
| `/work` | `src/app/work/page.tsx` | Preserved with capability filters + flagship + lab |
| `/work/ibs-infra` | `src/app/work/ibs-infra/page.tsx` | Full case study migrated |
| `/work/device-destination` | `src/app/work/device-destination/page.tsx` | Full case study migrated |
| `/work/cloudsun` | `src/app/work/cloudsun/page.tsx` | Full case study migrated |
| `/work/saffron-steam-experience` | `src/app/work/saffron-steam-experience/page.tsx` | Full case study migrated |
| `/work/aarohan-legal` | `src/app/work/aarohan-legal/page.tsx` | Full case study migrated |
| `/work/casa-aurelia` | `src/app/work/casa-aurelia/page.tsx` | Full case study migrated |
| `/work/pricepilot` | `src/app/work/pricepilot/page.tsx` | Full case study migrated |
| `/work/dust-signal` | `src/app/work/dust-signal/page.tsx` | Full case study migrated |
| `/work/corporate-leadgen-platform` | `src/app/work/corporate-leadgen-platform/page.tsx` | **Stale route** — no project with this slug exists in `projects.ts`. Source repo keeps the file but `getProject()` returns `undefined`, so the source already 404s at runtime. Redesign keeps a 404 to match source behaviour. |
| `/about` | `src/app/about/page.tsx` | Preserved with source copy |
| `/services` | `src/app/services/page.tsx` | Renamed to `/capabilities`; permanent redirect from `/services` → `/capabilities` preserves SEO |
| `/capabilities` | (new) | New canonical route for the services content |
| `/process` | `src/app/process/page.tsx` | Preserved with six-step source content |
| `/contact` | `src/app/contact/page.tsx` | Preserved with full form behaviour |
| `/mentoring` | `src/app/mentoring/page.tsx` | Preserved (kept though absent from primary nav) |
| `/resources` | `src/app/resources/page.tsx` | Preserved hub |
| `/resources/portfolio-checklist` | `src/app/resources/portfolio-checklist/page.tsx` | Migrated |
| `/resources/ai-website-agency` | `src/app/resources/ai-website-agency/page.tsx` | Migrated |
| `/resources/frontend-qa` | `src/app/resources/frontend-qa/page.tsx` | Migrated |
| `/privacy` | `src/app/privacy/page.tsx` | Preserved |
| `/terms` | `src/app/terms/page.tsx` | Preserved |
| `/accessibility` | `src/app/accessibility/page.tsx` | Preserved |
| `/audit` | `src/app/audit/page.tsx` | Route preserved as a maintenance page. The full audit pipeline (PageSpeed, Drizzle DB, Resend report emails, Turnstile, admin dashboard) is out of scope for this redesign and is documented in `qa-report.md`. |
| `/audit/[auditId]` | `src/app/audit/[auditId]/page.tsx` | Same — preserved as maintenance page |
| 404 | `src/app/not-found.tsx` | Preserved |

**Excluded project:** The industrial-safety project route is intentionally **not** a
route in this redesign. Aditya does not currently have permission to use that
project publicly, so the route, the project entry in
`projects.ts`, the sitemap entry, the static link audit entry, and every UI
reference have been removed. The case-insensitive scan for the three
excluded search terms returns zero matches across the repository.

## 2. API routes

| Route | Behaviour | Status in redesign |
|---|---|---|
| `POST /api/contact` | Zod-free but field-validated; honeypot `_honey`; body-size limit 50 KB; Resend email; safe 503/502/400 errors | Fully reimplemented with Zod schema, honeypot, body-size limit, in-memory rate limit, Resend with safe fallback |
| `/api/audits/*` (12 routes) | Audit pipeline (run, unlock, events, report) | Not migrated (depends on Drizzle DB, PageSpeed API, Turnstile) |
| `/api/admin/*` (5 routes) | Admin dashboard auth + audit-lead management | Not migrated |

The audit API surface is intentionally omitted. It depends on a Neon
PostgreSQL database, the Google PageSpeed API, Cloudflare Turnstile, and
admin session cookies. Re-implementing it faithfully is a separate effort.
The current production deployment at `dev-aditya.com` continues to serve
these routes untouched.

## 3. Projects (single source of truth: `src/config/projects.ts`)

### Flagship (5)

| # | Slug | Name | Industry | Status | Live URL |
|---|---|---|---|---|---|
| 1 | `ibs-infra` | IBS Infra | B2B Technology Services | business | https://ibsinfra.com |
| 2 | `device-destination` | DeviceDestination | Ecommerce · Consumer Electronics | business | https://device-destination-rose.vercel.app |
| 3 | `cloudsun` | CloudSun | SaaS · Call-centre Operations | concept | https://cloudsun-aditya-snowy.vercel.app |
| 4 | `saffron-steam-experience` | Saffron & Steam | Hospitality · Brand Experience | business | https://saffron-steam-experience.vercel.app |
| 5 | `aarohan-legal` | Aarohan Legal | Legal Services | business | https://aarohan-legal.vercel.app |

### Laboratory (3)

| # | Slug | Name | Industry | Status | Live URL |
|---|---|---|---|---|---|
| 6 | `casa-aurelia` | Casa Aurelia | Luxury Real Estate | experiment | https://real-estate-atelier.vercel.app |
| 7 | `pricepilot` | PricePilot | Pricing · Decision Support | experiment | (no stable preview) |
| 8 | `dust-signal` | DUST//SIGNAL | Creative Technology | experiment | https://dune-aditya.vercel.app |

Each project carries: `disclosure`, `problem`, `constraints`, `decisions`,
`built`, `outcome`, `proof`, `honestMoment`, `timeline`,
`engineeringNotes`, `contextualCta`, plus the metadata shown on cards
(industry, projectType, role, scope, outcome, technology, liveUrl,
githubUrl).

**Count derivation:** All counts (homepage "Selected Work" headline, Work
page hero headline, Work page flagship section subheading) are now derived
dynamically from `FLAGSHIP_PROJECTS.length` and `LABORATORY_PROJECTS.length`
so they can never drift out of sync with the project list again.

## 4. External links (verified, must all remain)

| Destination | Where used |
|---|---|
| https://github.com/witejackel-eng | Footer, About, Contact, every case study |
| https://github.com/witejackel-eng/IBS.com | IBS Infra case study |
| https://github.com/witejackel-eng/DeviceDestination | DeviceDestination case study |
| https://github.com/witejackel-eng/cloudsun | CloudSun case study |
| https://github.com/witejackel-eng/saffron-steam-experience | Saffron & Steam case study |
| https://github.com/witejackel-eng/aarohan-legal | Aarohan Legal case study |
| https://github.com/witejackel-eng/real-estate-atelier | Casa Aurelia case study |
| https://github.com/witejackel-eng/pricepilot | PricePilot case study |
| https://github.com/witejackel-eng/dune | DUST//SIGNAL case study |
| mailto:work@dev-aditya.com | Footer, Contact, case-study CTAs, Final CTA |

No LinkedIn, Twitter/X, Instagram, or other social profiles are listed —
the source `socials.ts` deliberately omits them because no verified
profile exists.

## 5. Contact form behaviour (must be preserved exactly)

- **Fields**: name*, email*, company, website, projectType (select),
  scope, timing, details* (max 2000 chars), `_honey` (hidden honeypot),
  consent* (checkbox)
- **Project type options**: Corporate website, Website redesign, B2B
  landing page, Frontend development, Dashboard or web application,
  Interactive experience, Other
- **Client validation**: required-field checks, email regex, consent
  required, live char counter on details
- **Server validation**: Zod schema (single source of truth), control-char
  stripping (header-injection protection), field-length caps, email regex,
  body-size limit 50 KB
- **Honeypot**: `_honey` field — silently returns success without
  sending email if filled
- **Rate limit**: source uses DB-backed sliding window. Redesign uses
  in-memory sliding window (no DB) with the same effective limits.
- **Email delivery**: Resend SDK; `CONTACT_FROM_EMAIL` → `CONTACT_TO_EMAIL`.
  If `RESEND_API_KEY` is missing, returns 503 with a message directing
  the visitor to email `work@dev-aditya.com` directly.
- **Response shapes**: success `{success: true, message}`, validation
  errors 400, not-configured 503, delivery failure 502, body too large
  413.
- **No secrets in client**: only the form fields are sent; all email
  config stays server-side.

## 6. Complimentary Website Review offer

Source: `src/config/website-review.ts`. Preserved verbatim:

- Headline: "Not sure what your website needs?"
- Body: review scoping copy
- Clarifications: 4 honest scoping notes
- CTA: mailto with prefilled subject `[Website Review Request — [Company Name]]`
  and a structured body template

## 7. Mentoring route

Source: `src/app/mentoring/`. Preserved as `/mentoring`:
- "Frontend help for students, creators, and small businesses"
- Audience cards (students, small businesses, creators, developers)
- "What we can work on" tag list
- 4-step process
- mailto CTA

## 8. SEO & metadata

- **Production origin**: `https://dev-aditya.com` (configurable via `NEXT_PUBLIC_SITE_URL`)
- **Title template**: `"%s | Aditya"` (default: "Aditya — Designer & Developer for Business Websites and Digital Products")
- **Description**: source description preserved
- **OG image**: `src/app/opengraph-image.tsx` (1200×630).
- **Twitter image**: `src/app/twitter-image.tsx`.
- **Manifest**: `/manifest.webmanifest` with name, short_name, theme_color, icons
- **Favicon set**: SVG icon + 16/32/192/512 PNGs + apple-touch-icon (180)
- **JSON-LD Person schema**: name, jobTitle, email, url, sameAs (GitHub), address (Delhi, IN).
- **Sitemap**: includes every public route, lastModified, priority per route
- **robots.txt**: allow `/`, disallow `/admin/`, `/api/`, `/audit/*/`

## 9. Public assets in source

Source `public/` contains only favicon PNGs and `icon.svg`. No project
screenshots, no portrait of Aditya. The redesign therefore:

- Reuses the favicon SVG (copied across).
- Reuses the existing favicon PNGs.
- Keeps **original SVG editorial frames** for every project (no fake
  screenshots, no Unsplash placeholders, no Paperfolio demo images).
- Does **not** fabricate a portrait of Aditya. The hero uses a monogram
  "A" plus overlapping project frames.

## 10. Honest disclosures preserved

Every project's `disclosure` field is rendered verbatim on its case
study. Status labels are honest:

- `business` → "Live project"
- `concept` → "Concept"
- `experiment` → "Experiment"

PricePilot has `liveUrl: ''` (no stable preview) — the redesign renders
no live link for it, only the GitHub link.

## 11. Out-of-scope items (documented honestly)

- Full `/audit` funnel (PageSpeed, Drizzle, Turnstile, admin dashboard)
- `/admin/*` dashboard (auth + audit-lead management)
- Database integration (only the audit feature consumed it)
- Real project screenshots (replaced with original SVG editorial frames)

These are documented in `docs/qa-report.md` and `README.md`. The current
production site at `dev-aditya.com` continues to serve them untouched.
