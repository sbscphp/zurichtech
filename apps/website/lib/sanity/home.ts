import { sanityFetch } from "./fetch";
import { homePageQuery } from "./queries";
import { mapCtaLink, type CtaLink, type SanityCtaLink } from "./types";

export type Highlight = {
  title: string;
  description: string;
};

export type HomePageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  heroPrimaryCta: CtaLink;
  heroSecondaryCta: CtaLink;
  highlightsTitle: string;
  highlights: Highlight[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: CtaLink;
};

export const FALLBACK_HOME_PAGE: HomePageContent = {
  heroEyebrow: "Zuritech",
  heroTitle: "Engineering teams build here.",
  heroDescription:
    "We design, build, and run software for companies that need their product to work on day one and keep working after that.",
  heroPrimaryCta: { label: "Start a project", href: "/contact" },
  heroSecondaryCta: { label: "See our services", href: "/services" },
  highlightsTitle: "What we bring to the table",
  highlights: [
    {
      title: "Product engineering",
      description:
        "Web and mobile products shipped in small, reviewable increments — with the tests and tooling to keep them safe to change.",
    },
    {
      title: "Cloud & platform",
      description:
        "Infrastructure that scales down as easily as it scales up, so you pay for what you actually use.",
    },
    {
      title: "Data & AI",
      description:
        "Pipelines, dashboards, and model integrations that turn the data you already collect into decisions.",
    },
  ],
  ctaTitle: "Have something in mind?",
  ctaDescription:
    "Tell us what you are building and we will come back with a plan, a timeline, and a number.",
  ctaButton: { label: "Talk to us", href: "/contact" },
};

type SanityHighlight = {
  title?: string;
  description?: string;
};

type SanityHomePage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroPrimaryCta?: SanityCtaLink;
  heroSecondaryCta?: SanityCtaLink;
  highlightsTitle?: string;
  highlights?: SanityHighlight[];
  ctaTitle?: string;
  ctaDescription?: string;
  ctaButton?: SanityCtaLink;
};

function mapHighlights(
  highlights: SanityHighlight[] | undefined,
  fallback: Highlight[],
): Highlight[] {
  const mapped =
    highlights
      ?.map((item) => {
        const title = item.title?.trim();
        const description = item.description?.trim();
        return title && description ? { title, description } : null;
      })
      .filter((item): item is Highlight => item !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapHomePage(doc: SanityHomePage | null): HomePageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_HOME_PAGE;

  return {
    heroEyebrow: doc.heroEyebrow?.trim() || FALLBACK_HOME_PAGE.heroEyebrow,
    heroTitle: doc.heroTitle.trim(),
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
    highlightsTitle:
      doc.highlightsTitle?.trim() || FALLBACK_HOME_PAGE.highlightsTitle,
    highlights: mapHighlights(doc.highlights, FALLBACK_HOME_PAGE.highlights),
    ctaTitle: doc.ctaTitle?.trim() || FALLBACK_HOME_PAGE.ctaTitle,
    ctaDescription:
      doc.ctaDescription?.trim() || FALLBACK_HOME_PAGE.ctaDescription,
    ctaButton: mapCtaLink(doc.ctaButton, FALLBACK_HOME_PAGE.ctaButton),
  };
}

export async function getHomePage(): Promise<HomePageContent> {
  const doc = await sanityFetch<SanityHomePage | null>(homePageQuery);
  return mapHomePage(doc);
}
