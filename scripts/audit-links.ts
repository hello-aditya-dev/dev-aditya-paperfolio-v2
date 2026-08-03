/**
 * Static broken-link audit.
 *
 * Scans every .tsx/.ts file in src/ for href="/..." references and
 * checks them against the known set of routes the app actually serves.
 *
 * Outputs a report to stdout. Exits non-zero if any broken internal
 * links are found.
 */

import * as fs from "node:fs";
import * as path from "node:path";

const ROOT = "src";
const KNOWN_ROUTES = new Set<string>([
  "/",
  "/work",
  "/work/ibs-infra",
  "/work/device-destination",
  "/work/cloudsun",
  "/work/saffron-steam-experience",
  "/work/aarohan-legal",
  "/work/casa-aurelia",
  "/work/pricepilot",
  "/work/dust-signal",
  "/about",
  "/services",
  "/process",
  "/contact",
  "/mentoring",
  "/resources",
  "/resources/portfolio-checklist",
  "/resources/ai-website-agency",
  "/resources/frontend-qa",
  "/audit",
  "/privacy",
  "/terms",
  "/accessibility",
]);

// Anchor-suffixed routes are also OK (e.g. /services#corporate-website-design)
const ROUTES_WITH_ANCHORS = new Set<string>([
  "/services",
  "/work",
  "/services#corporate-website-design",
  "/services#website-redesign",
  "/services#b2b-landing-pages",
  "/services#frontend-development",
]);

function walk(dir: string): string[] {
  const out: string[] = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...walk(full));
    else if (/\.(tsx?|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const files = walk(ROOT);
const linkRegex = /(?:href|destination|source)\s*[:=]\s*["'`]([^"'`]+)["'`]/g;
const issues: { file: string; link: string; reason: string }[] = [];
let checked = 0;

for (const file of files) {
  const content = fs.readFileSync(file, "utf-8");
  const matches = [...content.matchAll(linkRegex)];
  for (const m of matches) {
    const link = m[1];
    // Skip external, mailto, tel, hash-only, dynamic, and non-route strings
    if (
      !link.startsWith("/") ||
      link.startsWith("/api/") ||
      link.startsWith("/admin/") ||
      link === "/" ||
      link.includes("${") || // template literal
      link.includes(":slug") // dynamic placeholder
    ) {
      continue;
    }

    checked++;

    // Strip hash
    const [path, hash] = link.split("#");
    const queryless = path.split("?")[0];

    // Stale source route — redirected at runtime, OK
    if (queryless === "/services") continue;
    if (queryless === "/work/corporate-leadgen-platform") continue;
    if (queryless === "/work/driftwear-ecommerce") continue;

    // Check if the path (or path#hash) is known
    if (!KNOWN_ROUTES.has(queryless) && !ROUTES_WITH_ANCHORS.has(link)) {
      issues.push({ file, link, reason: `Unknown internal route: ${queryless}` });
    }
  }
}

console.log(`Checked ${checked} internal link references across ${files.length} files.`);
console.log(`Known routes: ${KNOWN_ROUTES.size}.`);

if (issues.length === 0) {
  console.log("✓ No broken internal links found.");
  process.exit(0);
} else {
  console.log(`✗ ${issues.length} broken internal link(s) found:\n`);
  for (const issue of issues) {
    console.log(`  ${issue.file}`);
    console.log(`    ${issue.link}`);
    console.log(`    → ${issue.reason}\n`);
  }
  process.exit(1);
}
