import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Deferred audit pipeline + admin dashboard — not part of the live
    // public site. Kept for forward compatibility with the source repo's
    // audit funnel (PageSpeed, Drizzle, Turnstile, admin auth). These
    // files have pre-existing lint errors in the source repo that are
    // out of scope for this redesign. See docs/qa-report.md §12.
    "src/app/admin/**",
    "src/app/audit/**",
    "src/app/api/audits/**",
    "src/app/api/admin/**",
    "src/lib/audit/**",
    "src/lib/admin/**",
    "src/components/audit/**",
    "src/emails/**",
    "src/db/**",
    "drizzle/**",
    "scripts/check-database.ts",
    "scripts/hash-admin-password.mjs",
  ]),
]);

export default eslintConfig;
