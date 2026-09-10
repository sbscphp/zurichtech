import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import { siteSettingsQuery } from "./queries";
import {
  mapCtaLink,
  mapCtaLinks,
  mapStrings,
  type CtaLink,
  type SanityCtaLink,
} from "./types";
import { resolveFooterServiceHref } from "@/lib/site/service-sections";

export type SiteSettingsContent = {
  siteName: string;
  tagline: string;
  navLinks: CtaLink[];
  headerCta: CtaLink;
  footerServicesTitle: string;
  footerServiceLinks: CtaLink[];
  footerCompanyTitle: string;
  footerCompanyLinks: CtaLink[];
  footerContactTitle: string;
  copyrightText: string;
  creditText: string;
  socialLinks: CtaLink[];
  newsletterTitle: string;
  newsletterDescription: string;
  ctaTitlePrefix: string;
  ctaTitleHighlight: string;
  ctaDescription: string;
  ctaButton: CtaLink;
  ctaPatternUrl: string;
  contactEmails: string[];
  contactPhones: string[];
  contactAddress: string;
  /** @deprecated Prefer contactEmails[0] */
  contactEmail: string;
  /** @deprecated Prefer contactPhones[0] */
  contactPhone: string;
};

const FALLBACK_CTA_PATTERN = "/figma/shared/cta-pattern.png";

export const FALLBACK_SITE_SETTINGS: SiteSettingsContent = {
  siteName: "ZurichTech",
  tagline:
    "Engineering the systems your business runs on. Software, cloud and security engineering for organisations that cannot afford to get it wrong.",
  navLinks: [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Blogs", href: "/blogs" },
    { label: "Why Choose Us", href: "/why-choose-us" },
  ],
  headerCta: { label: "Contact Us", href: "/contact" },
  footerServicesTitle: "services",
  footerServiceLinks: [
    { label: "Software Development", href: "/services#software-development" },
    { label: "Web Development", href: "/services#web-development" },
    {
      label: "Cloud Solution & DevOps",
      href: "/services#cloud-solutions-and-devops",
    },
    {
      label: "Cybersecurity & IT audit",
      href: "/services#cybersecurity-and-id-audit",
    },
    { label: "IT Consulting", href: "/services#it-consulting-and-advisory" },
  ],
  footerCompanyTitle: "Company",
  footerCompanyLinks: [
    { label: "About Us", href: "/about" },
    { label: "Services", href: "/services" },
    { label: "Insights", href: "/blogs" },
    { label: "Contact Us", href: "/contact" },
    { label: "Policy and Legal", href: "/legal" },
  ],
  footerContactTitle: "Contact Us",
  copyrightText: "© 2026 ZurichTech. All Rights Reserved.",
  creditText: "Designed and Developed by SSBC UK, 2026",
  socialLinks: [
    { label: "LinkedIn", href: "#" },
    { label: "X", href: "#" },
    { label: "GitHub", href: "#" },
  ],
  newsletterTitle: "Stay in the loop",
  newsletterDescription:
    "Occasional notes on what we are building and what we are learning. No noise.",
  ctaTitlePrefix: "Powering Opportunities. ",
  ctaTitleHighlight: "Building the Future.",
  ctaDescription:
    "Unlock sustainable opportunities, develop transformative energy solutions, and create lasting value for the future.",
  ctaButton: { label: "Work With Us", href: "/partners" },
  ctaPatternUrl: FALLBACK_CTA_PATTERN,
  contactEmails: [
    "info@zurichtechnologies.com.ng",
    "princesanni@zurichtechnologies.com.ng",
  ],
  contactPhones: ["+234 802 863 3332"],
  contactAddress:
    "No. 7 Rhine Street, Off Ibrahim Babangida Boulevard, Ministers Hill, Maitama, Abuja",
  contactEmail: "info@zurichtechnologies.com.ng",
  contactPhone: "+234 802 863 3332",
};

type SanityImageField = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanitySiteSettings = {
  siteName?: string;
  tagline?: string;
  navLinks?: SanityCtaLink[];
  headerCta?: SanityCtaLink;
  footerServicesTitle?: string;
  footerServiceLinks?: SanityCtaLink[];
  footerCompanyTitle?: string;
  footerCompanyLinks?: SanityCtaLink[];
  footerContactTitle?: string;
  copyrightText?: string;
  creditText?: string;
  footerLinks?: SanityCtaLink[];
  socialLinks?: SanityCtaLink[];
  newsletterTitle?: string;
  newsletterDescription?: string;
  ctaTitlePrefix?: string;
  ctaTitleHighlight?: string;
  ctaDescription?: string;
  ctaButton?: SanityCtaLink;
  ctaPattern?: SanityImageField;
  contactEmails?: string[];
  contactPhones?: string[];
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
};

