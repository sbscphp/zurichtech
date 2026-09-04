import type { SanityImageSource } from "@sanity/image-url";

import {
  CLIENT_LOGOS,
  INSIGHTS,
  TEAM,
} from "@/lib/site/content";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import { homePageQuery } from "./queries";
import { mapCtaLink, type CtaLink, type SanityCtaLink } from "./types";

export const FALLBACK_HERO_IMAGE = "/figma/home/hero-image.png";
export const FALLBACK_WHY_IMAGE = "/figma/home/why-choose-us.png";

export type ClientLogo = {
  name: string;
  logoSrc: string;
};

export type Stat = {
  value: string;
  label: string;
};

export type WhyPoint = {
  number: string;
  title: string;
  body: string;
};

export type InsightCard = {
  category: string;
  title: string;
  excerpt: string;
  imageSrc: string;
  href: string;
};

export type HomeTeamMember = {
  name: string;
  role: string;
  imageSrc: string;
  objectPosition?: string;
  raised?: boolean;
};

export type HomePageContent = {
  heroTitleLine1: string;
  heroTitleLine2: string;
  heroTitleHighlight: string;
  heroDescription: string;
  heroPrimaryCta: CtaLink;
  heroSecondaryCta: CtaLink;
  heroImageUrl: string;
  heroImageAlt: string;
  clientLogos: ClientLogo[];
  statsTitle: string;
  statsDescription: string;
  stats: Stat[];
  whyEyebrow: string;
  whyTitlePrefix: string;
  whyTitleHighlight: string;
  whyImageUrl: string;
  whyImageAlt: string;
  whyPoints: WhyPoint[];
  whyCta: CtaLink;
  servicesTitle: string;
  servicesCta: CtaLink;
  insightsTitle: string;
  insightsCta: CtaLink;
  insights: InsightCard[];
  teamEyebrow: string;
  teamTitle: string;
  homeTeam: HomeTeamMember[];
};

const FALLBACK_WHY_POINTS: WhyPoint[] = [
  {
    number: "01",
    title: "Business-focused technology",
    body: "We understand your challenges first, then create solutions that support meaningful business outcomes and drive sustainable growth.",
  },
  {
    number: "02",
    title: "Expertise across the technology stack",
    body: "We provide expertise across software, cloud, DevOps, cybersecurity, and IT audit to solve complex challenges.",
  },
  {
    number: "03",
    title: "Built for sustainable growth",
    body: "We create reliable, scalable technology solutions that help businesses improve operations today while building a stronger foundation for tomorrow.",
  },
];

const FALLBACK_STATS: Stat[] = [
  { value: "120+", label: "Project Delivered" },
  { value: "98%", label: "On-time delivery" },
  { value: "10+", label: "Engineering Experience" },
];

export const FALLBACK_HOME_PAGE: HomePageContent = {
  heroTitleLine1: "Engineering the systems",
  heroTitleLine2: "your ",
  heroTitleHighlight: "business actually runs on.",
  heroDescription:
    "We design, build and secure software, cloud platforms and digital products with senior engineers, written commitments and delivery dates that hold",
  heroPrimaryCta: { label: "Learn more", href: "/about" },
  heroSecondaryCta: { label: "Our services", href: "/services" },
  heroImageUrl: FALLBACK_HERO_IMAGE,
  heroImageAlt: "",
  clientLogos: CLIENT_LOGOS.map((logo) => ({
    name: logo.name,
    logoSrc: logo.src,
  })),
  statsTitle:
    "The gap between business ambition and technology execution shouldn't hold you back.",
  statsDescription:
    "Businesses need technology that does more than simply keep up. From complex systems and evolving infrastructure to growing security demands, the right technology partner helps turn challenges into opportunities for sustainable growth.",
  stats: FALLBACK_STATS,
  whyEyebrow: "why Choose Us?",
  whyTitlePrefix: "Technology expertise built around what your ",
  whyTitleHighlight: "business needs next.",
  whyImageUrl: FALLBACK_WHY_IMAGE,
  whyImageAlt: "ZurichTech team in the office",
  whyPoints: FALLBACK_WHY_POINTS,
  whyCta: { label: "Learn more", href: "/about" },
  servicesTitle: "Technology solutions built to move your business forward.",
  servicesCta: { label: "Get in Touch", href: "/contact" },
  insightsTitle: "Ideas, insights and technology shaping what's next.",
  insightsCta: { label: "Learn More", href: "/blogs" },
  insights: INSIGHTS.map((insight) => ({
    category: insight.category,
    title: insight.title,
    excerpt: insight.excerpt,
    imageSrc: insight.image,
    href: insight.href,
  })),
  teamEyebrow: "Our team",
  teamTitle: "ZurichTech Professionals",
  homeTeam: TEAM.map((member) => ({
    name: member.name,
    role: member.role,
    imageSrc: member.image,
    objectPosition: member.offset,
    raised: member.raised,
  })),
};

