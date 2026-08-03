/**
 * Resource articles — hub page and individual resources.
 *
 * Source: src/app/resources/* in the original repository.
 * Reading-time estimates are computed from the actual content length
 * (word count / 200 wpm), not fabricated.
 */

export interface ResourceArticle {
  slug: string;
  category: string;
  title: string;
  description: string;
  /** ISO date string — only set when a real publication date exists. */
  publishedDate?: string;
  /** Body content as an array of sections. */
  sections: ResourceSection[];
}

export type ResourceSection =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "callout"; text: string };

/** Compute an honest reading-time estimate from the article's word count. */
export function estimateReadingTime(article: ResourceArticle): number {
  const words = article.sections.reduce((sum, s) => {
    if (s.type === "paragraph" || s.type === "callout") return sum + s.text.split(/\s+/).length;
    if (s.type === "heading") return sum + s.text.split(/\s+/).length;
    if (s.type === "list") return sum + s.items.join(" ").split(/\s+/).length;
    return sum;
  }, 0);
  return Math.max(1, Math.round(words / 200));
}

export const RESOURCES: ResourceArticle[] = [
  {
    slug: "portfolio-checklist",
    category: "Checklist",
    title: "Portfolio Website Checklist",
    description:
      "A practical checklist for making a portfolio look credible, fast, and client-ready.",
    sections: [
      {
        type: "paragraph",
        text: "A practical checklist for making a portfolio look credible, fast, and client-ready. Go through each item before launching.",
      },
      {
        type: "list",
        items: [
          "Clean, readable URL and custom domain",
          "Fast load time (under 3 seconds on 4G)",
          "Mobile-responsive layout",
          "Clear hero with your name, role, and one-line value proposition",
          "At least 3 real projects with live links",
          "Project pages with problem, solution, and outcome",
          "Tech stack listed honestly",
          "Contact form or clear contact information",
          "Consistent design system (colors, fonts, spacing)",
          "Smooth, intentional animations",
          "Good contrast and readable text",
          "Proper meta titles and descriptions",
          "No broken links",
          "Accessibility basics (alt text, semantic HTML, keyboard navigation)",
        ],
      },
    ],
  },
  {
    slug: "ai-website-agency",
    category: "Notes",
    title: "AI Website Agency Starter Notes",
    description:
      "Notes on packaging websites, AI chatbots, lead capture, and automation for small businesses.",
    sections: [
      {
        type: "paragraph",
        text: "These are starter notes for anyone thinking about packaging websites, AI chatbots, lead capture, and automation as a service for small businesses. They are not a complete playbook — they are the questions and decisions that come up first.",
      },
      { type: "heading", text: "What a small business actually buys" },
      {
        type: "paragraph",
        text: "Small businesses do not buy 'a website' or 'an AI chatbot'. They buy a way to stop losing enquiries, a way to look credible enough that a prospect will email, and a way to spend less time answering the same five questions. Frame the offer around those outcomes, not around the technology.",
      },
      { type: "heading", text: "What to package" },
      {
        type: "list",
        items: [
          "A fast, focused website (5–10 pages, not 30)",
          "An enquiry form that routes to the owner's email and a CRM",
          "A simple AI chatbot trained on the business's own content",
          "Basic automations: enquiry → CRM → reply → follow-up",
          "A monthly maintenance retainer (hosting, content edits, monitoring)",
        ],
      },
      { type: "heading", text: "What to avoid" },
      {
        type: "list",
        items: [
          "Selling 'AI' as the headline — sell the saved hours",
          "Custom dashboards the owner will never log into",
          "Lock-in contracts longer than 3 months for a small business",
          "Promising SEO results you cannot measure",
        ],
      },
      {
        type: "callout",
        text: "The honest version of this offer is: a website that does not embarrass the business, an enquiry flow that does not lose leads, and an automation layer that saves the owner an hour a day. That is the package.",
      },
    ],
  },
  {
    slug: "frontend-qa",
    category: "Checklist",
    title: "Frontend Project QA Checklist",
    description:
      "Responsive, accessibility, SEO, performance, and deployment checks before shipping.",
    sections: [
      {
        type: "paragraph",
        text: "Run through this list before every frontend launch. It is not exhaustive — it is the short list of checks that catch the most common shipping problems.",
      },
      { type: "heading", text: "Responsive" },
      {
        type: "list",
        items: [
          "Test at 360, 768, 1024, 1280 and 1920 widths",
          "No horizontal scroll at any width",
          "Tap targets are at least 44×44px",
          "Text is readable without zooming on mobile",
          "Images do not overflow their containers",
        ],
      },
      { type: "heading", text: "Accessibility" },
      {
        type: "list",
        items: [
          "Logical heading hierarchy (one h1, then h2s, then h3s)",
          "Every image has alt text or empty alt if decorative",
          "Colour contrast meets WCAG AA",
          "Keyboard-only navigation works for every interactive element",
          "Focus is visible on every interactive element",
          "Forms have explicit labels and error messages",
        ],
      },
      { type: "heading", text: "SEO" },
      {
        type: "list",
        items: [
          "Unique title and meta description on every page",
          "Canonical URL set",
          "Open Graph and Twitter card images render correctly",
          "Sitemap.xml is reachable and accurate",
          "Robots.txt does not block important routes",
          "Structured data validates in Rich Results Test",
        ],
      },
      { type: "heading", text: "Performance" },
      {
        type: "list",
        items: [
          "Largest Contentful Paint under 2.5s on mobile",
          "No layout shift above the fold",
          "Images are correctly sized and lazy-loaded below the fold",
          "Fonts are preloaded and subset",
          "JavaScript bundle is reasonable for the page's complexity",
        ],
      },
      { type: "heading", text: "Deployment" },
      {
        type: "list",
        items: [
          "Environment variables set on the hosting platform",
          "No secrets in the client bundle",
          "Redirects configured for any renamed routes",
          "Custom domain resolves correctly",
          "HTTPS certificate is valid",
          "Error monitoring is in place (at minimum, server logs)",
        ],
      },
    ],
  },
];

export function getResource(slug: string): ResourceArticle | undefined {
  return RESOURCES.find((r) => r.slug === slug);
}
