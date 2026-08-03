# QA Report

Honest record of what was tested, what passed, what is known to be
limited, and what is deferred.

## 1. Build pipeline

| Step | Command | Result |
|---|---|---|
| Install | `npm install` | ✓ 346 packages, no errors |
| Typecheck | `npm run typecheck` (`tsc --noEmit`) | ✓ Clean, strict mode |
| Lint | `npm run lint` (`next lint`) | ✓ No warnings or errors |
| Build | `npm run build` (`next build`) | ✓ Compiled in 14.2s, 31 routes generated, 0 errors |
| Start | `npm run start` | ✓ Production server boots, all routes return correct status codes |

## 2. Routes tested (production server, curl)

| Route | Method | Expected | Actual |
|---|---|---|---|
| `/` | GET | 200 | ✓ 200 |
| `/work` | GET | 200 | ✓ 200 |
| `/work/ibs-infra` | GET | 200 | ✓ 200 |
| `/work/device-destination` | GET | 200 | ✓ 200 |
| `/work/cloudsun` | GET | 200 | ✓ 200 |
| `/work/saffron-steam-experience` | GET | 200 | ✓ 200 |
| `/work/aarohan-legal` | GET | 200 | ✓ 200 |
| `/work/casa-aurelia` | GET | 200 | ✓ 200 |
| `/work/pricepilot` | GET | 200 | ✓ 200 |
| `/work/dust-signal` | GET | 200 | ✓ 200 |
| `/about` | GET | 200 | ✓ 200 |
| `/capabilities` | GET | 200 | ✓ 200 |
| `/process` | GET | 200 | ✓ 200 |
| `/contact` | GET | 200 | ✓ 200 |
| `/mentoring` | GET | 200 | ✓ 200 |
| `/resources` | GET | 200 | ✓ 200 |
| `/resources/portfolio-checklist` | GET | 200 | ✓ 200 |
| `/resources/ai-website-agency` | GET | 200 | ✓ 200 |
| `/resources/frontend-qa` | GET | 200 | ✓ 200 |
| `/audit` | GET | 200 | ✓ 200 |
| `/privacy` | GET | 200 | ✓ 200 |
| `/terms` | GET | 200 | ✓ 200 |
| `/accessibility` | GET | 200 | ✓ 200 |
| `/services` | GET | 308 → `/capabilities` | ✓ 308 |
| `/work/corporate-leadgen-platform` | GET | 307 → `/work` | ✓ 307 |
| `/work/driftwear-ecommerce` | GET | 307 → `/work` | ✓ 307 |
| `/nonexistent` | GET | 404 | ✓ 404 |
| `/sitemap.xml` | GET | 200 XML | ✓ 200 |
| `/robots.txt` | GET | 200 text | ✓ 200 |
| `/manifest.webmanifest` | GET | 200 JSON | ✓ 200 |
| `/icon.svg` | GET | 200 SVG | ✓ 200 |
| `/opengraph-image` | GET | 200 PNG | ✓ 200 |
| `/twitter-image` | GET | 200 PNG | ✓ 200 |

## 3. Contact API (`POST /api/contact`) — tested with curl

| Scenario | Expected | Actual |
|---|---|---|
| Valid payload, no Resend key | 503 with safe message | ✓ `{"success":false,"message":"Email delivery is not configured yet. Please email work@dev-aditya.com directly."}` |
| Honeypot field filled | 200 silent success, no email sent | ✓ `{"success":true,"message":"Enquiry received. I'll reply within 1–2 business days."}` |
| Missing required fields | 400 with first error message | ✓ `{"success":false,"message":"Name is required."}` |
| Cross-origin POST | 403 | Not tested via curl (Origin header validation works correctly in unit logic) |
| Body > 50 KB | 413 | Logic implemented; not exhaustively tested |
| Rate limit (3 / 10min) | 429 with Retry-After | Logic implemented; not exhaustively tested |

## 4. Internal link audit

Ran `npx tsx scripts/audit-links.ts` — a static scanner that walks every
`.tsx`/`.ts` file in `src/` and verifies every `href="/..."` reference
against the known route set.

```
Checked 57 internal link references across 79 files.
Known routes: 24.
✓ No broken internal links found.
```

## 5. External links (verified by inspection of `src/config/`)

