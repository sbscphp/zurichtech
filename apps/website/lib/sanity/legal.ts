import type { SanityImageSource } from "@sanity/image-url";

import {
  POLICIES,
  POLICY_TABS,
  type PolicyDoc,
  type PolicyId,
} from "@/lib/site/legal";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import { legalPageQuery } from "./queries";
import { mapStrings } from "./types";

export type PolicySection = {
  title: string;
  paragraphs: string[];
  bullets: string[];
  after: string[];
};

export type PolicyContent = {
  id: string;
  tabLabel: string;
  heading: string;
  updated: string;
  intro: string;
  sections: PolicySection[];
};

export type LegalPageContent = {
  heroTitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  defaultPolicyId: string;
  policies: PolicyContent[];
};

const FALLBACK_HERO = "/figma/legal/banner.png";

function fallbackPolicy(id: PolicyId, tabLabel: string): PolicyContent {
  const doc: PolicyDoc = POLICIES[id];
  return {
    id,
    tabLabel,
    heading: doc.heading,
    updated: doc.updated,
    intro: doc.intro,
    sections: doc.sections.map((section) => ({
      title: section.title,
      paragraphs: section.paragraphs ?? [],
      bullets: section.bullets ?? [],
      after: section.after ?? [],
    })),
  };
}

export const FALLBACK_LEGAL_PAGE: LegalPageContent = {
  heroTitle: "Policy and Legals",
  heroImageUrl: FALLBACK_HERO,
  heroImageAlt: "",
  defaultPolicyId: "privacy",
  policies: POLICY_TABS.map((tab) => fallbackPolicy(tab.id, tab.label)),
};

type SanityImageField = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityPolicySection = {
  title?: string;
  paragraphs?: string[];
  bullets?: string[];
  after?: string[];
};

type SanityPolicy = {
  id?: string;
  tabLabel?: string;
  heading?: string;
  updated?: string;
  intro?: string;
  sections?: SanityPolicySection[];
};

type SanityLegalPage = {
  heroTitle?: string;
  heroImage?: SanityImageField;
  defaultPolicyId?: string;
  policies?: SanityPolicy[];
};

function mapPolicy(policy: SanityPolicy): PolicyContent | null {
  const id = policy.id?.trim();
  const tabLabel = policy.tabLabel?.trim();
  const heading = policy.heading?.trim();
  const intro = policy.intro?.trim();
  if (!id || !tabLabel || !heading || !intro) return null;

  const sections =
    policy.sections
      ?.map((section) => {
        const title = section.title?.trim();
        if (!title) return null;
        return {
          title,
          paragraphs: mapStrings(section.paragraphs, []),
          bullets: mapStrings(section.bullets, []),
          after: mapStrings(section.after, []),
        };
      })
      .filter((section): section is PolicySection => section !== null) ?? [];

  return {
    id,
    tabLabel,
    heading,
    updated: policy.updated?.trim() || "",
    intro,
    sections,
  };
}

function mapLegalPage(doc: SanityLegalPage | null): LegalPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_LEGAL_PAGE;

  const policies =
    doc.policies
      ?.map(mapPolicy)
      .filter((policy): policy is PolicyContent => policy !== null) ?? [];

  if (policies.length === 0) return FALLBACK_LEGAL_PAGE;

  const defaultPolicyId =
    doc.defaultPolicyId?.trim() &&
    policies.some((policy) => policy.id === doc.defaultPolicyId?.trim())
      ? doc.defaultPolicyId.trim()
      : policies[0].id;

  return {
    heroTitle: doc.heroTitle.trim(),
    heroImageUrl:
      getImageUrl(doc.heroImage?.asset, 2000) || FALLBACK_HERO,
    heroImageAlt: doc.heroImage?.alt?.trim() || "",
    defaultPolicyId,
    policies,
  };
}

export async function getLegalPage(): Promise<LegalPageContent> {
  const doc = await sanityFetch<SanityLegalPage | null>(legalPageQuery);
  return mapLegalPage(doc);
}
