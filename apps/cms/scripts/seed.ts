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
    id: "service-software-development",
    title: "Software Development",
    slug: "software-development",
    order: 1,
    icon: "code",
    summary:
      "We design and develop tailored software solutions that help businesses solve complex challenges, improve efficiency, and create new opportunities for growth.",
    overview: [
      "We design and develop tailored software solutions that help businesses solve complex challenges, improve efficiency, and create new opportunities for growth.",
    ],
    deliverables: [] as string[],
    process: [] as { title: string; description: string }[],
  },
  {
    id: "service-web-development",
    title: "Web Development",
    slug: "web-development",
    order: 2,
    icon: "code",
    summary:
      "We create modern, responsive web experiences that bring your brand, products, and services to life while delivering a seamless experience across devices.",
    overview: [
      "We create modern, responsive web experiences that bring your brand, products, and services to life while delivering a seamless experience across devices.",
    ],
    deliverables: [],
    process: [],
  },
  {
    id: "service-mobile-app-development",
    title: "Mobile App Development",
    slug: "mobile-app-development",
    order: 3,
    icon: "code",
    summary:
      "We create intuitive, high-performing mobile applications that help businesses connect with customers and deliver value wherever they are",
    overview: [
      "We create intuitive, high-performing mobile applications that help businesses connect with customers and deliver value wherever they are",
    ],
    deliverables: [],
    process: [],
  },
  {
    id: "service-it-consulting-and-advisory",
    title: "IT Consulting & Advisory",
    slug: "it-consulting-and-advisory",
    order: 4,
    icon: "code",
    summary:
      "We provide strategic technology guidance to help businesses make informed decisions, overcome challenges, and get more value from their technology investments.",
    overview: [
      "We provide strategic technology guidance to help businesses make informed decisions, overcome challenges, and get more value from their technology investments.",
    ],
    deliverables: [],
    process: [],
  },
  {
    id: "service-cloud-services-aws-azure-gcp",
    title: "Cloud Services (AWS, Azure, GCP)",
    slug: "cloud-services-aws-azure-gcp",
    order: 5,
    icon: "cloud",
    summary:
      "We help businesses leverage cloud technology to build flexible, scalable, and reliable infrastructure designed for changing business needs.",
    overview: [
      "We help businesses leverage cloud technology to build flexible, scalable, and reliable infrastructure designed for changing business needs.",
    ],
    deliverables: [],
    process: [],
  },
  {
    id: "service-data-science-and-ai-ml-solutions",
    title: "Data Science & AI/ML Solutions",
    slug: "data-science-and-ai-ml-solutions",
    order: 6,
    icon: "database",
    summary:
      "We help businesses turn data into actionable intelligence and explore AI-powered solutions that support smarter decisions and new opportunities.",
    overview: [
      "We help businesses turn data into actionable intelligence and explore AI-powered solutions that support smarter decisions and new opportunities.",
    ],
    deliverables: [],
    process: [],
  },
];

function keyed<T extends object>(items: T[], prefix: string) {
  return items.map((item, index) => ({ _key: `${prefix}-${index}`, ...item }));
}

const websitePublicDir = join(cmsDir, "../website/public");

async function uploadPublicImage(
  relativePath: string,
  filename: string,
  alt: string,
) {
  const filePath = join(websitePublicDir, relativePath);
  if (!existsSync(filePath)) {
    console.warn(`  ! Image not found at ${filePath}`);
    return undefined;
  }

  const buffer = readFileSync(filePath);
  const asset = await client.assets.upload("image", buffer, {
    filename,
    contentType: "image/png",
  });

  return {
    _type: "image" as const,
    asset: {
      _type: "reference" as const,
      _ref: asset._id,
    },
    alt,
  };
}