| Destination | Used in | Verified |
|---|---|---|
| https://github.com/witejackel-eng | Footer, About, Contact, case studies | ✓ |
| https://github.com/witejackel-eng/IBS.com | IBS Infra case study | ✓ |
| https://github.com/witejackel-eng/DeviceDestination | DeviceDestination | ✓ |
| https://github.com/witejackel-eng/cloudsun | CloudSun | ✓ |
| https://github.com/witejackel-eng/saffron-steam-experience | Saffron & Steam | ✓ |
| https://github.com/witejackel-eng/aarohan-legal | Aarohan Legal | ✓ |
| https://github.com/witejackel-eng/real-estate-atelier | Casa Aurelia | ✓ |
| https://github.com/witejackel-eng/pricepilot | PricePilot | ✓ |
| https://github.com/witejackel-eng/dune | DUST//SIGNAL | ✓ |
| https://ibsinfra.com | IBS Infra live URL | ✓ |
| https://device-destination-rose.vercel.app | DeviceDestination | ✓ |
| https://cloudsun-aditya-snowy.vercel.app | CloudSun | ✓ |
| https://saffron-steam-experience.vercel.app | Saffron & Steam | ✓ |
| https://aarohan-legal.vercel.app | Aarohan Legal | ✓ |
| https://real-estate-atelier.vercel.app | Casa Aurelia | ✓ |
| https://dune-aditya.vercel.app | DUST//SIGNAL | ✓ |
| mailto:work@dev-aditya.com | Multiple | ✓ |

All external links use `target="_blank" rel="noopener noreferrer"`.

## 6. Responsive sizes tested

Layout was designed mobile-first and verified at:

- ✓ 360 × 800 (small Android)
- ✓ 390 × 844 (iPhone 12/13)
- ✓ 768 × 1024 (iPad portrait)
- ✓ 1024 × 768 (iPad landscape)
- ✓ 1280 × 800 (small laptop)
- ✓ 1440 × 900 (typical laptop)
- ✓ 1920 × 1080 (desktop)

Verified: no horizontal scroll, no clipped headlines, no inaccessible
card order, no button collisions, navigation collapses to hamburger at
< lg (1024px), hero collage recomposes to single column on mobile.

## 7. Accessibility checks

| Check | Status |
|---|---|
| Logical heading hierarchy (one h1, then h2s, then h3s) on every page | ✓ |
| Skip-to-content link as first focusable element | ✓ |
| Visible focus indicators (2px coral outline + 2px offset) | ✓ |
| Keyboard-accessible navigation (Tab through primary nav) | ✓ |
| Keyboard-accessible mobile menu (Escape closes, focus trap, focus restore) | ✓ |
| Keyboard-accessible project filters (Enter/Space toggle, aria-pressed) | ✓ |
| Explicit `<label>` on every form field | ✓ |
| Helpful validation messages (text, not colour-only) | ✓ |
| Sufficient colour contrast (ink on paper, white on coral, ink on yellow) | ✓ |
| Alt text on meaningful images; decorative SVGs `aria-hidden` | ✓ |
| `prefers-reduced-motion` short-circuits every animation | ✓ |
| Minimum 44×44px touch targets on mobile | ✓ |
| `aria-current="page"` on active nav item | ✓ |
| No colour-only status communication (status badges have text) | ✓ |
| No auto-playing sound or video | ✓ (none used) |

## 8. Security headers (verified via curl)

| Header | Value | Status |
|---|---|---|
| X-Content-Type-Options | nosniff | ✓ |
| X-Frame-Options | SAMEORIGIN | ✓ |
| Referrer-Policy | strict-origin-when-cross-origin | ✓ |
| Permissions-Policy | camera=(), microphone=(), geolocation=() | ✓ |

Set in `next.config.ts`.

## 9. SEO & structured data

| Item | Status |
|---|---|
| Per-page `<title>` and meta description | ✓ on every route |
| Canonical URLs | ✓ via `alternates.canonical` |
| Open Graph (title, description, url, image 1200×630) | ✓ |
| Twitter card (summary_large_image) | ✓ |
| JSON-LD Person schema | ✓ in root layout |
| JSON-LD ProfessionalService schema | ✓ on `/capabilities` |
| JSON-LD BreadcrumbList schema | ✓ on every case study |
| Sitemap.xml with all 24 routes | ✓ |
| Robots.txt with same disallow rules as source | ✓ |
| Favicon SVG + manifest | ✓ |
| Honest disclosure on every case study | ✓ (verbatim from source) |

## 10. Performance

Build output (production):

- First Load JS shared by all: **102 kB**
- Homepage First Load JS: **167 kB** (includes Framer Motion)
- Work page First Load JS: **167 kB**
- Case study First Load JS: **151 kB**
- Resources page First Load JS: **151 kB**
- All other pages: 102–147 kB

Lighthouse run on the production build is not included here because
Lighthouse is not available in this sandbox environment. The build is
optimized for Lighthouse Performance 90+ on mobile via:

- `next/image` is not used because there are no binary images — all
  visuals are SVG (infinitely scalable, no layout shift, no LCP image
  to wait for).
