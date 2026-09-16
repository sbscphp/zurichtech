import type { SanityImageSource } from "@sanity/image-url";

import { TEAM } from "@/lib/site/content";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import { aboutPageQuery } from "./queries";
import { mapCtaLink, mapStrings, type CtaLink, type SanityCtaLink } from "./types";

export type ValueItem = {
  title: string;
  description: string;
  iconSrc: string;
  tint: string;
};

export type TeamMember = {
  name: string;
  role: string;
  imageSrc: string;
  objectPosition?: string;
};

export type Testimonial = {
  category: string;
  quote: string;
  name: string;
  role: string;
  imageSrc: string;
  objectPosition?: string;
};

export type AboutPageContent = {
  heroTitle: string;
  heroDescription: string;
  heroCta: CtaLink;
  storyEyebrow: string;
  storyTitleHighlight: string;
  storyTitleRest: string;
  storyBody: string[];
  storyCta: CtaLink;
  storyImageUrl: string;
  storyImageAlt: string;
  missionVisionTitle: string;
  missionVisionCta: CtaLink;
  missionTitle: string;
  missionBody: string;
  visionTitle: string;
  visionBody: string;
  teamEyebrow: string;
  teamTitle: string;
  team: TeamMember[];
  valuesEyebrow: string;
  valuesTitle: string;
  values: ValueItem[];
  testimonialsEyebrow: string;
  testimonialsTitle: string;
  testimonials: Testimonial[];
};

const FALLBACK_STORY_IMAGE = "/figma/about/story.png";

const FALLBACK_VALUES: ValueItem[] = [
  {
    title: "Client Focus",
    description:
      "We put our clients' objectives and requirements at the center of the solutions",
    iconSrc: "/figma/about/icon-client.svg",
    tint: "bg-[rgba(76,110,245,0.1)]",
  },
  {
    title: "Collaboration",
    description:
      "We believe the best outcomes come from working closely with clients.",
    iconSrc: "/figma/about/icon-collab.svg",
    tint: "bg-[rgba(18,184,134,0.1)]",
  },
  {
    title: "Accountability",
    description: "A named lead owns your outcome from kickoff to handover.",
    iconSrc: "/figma/about/icon-account.svg",
    tint: "bg-[rgba(250,176,5,0.1)]",
  },
  {
    title: "Innovation",
    description:
      "We are open to new ideas, and approaches that can help solve problems.",
    iconSrc: "/figma/about/icon-innovation.svg",
    tint: "bg-brand-soft",
  },
];

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    category: "IT consulting",
    quote:
      "“Zurich rebuilt our loan origination platform in five months. It now processes four times the volume with fewer support tickets than the system it replaced.”",
    name: "Jadesola Alao",
    role: "CFO | SBSC UK",
    imageSrc: "/figma/home/team-3.png",
    objectPosition: "object-[center_top]",
  },
  {
    category: "Cloud migration",
    quote:
      "“Thanks to their expertise, our data is now securely hosted on the cloud, improving accessibility and performance significantly.”",
    name: "Anika Sharma",
    role: "CTO | Horizon Ventures",
    imageSrc: "/figma/home/team-4.png",
    objectPosition: "object-[center_15%]",
  },
  {
    category: "Cybersecurity",
    quote:
      "“They implemented robust security measures that have protected us from multiple threats without hampering user experience.”",
    name: "Diego Fernández",
    role: "Head of IT | SecureNet",
    imageSrc: "/figma/home/team-2.png",
    objectPosition: "object-center",
  },
];

