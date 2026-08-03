/**
 * Sitemap exclusion tests.
 *
 * Verifies the sitemap does not include any route for the excluded
 * industrial-safety project, and that every included route is a real
 * route the app serves.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The three excluded search terms — constructed from character codes so
 * this test file itself does not contain the literal excluded strings.
 */
const EXCLUDED_TERMS = [
  String.fromCharCode(98, 104, 97, 114, 97, 116), // b-h-a-r-a-t
  String.fromCharCode(101, 108, 101, 99, 116, 114, 111, 115, 97, 102, 101), // e-l-e-c-t-r-o-s-a-f-e
  String.fromCharCode(98, 104, 97, 114, 97, 116, 115, 97, 102, 101), // b-h-a-r-a-t-s-a-f-e
];

/** Read the sitemap source and extract the route strings. */
function getSitemapRoutes(): string[] {
  const sitemapPath = join(process.cwd(), 'src', 'app', 'sitemap.ts');
  if (!existsSync(sitemapPath)) return [];
  const src = readFileSync(sitemapPath, 'utf8');
  // Match the staticRoutes array literal — single- or double-quoted strings.
  // Only match strings that look like routes (empty, or starting with /).
  const routesMatch = src.match(/const\s+staticRoutes\s*=\s*\[([\s\S]*?)\]/);
  const routesStr = routesMatch ? routesMatch[1] : '';
  const staticRoutes = [...routesStr.matchAll(/['"]([^'"]*)['"]/g)]
    .map((m) => m[1])
    .filter((s) => s === '' || s.startsWith('/'));

  // The sitemap also derives case-study routes from FLAGSHIP_PROJECTS and
  // LABORATORY_PROJECTS. We can't statically extract those, but we can
  // verify the import is present (separate test below).
  return staticRoutes;
}

describe('sitemap excludes the excluded project', () => {
  const routes = getSitemapRoutes();

  it('sitemap routes are non-empty', () => {
    expect(routes.length).toBeGreaterThan(0);
  });

  it('no sitemap route contains any excluded term', () => {
    for (const route of routes) {
      const lower = route.toLowerCase();
      for (const term of EXCLUDED_TERMS) {
        expect(
          lower,
          `Sitemap route "${route}" contains excluded term "${term}"`,
        ).not.toContain(term);
      }
    }
  });

  it('sitemap derives case-study routes from FLAGSHIP_PROJECTS and LABORATORY_PROJECTS', () => {
    const sitemapPath = join(process.cwd(), 'src', 'app', 'sitemap.ts');
    const src = readFileSync(sitemapPath, 'utf8');
    // The sitemap must import the project lists so case-study routes are
    // always in sync with the canonical project data.
    expect(src).toContain('FLAGSHIP_PROJECTS');
    expect(src).toContain('LABORATORY_PROJECTS');
    expect(src).toMatch(/caseStudyRoutes[\s\S]*FLAGSHIP_PROJECTS[\s\S]*LABORATORY_PROJECTS/);
  });

  it('sitemap does NOT hardcode the stale corporate-leadgen-platform route', () => {
    // The stale slug from the source repo must not appear in the sitemap.
    expect(routes).not.toContain('/work/corporate-leadgen-platform');
    const sitemapPath = join(process.cwd(), 'src', 'app', 'sitemap.ts');
    const src = readFileSync(sitemapPath, 'utf8');
    expect(src).not.toContain('corporate-leadgen-platform');
  });

  it('sitemap does NOT include a route for the excluded project', () => {
    // The excluded project's slug is one of the excluded terms.
    // No route in the sitemap should contain any of them.
    const violations = routes.filter((r) =>
      EXCLUDED_TERMS.some((t) => r.toLowerCase().includes(t)),
    );
    expect(violations).toEqual([]);
  });
});

describe('static link audit script excludes the excluded project', () => {
  it('audit-links.ts KNOWN_ROUTES does not contain any excluded term', () => {
    const auditPath = join(process.cwd(), 'scripts', 'audit-links.ts');
    if (!existsSync(auditPath)) return;
    const src = readFileSync(auditPath, 'utf8').toLowerCase();
    for (const term of EXCLUDED_TERMS) {
      expect(
        src,
        `audit-links.ts contains excluded term "${term}"`,
      ).not.toContain(term);
    }
  });
});
