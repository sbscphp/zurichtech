import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import { contactPageQuery } from "./queries";

export type ContactPageContent = {
  heroTitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  formNote: string;
  submitLabel: string;
  successMessage: string;
  infoTitle: string;
  infoDescription: string;
};

const FALLBACK_HERO = "/figma/contact/hero.png";

export const FALLBACK_CONTACT_PAGE: ContactPageContent = {
  heroTitle: "Share your ideas with us, and together we can build it.",
  heroImageUrl: FALLBACK_HERO,
  heroImageAlt: "",
  formNote: "Your opinion matters to us...",
  submitLabel: "Send enquiry",
  successMessage: "Thanks — your message is in. We will be in touch shortly.",
  infoTitle: "Contact Information",
  infoDescription: "Reach out to us with ease.",
};

type SanityImageField = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityContactPage = {
  heroTitle?: string;
  heroImage?: SanityImageField;
  formNote?: string;
  submitLabel?: string;
  successMessage?: string;
  infoTitle?: string;
  infoDescription?: string;
};

function mapContactPage(doc: SanityContactPage | null): ContactPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_CONTACT_PAGE;

  const heroImageUrl =
    getImageUrl(doc.heroImage?.asset, 2000) || FALLBACK_HERO;

  return {
    heroTitle: doc.heroTitle.trim(),
    heroImageUrl,
    heroImageAlt: doc.heroImage?.alt?.trim() || "",
    formNote: doc.formNote?.trim() || FALLBACK_CONTACT_PAGE.formNote,
    submitLabel: doc.submitLabel?.trim() || FALLBACK_CONTACT_PAGE.submitLabel,
    successMessage:
      doc.successMessage?.trim() || FALLBACK_CONTACT_PAGE.successMessage,
    infoTitle: doc.infoTitle?.trim() || FALLBACK_CONTACT_PAGE.infoTitle,
    infoDescription:
      doc.infoDescription?.trim() || FALLBACK_CONTACT_PAGE.infoDescription,
  };
}

export async function getContactPage(): Promise<ContactPageContent> {
  const doc = await sanityFetch<SanityContactPage | null>(contactPageQuery);
  return mapContactPage(doc);
}