type SanityClientLogo = { name?: string; logoSrc?: string };
type SanityStat = { value?: string; label?: string };
type SanityWhyPoint = { number?: string; title?: string; body?: string };
type SanityInsightCard = {
  category?: string;
  title?: string;
  excerpt?: string;
  imageSrc?: string;
  href?: string;
};
type SanityHomeTeamMember = {
  name?: string;
  role?: string;
  imageSrc?: string;
  objectPosition?: string;
  raised?: boolean;
};

type SanityHeroImage = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityHomePage = {
  heroTitleLine1?: string;
  heroTitleLine2?: string;
  heroTitleHighlight?: string;
  heroDescription?: string;
  heroPrimaryCta?: SanityCtaLink;
  heroSecondaryCta?: SanityCtaLink;
  heroImage?: SanityHeroImage;
  clientLogos?: SanityClientLogo[];
  statsTitle?: string;
  statsDescription?: string;
  stats?: SanityStat[];
  whyImage?: SanityHeroImage;
  whyEyebrow?: string;
  whyTitlePrefix?: string;
  whyTitleHighlight?: string;
  whyTitle?: string;
  whyPoints?: SanityWhyPoint[];
  whyCta?: SanityCtaLink;
  servicesTitle?: string;
  servicesCta?: SanityCtaLink;
  insightsTitle?: string;
  insightsCta?: SanityCtaLink;
  insights?: SanityInsightCard[];
  teamEyebrow?: string;
  teamTitle?: string;
  homeTeam?: SanityHomeTeamMember[];
};

