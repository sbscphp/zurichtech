import type { SanityImageSource } from "@sanity/image-url";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import {
  serviceBySlugQuery,
  servicesPageQuery,
  servicesQuery,
} from "./queries";
import {
  mapCtaLink,
  mapStrings,
  type CtaLink,
  type SanityCtaLink,
} from "./types";

export type ProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  number: string;
  summary: string;
  icon: string;
  features: string[];
  coverImageUrl: string;
  coverImageAlt: string;
  imageSide: "left" | "right";
  imageHeight: number;
  imageFrame: "plain" | "blush";
  imagePosition?: string;
  coverImage?: SanityImageSource;
  overview: string[];
  deliverables: string[];
  process: ProcessStep[];
};

export type ServicesPageContent = {
  heroTitle: string;
  heroDescription: string;
  heroCta: CtaLink;
  showcaseCta: CtaLink;
};

export const FALLBACK_SERVICES_PAGE: ServicesPageContent = {
  heroTitle: "Technology solutions for every stage of your digital journey.",
  heroDescription:
    "From digital products to cloud, security, and data, we deliver the expertise businesses need to solve complex challenges and move forward with confidence.",
  heroCta: { label: "Let’s work Together", href: "/partners" },
  showcaseCta: { label: "Let’s work Together", href: "/partners" },
};

export const FALLBACK_SERVICES: Service[] = [
  {
    _id: "fallback-software-development",
    title: "Software Development",
    slug: "software-development",
    number: "01",
    summary:
      "Custom software solutions designed to solve complex business challenges and support long-term growth.",
    icon: "code",
    features: [
      "Enterprise applications and business platforms",
      "Custom software and system integration",
      "API development and third-party integrations",
      "Application modernisation and optimisation",
    ],
    coverImageUrl: "/figma/services/service-01-software-development.png",
    coverImageAlt: "Developer working across a desktop and laptop filled with code",
    imageSide: "right",
    imageHeight: 566,
    imageFrame: "plain",
    overview: [],
    deliverables: [],
    process: [],
  },
  {
    _id: "fallback-web-development",
    title: "Web Development",
    slug: "web-development",
    number: "02",
    summary:
      "Intuitive, high-performing mobile experiences built to keep your business connected with users wherever they are.",
    icon: "code",
    features: [
      "Native and cross-platform mobile applications",
      "Customer-facing and enterprise mobile solutions",
      "API and backend integration",
      "App maintenance and performance optimisation",
    ],
    coverImageUrl: "/figma/services/service-02-web-development.png",
    coverImageAlt: "Person using a mobile application",
    imageSide: "left",
    imageHeight: 564,
    imageFrame: "plain",
    imagePosition: "object-[12%_10%]",
    overview: [],
    deliverables: [],
    process: [],
  },
  {
    _id: "fallback-cybersecurity-and-id-audit",
    title: "Cybersecurity and ID Audit",
    slug: "cybersecurity-and-id-audit",
    number: "03",
    summary:
      "Practical security solutions designed to protect your systems, data and operations in an evolving digital landscape.",
    icon: "code",
    features: [
      "Security assessments and risk management",
      "Infrastructure and application security",
      "Identity and access management",
      "Security monitoring and incident readiness",
    ],
    coverImageUrl: "/figma/services/service-03-cybersecurity.png",
    coverImageAlt: "Security operations dashboard being monitored",
    imageSide: "right",
    imageHeight: 564,
    imageFrame: "blush",
    imagePosition: "object-[13%_4%]",
    overview: [],
    deliverables: [],
    process: [],
  },
  {
    _id: "fallback-cloud-solutions-and-devops",
    title: "Cloud Solutions and Devops",
    slug: "cloud-solutions-and-devops",
    number: "04",
    summary:
      "Flexible and scalable cloud solutions that help your business operate efficiently, securely and with confidence.",
    icon: "cloud",
    features: [
      "Cloud strategy and migration",
      "Cloud infrastructure and architecture",
      "Multi-cloud and hybrid cloud solutions",
      "Cloud optimisation and cost management",
    ],
    coverImageUrl: "/figma/services/cloud-solutions.png",
    coverImageAlt: "Cloud icon representing cloud solutions and DevOps",
    imageSide: "left",
    imageHeight: 546,
    imageFrame: "plain",
    overview: [],
    deliverables: [],
    process: [],
  },
  {
    _id: "fallback-it-consulting-and-advisory",
    title: "IT Consulting & Advisory",
    slug: "it-consulting-and-advisory",
    number: "05",
    summary:
      "Strategic technology guidance that helps you make smarter decisions and get more value from your technology investments.",
    icon: "code",
    features: [
      "Technology strategy and digital transformation",
      "IT infrastructure and architecture advisory",
      "Technology assessments and roadmaps",
      "Systems and process optimisation",
    ],
    coverImageUrl: "/figma/services/service-05-it-consulting.png",
    coverImageAlt: "Consultants reviewing a technology roadmap together",
    imageSide: "right",
    imageHeight: 564,
    imageFrame: "plain",
    overview: [],
    deliverables: [],
    process: [],
  },
  {
    _id: "fallback-it-support-and-maintenance",
    title: "IT Support & Maintenance",
    slug: "it-support-and-maintenance",
    number: "06",
    summary:
      "Reliable, ongoing support that keeps your technology secure, efficient and performing at its best.",
    icon: "code",
    features: [
      "Proactive system monitoring and maintenance",
      "Technical support and issue resolution",
      "Software updates and infrastructure management",
      "Performance, security and reliability optimisation",
    ],
    coverImageUrl: "/figma/services/service-06-it-support.png",
    coverImageAlt: "Support engineer assisting a colleague at a workstation",
    imageSide: "left",
    imageHeight: 564,
    imageFrame: "plain",
    imagePosition: "object-[14%_2%]",
    overview: [],
    deliverables: [],
    process: [],
  },
];