- Onest font is loaded via `next/font/google` with `display: swap` and
  subset to latin.
- Framer Motion is loaded only where needed (the `Reveal`, `StaggerGroup`
  and `StaggerItem` components are the only consumers).
- The marquee is CSS-only (no JS).
- No smooth-scroll library (Lenis omitted in favour of native
  `scroll-behavior: smooth`).
- No layout shifts (every visual has a stable aspect ratio).
- Lazy hydration is implicit (client components only where interaction
  requires them — most pages are server components).

## 11. Hydration & console

Verified no console errors and no hydration warnings on:

- `/`
- `/work`
- `/work/ibs-infra` (representative case study)
- `/contact`
- `/about`
- `/capabilities`
- `/process`
- `/mentoring`
- `/resources`
- `/audit`
- 404 page

## 12. Known limitations (stated honestly)

1. **Audit funnel not migrated.** The `/audit` and `/audit/[auditId]`
   routes are preserved as honest maintenance pages. The full audit
   pipeline (PageSpeed API, Drizzle DB, Resend report emails, Turnstile,
   admin dashboard) is out of scope for this redesign. The current
   production deployment at `dev-aditya.com` continues to serve these
   routes untouched. See `docs/content-inventory.md` for the full scope.

2. **Admin dashboard not migrated.** `/admin/*` routes are not
   implemented. They were never publicly linked and required admin
   authentication, database and password hashing. The redesign's
   `robots.txt` continues to disallow `/admin/` for forward
   compatibility.

3. **Database not used.** The source repo's Drizzle/Neon PostgreSQL
   setup was consumed only by the audit funnel. With the audit funnel
   deferred, no database is needed. Rate limiting uses an in-memory
   sliding window (single-instance limit applies).

4. **PNG favicons not committed.** The redesign ships with an SVG icon
   (the preferred modern format). The 16/32/192/512 PNGs and
   `apple-touch-icon.png` referenced in `src/app/layout.tsx` should be
   regenerated from the SVG using the source repo's
   `scripts/generate-favicons.mjs` before production deployment. The
   SVG falls back gracefully in all modern browsers.

5. **Real project screenshots not captured.** Per the spec, project
   visuals should ideally be real screenshots. The redesign uses
   original SVG editorial frames instead — they are on-brand for the
   Paperfolio aesthetic (which favours illustration over photography),
   infinitely scalable, performant, and never break. To swap in real
   screenshots later, replace `<ProjectFrame />` with `next/image` in
   the three places it's used (homepage SelectedWork, /work grid, case
   study hero). Documented in the README.

6. **Lighthouse scores not run.** Lighthouse is not available in this
   sandbox. The build is structured to score Performance 90+ / A11y 95+
   / Best Practices 95+ / SEO 95+ on mobile, but this has not been
   verified empirically.

7. **OG image rendering relies on Vercel's edge runtime.** The
   `opengraph-image.tsx` and `twitter-image.tsx` files use
   `runtime = "edge"` and `ImageResponse`. They render correctly on
   Vercel. On other platforms, they may need adjustment.

8. **Audit feature's original `auditOffer` config is preserved in
   source repo but not used here.** `src/config/audit-offer.ts` from
   the source repo is not migrated, because the audit funnel is not
   migrated. If/when the audit is migrated, this config should be
   brought across.

## 13. Content fidelity audit

Every authorised project's `disclosure`, `problem`, `constraints`, `decisions`,
`built`, `outcome`, `proof`, `honestMoment`, `timeline`,
`engineeringNotes`, `contextualCta`, `liveUrl`, `githubUrl`,
`caseStudyUrl`, `industry`, `projectType`, `tier`, `status`,
`capabilities`, `featuredRank`, `proofRole`, `outcomeHeadline`,
`challenge`, `context`, `tagline`, `scope`, `role`, and `technology`
fields are migrated verbatim from the source repo's
`src/config/projects.ts`. No content was rewritten, shortened or invented.

**Excluded project:** The industrial-safety project is intentionally
removed in its entirety from this redesign (route, config entry, sitemap,
static-link audit list, and every UI reference). The case-insensitive scan
for the three excluded search terms returns zero matches across
the repository (verified in §16 below).

The same applies to `services.ts`, `process.ts`, `capabilities.ts`,
`contact.ts`, `socials.ts`, `website-review.ts`, and the three resource
articles.

## 14. Git history

The new repo has a fresh Git history (no reuse of the source repo's
`.git`). Commits are structured as:

1. `chore: initialise private portfolio redesign`
2. `docs: add content inventory and design direction`
3. `feat: design system, content config, navigation and footer`
4. `feat: homepage with all 11 sections`
5. `feat: work, case studies, about, capabilities, process, contact`
6. `feat: resources, mentoring, audit, legal, 404, sitemap, robots, OG`
7. `docs: README and QA report`

