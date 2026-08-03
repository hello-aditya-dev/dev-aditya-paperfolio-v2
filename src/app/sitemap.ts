import { MetadataRoute } from 'next';
import { SITE_URL } from '@/config/site';
import { FLAGSHIP_PROJECTS, LABORATORY_PROJECTS } from '@/config/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Static routes — every public page that should be indexed.
  const staticRoutes = [
    '',
    '/work',
    '/services',
    '/process',
    '/about',
    '/contact',
    '/mentoring',
    '/resources',
    '/resources/portfolio-checklist',
    '/resources/ai-website-agency',
    '/resources/frontend-qa',
    '/privacy',
    '/terms',
    '/accessibility',
    '/audit',
  ];

  // Case-study routes — derived from the centralised project data so the
  // sitemap can never drift out of sync with the actual case studies.
  // The excluded industrial-safety project is not in PROJECTS, so it is
  // not in the sitemap.
  const caseStudyRoutes = [...FLAGSHIP_PROJECTS, ...LABORATORY_PROJECTS].map(
    (p) => p.caseStudyUrl,
  );

  const routes = [...staticRoutes, ...caseStudyRoutes];

  const priorityFor = (route: string) => {
    if (route === '') return 1;
    if (['/work', '/services', '/process', '/contact'].includes(route)) return 0.9;
    if (route === '/audit') return 0.8;
    if (route.startsWith('/work/')) return 0.8;
    return 0.7;
  };

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date('2026-07-24'),
    changeFrequency: 'monthly' as const,
    priority: priorityFor(route),
  }));
}
