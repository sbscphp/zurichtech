import type { SanityImageSource } from "@sanity/image-url";

import {
  CASE_STUDY,
  PROJECTS,
  type Project as FallbackProject,
} from "@/lib/site/portfolio";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import {
  projectBySlugQuery,
  projectsPageQuery,
  projectsQuery,
} from "./queries";
import {
  mapCtaLink,
  mapStrings,
  type CtaLink,
  type SanityCtaLink,
} from "./types";

export type ProjectCard = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  imageClass: string;
  tags: string[];
};

export type ProjectPurpose = {
  heading: string;
  body: string;
  intro: string;
  items: string[];
};

export type ProjectChallenges = {
  heading: string;
  paragraphs: string[];
  intro: string;
  items: string[];
};

export type ProjectApproach = {
  heading: string;
  body: string;
  items: string[];
};

export type ProjectDetail = ProjectCard & {
  caseStudyTitle: string;
  detailImageSrc: string;
  detailImageAlt: string;
  about: string[];
  purpose: ProjectPurpose;
  challenges: ProjectChallenges;
  approach: ProjectApproach;
};

export type ProjectsPageContent = {
  heroTitle: string;
  heroDescription: string;
  heroCta: CtaLink;
  listingEyebrow: string;
  listingTitle: string;
};

export const FALLBACK_PROJECTS_PAGE: ProjectsPageContent = {
  heroTitle: "Technology Solutions Built to Make an Impact.",
  heroDescription:
    "Explore selected projects that demonstrate how we turn business challenges, ideas, and technology requirements into practical digital solutions.",
  heroCta: { label: "Let’s work Together", href: "/contact" },
  listingEyebrow: "our Projects",
  listingTitle: "Technology solutions built to move your business forward.",
};

function fallbackCard(project: FallbackProject): ProjectCard {
  return {
    _id: `fallback-${project.slug}`,
    slug: project.slug,
    title: project.title,
    category: project.category,
    excerpt: project.excerpt,
    imageSrc: project.image,
    imageAlt: project.title,
    imageClass: project.imageClass ?? "object-cover",
    tags: project.tags,
  };
}

export const FALLBACK_PROJECTS: ProjectCard[] = PROJECTS.map(fallbackCard);

const FALLBACK_PURPOSE: ProjectPurpose = {
  heading: CASE_STUDY.purpose.heading,
  body: CASE_STUDY.purpose.body,
  intro: CASE_STUDY.purpose.intro,
  items: [...CASE_STUDY.purpose.items],
};

const FALLBACK_CHALLENGES: ProjectChallenges = {
  heading: CASE_STUDY.challenges.heading,
  paragraphs: [...CASE_STUDY.challenges.paragraphs],
  intro: CASE_STUDY.challenges.intro,
  items: [...CASE_STUDY.challenges.items],
};

const FALLBACK_APPROACH: ProjectApproach = {
  heading: CASE_STUDY.approach.heading,
  body: CASE_STUDY.approach.body,
  items: [...CASE_STUDY.approach.items],
};

type SanityImageField = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityPurpose = {
  heading?: string;
  body?: string;
  intro?: string;
  items?: string[];
};

type SanityChallenges = {
  heading?: string;
  paragraphs?: string[];
  intro?: string;
  items?: string[];
};

type SanityApproach = {
  heading?: string;
  body?: string;
  items?: string[];
};

type SanityProjectCard = {
  _id?: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  coverImage?: SanityImageField;
  imagePosition?: string;
  tags?: string[];
};

type SanityProjectDetail = SanityProjectCard & {
  caseStudyTitle?: string;
  detailImage?: SanityImageField;
  about?: string[];
  purpose?: SanityPurpose;
  challenges?: SanityChallenges;
  approach?: SanityApproach;
};

type SanityProjectsPage = {
  heroTitle?: string;
  heroDescription?: string;
  heroCta?: SanityCtaLink;
  listingEyebrow?: string;
  listingTitle?: string;
};

function mapCard(doc: SanityProjectCard): ProjectCard | null {
  const slug = doc.slug?.trim();
  const title = doc.title?.trim();
  if (!slug || !title) return null;

  const fallback = FALLBACK_PROJECTS.find((item) => item.slug === slug);

  return {
    _id: doc._id || `project-${slug}`,
    slug,
    title,
    category: doc.category?.trim() || fallback?.category || "",
    excerpt: doc.excerpt?.trim() || fallback?.excerpt || "",
    imageSrc:
      getImageUrl(doc.coverImage?.asset, 900) ||
      fallback?.imageSrc ||
      "/figma/portfolio/project-1.png",
    imageAlt: doc.coverImage?.alt?.trim() || title,
    imageClass:
      doc.imagePosition?.trim() || fallback?.imageClass || "object-cover",
    tags: mapStrings(doc.tags, fallback?.tags ?? []),
  };
}