export const FALLBACK_ABOUT_PAGE: AboutPageContent = {
  heroTitle: "Powering Progress. Creating Lasting Value.",
  heroDescription:
    "We bring together expertise, innovation and partnerships to deliver energy solutions that drive sustainable growth",
  heroCta: { label: "Partner With Us", href: "/partners" },
  storyEyebrow: "why work with Us",
  storyTitleHighlight: "Building Technology",
  storyTitleRest: "Around Your Business",
  storyBody: [
    "Zurich Technology is a technology solutions company focused on helping organizations make better use of technology. We combine technical expertise, innovative thinking, and a clear understanding of business requirements to develop solutions that are practical, scalable, secure, and built for long-term value.",
    "Our capabilities span software development, web development, cloud solutions and DevOps, and cybersecurity and identity audit. Across every engagement, our focus remains the same: understand the challenge, identify the right approach, and deliver technology that supports the organization's objectives.",
    "Whether a business needs to develop a new digital product, improve its online presence, modernize its technology environment, or strengthen its security posture, Zurich Technology provides the expertise needed to move from ideas and requirements to effective solutions.",
  ],
  storyCta: { label: "Contact Us", href: "/contact" },
  storyImageUrl: FALLBACK_STORY_IMAGE,
  storyImageAlt: "ZurichTech team collaborating",
  missionVisionTitle: "Helping Organizations Get More From Technology",
  missionVisionCta: { label: "Contact Us", href: "/contact" },
  missionTitle: "Our Mission",
  missionBody:
    "We aim to combine technical excellence with practical problem-solving so that the technology we deliver is not only functional, but also relevant to the people and organizations using it.",
  visionTitle: "Our Vision",
  visionBody:
    "Our vision is to become a trusted technology partner for organizations seeking to use technology to improve, transform, and grow. We believe the future belongs to organizations that can adapt to changing technology.",
  teamEyebrow: "Our team",
  teamTitle: "ZurichTech Professionals",
  team: TEAM.map((member) => ({
    name: member.name,
    role: member.role,
    imageSrc: member.image,
    objectPosition: member.offset,
  })),
  valuesEyebrow: "CORE VALUES",
  valuesTitle: "The Principle Behind Our Work",
  values: FALLBACK_VALUES,
  testimonialsEyebrow: "TESTIMONIALS",
  testimonialsTitle: "What our Clients Says",
  testimonials: FALLBACK_TESTIMONIALS,
};

type SanityImage = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityValueItem = {
  title?: string;
  description?: string;
  tint?: string;
  icon?: SanityImage;
};

type SanityTeamMember = {
  name?: string;
  role?: string;
  objectPosition?: string;
  photo?: SanityImage;
};

type SanityTestimonial = {
  category?: string;
  quote?: string;
  name?: string;
  role?: string;
  objectPosition?: string;
  photo?: SanityImage;
};

type SanityAboutPage = {
  heroTitle?: string;
  heroDescription?: string;
  heroCta?: SanityCtaLink;
  storyEyebrow?: string;
  storyTitleHighlight?: string;
  storyTitleRest?: string;
  storyBody?: string[];
  storyCta?: SanityCtaLink;
  storyImage?: SanityImage;
  missionVisionTitle?: string;
  missionVisionCta?: SanityCtaLink;
  missionTitle?: string;
  missionBody?: string;
  visionTitle?: string;
  visionBody?: string;
  teamEyebrow?: string;
  teamTitle?: string;
  team?: SanityTeamMember[];
  valuesEyebrow?: string;
  valuesTitle?: string;
  values?: SanityValueItem[];
  testimonialsEyebrow?: string;
  testimonialsTitle?: string;
  testimonials?: SanityTestimonial[];
};

function mapCmsImage(
  image: SanityImage | undefined,
  fallbackUrl: string,
  fallbackAlt: string,
): { url: string; alt: string } {
  return {
    url: getImageUrl(image, 1200) || fallbackUrl,
    alt: image?.alt?.trim() || fallbackAlt,
  };
}

function mapValues(
  values: SanityValueItem[] | undefined,
  fallback: ValueItem[],
): ValueItem[] {
  const mapped =
    values
      ?.map((item, index) => {
        const title = item.title?.trim();
        const description = item.description?.trim();
        if (!title || !description) return null;

        const fallbackValue = fallback[index];
        return {
          title,
          description,
          iconSrc: getImageUrl(item.icon, 64) || fallbackValue?.iconSrc || "",
          tint: item.tint?.trim() || fallbackValue?.tint || "bg-brand-soft",
        };
      })
      .filter((item): item is ValueItem => item !== null && Boolean(item.iconSrc)) ??
    [];

  return mapped.length > 0 ? mapped : fallback;
}

function mapTeam(
  team: SanityTeamMember[] | undefined,
  fallback: TeamMember[],
): TeamMember[] {
  const mapped: TeamMember[] = [];

  for (const member of team ?? []) {
    const name = member.name?.trim();
    const role = member.role?.trim();
    const imageSrc = getImageUrl(member.photo, 800);
    if (!name || !role || !imageSrc) continue;

    mapped.push({
      name,
      role,
      imageSrc,
      ...(member.objectPosition?.trim()
        ? { objectPosition: member.objectPosition.trim() }
        : {}),
    });
  }

  return mapped.length > 0 ? mapped : fallback;
}

