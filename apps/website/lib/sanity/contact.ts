import { sanityFetch } from "./fetch";
import { contactPageQuery } from "./queries";

export type ContactPageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  formTitle: string;
  formDescription: string;
  successMessage: string;
};

export const FALLBACK_CONTACT_PAGE: ContactPageContent = {
  heroEyebrow: "Contact",
  heroTitle: "Tell us what you are building.",
  heroDescription:
    "Send us a short brief and we will reply within two working days with next steps — or with an honest no if we are not the right fit.",
  formTitle: "Send a message",
  formDescription:
    "The more context you give us, the more useful our first reply will be.",
  successMessage: "Thanks — your message is in. We will be in touch shortly.",
};

type SanityContactPage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  formTitle?: string;
  formDescription?: string;
  successMessage?: string;
};

function mapContactPage(doc: SanityContactPage | null): ContactPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_CONTACT_PAGE;

  return {
    heroEyebrow: doc.heroEyebrow?.trim() || FALLBACK_CONTACT_PAGE.heroEyebrow,
    heroTitle: doc.heroTitle.trim(),
    heroDescription:
      doc.heroDescription?.trim() || FALLBACK_CONTACT_PAGE.heroDescription,
    formTitle: doc.formTitle?.trim() || FALLBACK_CONTACT_PAGE.formTitle,
    formDescription:
      doc.formDescription?.trim() || FALLBACK_CONTACT_PAGE.formDescription,
    successMessage:
      doc.successMessage?.trim() || FALLBACK_CONTACT_PAGE.successMessage,
  };
}

export async function getContactPage(): Promise<ContactPageContent> {
  const doc = await sanityFetch<SanityContactPage | null>(contactPageQuery);
  return mapContactPage(doc);
}