type SanityImage = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityProcessStep = { title?: string; description?: string };

type SanityService = {
  _id?: string;
  title?: string;
  slug?: string;
  number?: string;
  summary?: string;
  icon?: string;
  order?: number;
  features?: string[];
  coverImage?: SanityImage;
  imageSide?: string;
  imageHeight?: number;
  imageFrame?: string;
  imagePosition?: string;
  overview?: string[];
  deliverables?: string[];
  process?: SanityProcessStep[];
};

type SanityServicesPage = {
  heroTitle?: string;
  heroDescription?: string;
  heroCta?: SanityCtaLink;
  showcaseCta?: SanityCtaLink;
};

function mapProcess(steps: SanityProcessStep[] | undefined): ProcessStep[] {
  return (
    steps
      ?.map((step) => {
        const title = step.title?.trim();
        const description = step.description?.trim();
        return title && description ? { title, description } : null;
      })
      .filter((step): step is ProcessStep => step !== null) ?? []
  );
}

function mapService(doc: SanityService | null): Service | null {
  const title = doc?.title?.trim();
  const slug = doc?.slug?.trim();
  if (!doc || !title || !slug) return null;

  const fallback = FALLBACK_SERVICES.find((item) => item.slug === slug);
  const imageSide = doc.imageSide === "left" ? "left" : "right";
  const imageFrame = doc.imageFrame === "blush" ? "blush" : "plain";
  const features = mapStrings(doc.features, fallback?.features ?? []);
  const deliverables = mapStrings(doc.deliverables, features);

  return {
    _id: doc._id ?? slug,
    title,
    slug,
    number: doc.number?.trim() || fallback?.number || "",
    summary: doc.summary?.trim() ?? "",
    icon: doc.icon?.trim() || fallback?.icon || "sparkles",
    features,
    coverImageUrl:
      getImageUrl(doc.coverImage, 1200) || fallback?.coverImageUrl || "",
    coverImageAlt:
      doc.coverImage?.alt?.trim() || fallback?.coverImageAlt || title,
    imageSide: imageSide || fallback?.imageSide || "right",
    imageHeight: doc.imageHeight || fallback?.imageHeight || 564,
    imageFrame: imageFrame || fallback?.imageFrame || "plain",
    ...(doc.imagePosition?.trim() || fallback?.imagePosition
      ? {
          imagePosition:
            doc.imagePosition?.trim() || fallback?.imagePosition,
        }
      : {}),
    coverImage: doc.coverImage,
    overview: mapStrings(doc.overview, fallback?.overview ?? []),
    deliverables,
    process: mapProcess(doc.process),
  };
}

export async function getServicesPage(): Promise<ServicesPageContent> {
  const doc = await sanityFetch<SanityServicesPage | null>(servicesPageQuery);
  if (!doc?.heroTitle?.trim()) return FALLBACK_SERVICES_PAGE;

  return {
    heroTitle: doc.heroTitle.trim(),
    heroDescription:
      doc.heroDescription?.trim() || FALLBACK_SERVICES_PAGE.heroDescription,
    heroCta: mapCtaLink(doc.heroCta, FALLBACK_SERVICES_PAGE.heroCta),
    showcaseCta: mapCtaLink(
      doc.showcaseCta,
      FALLBACK_SERVICES_PAGE.showcaseCta,
    ),
  };
}

export async function getServices(): Promise<Service[]> {
  const docs = await sanityFetch<SanityService[] | null>(servicesQuery);
  const services =
    docs
      ?.map(mapService)
      .filter((service): service is Service => service !== null) ?? [];

  return services.length > 0 ? services : FALLBACK_SERVICES;
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  const doc = await sanityFetch<SanityService | null>(serviceBySlugQuery, {
    slug,
  });
  const service = mapService(doc);
  if (service) return service;

  return FALLBACK_SERVICES.find((item) => item.slug === slug) ?? null;
}
