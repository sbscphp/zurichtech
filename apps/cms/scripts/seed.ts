/**
 * Seeds the Studio with the same starter content the website falls back to,
 * so a fresh dataset matches what you see before any editing.
 *
 * Usage: pnpm --filter cms seed
 * Requires SANITY_API_WRITE_TOKEN (Editor permissions) in apps/cms/.env.local.
 */
import { createClient } from "@sanity/client";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const cmsDir = join(dirname(fileURLToPath(import.meta.url)), "..");

function loadEnvFile(filename: string) {
  const filePath = join(cmsDir, filename);
  if (!existsSync(filePath)) return;

  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;

    const separatorIndex = trimmed.indexOf("=");
    if (separatorIndex === -1) continue;

    const key = trimmed.slice(0, separatorIndex).trim();
    const value = trimmed.slice(separatorIndex + 1).trim();
    if (!process.env[key]) process.env[key] = value;
  }
}

loadEnvFile(".env.local");
loadEnvFile(".env");

const projectId = process.env.SANITY_STUDIO_PROJECT_ID;
const dataset = process.env.SANITY_STUDIO_DATASET ?? "production";
const token =
  process.env.SANITY_API_WRITE_TOKEN ?? process.env.SANITY_AUTH_TOKEN;

if (!projectId) {
  throw new Error("Missing SANITY_STUDIO_PROJECT_ID in apps/cms/.env.local");
}

if (!token) {
  throw new Error(
    [
      "Missing SANITY_API_WRITE_TOKEN in apps/cms/.env.local",
      "",
      "Seeding needs an Editor API token (Deploy tokens cannot write content).",
      `1. Open https://www.sanity.io/manage/project/${projectId}/api/tokens`,
      '2. Create a token with "Editor" permissions',
      "3. Add SANITY_API_WRITE_TOKEN=<token> to apps/cms/.env.local",
      "",
      "Then rerun: pnpm --filter cms seed",
    ].join("\n"),
  );
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  token,
  useCdn: false,
});

const services = [
  {
    id: "service-product-engineering",
    title: "Product engineering",
    slug: "product-engineering",
    order: 1,
    icon: "code",
    summary:
      "Web and mobile products built in reviewable increments, with tests that make them safe to change.",
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
    id: "service-cloud-platform",
    title: "Cloud & platform",
    slug: "cloud-platform",
    order: 2,
    icon: "cloud",
    summary:
      "Infrastructure as code, CI/CD, observability, and cost control on AWS, GCP, or Azure.",
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
        description: "Incremental moves with a rollback path at every step.",
      },
      {
        title: "Operate",
        description: "Runbooks and dashboards your on-call can actually use.",
      },
    ],
  },
  {
    id: "service-data-ai",
    title: "Data & AI",
    slug: "data-ai",
    order: 3,
    icon: "database",
    summary:
      "Pipelines, warehouses, dashboards, and model integrations built on the data you already have.",
    overview: [
      "Most teams do not have a data problem, they have a plumbing problem. We start there.",
    ],
    deliverables: [
      "Ingestion pipelines and a modelled warehouse",
      "Dashboards for the metrics you actually watch",
      "Model or LLM integration where it earns its keep",
    ],
    process: [
      { title: "Map", description: "Where the data lives now and who needs it." },
      { title: "Pipe", description: "Reliable, monitored ingestion into one place." },
      { title: "Serve", description: "Dashboards, APIs, or model endpoints on top." },
    ],
  },
];

function keyed<T extends object>(items: T[], prefix: string) {
  return items.map((item, index) => ({ _key: `${prefix}-${index}`, ...item }));
}

