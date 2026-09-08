import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import { whyChooseUsPageQuery } from "./queries";
import {
  mapCtaLink,
  mapStrings,
  type CtaLink,
  type SanityCtaLink,
} from "./types";

export type WhyPillar = {
  title: string;
  body: string;
  iconSrc: string;
  tint: string;
};

export type WhyDifference = {
  title: string;
  body: string;
};

export type WhyChooseUsPageContent = {
  heroTitle: string;
  heroDescription: string;
  heroCta: CtaLink;
  storyEyebrow: string;
  storyTitlePrefix: string;
  storyTitleHighlight: string;
  storyTitleSuffix: string;
  storyBody: string[];
  storyImageUrl: string;
  storyImageAlt: string;
  pillars: WhyPillar[];
  differenceEyebrow: string;
  differenceTitlePrefix: string;
  differenceTitleHighlight: string;
  differenceTitleSuffix: string;
  difference: WhyDifference[];
};

const FALLBACK_STORY_IMAGE = "/figma/why-choose-us/story.png";

const FALLBACK_PILLARS: WhyPillar[] = [
  {
    title: "Design That Stand Out",
    body: "Modern, engaging visuals created to capture attention and connect with your audience.",
    iconSrc: "/figma/why-choose-us/icon-design.svg",
    tint: "bg-[rgba(76,110,245,0.1)]",
  },
  {
    title: "Speed & Security Built In",
    body: "Enjoy seamless performance with solutions designed to keep your data secured and protected.",
    iconSrc: "/figma/why-choose-us/icon-bolt.svg",
    tint: "bg-[rgba(250,82,82,0.1)]",
  },
  {
    title: "Affordable & Built to Scale",
    body: "Flexible pricing and solutions designed to grow alongside your business.",
    iconSrc: "/figma/why-choose-us/icon-scale.svg",
    tint: "bg-[rgba(18,184,134,0.1)]",
  },
  {
    title: "Support Beyond Delivery",
    body: "We remain available after delivery to help maintain, improve, and support your solution.",
    iconSrc: "/figma/why-choose-us/icon-support.svg",
    tint: "bg-[rgba(250,176,5,0.1)]",
  },
];

const FALLBACK_DIFFERENCE: WhyDifference[] = [
  {
    title: "Business-First Thinking",
    body: "We don't believe technology should be introduced simply because it is new or popular. We first look at the problem you are trying to solve, the outcome you want to achieve.",
  },
  {
    title: "Solutions Built Around Your Needs",
    body: "Every organization has different processes, challenges, and priorities. We take these differences into consideration when developing solutions. Whether we're building software or improving infrastructure, we focus on what makes sense for your specific environment.",
  },
  {
    title: "Practical Innovation",
    body: "There is always a new technology, platform, framework, or trend promising to change the way businesses operate. We focus on what is genuinely useful. Our approach is to identify where technology can improve.",
  },
  {
    title: "End-to-End Technology Thinking",
    body: "Software, infrastructure, security, websites, data, users, and business processes are often connected. A decision made in one area can affect another. That's why we consider the wider technology environment.",
  },
  {
    title: "Built for Growth",
    body: "We don't believe technology should be introduced simply because it is new or popular. We first look at the problem you are trying to solve, the outcome you want to achieve.",
  },
  {
    title: "Clear and Collaborative",
    body: "Technology can become complicated quickly. We believe communication shouldn't. We aim to keep requirements, decisions, progress, and expectations clear throughout the engagement.",
  },
];

export const FALLBACK_WHY_CHOOSE_US_PAGE: WhyChooseUsPageContent = {
  heroTitle: "A Technology Partner You Can Actually Rely On.",
  heroDescription:
    "Plenty of developers can write code. Here's what businesses tell us keeps them coming back to SaidByte Technologies.",
  heroCta: { label: "Our Projects", href: "/projects" },
  storyEyebrow: "why choose us",
  storyTitlePrefix: "Your ",
  storyTitleHighlight: "Technology Partner",
  storyTitleSuffix: " for Growth",
  storyBody: [
    "Choosing a technology partner is about more than finding someone who can build software or manage infrastructure. You need a partner who understands the problem behind the technology and can help you make the right decisions.",
    "At Zuritech, we take a practical approach to technology. We begin by understanding your objectives, challenges, users, and existing environment before recommending a solution.",
    "Whether you need software development, cloud and DevOps, cybersecurity, or web development, our goal is to make technology work better for your organisation.",
  ],
  storyImageUrl: FALLBACK_STORY_IMAGE,
  storyImageAlt: "ZurichTech colleagues in discussion",
  pillars: FALLBACK_PILLARS,
  differenceEyebrow: "OUR DIFFERENCE",
  differenceTitlePrefix: "What Sets ",
  differenceTitleHighlight: "Zuritech",
  differenceTitleSuffix: " Apart.",
  difference: FALLBACK_DIFFERENCE,
};

