import type { SanityImageSource } from "@sanity/image-url";

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

export const FALLBACK_SERVICES: Service[] = [
  {
    _id: "fallback-product-engineering",
    title: "Product engineering",
    slug: "product-engineering",
    summary:
      "Web and mobile products built in reviewable increments, with tests that make them safe to change.",
    icon: "code",
    overview: [
      "We join as an embedded team or take the build outright, depending on what you already have in place.",
      "Every engagement ships to a real environment in the first two weeks.",
    ],
    deliverables: [
      "Working application deployed to your infrastructure",
      "Test suite and CI pipeline",
      "Handover documentation",
    ],
    process: [
      {
        title: "Scope",
        description:
          "A short discovery pass that produces a written plan, a timeline, and a number.",
      },
      {
        title: "Build",
        description:
          "Two-week cycles with a demo and a deployable build at the end of each one.",
      },
      {
        title: "Hand over",
        description:
          "Documentation, a walkthrough, and a support window while your team takes the wheel.",
      },
    ],
  },
  {
    _id: "fallback-cloud-platform",
    title: "Cloud & platform",
    slug: "cloud-platform",
    summary:
      "Infrastructure as code, CI/CD, observability, and cost control on AWS, GCP, or Azure.",
    icon: "cloud",
    overview: [
      "We set up the boring parts properly: environments, secrets, deploys, alerts, and backups.",
    ],
    deliverables: [
      "Infrastructure defined in code",
      "Automated deploy pipeline",
      "Monitoring and alerting baseline",
    ],
    process: [
      {
        title: "Audit",
        description:
          "A read of what you run today, what it costs, and where it breaks.",
      },
      {
        title: "Migrate",
        description:
          "Incremental moves with a rollback path at every step.",
      },
      {
        title: "Operate",
        description: "Runbooks and dashboards your on-call can actually use.",
      },
    ],
  },
  {
    _id: "fallback-data-ai",
    title: "Data & AI",
    slug: "data-ai",
    summary:
      "Pipelines, warehouses, dashboards, and model integrations built on the data you already have.",
    icon: "database",
    overview: [
      "Most teams do not have a data problem, they have a plumbing problem. We start there.",
    ],
    deliverables: [
      "Ingestion pipelines and a modelled warehouse",
      "Dashboards for the metrics you actually watch",
      "Model or LLM integration where it earns its keep",
    ],
    process: [
      {
        title: "Map",
        description: "Where the data lives now and who needs it.",
      },
      {
        title: "Pipe",
        description: "Reliable, monitored ingestion into one place.",
      },
      {
        title: "Serve",
        description: "Dashboards, APIs, or model endpoints on top.",
      },
    ],
  },
];

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