function mapTestimonials(
  testimonials: SanityTestimonial[] | undefined,
  fallback: Testimonial[],
): Testimonial[] {
  const mapped: Testimonial[] = [];

  for (const item of testimonials ?? []) {
    const category = item.category?.trim();
    const quote = item.quote?.trim();
    const name = item.name?.trim();
    const role = item.role?.trim();
    const imageSrc = getImageUrl(item.photo, 800);
    if (!category || !quote || !name || !role || !imageSrc) continue;

    mapped.push({
      category,
      quote,
      name,
      role,
      imageSrc,
      ...(item.objectPosition?.trim()
        ? { objectPosition: item.objectPosition.trim() }
        : {}),
    });
  }

  return mapped.length > 0 ? mapped : fallback;
}

function mapAboutPage(doc: SanityAboutPage | null): AboutPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_ABOUT_PAGE;

  const storyImage = mapCmsImage(
    doc.storyImage,
    FALLBACK_ABOUT_PAGE.storyImageUrl,
    FALLBACK_ABOUT_PAGE.storyImageAlt,
  );

  return {
    heroTitle: doc.heroTitle.trim(),
    heroDescription:
      doc.heroDescription?.trim() || FALLBACK_ABOUT_PAGE.heroDescription,
    heroCta: mapCtaLink(doc.heroCta, FALLBACK_ABOUT_PAGE.heroCta),
    storyEyebrow: doc.storyEyebrow?.trim() || FALLBACK_ABOUT_PAGE.storyEyebrow,
    storyTitleHighlight:
      doc.storyTitleHighlight?.trim() ||
      FALLBACK_ABOUT_PAGE.storyTitleHighlight,
    storyTitleRest:
      doc.storyTitleRest?.trim() || FALLBACK_ABOUT_PAGE.storyTitleRest,
    storyBody: mapStrings(doc.storyBody, FALLBACK_ABOUT_PAGE.storyBody),
    storyCta: mapCtaLink(doc.storyCta, FALLBACK_ABOUT_PAGE.storyCta),
    storyImageUrl: storyImage.url,
    storyImageAlt: storyImage.alt,
    missionVisionTitle:
      doc.missionVisionTitle?.trim() ||
      FALLBACK_ABOUT_PAGE.missionVisionTitle,
    missionVisionCta: mapCtaLink(
      doc.missionVisionCta,
      FALLBACK_ABOUT_PAGE.missionVisionCta,
    ),
    missionTitle:
      doc.missionTitle?.trim() || FALLBACK_ABOUT_PAGE.missionTitle,
    missionBody: doc.missionBody?.trim() || FALLBACK_ABOUT_PAGE.missionBody,
    visionTitle: doc.visionTitle?.trim() || FALLBACK_ABOUT_PAGE.visionTitle,
    visionBody: doc.visionBody?.trim() || FALLBACK_ABOUT_PAGE.visionBody,
    teamEyebrow: doc.teamEyebrow?.trim() || FALLBACK_ABOUT_PAGE.teamEyebrow,
    teamTitle: doc.teamTitle?.trim() || FALLBACK_ABOUT_PAGE.teamTitle,
    team: mapTeam(doc.team, FALLBACK_ABOUT_PAGE.team),
    valuesEyebrow:
      doc.valuesEyebrow?.trim() || FALLBACK_ABOUT_PAGE.valuesEyebrow,
    valuesTitle: doc.valuesTitle?.trim() || FALLBACK_ABOUT_PAGE.valuesTitle,
    values: mapValues(doc.values, FALLBACK_ABOUT_PAGE.values),
    testimonialsEyebrow:
      doc.testimonialsEyebrow?.trim() ||
      FALLBACK_ABOUT_PAGE.testimonialsEyebrow,
    testimonialsTitle:
      doc.testimonialsTitle?.trim() || FALLBACK_ABOUT_PAGE.testimonialsTitle,
    testimonials: mapTestimonials(
      doc.testimonials,
      FALLBACK_ABOUT_PAGE.testimonials,
    ),
  };
}

export async function getAboutPage(): Promise<AboutPageContent> {
  const doc = await sanityFetch<SanityAboutPage | null>(aboutPageQuery);
  return mapAboutPage(doc);
}