function mapPurpose(
  purpose: SanityPurpose | undefined,
  fallback: ProjectPurpose,
): ProjectPurpose {
  if (!purpose) return fallback;
  return {
    heading: purpose.heading?.trim() || fallback.heading,
    body: purpose.body?.trim() || fallback.body,
    intro: purpose.intro?.trim() || fallback.intro,
    items: mapStrings(purpose.items, fallback.items),
  };
}

function mapChallenges(
  challenges: SanityChallenges | undefined,
  fallback: ProjectChallenges,
): ProjectChallenges {
  if (!challenges) return fallback;
  return {
    heading: challenges.heading?.trim() || fallback.heading,
    paragraphs: mapStrings(challenges.paragraphs, fallback.paragraphs),
    intro: challenges.intro?.trim() || fallback.intro,
    items: mapStrings(challenges.items, fallback.items),
  };
}

function mapApproach(
  approach: SanityApproach | undefined,
  fallback: ProjectApproach,
): ProjectApproach {
  if (!approach) return fallback;
  return {
    heading: approach.heading?.trim() || fallback.heading,
    body: approach.body?.trim() || fallback.body,
    items: mapStrings(approach.items, fallback.items),
  };
}

function mapDetail(doc: SanityProjectDetail | null): ProjectDetail | null {
  if (!doc) return null;
  const card = mapCard(doc);
  if (!card) return null;

  const isInnovixus = card.slug === "innovixus-labs-website";
  const defaultAbout = isInnovixus
    ? [...CASE_STUDY.about]
    : [
        card.excerpt,
        `This case study covers how we delivered ${card.title} as a practical digital solution.`,
      ];

  return {
    ...card,
    caseStudyTitle:
      doc.caseStudyTitle?.trim() ||
      (isInnovixus ? CASE_STUDY.title : card.title),
    detailImageSrc:
      getImageUrl(doc.detailImage?.asset, 1200) ||
      (isInnovixus ? CASE_STUDY.image : card.imageSrc),
    detailImageAlt:
      doc.detailImage?.alt?.trim() || card.imageAlt || card.title,
    about: mapStrings(doc.about, defaultAbout),
    purpose: mapPurpose(
      doc.purpose,
      isInnovixus
        ? FALLBACK_PURPOSE
        : {
            heading: `Delivering ${card.title}`,
            body: card.excerpt,
            intro: "The engagement focused on:",
            items: [
              "Clarifying requirements and success criteria",
              "Designing a usable digital experience",
              "Building a maintainable solution",
            ],
          },
    ),
    challenges: mapChallenges(
      doc.challenges,
      isInnovixus
        ? FALLBACK_CHALLENGES
        : {
            heading: "Solving the right problems",
            paragraphs: [
              "Every project needs a clear path from business requirements to a working digital experience.",
            ],
            intro: "Key challenges included:",
            items: [
              "Balancing content with clarity",
              "Designing across devices",
              "Keeping the solution flexible",
            ],
          },
    ),
    approach: mapApproach(
      doc.approach,
      isInnovixus
        ? FALLBACK_APPROACH
        : {
            heading: "From requirements to launch",
            body: "We followed a structured process from discovery through delivery.",
            items: [
              "Discovery",
              "Design",
              "Development",
              "Testing",
              "Launch",
            ],
          },
    ),
  };
}

function mapProjectsPage(doc: SanityProjectsPage | null): ProjectsPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_PROJECTS_PAGE;

  return {
    heroTitle: doc.heroTitle.trim(),
    heroDescription:
      doc.heroDescription?.trim() || FALLBACK_PROJECTS_PAGE.heroDescription,
    heroCta: mapCtaLink(doc.heroCta, FALLBACK_PROJECTS_PAGE.heroCta),
    listingEyebrow:
      doc.listingEyebrow?.trim() || FALLBACK_PROJECTS_PAGE.listingEyebrow,
    listingTitle:
      doc.listingTitle?.trim() || FALLBACK_PROJECTS_PAGE.listingTitle,
  };
}

export async function getProjectsPage(): Promise<ProjectsPageContent> {
  const doc = await sanityFetch<SanityProjectsPage | null>(projectsPageQuery);
  return mapProjectsPage(doc);
}

export async function getProjects(): Promise<ProjectCard[]> {
  const docs = await sanityFetch<SanityProjectCard[] | null>(projectsQuery);
  const projects =
    docs?.map(mapCard).filter((item): item is ProjectCard => item !== null) ??
    [];
  return projects.length > 0 ? projects : FALLBACK_PROJECTS;
}

export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetail | null> {
  const doc = await sanityFetch<SanityProjectDetail | null>(
    projectBySlugQuery,
    { slug },
  );
  const mapped = mapDetail(doc);
  if (mapped) return mapped;

  const fallback = FALLBACK_PROJECTS.find((item) => item.slug === slug);
  if (!fallback) return null;
  return mapDetail({
    _id: fallback._id,
    title: fallback.title,
    slug: fallback.slug,
    category: fallback.category,
    excerpt: fallback.excerpt,
    imagePosition: fallback.imageClass,
    tags: fallback.tags,
  });
}
