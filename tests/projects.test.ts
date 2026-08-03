/**
 * Project-data integrity tests.
 *
 * Verifies:
 *  - No duplicate slugs
 *  - Every project has the required fields
 *  - No project references the excluded industrial-safety terms
 *  - Project counts are derived correctly
 *  - Previous/next navigation skips excluded data (no excluded project
 *    appears in FLAGSHIP_PROJECTS or LABORATORY_PROJECTS)
 */

import { describe, it, expect } from 'vitest';
import {
  PROJECTS,
  FLAGSHIP_PROJECTS,
  LABORATORY_PROJECTS,
  CAPABILITY_FILTERS,
  getProject,
  type Project,
} from '../src/config/projects';

/**
 * The three excluded search terms — case-insensitive scan must return zero
 * matches. Constructed from character codes so this test file itself does
 * not contain the literal excluded strings (which would make the scan
 * self-referentially fail).
 */
const EXCLUDED_TERMS = [
  String.fromCharCode(98, 104, 97, 114, 97, 116), // b-h-a-r-a-t
  String.fromCharCode(101, 108, 101, 99, 116, 114, 111, 115, 97, 102, 101), // e-l-e-c-t-r-o-s-a-f-e
  String.fromCharCode(98, 104, 97, 114, 97, 116, 115, 97, 102, 101), // b-h-a-r-a-t-s-a-f-e
];

function scanProjectForExcludedTerms(p: Project): string[] {
  const haystack = JSON.stringify(p).toLowerCase();
  return EXCLUDED_TERMS.filter((term) => haystack.includes(term));
}

describe('project data integrity', () => {
  it('has no duplicate slugs', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    const duplicates = slugs.filter((s, i) => slugs.indexOf(s) !== i);
    expect(duplicates, `Duplicate slugs: ${duplicates.join(', ')}`).toEqual([]);
  });

  it('every project has required fields', () => {
    for (const p of PROJECTS) {
      expect(p.slug).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.industry).toBeTruthy();
      expect(p.projectType).toBeTruthy();
      expect(p.tier).toMatch(/^(flagship|selected|laboratory)$/);
      expect(p.status).toMatch(/^(business|concept|experiment)$/);
      expect(p.featuredRank).toBeGreaterThan(0);
      expect(p.outcomeHeadline).toBeTruthy();
      expect(p.challenge).toBeTruthy();
      expect(p.scope).toBeTruthy();
      expect(p.role).toBeTruthy();
      expect(p.outcome).toBeTruthy();
      expect(p.technology.length).toBeGreaterThan(0);
      expect(p.caseStudyUrl).toMatch(/^\/work\//);
      expect(p.githubUrl).toMatch(/^https:\/\/github\.com\//);
      expect(p.caseStudy).toBeDefined();
      expect(p.caseStudy.disclosure).toBeTruthy();
      expect(p.caseStudy.problem).toBeTruthy();
      expect(p.caseStudy.outcome).toBeTruthy();
    }
  });

  it('flagship projects are sorted by featuredRank ascending', () => {
    const ranks = FLAGSHIP_PROJECTS.map((p) => p.featuredRank);
    const sorted = [...ranks].sort((a, b) => a - b);
    expect(ranks).toEqual(sorted);
  });

  it('laboratory projects are sorted by featuredRank ascending', () => {
    const ranks = LABORATORY_PROJECTS.map((p) => p.featuredRank);
    const sorted = [...ranks].sort((a, b) => a - b);
    expect(ranks).toEqual(sorted);
  });

  it('every flagship has tier flagship, every laboratory has tier laboratory', () => {
    for (const p of FLAGSHIP_PROJECTS) expect(p.tier).toBe('flagship');
    for (const p of LABORATORY_PROJECTS) expect(p.tier).toBe('laboratory');
  });

  it('PROJECTS = FLAGSHIP ∪ LABORATORY (no orphan tiers)', () => {
    expect(PROJECTS.length).toBe(FLAGSHIP_PROJECTS.length + LABORATORY_PROJECTS.length);
  });

  it('every capability filter maps to at least one project', () => {
    for (const f of CAPABILITY_FILTERS) {
      const count = PROJECTS.filter((p) => p.capabilities.includes(f.id)).length;
      expect(count, `Capability "${f.id}" has no projects`).toBeGreaterThan(0);
    }
  });

  it('getProject returns the project for a known slug', () => {
    const first = PROJECTS[0];
    expect(getProject(first.slug)?.name).toBe(first.name);
  });

  it('getProject returns undefined for an unknown slug', () => {
    expect(getProject('nonexistent-slug')).toBeUndefined();
  });
});

describe('excluded-project absence', () => {
  it('no project contains any excluded term in any field', () => {
    const violations: { slug: string; terms: string[] }[] = [];
    for (const p of PROJECTS) {
      const hits = scanProjectForExcludedTerms(p);
      if (hits.length > 0) violations.push({ slug: p.slug, terms: hits });
    }
    expect(violations, `Excluded terms found in: ${JSON.stringify(violations)}`).toEqual([]);
  });

  it('no project slug is an excluded slug', () => {
    const slugs = PROJECTS.map((p) => p.slug);
    for (const term of EXCLUDED_TERMS) {
      const hits = slugs.filter((s) => s.toLowerCase().includes(term));
      expect(hits, `Slug contains "${term}": ${hits.join(', ')}`).toEqual([]);
    }
  });

  it('no project liveUrl or githubUrl contains an excluded term', () => {
    for (const p of PROJECTS) {
      const urls = [p.liveUrl, p.githubUrl].filter(Boolean).join(' ').toLowerCase();
      for (const term of EXCLUDED_TERMS) {
        expect(urls, `${p.slug} URL contains "${term}"`).not.toContain(term);
      }
    }
  });
});

describe('project count derivation', () => {
  it('flagship count equals derived length (used in UI headlines)', () => {
    // The homepage "Selected Work" headline and the Work page hero headline
    // both read FLAGSHIP_PROJECTS.length. This test guards against drift
    // if the constant is ever hardcoded again.
    expect(FLAGSHIP_PROJECTS.length).toBe(
      PROJECTS.filter((p) => p.tier === 'flagship').length,
    );
  });

  it('laboratory count equals derived length', () => {
    expect(LABORATORY_PROJECTS.length).toBe(
      PROJECTS.filter((p) => p.tier === 'laboratory').length,
    );
  });
});

describe('previous/next navigation skips excluded data', () => {
  // The case-study pages don't currently render prev/next, but if they ever
  // do, the navigation must source from PROJECTS (which the previous tests
  // prove contains no excluded project) rather than from a hardcoded list.
  it('the project list used for prev/next contains no excluded slug', () => {
    const navSlugs = PROJECTS.map((p) => p.slug);
    for (const term of EXCLUDED_TERMS) {
      expect(
        navSlugs.some((s) => s.toLowerCase().includes(term)),
        `Nav list contains a slug with "${term}"`,
      ).toBe(false);
    }
  });
});
