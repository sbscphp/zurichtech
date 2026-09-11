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

const emailSchema = z
  .string()
  .trim()
  .min(1, "Please enter your email address.")
  .max(255, "Email address is too long.")
  .pipe(z.email("Please enter a valid email address."))
  .refine(
    (value) => {
      const tld = value.split("@").at(-1)?.split(".").at(-1)?.toLowerCase();
      return Boolean(tld && COMMON_TLDS.has(tld));
    },
    { message: "Please double-check your email address." },
  );

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

const messageSchema = z
  .string()
  .trim()
  .min(10, "Please share a little more detail (at least 10 characters).")
  .max(5000, "Message is too long.");

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