async function seed() {
  console.log(`Seeding ${projectId}/${dataset}…`);

  const heroImage = await uploadPublicImage(
    "figma/home/hero.png",
    "home-hero.png",
    "ZurichTech hero illustration",
  );
  if (heroImage) console.log("  ✓ Hero image uploaded");

  const whyImage = await uploadPublicImage(
    "figma/home/why-choose-us.png",
    "home-why-choose-us.png",
    "ZurichTech team in the office",
  );
  if (whyImage) console.log("  ✓ Why Choose Us image uploaded");

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
    heroTitleLine1: "Engineering the systems",
    heroTitleLine2: "your ",
    heroTitleHighlight: "business actually runs on.",
    heroDescription:
      "We design, build and secure software, cloud platforms and digital products with senior engineers, written commitments and delivery dates that hold",
    heroPrimaryCta: { label: "Learn more", href: "/about" },
    heroSecondaryCta: { label: "Our services", href: "/services" },
    ...(heroImage ? { heroImage } : {}),
    clientLogos: keyed(
      [
        { _type: "clientLogo", name: "Synergy", logoSrc: "/figma/home/logo-synergy.svg" },
        { _type: "clientLogo", name: "Horizon", logoSrc: "/figma/home/logo-horizon.svg" },
        { _type: "clientLogo", name: "Catalyst", logoSrc: "/figma/home/logo-catalyst.svg" },
        { _type: "clientLogo", name: "Phoenix", logoSrc: "/figma/home/logo-phoenix.svg" },
        { _type: "clientLogo", name: "Solaris", logoSrc: "/figma/home/logo-solaris.svg" },
        { _type: "clientLogo", name: "Apex", logoSrc: "/figma/home/logo-apex.svg" },
        { _type: "clientLogo", name: "Aurora", logoSrc: "/figma/home/logo-aurora.svg" },
        { _type: "clientLogo", name: "Pulse", logoSrc: "/figma/home/logo-pulse.svg" },
      ],
      "logo",
    ),
    statsTitle:
      "The gap between business ambition and technology execution shouldn't hold you back.",
    statsDescription:
      "Businesses need technology that does more than simply keep up. From complex systems and evolving infrastructure to growing security demands, the right technology partner helps turn challenges into opportunities for sustainable growth.",
    stats: keyed(
      [
        { _type: "stat", value: "120+", label: "Project Delivered" },
        { _type: "stat", value: "98%", label: "On-time delivery" },
        { _type: "stat", value: "10+", label: "Engineering Experience" },
      ],
      "stat",
    ),
    whyEyebrow: "why Choose Us?",
    whyTitle: "Technology expertise built around what your business needs next.",
    ...(whyImage ? { whyImage } : {}),
    whyPoints: keyed(
      [
        {
          _type: "whyPoint",
          number: "01",
          title: "Business-focused technology",
          body: "We take the time to understand your business challenges before building solutions, ensuring every technology decision supports meaningful operational and business outcomes.",
        },
        {
          _type: "whyPoint",
          number: "02",
          title: "Expertise across the technology stack",
          body: "From software and web development to cloud, DevOps, cybersecurity, and IT audit, we bring the technical capability needed to solve complex challenges with confidence.",
        },
        {
          _type: "whyPoint",
          number: "03",
          title: "Built for sustainable growth",
          body: "We create reliable, scalable technology solutions that help businesses improve operations today while building a stronger foundation for tomorrow",
        },
      ],
      "why",
    ),
    whyCta: { label: "Learn more about Us", href: "/about" },
    servicesTitle: "Technology solutions built to move your business forward.",
    servicesCta: { label: "Get in Touch", href: "/contact" },
    insightsTitle: "Ideas, insights and technology shaping what's next.",
    insightsCta: { label: "Learn More", href: "/blogs" },
    insights: keyed(
      [
        {
          _type: "insightCard",
          category: "Cloud",
          title: "Building Technology That Scales With Your Business",
          excerpt:
            "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
          imageSrc: "/figma/home/insight-1.png",
          href: "/blogs/migrate-to-cloud-without-downtime",
        },
        {
          _type: "insightCard",
          category: "IT consulting",
          title: "Turning Complex Challenges Into Smarter Technology",
          excerpt:
            "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
          imageSrc: "/figma/home/insight-2.png",
          href: "/blogs/migrate-to-cloud-without-downtime",
        },
        {
          _type: "insightCard",
          category: "Cloud",
          title: "The Role of Cloud Technology in Building Agile Businesses",
          excerpt:
            "Learn how cloud solutions can help organisations become more flexible, efficient, and ready to adapt to changing business demands",
          imageSrc: "/figma/home/insight-3.png",
          href: "/blogs/migrate-to-cloud-without-downtime",
        },
        {
          _type: "insightCard",
          category: "web development",
          title: "Building Better Digital Experiences Through Technology",
          excerpt:
            "From websites to custom software, discover how thoughtfully designed digital solutions can create better experiences for both businesses and their customers.",
          imageSrc: "/figma/home/insight-4.png",
          href: "/blogs/migrate-to-cloud-without-downtime",
        },
        {
          _type: "insightCard",
          category: "IT consulting",
          title: "Preparing Your Technology for What Comes Next",
          excerpt:
            "Technology should support where your business is going, not just where it is today. Explore how scalable solutions can help you build with confidence for the future.",
          imageSrc: "/figma/home/insight-5.png",
          href: "/blogs/migrate-to-cloud-without-downtime",
        },
        {
          _type: "insightCard",
          category: "AI",
          title: "Harnessing Artificial Intelligence for Smarter Decisions",
          excerpt:
            "Explore how AI-driven insights empower businesses to make data-backed decisions that boost productivity and innovation.",
          imageSrc: "/figma/home/insight-1.png",
          href: "/blogs/migrate-to-cloud-without-downtime",
        },
      ],
      "insight",
    ),
    teamEyebrow: "Our team",
    teamTitle: "ZurichTech Professionals",
    homeTeam: keyed(
      [
        {
          _type: "homeTeamMember",
          name: "Adekunle, Muh'D Thanni",
          role: "Chief Technology Officer",
          imageSrc: "/figma/home/team-1.png",
          objectPosition: "object-[center_20%]",
        },
        {
          _type: "homeTeamMember",
          name: "Dr. Onyinyechi",
          role: "Chief of Operation",
          imageSrc: "/figma/home/team-2.png",
          objectPosition: "object-center",
          raised: true,
        },
        {
          _type: "homeTeamMember",
          name: "Jadesola Alao",
          role: "Chief Marketing Officer",
          imageSrc: "/figma/home/team-3.png",
          objectPosition: "object-[center_top]",
        },
        {
          _type: "homeTeamMember",
          name: "Dr. Joy Godiya",
          role: "Chief Executive Officer",
          imageSrc: "/figma/home/team-4.png",
          objectPosition: "object-[center_15%]",
          raised: true,
        },
      ],
      "member",
    ),
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
