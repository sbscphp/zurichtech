import { sanityFetch } from "./fetch";
import { siteSettingsQuery } from "./queries";
import {
  mapCtaLinks,
  type CtaLink,
  type SanityCtaLink,
} from "./types";

export type SiteSettingsContent = {
  siteName: string;
  tagline: string;
  navLinks: CtaLink[];
  footerLinks: CtaLink[];
  socialLinks: CtaLink[];
  newsletterTitle: string;
  newsletterDescription: string;
  contactEmail: string;
  contactPhone: string;
  contactAddress: string;
};

export const FALLBACK_SITE_SETTINGS: SiteSettingsContent = {
  siteName: "Zuritech",
  tagline: "Software, data, and cloud engineering for teams that ship.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  footerLinks: [
    { label: "About", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Contact", href: "/contact" },
  ],
  socialLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  newsletterTitle: "Stay in the loop",
  newsletterDescription:
    "Occasional notes on what we are building and what we are learning. No noise.",
  contactEmail: "hello@zuritech.com",
  contactPhone: "+234 000 000 0000",
  contactAddress: "Lagos, Nigeria",
};

type SanitySiteSettings = {
  siteName?: string;
  tagline?: string;
  navLinks?: SanityCtaLink[];
  footerLinks?: SanityCtaLink[];
  socialLinks?: SanityCtaLink[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
};

function mapSiteSettings(doc: SanitySiteSettings | null): SiteSettingsContent {
  if (!doc) return FALLBACK_SITE_SETTINGS;

  return {
    siteName: doc.siteName?.trim() || FALLBACK_SITE_SETTINGS.siteName,
    tagline: doc.tagline?.trim() || FALLBACK_SITE_SETTINGS.tagline,
    navLinks: mapCtaLinks(doc.navLinks, FALLBACK_SITE_SETTINGS.navLinks),
    footerLinks: mapCtaLinks(
      doc.footerLinks,
      FALLBACK_SITE_SETTINGS.footerLinks,
    ),
    socialLinks: mapCtaLinks(
      doc.socialLinks,
      FALLBACK_SITE_SETTINGS.socialLinks,
    ),
    newsletterTitle:
      doc.newsletterTitle?.trim() || FALLBACK_SITE_SETTINGS.newsletterTitle,
    newsletterDescription:
      doc.newsletterDescription?.trim() ||
      FALLBACK_SITE_SETTINGS.newsletterDescription,
    contactEmail:
      doc.contactEmail?.trim() || FALLBACK_SITE_SETTINGS.contactEmail,
    contactPhone:
      doc.contactPhone?.trim() || FALLBACK_SITE_SETTINGS.contactPhone,
    contactAddress:
      doc.contactAddress?.trim() || FALLBACK_SITE_SETTINGS.contactAddress,
  };
}

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  const doc = await sanityFetch<SanitySiteSettings | null>(siteSettingsQuery);
  return mapSiteSettings(doc);
}
