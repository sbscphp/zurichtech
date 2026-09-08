import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import { partnersPageQuery } from "./queries";

export type PartnersPageContent = {
  heroTitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  trustedByLabel: string;
  inquiryTitle: string;
  formNote: string;
  submitLabel: string;
  successMessage: string;
  infoTitle: string;
  infoDescription: string;
};

const FALLBACK_HERO = "/figma/partners/hero.png";

export const FALLBACK_PARTNERS_PAGE: PartnersPageContent = {
  heroTitle: "Let’s build what’s next, together.",
  heroImageUrl: FALLBACK_HERO,
  heroImageAlt: "",
  trustedByLabel: "TRUSTED BY:",
  inquiryTitle: "SELECT A SERVICE",
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

type SanityPartnersPage = {
  heroTitle?: string;
  heroImage?: SanityImageField;
  trustedByLabel?: string;
  inquiryTitle?: string;
  formNote?: string;
  submitLabel?: string;
  successMessage?: string;
  infoTitle?: string;
  infoDescription?: string;
};

function mapPartnersPage(doc: SanityPartnersPage | null): PartnersPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_PARTNERS_PAGE;

  return {
    heroTitle: doc.heroTitle.trim(),
    heroImageUrl:
      getImageUrl(doc.heroImage?.asset, 2000) || FALLBACK_HERO,
    heroImageAlt: doc.heroImage?.alt?.trim() || "",
    trustedByLabel:
      doc.trustedByLabel?.trim() || FALLBACK_PARTNERS_PAGE.trustedByLabel,
    inquiryTitle:
      doc.inquiryTitle?.trim() || FALLBACK_PARTNERS_PAGE.inquiryTitle,
    formNote: doc.formNote?.trim() || FALLBACK_PARTNERS_PAGE.formNote,
    submitLabel:
      doc.submitLabel?.trim() || FALLBACK_PARTNERS_PAGE.submitLabel,
    successMessage:
      doc.successMessage?.trim() || FALLBACK_PARTNERS_PAGE.successMessage,
    infoTitle: doc.infoTitle?.trim() || FALLBACK_PARTNERS_PAGE.infoTitle,
    infoDescription:
      doc.infoDescription?.trim() || FALLBACK_PARTNERS_PAGE.infoDescription,
  };
}

export async function getPartnersPage(): Promise<PartnersPageContent> {
  const doc = await sanityFetch<SanityPartnersPage | null>(partnersPageQuery);
  return mapPartnersPage(doc);
}
