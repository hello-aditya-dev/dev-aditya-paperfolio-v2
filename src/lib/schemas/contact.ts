/**
 * Zod schema for the contact form — shared between client and server.
 *
 * The client uses it for inline validation feedback; the server uses it
 * for authoritative validation before any email is sent.
 *
 * Note: Zod's `.email()`, `.min()`, `.max()` are methods on ZodString.
 * `.transform()` returns a ZodEffects, which loses those methods — so
 * all string-shape validation must happen BEFORE the transform.
 */

import { z } from "zod";

export const PROJECT_TYPES = [
  "Corporate website",
  "Website redesign",
  "B2B landing page",
  "Frontend development",
  "Dashboard or web application",
  "Interactive experience",
  "Other",
] as const;

/** Strip control chars + collapse whitespace + trim, for single-line fields. */
const cleanLine = (s: string) =>
  s.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();

/** Required single-line field. */
const requiredLine = (max: number, message: string) =>
  z
    .string()
    .min(1, message)
    .max(max)
    .transform(cleanLine)
    .refine((v) => v.length >= 1, message);

/** Optional single-line field. */
const optionalLine = (max: number) =>
  z
    .string()
    .max(max)
    .optional()
    .default("")
    .transform(cleanLine);

export const contactSchema = z.object({
  name: requiredLine(200, "Name is required."),
  email: z
    .string()
    .min(1, "Work email is required.")
    .email("Please enter a valid email.")
    .max(254)
    .transform(cleanLine),
  company: optionalLine(200),
  website: optionalLine(300),
  projectType: optionalLine(100),
  scope: optionalLine(200),
  timing: optionalLine(200),
  details: z
    .string()
    .min(1, "A short description of the project is required.")
    .max(2000, "Please keep the description under 2000 characters.")
    .transform((s) =>
      s
        .split("\r\n")
        .join("\n")
        .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
        .trim(),
    ),
  _honey: z.string().optional().default(""),
  consent: z.boolean().refine((v) => v === true, "Please accept the consent."),
});

export type ContactFormData = z.infer<typeof contactSchema>;