type SanityImage = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityPillar = {
  title?: string;
  body?: string;
  tint?: string;
  icon?: SanityImage;
};

type SanityDifference = {
  title?: string;
  body?: string;
};

type SanityWhyChooseUsPage = {
  heroTitle?: string;
  heroDescription?: string;
  heroCta?: SanityCtaLink;
  storyEyebrow?: string;
  storyTitlePrefix?: string;
  storyTitleHighlight?: string;
  storyTitleSuffix?: string;
  storyBody?: string[];
  storyImage?: SanityImage;
  pillars?: SanityPillar[];
  differenceEyebrow?: string;
  differenceTitlePrefix?: string;
  differenceTitleHighlight?: string;
  differenceTitleSuffix?: string;
  difference?: SanityDifference[];
};

function mapPillars(
  pillars: SanityPillar[] | undefined,
  fallback: WhyPillar[],
): WhyPillar[] {
  const mapped =
    pillars
      ?.map((item, index) => {
        const title = item.title?.trim();
        const body = item.body?.trim();
        if (!title || !body) return null;
        const fallbackPillar = fallback[index];
        return {
          title,
          body,
          iconSrc:
            getImageUrl(item.icon, 128) || fallbackPillar?.iconSrc || "",
          tint: item.tint?.trim() || fallbackPillar?.tint || "bg-brand-soft",
        };
      })
      .filter(
        (item): item is WhyPillar => item !== null && Boolean(item.iconSrc),
      ) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapDifference(
  cards: SanityDifference[] | undefined,
  fallback: WhyDifference[],
): WhyDifference[] {
  const mapped =
    cards
      ?.map((item) => {
        const title = item.title?.trim();
        const body = item.body?.trim();
        return title && body ? { title, body } : null;
      })
      .filter((item): item is WhyDifference => item !== null) ?? [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapWhyChooseUsPage(
  doc: SanityWhyChooseUsPage | null,
): WhyChooseUsPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_WHY_CHOOSE_US_PAGE;

  return {
    heroTitle: doc.heroTitle.trim(),
    heroDescription:
      doc.heroDescription?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.heroDescription,
    heroCta: mapCtaLink(doc.heroCta, FALLBACK_WHY_CHOOSE_US_PAGE.heroCta),
    storyEyebrow:
      doc.storyEyebrow?.trim() || FALLBACK_WHY_CHOOSE_US_PAGE.storyEyebrow,
    storyTitlePrefix:
      doc.storyTitlePrefix?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.storyTitlePrefix,
    storyTitleHighlight:
      doc.storyTitleHighlight?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.storyTitleHighlight,
    storyTitleSuffix:
      doc.storyTitleSuffix?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.storyTitleSuffix,
    storyBody: mapStrings(doc.storyBody, FALLBACK_WHY_CHOOSE_US_PAGE.storyBody),
    storyImageUrl:
      getImageUrl(doc.storyImage, 1200) ||
      FALLBACK_WHY_CHOOSE_US_PAGE.storyImageUrl,
    storyImageAlt:
      doc.storyImage?.alt?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.storyImageAlt,
    pillars: mapPillars(doc.pillars, FALLBACK_WHY_CHOOSE_US_PAGE.pillars),
    differenceEyebrow:
      doc.differenceEyebrow?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.differenceEyebrow,
    differenceTitlePrefix:
      doc.differenceTitlePrefix?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.differenceTitlePrefix,
    differenceTitleHighlight:
      doc.differenceTitleHighlight?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.differenceTitleHighlight,
    differenceTitleSuffix:
      doc.differenceTitleSuffix?.trim() ||
      FALLBACK_WHY_CHOOSE_US_PAGE.differenceTitleSuffix,
    difference: mapDifference(
      doc.difference,
      FALLBACK_WHY_CHOOSE_US_PAGE.difference,
    ),
  };
}

export async function getWhyChooseUsPage(): Promise<WhyChooseUsPageContent> {
  const doc = await sanityFetch<SanityWhyChooseUsPage | null>(
    whyChooseUsPageQuery,
  );
  return mapWhyChooseUsPage(doc);
}
