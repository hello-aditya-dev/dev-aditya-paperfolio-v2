# dev-aditya-paperfolio

A targeted refresh of Aditya's personal portfolio website. Same content,
structure and routes as the source repository
([`witejackel-eng/dev-aditya.com`](https://github.com/witejackel-eng/dev-aditya.com)),
with one explicit removal (the excluded industrial-safety project, per
Aditya's instruction) and a UI/UX polish pass.

This repository is a **private** redesign staging area. It does **not**
replace the live production deployment at
[dev-aditya.com](https://dev-aditya.com) and does **not** alter the
existing source repository, Vercel projects, DNS, or environment
variables.

## Project overview

Aditya is an independent designer and developer based in Delhi, India,
working with B2B companies, ecommerce platforms and digital-product
teams. The site positions him as a serious frontend engineer and
creative builder, showcasing real shipped projects with detailed case
studies.

- **Content source of truth:** the source repository
  `witejackel-eng/dev-aditya.com` (read-only inspection).
- **Visual system:** preserved from the source — light paper background,
  dark ink typography, maroon accent, hard offset shadows, rounded
  outlined containers, original SVG editorial project frames.
- **What changed:** removed the excluded industrial-safety project from
  every surface; made all project counts data-derived so they can never
  drift again; tightened focus states, hover transitions, and a few
  spacing details across the homepage and Work page.

## Tech stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5 (strict)
- **Styling:** Tailwind CSS 4
- **Animations:** Framer Motion (selective, reduced-motion aware)
- **Fonts:** Geist Sans + Geist Mono via `next/font/google`
- **Forms:** Zod (shared client + server schema), honeypot, body-size
  limit, in-memory rate limit, Resend email delivery with safe fallback.
- **Database:** none in this redesign (the source repo's Drizzle/Neon
  setup was consumed only by the audit funnel, which is deferred here).

## Routes

| Route | Description |
|---|---|
| `/` | Home — hero, capability strip, selected work, commerce pair, creative pair, outcomes, working relationship, process, profile, laboratory, final CTA |
| `/work` | All projects with capability filters, flagship + laboratory sections |
| `/work/ibs-infra` | Case study: IBS Infra corporate website transformation |
| `/work/device-destination` | Case study: DeviceDestination commerce platform |
| `/work/cloudsun` | Case study: CloudSun SaaS call-centre operations |
| `/work/saffron-steam-experience` | Case study: Saffron & Steam hospitality brand experience |
| `/work/aarohan-legal` | Case study: Aarohan Legal editorial boutique-practice website |
| `/work/casa-aurelia` | Case study: Casa Aurelia luxury real-estate experiment |
| `/work/pricepilot` | Case study: PricePilot pricing decision-support experiment |
| `/work/dust-signal` | Case study: DUST//SIGNAL creative-coding experiment |
| `/about` | Background, design philosophy, tech stack |
| `/capabilities` | Capability deep-dive (canonical; `/services` redirects here) |
| `/process` | Six-step delivery process |
| `/contact` | Contact form + direct contact info |
| `/mentoring` | Frontend help for students and small businesses |
| `/resources` | Hub for guides and checklists |
| `/resources/portfolio-checklist` | Portfolio Website Checklist |
| `/resources/ai-website-agency` | AI Website Agency Starter Notes |
| `/resources/frontend-qa` | Frontend Project QA Checklist |
| `/audit` | Maintenance page (full audit pipeline deferred — see `docs/qa-report.md`) |
| `/privacy` | Privacy Policy |
| `/terms` | Terms of Service |
| `/accessibility` | Accessibility Statement |
| 404 | Custom not-found page |

## Design system

Light editorial palette, hard offset shadows, original SVG project
frames (no fake screenshots, no Unsplash placeholders, no template
demo images).

| Token | Value |
|---|---|
| Background paper | `#FAFAF7` |
| Surface | `#FFFFFF` |
| Surface 2 | `#F3F0EA` |
| Ink | `#080808` |
| Ink muted | `#55514A` |
| Maroon (primary accent) | `#7A1F2B` |
| Maroon dark | `#55131D` |
| Maroon soft | `#F4E4E6` |
| Border | `rgba(17,17,17,0.14)` |
| Border hard | `#111111` |

Typography: Geist Sans for headings and body, Geist Mono for labels,
tags and metadata. Fluid scales via `clamp()`. Strong visible focus
states (2px maroon outline + 2px offset).

## Features

- Light editorial design with premium spacing and typography
- Scroll-triggered reveal animations via Framer Motion (respects
  `prefers-reduced-motion`)
- Sticky header with blur effect and accessible mobile hamburger menu
  (focus trap, Escape close, body scroll lock)
- Deep multi-column footer with all links
- SEO metadata on every page (title, description, Open Graph, Twitter)
- JSON-LD Person, ProfessionalService and BreadcrumbList schemas
- Auto-generated sitemap.xml and robots.txt
- Contact form with Zod validation, honeypot, body-size limit,
  in-memory rate limit, Resend email delivery with safe 503 fallback
- Fully responsive (mobile, tablet, desktop)
- Accessible: semantic HTML, keyboard nav, focus states, ARIA labels,
  skip-to-content link, aria-current on active nav
- Custom 404 page
- Original SVG editorial project frames (no fake screenshots)

## Getting started

```bash
# Install dependencies (use the lockfile for reproducible installs)
npm ci

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Run typecheck
npm run typecheck

# Run tests
npm run test

# Run the static internal-link audit
npx tsx scripts/audit-links.ts
```

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Header, Footer, SEO, JSON-LD)
│   ├── page.tsx                # Home page (10 sections)
│   ├── globals.css             # Global styles + Tailwind theme
│   ├── sitemap.ts              # Auto-generated sitemap
│   ├── robots.ts               # Robots.txt config
│   ├── not-found.tsx           # 404 page
│   ├── opengraph-image.tsx     # Dynamic OG image (edge runtime)
│   ├── twitter-image.tsx       # Dynamic Twitter image (edge runtime)
│   ├── manifest.webmanifest    # PWA manifest
│   ├── icon.svg                # SVG favicon
│   ├── work/                   # Work listing + 8 case studies
│   ├── about/                  # About page
│   ├── capabilities/           # Capabilities deep-dive
│   ├── process/                # Six-step process
│   ├── contact/                # Contact page + form
│   ├── mentoring/              # Mentoring page
│   ├── resources/              # Resources hub + 3 articles
│   ├── audit/                  # Maintenance page (audit pipeline deferred)
│   ├── privacy/                # Privacy Policy
│   ├── terms/                  # Terms of Service
│   ├── accessibility/          # Accessibility Statement
│   └── api/contact/            # Contact form API (Zod, honeypot, rate limit)
├── components/
│   ├── Header.tsx              # Sticky header + mobile menu
│   ├── Footer.tsx              # Deep footer
│   ├── Reveal.tsx              # Scroll-triggered reveal wrapper
│   ├── CaseStudyContent.tsx    # Reusable case study template
│   ├── ProjectCard.tsx         # Project card
│   ├── SmoothScroll.tsx        # Lenis smooth scroll wrapper
│   └── home/                   # All homepage sections
├── config/
│   ├── site.ts                 # Site metadata, URL, author
│   ├── navigation.ts           # Header + footer nav
│   ├── projects.ts             # Single source of truth for projects
│   ├── project-accents.ts      # Per-project accent colour side-table
│   ├── services.ts             # Service cards
│   ├── process.ts              # Six-step process data
│   ├── capabilities.ts         # Capability deep-dive content
│   ├── contact.ts              # Contact info + form options
│   ├── socials.ts              # Social links (deliberately minimal)
│   └── website-review.ts       # Complimentary website-review offer
├── lib/
│   ├── env.ts                  # Typed env access
│   ├── rate-limit.ts           # In-memory sliding-window rate limiter
│   ├── request-security.ts     # Origin + body-size checks
│   └── email/resend.ts         # Resend email delivery
└── emails/
    └── ContactEnquiryEmail.tsx # React Email template for contact form
```

## Environment variables

Copy `.env.example` to `.env.local` and fill in the values. Only
`NEXT_PUBLIC_SITE_URL` is required for the site to build; the rest are
required only if you want the contact form to deliver email.

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site URL (e.g. `https://dev-aditya.com`) |
| `RESEND_API_KEY` | for email | Resend API key for contact-form delivery |
| `CONTACT_TO_EMAIL` | for email | Recipient address (default `work@dev-aditya.com`) |
| `CONTACT_FROM_EMAIL` | for email | Sender address (verified domain) |
| `AUDIT_FROM_EMAIL` | deferred | Audit report sender (audit pipeline deferred) |
| `AUDIT_NOTIFICATION_EMAIL` | deferred | Audit lead notification recipient |
| `DATABASE_URL` | deferred | Neon PostgreSQL connection string (audit only) |
| `GOOGLE_PAGESPEED_API_KEY` | deferred | PageSpeed API key (audit only) |
| `AUDIT_SIGNING_SECRET` | deferred | Audit report signing (audit only) |
| `IP_HASH_SECRET` | deferred | IP hashing for rate-limit keys (audit only) |
| `AUDIT_FEATURE_ENABLED` | deferred | Toggle audit feature (audit only) |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | deferred | Cloudflare Turnstile site key (audit only) |
| `TURNSTILE_SECRET_KEY` | deferred | Cloudflare Turnstile secret (audit only) |
| `ADMIN_PASSWORD_HASH` | deferred | Admin dashboard password hash (audit only) |
| `ADMIN_SESSION_SECRET` | deferred | Admin session secret (audit only) |

`.env.example` contains variable names and descriptions only. No
secret values are ever committed.

## Contact-form setup

The contact form (`/contact`) posts to `POST /api/contact`. The API
route:

1. Validates the request body against a Zod schema (single source of
   truth shared with the client).
2. Checks the honeypot field — if filled, silently returns success
   without sending email.
3. Enforces a body-size limit (50 KB).
4. Enforces an in-memory sliding-window rate limit (3 requests per 10
   minutes per IP).
5. Validates the Origin header (same-origin only).
6. Strips control characters from all fields (header-injection
   protection).
7. Sends the email via Resend. If `RESEND_API_KEY` is missing, returns
   a 503 with a message directing the visitor to email
   `work@dev-aditya.com` directly.

## Testing

```bash
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
npm run test        # Vitest
npm run build       # next build (production)
```

The Vitest suite covers:

- Project-data integrity (no duplicate slugs, valid routes)
- Excluded-project absence (zero matches for the three excluded terms)
- Project counts derived correctly
- Contact-form Zod schema (valid + invalid payloads)
- Sitemap exclusions

## Security checks

- **Secret scan:** `gitleaks detect --source . --redact` (or manual
  fallback). Result: 0 matches.
- **Excluded-content scan:** `rg -ni '<excluded-terms>' .`. Result: 0
  matches.
- **Dependency audit:** `npm audit --omit=dev`. Review findings
  manually; never run `npm audit fix --force` without understanding
  the changes.
- **Security headers:** set in `next.config.ts`
  (`X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`,
  `Permissions-Policy`). CSP is intentionally minimal because the site
  uses no inline scripts or external domains beyond `next/font`.

## Accessibility notes

- WCAG 2.2 AA targeted.
- Skip-to-content link as the first focusable element.
- Visible focus indicators (2px maroon outline + 2px offset).
- Keyboard-accessible navigation, mobile menu (focus trap, Escape
  close, body scroll lock), and project filters.
- `aria-current="page"` on the active nav item.
- All form fields have explicit `<label>`s; validation messages are
  text, not colour-only.
- `prefers-reduced-motion` short-circuits every animation.
- Decorative SVGs are `aria-hidden="true"`; meaningful images have
  descriptive alt text.

## Deployment steps

This repository is intended for a **separate preview deployment**
(e.g. `dev-aditya-paperfolio-preview` on Vercel). Do **not** assign
`dev-aditya.com` to it. The existing production domain, Vercel project
and DNS records for `dev-aditya.com` remain untouched.

1. Push to `main` on the private GitHub repository
   `witejackel-eng/dev-aditya-paperfolio`.
2. Import the repository into Vercel as a new project
   (`dev-aditya-paperfolio-preview` or similar).
3. Set the required environment variables (see above) in the Vercel
   project settings.
4. Deploy. The build command is `npm run build`; the output directory
   is `.next` (Next.js default).

## Content-update instructions

All content is centralised in `src/config/`:

- **Projects:** `src/config/projects.ts` — single source of truth for
  every project, its case study, and its metadata. Adding or removing
  a project here automatically updates the homepage, Work page, case
  study routes (create the route file under `src/app/work/<slug>/`),
  sitemap, and project counts.
- **Services:** `src/config/services.ts`
- **Process:** `src/config/process.ts`
- **Capabilities:** `src/config/capabilities.ts`
- **Contact info:** `src/config/contact.ts`
- **Navigation:** `src/config/navigation.ts`
- **Site metadata:** `src/config/site.ts`

## Project-media instructions

The redesign uses **original SVG editorial frames** for every project
(see `src/components/home/FlagshipStory.tsx`). No binary screenshots
are committed. To swap in real screenshots later:

1. Capture a desktop screenshot at 1440×900 from the project's live
   URL.
2. Convert to WebP or AVIF and compress appropriately.
3. Store under `public/images/projects/<slug>.webp`.
4. Replace the `<ProjectCover />` component with `next/image` in the
   three places it's used (homepage SelectedWork, /work grid, case
   study hero).
5. Add descriptive alt text.

## Copyright and third-party notice

This repository contains Aditya's customised portfolio implementation.
Aditya retains copyright over his original written content, branding,
project descriptions, source code, component implementations, and
selection and arrangement of authorised content.

Third-party packages, fonts, icons and any other external assets
remain governed by their own licences. See `THIRD_PARTY_NOTICES.md`
for the full list.

The BRIX Paperfolio template itself is **not** being redistributed. No
template source code, demo images, placeholder copy, personal avatar,
testimonials, company logos or branded Paperfolio assets are included
in this repository. The implementation is original React and
TypeScript code, written from scratch, that takes general aesthetic
inspiration from the Paperfolio visual language (light editorial
backgrounds, strong black outlines, rounded cards, offset shadows,
coloured highlights) without copying any of its protected expression.

The repository is **not** licensed for public reuse by default. The
`"private": true` flag in `package.json` reflects this. No MIT,
Apache or other open-source licence is added.

The public footer reads: `© [current year] Aditya. All rights
reserved.`

## Repository owner

- **GitHub username:** `witejackel-eng`
- **Git author name:** `witejackel-eng`
- **Git author email:** `witejackel@gmail.com`
- **Public contact email:** `work@dev-aditya.com` (do not display the
  Git commit email on the public website)

## Commit identity policy

Every commit is authored exclusively as
`witejackel-eng <witejackel@gmail.com>`. The local Git config is set
inside this repository only (`git config --local`); the machine's
global Git config is untouched.

Before every commit:

```bash
git config --local --get user.name    # witejackel-eng
git config --local --get user.email   # witejackel@gmail.com
git diff --cached --check
git diff --cached
git status --short
```

Every commit uses explicit author and committer identity:

```bash
GIT_AUTHOR_NAME="witejackel-eng" \
GIT_AUTHOR_EMAIL="witejackel@gmail.com" \
GIT_COMMITTER_NAME="witejackel-eng" \
GIT_COMMITTER_EMAIL="witejackel@gmail.com" \
git commit -m "<meaningful commit message>"
```

After every commit, verify:

```bash
git log -1 --format='%an <%ae> | %cn <%ce>'
# witejackel-eng <witejackel@gmail.com> | witejackel-eng <witejackel@gmail.com>
```

No co-authors, no Z.ai attribution, no Claude or Codex attribution,
no "Generated by AI" messages, no hidden agent folders, no
tool-specific instruction folders.

## Author

- **Aditya** — Independent Web Designer & Frontend Developer
- GitHub: [witejackel-eng](https://github.com/witejackel-eng)
- Email: work@dev-aditya.com
- Location: Delhi, India
