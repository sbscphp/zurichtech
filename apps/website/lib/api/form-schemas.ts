import { z } from "zod";

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your full name.")
  .max(120, "Full name is too long.");

// Common TLDs so typos like "gmail.con" or "yahoo.cmo" are caught up front,
// since format-only email validation treats them as structurally valid.
const COMMON_TLDS = new Set([
  "com", "net", "org", "edu", "gov", "mil", "int", "co", "io", "ai",
  "app", "dev", "info", "biz", "name", "me", "tv", "xyz", "online",
  "site", "tech", "store", "shop", "cloud", "ng", "us", "uk", "ca",
  "au", "de", "fr", "es", "it", "nl", "se", "no", "dk", "fi", "pl",
  "ru", "cn", "jp", "kr", "in", "br", "mx", "za", "ke", "gh", "eg",
]);

// A valid TLD alone doesn't catch a misspelled real provider (e.g.
// "gnail.com"), since "gnail.com" could theoretically be a real domain.
// We flag it only when it's a near-miss (1-2 edits) of a well-known
// provider, which is almost always a typo rather than an intentional one.
const KNOWN_EMAIL_DOMAINS = [
  "gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "icloud.com",
  "live.com", "aol.com", "protonmail.com", "zoho.com", "mail.com",
  "yandex.com", "gmx.com",
];

// Domains that are valid but happen to sit within edit-distance of a
// KNOWN_EMAIL_DOMAINS entry (e.g. "yopmail.com" vs "hotmail.com"), so the
// typo heuristic below must never flag them.
const TYPO_CHECK_EXEMPT_DOMAINS = new Set(["yopmail.com"]);

function levenshteinDistance(a: string, b: string): number {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const distances = Array.from({ length: rows }, (_, i) =>
    Array.from({ length: cols }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  );

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      distances[i][j] = Math.min(
        distances[i - 1][j] + 1,
        distances[i][j - 1] + 1,
        distances[i - 1][j - 1] + cost,
      );
    }
  }

  return distances[rows - 1][cols - 1];
}

function findLikelyDomainTypo(domain: string): string | null {
  if (TYPO_CHECK_EXEMPT_DOMAINS.has(domain)) return null;
  for (const known of KNOWN_EMAIL_DOMAINS) {
    if (domain === known) return null;
    const distance = levenshteinDistance(domain, known);
    const maxAllowedDistance = known.length > 8 ? 2 : 1;
    if (distance > 0 && distance <= maxAllowedDistance) {
      return known;
    }
  }
  return null;
}

const emailSchema = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .max(255, "Email address is too long.")
  .pipe(z.email("Please enter a valid email address."))
  .superRefine((value, ctx) => {
    const domain = value.split("@").at(-1)?.toLowerCase();
    if (!domain) return;

    const labels = domain.split(".");
    const tld = labels.at(-1);
    if (!tld || !COMMON_TLDS.has(tld)) {
      ctx.addIssue({
        code: "custom",
        message: "Please double-check your email address.",
      });
      return;
    }

    // Catches a doubled TLD like "yopmail.com.com" or "gmail.co.co", which
    // is structurally valid and passes the TLD check above but is always a
    // typo (e.g. from a browser autofill or copy-paste mistake).
    const secondToLast = labels.at(-2);
    if (labels.length > 2 && secondToLast === tld) {
      ctx.addIssue({
        code: "custom",
        message: "Please double-check your email address.",
      });
      return;
    }

    const suggestion = findLikelyDomainTypo(domain);
    if (suggestion) {
      const localPart = value.split("@")[0];
      ctx.addIssue({
        code: "custom",
        message: `Did you mean ${localPart}@${suggestion}?`,
      });
    }
  });

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Please enter a valid phone number.")
  .max(20, "Phone number is too long.")
  .regex(
    /^\+[1-9]\d{6,14}$/,
    "Please enter a valid phone number with country code.",
  );

const organisationSchema = z
  .string()
  .trim()
  .min(2, "Please enter your organisation.")
  .max(160, "Organisation name is too long.");

export const MESSAGE_MAX_LENGTH = 300;

const messageSchema = z
  .string()
  .trim()
  .min(10, "Please share a little more detail (at least 10 characters).")
  .max(
    MESSAGE_MAX_LENGTH,
    `Message must be ${MESSAGE_MAX_LENGTH} characters or fewer.`,
  );

export const contactFormSchema = z.object({
  full_name: nameSchema,
  email: emailSchema,
  phone_number: phoneSchema,
  organisation: organisationSchema,
  message: messageSchema,
});

export const partnerFormSchema = contactFormSchema.extend({
  service_of_interest: z
    .string()
    .trim()
    .min(1, "Please select a service of interest."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
export type PartnerFormValues = z.infer<typeof partnerFormSchema>;

export function emptyContactForm(): ContactFormValues {
  return {
    full_name: "",
    email: "",
    phone_number: "",
    organisation: "",
    message: "",
  };
}

export function emptyPartnerForm(
  serviceOfInterest = "",
): PartnerFormValues {
  return {
    ...emptyContactForm(),
    service_of_interest: serviceOfInterest,
  };
}

export function zodIssuesToFieldErrors(
  error: z.ZodError,
): Record<string, string> {
  const result: Record<string, string> = {};
  for (const issue of error.issues) {
    const key = issue.path[0];
    if (typeof key === "string" && !result[key]) {
      result[key] = issue.message;
    }
  }
  return result;
}
