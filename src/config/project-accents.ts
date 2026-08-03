/**
 * Per-project accent panel colour.
 *
 * The source `projects.ts` file is preserved verbatim from the original
 * repository. Accent colours are kept in this side-table so the source
 * data remains untouched, while still letting us render project-specific
 * accent panels on cards and case studies.
 */

import type { Project } from "@/config/projects";

export type Accent = "coral" | "blue" | "yellow" | "violet";

const ACCENTS: Partial<Record<Project["slug"], Accent>> = {
  "ibs-infra": "coral",
  "device-destination": "yellow",
  cloudsun: "violet",
  "saffron-steam-experience": "coral",
  "aarohan-legal": "blue",
  "casa-aurelia": "yellow",
  pricepilot: "violet",
  "dust-signal": "coral",
  // Stale slug from the source repo — never rendered, included for exhaustiveness.
  "corporate-leadgen-platform": "blue",
};

export function projectAccent(slug: string): Accent {
  return ACCENTS[slug as keyof typeof ACCENTS] ?? "coral";
}

export const ACCENT_HEX: Record<Accent, string> = {
  coral: "#FF4A60",
  blue: "#1C92FF",
  yellow: "#FFC431",
  violet: "#5C42FB",
};