async function seed() {
  console.log(`Seeding ${projectId}/${dataset}…`);

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "Zuritech",
    tagline: "Software, data, and cloud engineering for teams that ship.",
    newsletterTitle: "Stay in the loop",
    newsletterDescription:
      "Occasional notes on what we are building and what we are learning. No noise.",
    navLinks: keyed(
      [
        { _type: "link", label: "Home", href: "/" },
        { _type: "link", label: "About", href: "/about" },
        { _type: "link", label: "Services", href: "/services" },
        { _type: "link", label: "Contact", href: "/contact" },
      ],
      "nav",
    ),
    footerLinks: keyed(
      [
        { _type: "link", label: "About", href: "/about" },
        { _type: "link", label: "Services", href: "/services" },
        { _type: "link", label: "Contact", href: "/contact" },
      ],
      "footer",
    ),
    socialLinks: keyed(
      [
        { _type: "link", label: "LinkedIn", href: "#" },
        { _type: "link", label: "X", href: "#" },
        { _type: "link", label: "GitHub", href: "#" },
      ],
      "social",
    ),
    contactEmail: "hello@zuritech.com",
    contactPhone: "+234 000 000 0000",
    contactAddress: "Lagos, Nigeria",
  });
  console.log("  ✓ Site Settings");

  await client.createOrReplace({
    _id: "homePage",
    _type: "homePage",
    heroEyebrow: "Zuritech",
    heroTitle: "Engineering teams build here.",
    heroDescription:
      "We design, build, and run software for companies that need their product to work on day one and keep working after that.",
    heroPrimaryCta: { label: "Start a project", href: "/contact" },
    heroSecondaryCta: { label: "See our services", href: "/services" },
    highlightsTitle: "What we bring to the table",
    highlights: keyed(
      [
        {
          _type: "highlight",
          title: "Product engineering",
          description:
            "Web and mobile products shipped in small, reviewable increments — with the tests and tooling to keep them safe to change.",
        },
        {
          _type: "highlight",
          title: "Cloud & platform",
          description:
            "Infrastructure that scales down as easily as it scales up, so you pay for what you actually use.",
        },
        {
          _type: "highlight",
          title: "Data & AI",
          description:
            "Pipelines, dashboards, and model integrations that turn the data you already collect into decisions.",
        },
      ],
      "highlight",
    ),
    ctaTitle: "Have something in mind?",
    ctaDescription:
      "Tell us what you are building and we will come back with a plan, a timeline, and a number.",
    ctaButton: { label: "Talk to us", href: "/contact" },
  });
  console.log("  ✓ Home Page");

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroEyebrow: "About us",
    heroTitle: "A small team with a long attention span.",
    heroDescription:
      "Zuritech is a product engineering studio. We work with founders and in-house teams to take software from an idea to something people rely on.",
    storyTitle: "Our story",
    storyBody: [
      "Zuritech started as a two-person contract team and grew into a studio that handles product, platform, and data work end to end.",
      "We keep engagements small on purpose. Fewer clients, more context, and enough time to do the unglamorous parts properly.",
    ],
    missionTitle: "Mission",
    missionBody:
      "Build software our clients can hand to their own engineers without an apology.",
    visionTitle: "Vision",
    visionBody:
      "To be the engineering partner teams call first when the work actually has to hold up.",
    values: keyed(
      [
        {
          _type: "value",
          title: "Ship small",
          description:
            "Short cycles, reviewable changes, and a working deployment at every step.",
        },
        {
          _type: "value",
          title: "Own the outcome",
          description:
            "We measure ourselves on whether the thing works in production, not on hours billed.",
        },
        {
          _type: "value",
          title: "Leave it readable",
          description:
            "Documentation, tests, and code your team can pick up without us in the room.",
        },
      ],
      "value",
    ),
    team: keyed(
      [
        {
          _type: "teamMember",
          name: "Add your first team member",
          role: "Studio",
          bio: "Team members are managed in the CMS under About Page → Team.",
        },
      ],
      "member",
    ),
  });
  console.log("  ✓ About Page");

  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    heroEyebrow: "Services",
    heroTitle: "What we do",
    heroDescription:
      "Four practices, one team. Engage us for a single piece of work or for the whole build.",
    directoryTitle: "Our practices",
    directoryDescription:
      "Each engagement starts with a scoping call and a written plan before any code is written.",
  });
  console.log("  ✓ Services Page");

  for (const item of services) {
    await client.createOrReplace({
      _id: item.id,
      _type: "service",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      summary: item.summary,
      order: item.order,
      icon: item.icon,
      overview: item.overview,
      deliverables: item.deliverables,
      process: keyed(
        item.process.map((step) => ({ _type: "processStep", ...step })),
        `${item.slug}-step`,
      ),
    });
    console.log(`  ✓ Service — ${item.title}`);
  }

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroEyebrow: "Contact",
    heroTitle: "Tell us what you are building.",
    heroDescription:
      "Send us a short brief and we will reply within two working days with next steps — or with an honest no if we are not the right fit.",
    formTitle: "Send a message",
    formDescription:
      "The more context you give us, the more useful our first reply will be.",
    successMessage: "Thanks — your message is in. We will be in touch shortly.",
  });
  console.log("  ✓ Contact Page");

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
