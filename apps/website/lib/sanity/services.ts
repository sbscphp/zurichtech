import type { SanityImageSource } from "@sanity/image-url";

import { HOME_SERVICES } from "@/lib/site/content";

import { sanityFetch } from "./fetch";
import {
  serviceBySlugQuery,
  servicesPageQuery,
  servicesQuery,
} from "./queries";
import { mapStrings } from "./types";

export type ProcessStep = {
  title: string;
  description: string;
};

export type Service = {
  _id: string;
  title: string;
  slug: string;
  summary: string;
  icon: string;
  coverImage?: SanityImageSource;
  overview: string[];
  deliverables: string[];
  process: ProcessStep[];
};

export type ServicesPageContent = {
  heroEyebrow: string;
  heroTitle: string;
  heroDescription: string;
  directoryTitle: string;
  directoryDescription: string;
};

export const FALLBACK_SERVICES_PAGE: ServicesPageContent = {
  heroEyebrow: "Services",
  heroTitle: "What we do",
  heroDescription:
    "Four practices, one team. Engage us for a single piece of work or for the whole build.",
  directoryTitle: "Our practices",
  directoryDescription:
    "Each engagement starts with a scoping call and a written plan before any code is written.",
};

export const FALLBACK_SERVICES: Service[] = HOME_SERVICES.map((service, index) => {
  const slug = service.title
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return {
    _id: `fallback-${slug}`,
    title: service.title,
    slug,
    summary: service.description,
    icon: index < 3 ? "code" : index < 5 ? "cloud" : "database",
    overview: [service.description],
    deliverables: [],
    process: [],
  };
});

type SanityProcessStep = { title?: string; description?: string };

type SanityService = {
  _id?: string;
  title?: string;
  slug?: string;
  summary?: string;
  icon?: string;
  coverImage?: SanityImageSource;
  overview?: string[];
  deliverables?: string[];
  process?: SanityProcessStep[];
};

type SanityServicesPage = {
  heroEyebrow?: string;
  heroTitle?: string;
  heroDescription?: string;
  directoryTitle?: string;
  directoryDescription?: string;
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

  return {
    _id: doc._id ?? slug,
    title,
    slug,
    summary: doc.summary?.trim() ?? "",
    icon: doc.icon?.trim() ?? "sparkles",
    coverImage: doc.coverImage,
    overview: mapStrings(doc.overview, []),
    deliverables: mapStrings(doc.deliverables, []),
    process: mapProcess(doc.process),
  };
}

export async function getServicesPage(): Promise<ServicesPageContent> {
  const doc = await sanityFetch<SanityServicesPage | null>(servicesPageQuery);
  if (!doc?.heroTitle?.trim()) return FALLBACK_SERVICES_PAGE;

  return {
    heroEyebrow:
      doc.heroEyebrow?.trim() || FALLBACK_SERVICES_PAGE.heroEyebrow,
    heroTitle: doc.heroTitle.trim(),
    heroDescription:
      doc.heroDescription?.trim() || FALLBACK_SERVICES_PAGE.heroDescription,
    directoryTitle:
      doc.directoryTitle?.trim() || FALLBACK_SERVICES_PAGE.directoryTitle,
    directoryDescription:
      doc.directoryDescription?.trim() ||
      FALLBACK_SERVICES_PAGE.directoryDescription,
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