function mapContactList(
  values: string[] | undefined,
  legacy: string | undefined,
  fallback: string[],
) {
  const fromArray = mapStrings(values, []);
  if (fromArray.length > 0) return fromArray;
  const fromLegacy = legacy?.trim();
  if (fromLegacy) return [fromLegacy];
  return fallback;
}

function mapSiteSettings(doc: SanitySiteSettings | null): SiteSettingsContent {
  if (!doc) return FALLBACK_SITE_SETTINGS;

  const contactEmails = mapContactList(
    doc.contactEmails,
    doc.contactEmail,
    FALLBACK_SITE_SETTINGS.contactEmails,
  );
  const contactPhones = mapContactList(
    doc.contactPhones,
    doc.contactPhone,
    FALLBACK_SITE_SETTINGS.contactPhones,
  );

  const legacyFooterLinks = mapCtaLinks(doc.footerLinks, []);

  return {
    siteName: doc.siteName?.trim() || FALLBACK_SITE_SETTINGS.siteName,
    tagline: doc.tagline?.trim() || FALLBACK_SITE_SETTINGS.tagline,
    navLinks: mapCtaLinks(doc.navLinks, FALLBACK_SITE_SETTINGS.navLinks),
    headerCta: mapCtaLink(doc.headerCta, FALLBACK_SITE_SETTINGS.headerCta),
    footerServicesTitle:
      doc.footerServicesTitle?.trim() ||
      FALLBACK_SITE_SETTINGS.footerServicesTitle,
    footerServiceLinks: mapCtaLinks(
      doc.footerServiceLinks,
      FALLBACK_SITE_SETTINGS.footerServiceLinks,
    ).map((link) => ({
      ...link,
      href: resolveFooterServiceHref(link.label, link.href),
    })),
    footerCompanyTitle:
      doc.footerCompanyTitle?.trim() ||
      FALLBACK_SITE_SETTINGS.footerCompanyTitle,
    footerCompanyLinks: mapCtaLinks(
      doc.footerCompanyLinks,
      legacyFooterLinks.length > 0
        ? legacyFooterLinks
        : FALLBACK_SITE_SETTINGS.footerCompanyLinks,
    ),
    footerContactTitle:
      doc.footerContactTitle?.trim() ||
      FALLBACK_SITE_SETTINGS.footerContactTitle,
    copyrightText:
      doc.copyrightText?.trim() || FALLBACK_SITE_SETTINGS.copyrightText,
    creditText: doc.creditText?.trim() || FALLBACK_SITE_SETTINGS.creditText,
    socialLinks: mapCtaLinks(
      doc.socialLinks,
      FALLBACK_SITE_SETTINGS.socialLinks,
    ),
    newsletterTitle:
      doc.newsletterTitle?.trim() || FALLBACK_SITE_SETTINGS.newsletterTitle,
    newsletterDescription:
      doc.newsletterDescription?.trim() ||
      FALLBACK_SITE_SETTINGS.newsletterDescription,
    ctaTitlePrefix:
      doc.ctaTitlePrefix?.trim() || FALLBACK_SITE_SETTINGS.ctaTitlePrefix,
    ctaTitleHighlight:
      doc.ctaTitleHighlight?.trim() ||
      FALLBACK_SITE_SETTINGS.ctaTitleHighlight,
    ctaDescription:
      doc.ctaDescription?.trim() || FALLBACK_SITE_SETTINGS.ctaDescription,
    ctaButton: mapCtaLink(doc.ctaButton, FALLBACK_SITE_SETTINGS.ctaButton),
    ctaPatternUrl:
      getImageUrl(doc.ctaPattern?.asset, 1600) || FALLBACK_CTA_PATTERN,
    contactEmails,
    contactPhones,
    contactAddress:
      doc.contactAddress?.trim() || FALLBACK_SITE_SETTINGS.contactAddress,
    contactEmail: contactEmails[0] || FALLBACK_SITE_SETTINGS.contactEmail,
    contactPhone: contactPhones[0] || FALLBACK_SITE_SETTINGS.contactPhone,
  };
}

export async function getSiteSettings(): Promise<SiteSettingsContent> {
  const doc = await sanityFetch<SanitySiteSettings | null>(siteSettingsQuery);
  return mapSiteSettings(doc);
}