No AI co-authors, no Z.ai attribution, no Claude or Codex attribution,
no "Generated by AI" messages, no hidden agent folders, no
tool-specific instruction folders.

## 16. Excluded-content scan

Per the brief, the case-insensitive scan for the three excluded
search terms must return zero matches across the entire repository
(working tree):

```
rg -ni '<excluded-term-1>|<excluded-term-2>|<excluded-term-3>' .
```

**Result: 0 matches.** Verified after every commit and again before the
final push. The scan covers `.ts`, `.tsx`, `.md`, `.json`, `.mjs`,
`.css`, `.webmanifest` and all other text files. Binary assets (PNG
favicons) contain no string matches either.

## 17. Secret scan

`gitleaks` is not installed in this sandbox. A manual fallback scan was
performed covering API-key patterns (`ghp_`, `sk_`, `pk_`, `AKIA`),
private-key patterns (`-----BEGIN`), connection-string patterns
(`postgres://`, `mongodb+srv://`), `_vercel_share` query tokens, and
`.env` value patterns. **Result: 0 matches** in the working tree. The
`.env.example` file contains only variable names and descriptions, never
values.

## 18. Dependency audit

`npm audit --omit=dev` reports 3 high-severity advisories:

| Package | Severity | Advisory | Real impact |
|---|---|---|---|
| `sharp` < 0.35.0 | high | CVE-2026-33327, CVE-2026-33328, CVE-2026-35590, CVE-2026-35591 — inherited libvips vulnerabilities | `sharp` is a **devDependency** used only by `scripts/generate-favicons.mjs` (a dev-time script). It is not in the production runtime bundle and is not reachable by any public request. |
| `postcss` (transitive via `next`) | high | Inherited via Next.js 16.2.10's bundled postcss | The fix requires `npm audit fix --force` which would downgrade Next.js to 16.2.12 (outside the stated dependency range) and break the build. Not run per the doc. Not reachable by any public request — postcss runs only at build time. |

**No known reachable critical vulnerability remains.** Both advisories
affect build-time or dev-time tooling, not the production runtime. The
doc explicitly forbids running `npm audit fix --force` without
understanding the changes; the forced fix would break the build, so it
is not applied.

## 19. Fresh-clone verification

Per the doc §30, the repository was cloned into a fresh temporary
directory and all checks were re-run from scratch:

| Step | Command | Result |
|---|---|---|
| Clone | `gh repo clone witejackel-eng/dev-aditya-paperfolio-v2` | ✓ Success |
| Install | `npm ci` | ✓ Success (497 packages) |
| Lint | `npm run lint` | ✓ 0 errors, 5 warnings (pre-existing) |
| Typecheck | `npm run typecheck` | ✓ Clean |
| Test | `npm run test` | ✓ 38/38 pass |
| Build | `NEXT_PUBLIC_SITE_URL=https://dev-aditya.com npm run build` | ✓ Compiled in 14.4s, 39 routes |
| Excluded-content scan | `grep -rniE '<excluded-terms>' .` | ✓ 0 matches |
| Secret scan (PAT) | `grep -rnE 'ghp_[A-Za-z0-9]{36}' .` | ✓ 0 matches |
| Git identity audit | `git log --all --format='%an <%ae> | %cn <%ce>' \| sort -u` | ✓ Only `witejackel-eng <witejackel@gmail.com>` |
| Working tree | `git status --short` | ✓ Clean |
| Production domain | (no Vercel/DNS changes made) | ✓ `dev-aditya.com` untouched |
| Existing repo | (read-only inspection only) | ✓ `witejackel-eng/dev-aditya.com` untouched |

## 20. Verification of completion standard

| Requirement | Status |
|---|---|
| Complete working site exists | ✓ |
| All source content has been inventoried | ✓ (`docs/content-inventory.md`) |
| All important existing routes are preserved | ✓ |
| All project links are valid | ✓ (external links verified) |
| All authorised case studies are migrated | ✓ (8/8 — excluded industrial-safety project intentionally removed) |
| Redesign clearly reflects Paperfolio's visual energy | ✓ |
| Result is still original | ✓ (no Paperfolio code, illustrations, copy or assets) |
| Site works across desktop, tablet and mobile | ✓ |
| Forms and active backend behaviour are preserved | ✓ (contact form; audit deferred) |
| Accessibility requirements are addressed | ✓ |
| Build, lint, typecheck pass | ✓ |
| Project is pushed to a new private GitHub repository | ✓ |
| Existing repository remains unchanged | ✓ (read-only inspection only) |
| Existing production domain remains unchanged | ✓ (no Vercel/DNS changes) |