function mapClientLogos(
  logos: SanityClientLogo[] | undefined,
  fallback: ClientLogo[],
): ClientLogo[] {
  const mapped =
    logos
      ?.map((logo) => {
        const name = logo.name?.trim();
        const logoSrc = logo.logoSrc?.trim();
        return name && logoSrc ? { name, logoSrc } : null;
      })
      .filter((logo): logo is ClientLogo => logo !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapStats(stats: SanityStat[] | undefined, fallback: Stat[]): Stat[] {
  const mapped =
    stats
      ?.map((stat) => {
        const value = stat.value?.trim();
        const label = stat.label?.trim();
        return value && label ? { value, label } : null;
      })
      .filter((stat): stat is Stat => stat !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapWhyPoints(
  points: SanityWhyPoint[] | undefined,
  fallback: WhyPoint[],
): WhyPoint[] {
  const mapped =
    points
      ?.map((point) => {
        const number = point.number?.trim();
        const title = point.title?.trim();
        const body = point.body?.trim();
        return number && title && body ? { number, title, body } : null;
      })
      .filter((point): point is WhyPoint => point !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapInsights(
  insights: SanityInsightCard[] | undefined,
  fallback: InsightCard[],
): InsightCard[] {
  const mapped =
    insights
      ?.map((insight) => {
        const category = insight.category?.trim();
        const title = insight.title?.trim();
        const excerpt = insight.excerpt?.trim();
        const imageSrc = insight.imageSrc?.trim();
        const href = insight.href?.trim();
        return category && title && excerpt && imageSrc && href
          ? { category, title, excerpt, imageSrc, href }
          : null;
      })
      .filter((insight): insight is InsightCard => insight !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapHomeTeam(
  members: SanityHomeTeamMember[] | undefined,
  fallback: HomeTeamMember[],
): HomeTeamMember[] {
  const mapped: HomeTeamMember[] = [];

  for (const member of members ?? []) {
    const name = member.name?.trim();
    const role = member.role?.trim();
    const imageSrc = member.imageSrc?.trim();
    if (!name || !role || !imageSrc) continue;

    mapped.push({
      name,
      role,
      imageSrc,
      ...(member.objectPosition?.trim()
        ? { objectPosition: member.objectPosition.trim() }
        : {}),
      ...(member.raised ? { raised: true } : {}),
    });
  }

  return mapped.length > 0 ? mapped : fallback;
}

function mapCmsImage(
  image: SanityHeroImage | undefined,
  fallbackUrl: string,
  fallbackAlt: string,
): { url: string; alt: string } {
  const url = getImageUrl(image, 2400) || fallbackUrl;
  const alt = image?.alt?.trim() || fallbackAlt;
  return { url, alt };
}

function mapHomePage(doc: SanityHomePage | null): HomePageContent {
  if (!doc?.heroTitleLine1?.trim()) return FALLBACK_HOME_PAGE;

  const heroImage = mapCmsImage(
    doc.heroImage,
    FALLBACK_HOME_PAGE.heroImageUrl,
    FALLBACK_HOME_PAGE.heroImageAlt,
  );
  const whyImage = mapCmsImage(
    doc.whyImage,
    FALLBACK_HOME_PAGE.whyImageUrl,
    FALLBACK_HOME_PAGE.whyImageAlt,
  );

  return {
    heroTitleLine1: doc.heroTitleLine1.trim(),
    heroTitleLine2:
      doc.heroTitleLine2?.trim() ?? FALLBACK_HOME_PAGE.heroTitleLine2,
    heroTitleHighlight:
      doc.heroTitleHighlight?.trim() || FALLBACK_HOME_PAGE.heroTitleHighlight,
    heroDescription:
      doc.heroDescription?.trim() || FALLBACK_HOME_PAGE.heroDescription,
    heroPrimaryCta: mapCtaLink(
      doc.heroPrimaryCta,
      FALLBACK_HOME_PAGE.heroPrimaryCta,
    ),
    heroSecondaryCta: mapCtaLink(
      doc.heroSecondaryCta,
      FALLBACK_HOME_PAGE.heroSecondaryCta,
    ),
    heroImageUrl: heroImage.url,
    heroImageAlt: heroImage.alt,
    clientLogos: mapClientLogos(
      doc.clientLogos,
      FALLBACK_HOME_PAGE.clientLogos,
    ),
    statsTitle: doc.statsTitle?.trim() || FALLBACK_HOME_PAGE.statsTitle,
    statsDescription:
      doc.statsDescription?.trim() || FALLBACK_HOME_PAGE.statsDescription,
    stats: mapStats(doc.stats, FALLBACK_HOME_PAGE.stats),
    whyEyebrow: doc.whyEyebrow?.trim() || FALLBACK_HOME_PAGE.whyEyebrow,
    whyTitlePrefix:
      doc.whyTitlePrefix?.trim() || FALLBACK_HOME_PAGE.whyTitlePrefix,
    whyTitleHighlight:
      doc.whyTitleHighlight?.trim() || FALLBACK_HOME_PAGE.whyTitleHighlight,
    whyImageUrl: whyImage.url,
    whyImageAlt: whyImage.alt,
    whyPoints: mapWhyPoints(doc.whyPoints, FALLBACK_HOME_PAGE.whyPoints),
    whyCta: mapCtaLink(doc.whyCta, FALLBACK_HOME_PAGE.whyCta),
    servicesTitle:
      doc.servicesTitle?.trim() || FALLBACK_HOME_PAGE.servicesTitle,
    servicesCta: mapCtaLink(doc.servicesCta, FALLBACK_HOME_PAGE.servicesCta),
    insightsTitle:
      doc.insightsTitle?.trim() || FALLBACK_HOME_PAGE.insightsTitle,
    insightsCta: mapCtaLink(doc.insightsCta, FALLBACK_HOME_PAGE.insightsCta),
    insights: mapInsights(doc.insights, FALLBACK_HOME_PAGE.insights),
    teamEyebrow: doc.teamEyebrow?.trim() || FALLBACK_HOME_PAGE.teamEyebrow,
    teamTitle: doc.teamTitle?.trim() || FALLBACK_HOME_PAGE.teamTitle,
    homeTeam: mapHomeTeam(doc.homeTeam, FALLBACK_HOME_PAGE.homeTeam),
  };
}

export async function getHomePage(): Promise<HomePageContent> {
  const doc = await sanityFetch<SanityHomePage | null>(homePageQuery);
  return mapHomePage(doc);
}
