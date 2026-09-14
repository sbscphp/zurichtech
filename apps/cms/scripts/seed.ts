/**
 * Seeds the Studio with the same starter content the website falls back to,
 * so a fresh dataset matches what you see before any editing.
 *
 * Usage:
 *   pnpm --filter cms seed:dev          # recommended — seeds development dataset only
 *   pnpm --filter cms seed              # blocked if SANITY_STUDIO_DATASET is production
 *   pnpm --filter cms seed:production   # explicit opt-in for production (overwrites content)
 *
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

const PRODUCTION_DATASET_NAMES = new Set(["production", "prod"]);

function assertSeedTargetAllowed() {
  const normalizedDataset = dataset.trim().toLowerCase();
  const allowProduction =
    process.argv.includes("--allow-production") ||
    process.env.SEED_ALLOW_PRODUCTION === "1" ||
    process.env.SEED_ALLOW_PRODUCTION === "true";

  if (!PRODUCTION_DATASET_NAMES.has(normalizedDataset)) {
    return;
  }

  if (allowProduction) {
    console.warn(
      `⚠ Seeding PRODUCTION dataset "${dataset}" — createOrReplace will overwrite documents.`,
    );
    return;
  }

  throw new Error(
    [
      `Refusing to seed production dataset "${dataset}".`,
      "",
      "This script uses createOrReplace and replaces Studio content with repo seed data.",
      "",
      "For local / staging:",
      "  pnpm --filter cms seed:dev",
      "  (uses dataset \"development\" — create it in Sanity Manage if needed)",
      "",
      "Studio deploy (pnpm --filter cms deploy:production) is safe — it does not run seed.",
      "",
      "Only if you intentionally reset production:",
      "  pnpm --filter cms seed:production",
      "  Export a backup from Sanity Manage first.",
    ].join("\n"),
  );
}

const services = [
  {
    id: "service-software-development",
    title: "Software Development",
    slug: "software-development",
    number: "01",
    order: 1,
    summary:
      "Custom software solutions designed to solve complex business challenges and support long-term growth.",
    features: [
      "Enterprise applications and business platforms",
      "Custom software and system integration",
      "API development and third-party integrations",
      "Application modernisation and optimisation",
    ],
    imagePath: "figma/services/service-01-software-development.png",
    imageFile: "service-01-software-development.png",
    imageAlt: "Developer working across a desktop and laptop filled with code",
    imageSide: "right" as const,
    imageHeight: 566,
    imageFrame: "plain" as const,
  },
  {
    id: "service-web-development",
    title: "Web Development",
    slug: "web-development",
    number: "02",
    order: 2,
    summary:
      "Intuitive, high-performing mobile experiences built to keep your business connected with users wherever they are.",
    features: [
      "Native and cross-platform mobile applications",
      "Customer-facing and enterprise mobile solutions",
      "API and backend integration",
      "App maintenance and performance optimisation",
    ],
    imagePath: "figma/services/service-02-web-development.png",
    imageFile: "service-02-web-development.png",
    imageAlt: "Person using a mobile application",
    imageSide: "left" as const,
    imageHeight: 564,
    imageFrame: "plain" as const,
    imagePosition: "object-[12%_10%]",
  },
  {
    id: "service-cybersecurity-and-id-audit",
    title: "Cybersecurity and ID Audit",
    slug: "cybersecurity-and-id-audit",
    number: "03",
    order: 3,
    summary:
      "Practical security solutions designed to protect your systems, data and operations in an evolving digital landscape.",
    features: [
      "Security assessments and risk management",
      "Infrastructure and application security",
      "Identity and access management",
      "Security monitoring and incident readiness",
    ],
    imagePath: "figma/services/service-03-cybersecurity.png",
    imageFile: "service-03-cybersecurity.png",
    imageAlt: "Security operations dashboard being monitored",
    imageSide: "right" as const,
    imageHeight: 564,
    imageFrame: "blush" as const,
    imagePosition: "object-[13%_4%]",
  },
  {
    id: "service-cloud-solutions-and-devops",
    title: "Cloud Solutions and Devops",
    slug: "cloud-solutions-and-devops",
    number: "04",
    order: 4,
    summary:
      "Flexible and scalable cloud solutions that help your business operate efficiently, securely and with confidence.",
    features: [
      "Cloud strategy and migration",
      "Cloud infrastructure and architecture",
      "Multi-cloud and hybrid cloud solutions",
      "Cloud optimisation and cost management",
    ],
    imagePath: "figma/services/cloud-solutions.png",
    imageFile: "cloud-solutions.png",
    imageAlt: "Cloud icon representing cloud solutions and DevOps",
    imageSide: "left" as const,
    imageHeight: 546,
    imageFrame: "plain" as const,
  },
  {
    id: "service-it-consulting-and-advisory",
    title: "IT Consulting & Advisory",
    slug: "it-consulting-and-advisory",
    number: "05",
    order: 5,
    summary:
      "Strategic technology guidance that helps you make smarter decisions and get more value from your technology investments.",
    features: [
      "Technology strategy and digital transformation",
      "IT infrastructure and architecture advisory",
      "Technology assessments and roadmaps",
      "Systems and process optimisation",
    ],
    imagePath: "figma/services/service-05-it-consulting.png",
    imageFile: "service-05-it-consulting.png",
    imageAlt: "Consultants reviewing a technology roadmap together",
    imageSide: "right" as const,
    imageHeight: 564,
    imageFrame: "plain" as const,
  },
  {
    id: "service-it-support-and-maintenance",
    title: "IT Support & Maintenance",
    slug: "it-support-and-maintenance",
    number: "06",
    order: 6,
    summary:
      "Reliable, ongoing support that keeps your technology secure, efficient and performing at its best.",
    features: [
      "Proactive system monitoring and maintenance",
      "Technical support and issue resolution",
      "Software updates and infrastructure management",
      "Performance, security and reliability optimisation",
    ],
    imagePath: "figma/services/service-06-it-support.png",
    imageFile: "service-06-it-support.png",
    imageAlt: "Support engineer assisting a colleague at a workstation",
    imageSide: "left" as const,
    imageHeight: 564,
    imageFrame: "plain" as const,
    imagePosition: "object-[14%_2%]",
  },
];

const OBSOLETE_SERVICE_IDS = [
  "service-mobile-app-development",
  "service-cloud-services-aws-azure-gcp",
  "service-data-science-and-ai-ml-solutions",
];

function keyed<T extends object>(items: T[], prefix: string) {
  return items.map((item, index) => ({ _key: `${prefix}-${index}`, ...item }));
}

const websitePublicDir = join(cmsDir, "../website/public");

function contentTypeForFilename(filename: string) {
  const extension = filename.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "svg":
      return "image/svg+xml";
    case "jpg":
    case "jpeg":
      return "image/jpeg";
    case "webp":
      return "image/webp";
    case "gif":
      return "image/gif";
    default:
      return "image/png";
  }
}

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
    contentType: contentTypeForFilename(filename),
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
  assertSeedTargetAllowed();
  console.log(`Seeding ${projectId}/${dataset}…`);

  const heroImage = await uploadPublicImage(
    "figma/home/hero-image.png",
    "home-hero-image.png",
    "ZurichTech hero",
  );
  if (heroImage) console.log("  ✓ Hero image uploaded");

  const whyImage = await uploadPublicImage(
    "figma/home/why-choose-us.png",
    "home-why-choose-us.png",
    "ZurichTech team in the office",
  );
  if (whyImage) console.log("  ✓ Why Choose Us image uploaded");

  const clientLogoSources = [
    { name: "Synergy", file: "logo-synergy.svg" },
    { name: "Horizon", file: "logo-horizon.svg" },
    { name: "Catalyst", file: "logo-catalyst.svg" },
    { name: "Phoenix", file: "logo-phoenix.svg" },
    { name: "Solaris", file: "logo-solaris.svg" },
    { name: "Apex", file: "logo-apex.svg" },
    { name: "Aurora", file: "logo-aurora.svg" },
    { name: "Pulse", file: "logo-pulse.svg" },
  ] as const;

  const clientLogos = [];
  for (const [index, source] of clientLogoSources.entries()) {
    const logo = await uploadPublicImage(
      `figma/home/${source.file}`,
      source.file,
      `${source.name} logo`,
    );
    if (!logo) continue;
    clientLogos.push({
      _key: `logo-${index}`,
      _type: "clientLogo" as const,
      name: source.name,
      logo,
    });
  }
  if (clientLogos.length > 0) {
    console.log(`  ✓ ${clientLogos.length} client logos uploaded`);
  }
  const ctaPattern = await uploadPublicImage(
    "figma/shared/cta-pattern.png",
    "footer-cta-pattern.png",
    "Footer CTA pattern",
  );
  if (ctaPattern) console.log("  ✓ Footer CTA pattern uploaded");

  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    siteName: "ZurichTech",
    tagline:
      "Engineering the systems your business runs on. Software, cloud and security engineering for organisations that cannot afford to get it wrong.",
    newsletterTitle: "Stay in the loop",
    newsletterDescription:
      "Occasional notes on what we are building and what we are learning. No noise.",
    navLinks: keyed(
      [
        { _type: "link", label: "Home", href: "/" },
        { _type: "link", label: "About Us", href: "/about" },
        { _type: "link", label: "Services", href: "/services" },
        { _type: "link", label: "Blogs", href: "/blogs" },
        { _type: "link", label: "Why Choose Us", href: "/why-choose-us" },
      ],
      "nav",
    ),
    headerCta: { label: "Contact Us", href: "/contact" },
    footerServicesTitle: "services",
    footerServiceLinks: keyed(
      [
        {
          _type: "link",
          label: "Software Development",
          href: "/services#software-development",
        },
        {
          _type: "link",
          label: "Web Development",
          href: "/services#web-development",
        },
        {
          _type: "link",
          label: "Cloud Solution & DevOps",
          href: "/services#cloud-solutions-and-devops",
        },
        {
          _type: "link",
          label: "Cybersecurity & IT audit",
          href: "/services#cybersecurity-and-id-audit",
        },
        {
          _type: "link",
          label: "IT Consulting",
          href: "/services#it-consulting-and-advisory",
        },
      ],
      "footer-service",
    ),
    footerCompanyTitle: "Company",
    footerCompanyLinks: keyed(
      [
        { _type: "link", label: "About Us", href: "/about" },
        { _type: "link", label: "Services", href: "/services" },
        { _type: "link", label: "Insights", href: "/blogs" },
        { _type: "link", label: "Contact Us", href: "/contact" },
        { _type: "link", label: "Policy and Legal", href: "/legal" },
      ],
      "footer-company",
    ),
    footerContactTitle: "Contact Us",
    copyrightText: "© 2026 ZurichTech. All Rights Reserved.",
    creditText: "Designed and Developed by SSBC UK, 2026",
    socialLinks: keyed(
      [
        { _type: "link", label: "LinkedIn", href: "#" },
        { _type: "link", label: "X", href: "#" },
        { _type: "link", label: "GitHub", href: "#" },
      ],
      "social",
    ),
    ctaTitlePrefix: "Powering Opportunities. ",
    ctaTitleHighlight: "Building the Future.",
    ctaDescription:
      "Unlock sustainable opportunities, develop transformative energy solutions, and create lasting value for the future.",
    ctaButton: { label: "Work With Us", href: "/partners" },
    ...(ctaPattern ? { ctaPattern } : {}),
    contactEmails: [
      "info@zurichtechnologies.com.ng",
      "princesanni@zurichtechnologies.com.ng",
    ],
    contactPhones: ["+234 802 863 3332"],
    contactAddress:
      "No. 7 Rhine Street, Off Ibrahim Babangida Boulevard, Ministers Hill, Maitama, Abuja",
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
    ...(clientLogos.length > 0 ? { clientLogos } : {}),
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
    whyTitlePrefix: "Technology expertise built around what your ",
    whyTitleHighlight: "business needs next.",
    ...(whyImage ? { whyImage } : {}),
    whyPoints: keyed(
      [
        {
          _type: "whyPoint",
          number: "01",
          title: "Business-focused technology",
          body: "We understand your challenges first, then create solutions that support meaningful business outcomes and drive sustainable growth.",
        },
        {
          _type: "whyPoint",
          number: "02",
          title: "Expertise across the technology stack",
          body: "We provide expertise across software, cloud, DevOps, cybersecurity, and IT audit to solve complex challenges.",
        },
        {
          _type: "whyPoint",
          number: "03",
          title: "Built for sustainable growth",
          body: "We create reliable, scalable technology solutions that help businesses improve operations today while building a stronger foundation for tomorrow.",
        },
      ],
      "why",
    ),
    whyCta: { label: "Learn more", href: "/about" },
    servicesTitle: "Technology solutions built to move your business forward.",
    servicesCta: { label: "Get in Touch", href: "/contact" },
    insightsTitle: "Ideas, insights and technology shaping what's next.",
    insightsCta: { label: "Learn More", href: "/blogs" },
    insights: await (async () => {
      const insightSources = [
        {
          category: "Cloud",
          title: "Building Technology That Scales With Your Business",
          excerpt:
            "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
          imagePath: "figma/home/cloud-tech.png",
          imageFile: "cloud-tech.png",
          href: "/blogs",
        },
        {
          category: "IT consulting",
          title: "Turning Complex Challenges Into Smarter Technology",
          excerpt:
            "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
          imagePath: "figma/blogs/IT-consulting.png",
          imageFile: "IT-consulting.png",
          href: "/blogs",
        },
        {
          category: "Cloud",
          title: "The Role of Cloud Technology in Building Agile Businesses",
          excerpt:
            "Learn how cloud solutions can help organisations become more flexible, efficient, and ready to adapt to changing business demands",
          imagePath: "figma/home/cloud-tech.png",
          imageFile: "cloud-tech.png",
          href: "/blogs",
        },
        {
          category: "web development",
          title: "Building Better Digital Experiences Through Technology",
          excerpt:
            "From websites to custom software, discover how thoughtfully designed digital solutions can create better experiences for both businesses and their customers.",
          imagePath: "figma/home/code-image.png",
          imageFile: "code-image.png",
          href: "/blogs",
        },
        {
          category: "IT consulting",
          title: "Preparing Your Technology for What Comes Next",
          excerpt:
            "Technology should support where your business is going, not just where it is today. Explore how scalable solutions can help you build with confidence for the future.",
          imagePath: "figma/blogs/IT-consulting.png",
          imageFile: "IT-consulting.png",
          href: "/blogs",
        },
        {
          category: "AI",
          title: "Harnessing Artificial Intelligence for Smarter Decisions",
          excerpt:
            "Explore how AI-driven insights empower businesses to make data-backed decisions that boost productivity and innovation.",
          imagePath: "figma/home/insight-1.png",
          imageFile: "insight-1.png",
          href: "/blogs",
        },
      ] as const;

      const uploadedByPath = new Map<
        string,
        NonNullable<Awaited<ReturnType<typeof uploadPublicImage>>>
      >();
      const insights = [];

      for (const [index, source] of insightSources.entries()) {
        let image = uploadedByPath.get(source.imagePath);
        if (!image) {
          image = await uploadPublicImage(
            source.imagePath,
            source.imageFile,
            source.title,
          );
          if (image) uploadedByPath.set(source.imagePath, image);
        }
        if (!image) continue;

        insights.push({
          _key: `insight-${index}`,
          _type: "insightCard" as const,
          category: source.category,
          title: source.title,
          excerpt: source.excerpt,
          href: source.href,
          image,
        });
      }

      if (insights.length > 0) {
        console.log(`  ✓ ${insights.length} insight images uploaded`);
      }

      return insights;
    })(),
    teamEyebrow: "Our team",
    teamTitle: "ZurichTech Professionals",
    homeTeam: await (async () => {
      const teamSources = [
        {
          name: "Adekunle, Muh'D Thanni",
          role: "Chief Technology Officer",
          file: "teammate-1.png",
          objectPosition: "object-center",
          raised: false,
        },
        {
          name: "Dr. Onyinyechi",
          role: "Chief of Operation",
          file: "teammate-2.png",
          objectPosition: "object-center",
          raised: true,
        },
        {
          name: "Jadesola Alao",
          role: "Chief Marketing Officer",
          file: "teammate-3.png",
          objectPosition: "object-center",
          raised: false,
        },
        {
          name: "Dr. Joy Godiya",
          role: "Chief Executive Officer",
          file: "teammate-4.png",
          objectPosition: "object-center",
          raised: true,
        },
      ] as const;

      const homeTeam = [];
      for (const [index, source] of teamSources.entries()) {
        const photo = await uploadPublicImage(
          `figma/home/${source.file}`,
          source.file,
          source.name,
        );
        if (!photo) continue;

        homeTeam.push({
          _key: `member-${index}`,
          _type: "homeTeamMember" as const,
          name: source.name,
          role: source.role,
          photo,
          objectPosition: source.objectPosition,
          ...(source.raised ? { raised: true } : {}),
        });
      }

      if (homeTeam.length > 0) {
        console.log(`  ✓ ${homeTeam.length} team photos uploaded`);
      }

      return homeTeam;
    })(),
  });
  console.log("  ✓ Home Page");

  const storyImage = await uploadPublicImage(
    "figma/about/story.png",
    "about-story.png",
    "ZurichTech team collaborating",
  );
  if (storyImage) console.log("  ✓ About story image uploaded");

  const aboutTeamSources = [
    {
      name: "Adekunle, Muh'D Thanni",
      role: "Chief Technology Officer",
      file: "teammate-1.png",
      objectPosition: "object-center",
    },
    {
      name: "Dr. Onyinyechi",
      role: "Chief of Operation",
      file: "teammate-2.png",
      objectPosition: "object-center",
    },
    {
      name: "Jadesola Alao",
      role: "Chief Marketing Officer",
      file: "teammate-3.png",
      objectPosition: "object-center",
    },
    {
      name: "Dr. Joy Godiya",
      role: "Chief Executive Officer",
      file: "teammate-4.png",
      objectPosition: "object-center",
    },
  ] as const;

  const aboutTeam = [];
  for (const [index, source] of aboutTeamSources.entries()) {
    const photo = await uploadPublicImage(
      `figma/home/${source.file}`,
      `about-${source.file}`,
      source.name,
    );
    if (!photo) continue;
    aboutTeam.push({
      _key: `about-member-${index}`,
      _type: "teamMember" as const,
      name: source.name,
      role: source.role,
      photo,
      objectPosition: source.objectPosition,
    });
  }
  if (aboutTeam.length > 0) {
    console.log(`  ✓ ${aboutTeam.length} about team photos uploaded`);
  }

  const aboutValueSources = [
    {
      title: "Client Focus",
      description:
        "We put our clients' objectives and requirements at the center of the solutions",
      file: "icon-client.svg",
      tint: "bg-[rgba(76,110,245,0.1)]",
    },
    {
      title: "Collaboration",
      description:
        "We believe the best outcomes come from working closely with clients.",
      file: "icon-collab.svg",
      tint: "bg-[rgba(18,184,134,0.1)]",
    },
    {
      title: "Accountability",
      description: "A named lead owns your outcome from kickoff to handover.",
      file: "icon-account.svg",
      tint: "bg-[rgba(250,176,5,0.1)]",
    },
    {
      title: "Innovation",
      description:
        "We are open to new ideas, and approaches that can help solve problems.",
      file: "icon-innovation.svg",
      tint: "bg-brand-soft",
    },
  ] as const;

  const aboutValues = [];
  for (const [index, source] of aboutValueSources.entries()) {
    const icon = await uploadPublicImage(
      `figma/about/${source.file}`,
      source.file,
      `${source.title} icon`,
    );
    aboutValues.push({
      _key: `about-value-${index}`,
      _type: "value" as const,
      title: source.title,
      description: source.description,
      tint: source.tint,
      ...(icon ? { icon } : {}),
    });
  }
  if (aboutValues.length > 0) {
    console.log(`  ✓ ${aboutValues.length} about value icons uploaded`);
  }

  const aboutTestimonialSources = [
    {
      category: "IT consulting",
      quote:
        "“Zurich rebuilt our loan origination platform in five months. It now processes four times the volume with fewer support tickets than the system it replaced.”",
      name: "Jadesola Alao",
      role: "CFO | SBSC UK",
      file: "team-3.png",
      objectPosition: "object-[center_top]",
    },
    {
      category: "Cloud migration",
      quote:
        "“Thanks to their expertise, our data is now securely hosted on the cloud, improving accessibility and performance significantly.”",
      name: "Anika Sharma",
      role: "CTO | Horizon Ventures",
      file: "team-4.png",
      objectPosition: "object-[center_15%]",
    },
    {
      category: "Cybersecurity",
      quote:
        "“They implemented robust security measures that have protected us from multiple threats without hampering user experience.”",
      name: "Diego Fernández",
      role: "Head of IT | SecureNet",
      file: "team-2.png",
      objectPosition: "object-center",
    },
  ] as const;

  const aboutTestimonials = [];
  for (const [index, source] of aboutTestimonialSources.entries()) {
    const photo = await uploadPublicImage(
      `figma/home/${source.file}`,
      `about-testimonial-${source.file}`,
      source.name,
    );
    if (!photo) continue;
    aboutTestimonials.push({
      _key: `about-testimonial-${index}`,
      _type: "testimonial" as const,
      category: source.category,
      quote: source.quote,
      name: source.name,
      role: source.role,
      photo,
      objectPosition: source.objectPosition,
    });
  }
  if (aboutTestimonials.length > 0) {
    console.log(`  ✓ ${aboutTestimonials.length} about testimonials uploaded`);
  }

  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "Powering Progress. Creating Lasting Value.",
    heroDescription:
      "We bring together expertise, innovation and partnerships to deliver energy solutions that drive sustainable growth",
    heroCta: { label: "Partner With Us", href: "/partners" },
    storyEyebrow: "why work with Us",
    storyTitleHighlight: "Building Technology",
    storyTitleRest: " Around Your Business",
    storyBody: [
      "Zurich Technology is a technology solutions company focused on helping organizations make better use of technology. We combine technical expertise, innovative thinking, and a clear understanding of business requirements to develop solutions that are practical, scalable, secure, and built for long-term value.",
      "Our capabilities span software development, web development, cloud solutions and DevOps, and cybersecurity and identity audit. Across every engagement, our focus remains the same: understand the challenge, identify the right approach, and deliver technology that supports the organization's objectives.",
      "Whether a business needs to develop a new digital product, improve its online presence, modernize its technology environment, or strengthen its security posture, Zurich Technology provides the expertise needed to move from ideas and requirements to effective solutions.",
    ],
    storyCta: { label: "Contact Us", href: "/contact" },
    ...(storyImage ? { storyImage } : {}),
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
    ...(aboutTeam.length > 0 ? { team: aboutTeam } : {}),
    valuesEyebrow: "CORE VALUES",
    valuesTitle: "The Principle Behind Our Work",
    ...(aboutValues.length > 0 ? { values: aboutValues } : {}),
    testimonialsEyebrow: "TESTIMONIALS",
    testimonialsTitle: "What our Clients Says",
    ...(aboutTestimonials.length > 0
      ? { testimonials: aboutTestimonials }
      : {}),
  });
  console.log("  ✓ About Page");

  await client.createOrReplace({
    _id: "servicesPage",
    _type: "servicesPage",
    heroTitle: "Technology solutions for every stage of your digital journey.",
    heroDescription:
      "From digital products to cloud, security, and data, we deliver the expertise businesses need to solve complex challenges and move forward with confidence.",
    heroCta: { label: "Let’s work Together", href: "/partners" },
    showcaseCta: { label: "Let’s work Together", href: "/partners" },
  });
  console.log("  ✓ Services Page");

  for (const obsoleteId of OBSOLETE_SERVICE_IDS) {
    try {
      await client.delete(obsoleteId);
      console.log(`  ✓ Removed obsolete service ${obsoleteId}`);
    } catch {
      // Document may not exist on a fresh dataset.
    }
  }

  for (const item of services) {
    const coverImage = await uploadPublicImage(
      item.imagePath,
      item.imageFile,
      item.imageAlt,
    );

    await client.createOrReplace({
      _id: item.id,
      _type: "service",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      number: item.number,
      summary: item.summary,
      order: item.order,
      features: item.features,
      imageSide: item.imageSide,
      imageHeight: item.imageHeight,
      imageFrame: item.imageFrame,
      ...("imagePosition" in item && item.imagePosition
        ? { imagePosition: item.imagePosition }
        : {}),
      ...(coverImage ? { coverImage } : {}),
      overview: [item.summary],
      process: [],
    });
    console.log(`  ✓ Service — ${item.title}`);
  }

  const blogPosts = [
    {
      id: "blog-turning-complex-challenges",
      slug: "turning-complex-challenges-into-smarter-technology",
      title: "Turning Complex Challenges Into Smarter Technology",
      category: "IT consulting",
      excerpt:
        "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
      imagePath: "figma/blogs/IT-consulting.png",
      imageFile: "IT-consulting.png",
      order: 1,
      date: "May 18, 2026",
      readTime: "4 mins read",
      heroSubtitle:
        "Explore fresh perspectives, industry trends, and useful insights from the world of technology and innovation.",
      intro: [
        "Cloud migration is often treated as a technology upgrade. In reality, it is an operational transformation that affects applications, data, infrastructure, security, employees, customers, and business processes.",
        "The technical challenge is only one part of the equation. The bigger challenge is moving critical workloads from one environment to another without disrupting the people and systems that depend on them.",
        "For organizations running customer-facing applications, financial systems, internal platforms, or other business-critical workloads, downtime is more than an inconvenience. It can mean lost revenue, frustrated customers, interrupted operations, and reputational damage.",
        "A well-planned migration does not depend on luck. It depends on preparation, testing, observability, controlled cutovers, and a clear recovery strategy.",
      ],
      sections: [
        {
          heading: "Start With the Workload, Not the Cloud Provider",
          paragraphs: [
            "One of the most common migration mistakes is choosing a cloud platform before understanding what actually needs to move.",
            "Before selecting a migration approach, organizations should build a clear inventory of their applications, databases, integrations, infrastructure dependencies, security requirements, and operational processes.",
            "Some workloads may be ideal candidates for a direct migration. Others may require restructuring, modernization, or replacement.",
          ],
          listIntro: "A useful assessment should answer:",
          listItems: [
            "What does this application depend on?",
            "What databases or services does it communicate with?",
            "How sensitive is the data?",
            "What level of availability does the business require?",
            "How much downtime can the organization tolerate?",
            "What happens if the migration needs to be reversed?",
          ],
          listOutro: "These answers shape the migration strategy.",
        },
      ],
    },
    {
      id: "blog-migrate-to-cloud-without-downtime",
      slug: "migrate-to-cloud-without-downtime",
      title: "How to Migrate to the Cloud Without a Single Minute of Downtime",
      category: "Cloud",
      excerpt:
        "Explore fresh perspectives, industry trends, and useful insights from the world of technology and innovation.",
      imagePath: "figma/blogs/insight-heroimage.png",
      imageFile: "insight-heroimage.png",
      order: 2,
      date: "May 18, 2026",
      readTime: "4 mins read",
      heroSubtitle:
        "Explore fresh perspectives, industry trends, and useful insights from the world of technology and innovation.",
      intro: [
        "Cloud migration is often treated as a technology upgrade. In reality, it is an operational transformation that affects applications, data, infrastructure, security, employees, customers, and business processes.",
        "The technical challenge is only one part of the equation. The bigger challenge is moving critical workloads from one environment to another without disrupting the people and systems that depend on them.",
        "For organizations running customer-facing applications, financial systems, internal platforms, or other business-critical workloads, downtime is more than an inconvenience. It can mean lost revenue, frustrated customers, interrupted operations, and reputational damage.",
        "A well-planned migration does not depend on luck. It depends on preparation, testing, observability, controlled cutovers, and a clear recovery strategy.",
      ],
      sections: [
        {
          heading: "Start With the Workload, Not the Cloud Provider",
          paragraphs: [
            "One of the most common migration mistakes is choosing a cloud platform before understanding what actually needs to move.",
            "Before selecting a migration approach, organizations should build a clear inventory of their applications, databases, integrations, infrastructure dependencies, security requirements, and operational processes.",
            "Some workloads may be ideal candidates for a direct migration. Others may require restructuring, modernization, or replacement.",
          ],
          listIntro: "A useful assessment should answer:",
          listItems: [
            "What does this application depend on?",
            "What databases or services does it communicate with?",
            "How sensitive is the data?",
            "What level of availability does the business require?",
            "How much downtime can the organization tolerate?",
            "What happens if the migration needs to be reversed?",
          ],
          listOutro: "These answers shape the migration strategy.",
        },
      ],
    },
    {
      id: "blog-harnessing-ai",
      slug: "harnessing-artificial-intelligence-for-smarter-decisions",
      title: "Harnessing Artificial Intelligence for Smarter Decisions",
      category: "AI",
      excerpt:
        "Explore how AI-driven insights empower businesses to make data-backed decisions that boost productivity and innovation.",
      imagePath: "figma/home/insight-1.png",
      imageFile: "insight-1.png",
      order: 3,
    },
    {
      id: "blog-building-technology-scales-sidebar",
      slug: "building-technology-that-scales-data-analysis",
      title: "Building Technology That Scales With Your Business",
      category: "DATA ANALYSIS",
      excerpt:
        "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
      imagePath: "figma/blogs/blog-card2.png",
      imageFile: "blog-card2.png",
      order: 4,
    },
    {
      id: "blog-integrating-ai-customer",
      slug: "integrating-ai-to-enhance-customer-experiences",
      title: "Integrating AI to Enhance Customer Experiences",
      category: "AI",
      excerpt:
        "Learn how AI technologies can personalize interactions, improve satisfaction, and drive customer loyalty.",
      imagePath: "figma/home/insight-3.png",
      imageFile: "insight-3.png",
      order: 5,
    },
    {
      id: "blog-building-technology-scales-cloud",
      slug: "building-technology-that-scales-with-your-business",
      title: "Building Technology That Scales With Your Business",
      category: "Cloud",
      excerpt:
        "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
      imagePath: "figma/blogs/explore-img1.png",
      imageFile: "explore-img1.png",
      order: 10,
      showOnHomePage: true,
    },
    {
      id: "blog-turning-complex-explore",
      slug: "turning-complex-challenges-explore",
      title: "Turning Complex Challenges Into Smarter Technology",
      category: "IT Consulting",
      excerpt:
        "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
      imagePath: "figma/blogs/IT-consulting.png",
      imageFile: "IT-consulting.png",
      order: 11,
      showOnHomePage: true,
    },
    {
      id: "blog-cloud-agile-businesses",
      slug: "the-role-of-cloud-technology-in-building-agile-businesses",
      title: "The Role of Cloud Technology in Building Agile Businesses",
      category: "Cloud",
      excerpt:
        "Learn how cloud solutions can help organisations become more flexible, efficient, and ready to adapt to changing business demands",
      imagePath: "figma/blogs/explore-img1.png",
      imageFile: "explore-img1.png",
      order: 12,
      showOnHomePage: true,
    },
    {
      id: "blog-mitigating-threats",
      slug: "mitigating-threats-through-proactive-security-measures",
      title: "Mitigating Threats Through Proactive Security Measures",
      category: "Risk Management",
      excerpt:
        "Explore strategies to identify vulnerabilities and implement robust security protocols.",
      imagePath: "figma/blogs/explore-img4.png",
      imageFile: "explore-img4.png",
      order: 13,
    },
    {
      id: "blog-protecting-digital-world",
      slug: "protecting-your-business-in-a-digital-world",
      title: "Protecting Your Business in a Digital World",
      category: "Cybersecurity",
      excerpt:
        "Understand the essentials of cybersecurity to safeguard your assets and maintain trust with your customers.",
      imagePath: "figma/blogs/explore-img5.png",
      imageFile: "explore-img5.png",
      order: 14,
    },
    {
      id: "blog-resilient-systems",
      slug: "building-resilient-systems-against-cyber-attacks",
      title: "Building Resilient Systems Against Cyber Attacks",
      category: "Cybersecurity",
      excerpt:
        "Learn best practices for designing infrastructure that can withstand evolving cyber threats.",
      imagePath: "figma/blogs/explore-img5.png",
      imageFile: "explore-img5.png",
      order: 15,
    },
    {
      id: "blog-devops-delivery",
      slug: "accelerating-software-delivery-with-devops",
      title: "Accelerating Software Delivery with DevOps",
      category: "DevOps",
      excerpt:
        "Discover how DevOps practices improve collaboration, speed, and quality in software development.",
      imagePath: "figma/blogs/explore-img6.png",
      imageFile: "explore-img6.png",
      order: 16,
    },
    {
      id: "blog-agile-teams",
      slug: "building-agile-teams-for-competitive-advantage",
      title: "Building Agile Teams for Competitive Advantage",
      category: "Web",
      excerpt:
        "Learn methods to foster a culture of continuous improvement and innovation.",
      imagePath: "figma/blogs/explore-img7.png",
      imageFile: "explore-img7.png",
      order: 17,
    },
    {
      id: "blog-streamlining-workflows",
      slug: "streamlining-workflows-for-faster-releases",
      title: "Streamlining Workflows for Faster Releases",
      category: "Software",
      excerpt:
        "Implement pipelines that automate testing and deployment for seamless delivery.",
      imagePath: "figma/blogs/explore-img7.png",
      imageFile: "explore-img7.png",
      order: 18,
    },
    {
      id: "blog-scalable-saas",
      slug: "delivering-scalable-software-solutions-on-demand",
      title: "Delivering Scalable Software Solutions on Demand",
      category: "SaaS",
      excerpt:
        "Understand the benefits of SaaS models for flexibility, cost-effectiveness, and rapid deployment.",
      imagePath: "figma/blogs/explore-img8.png",
      imageFile: "explore-img8.png",
      order: 19,
    },
    {
      id: "blog-seamless-access",
      slug: "enabling-seamless-access-and-collaboration",
      title: "Enabling Seamless Access and Collaboration",
      category: "Cloud Services",
      excerpt:
        "Leverage SaaS platforms to improve user experience and operational agility.",
      imagePath: "figma/blogs/explore-img1.png",
      imageFile: "explore-img1.png",
      order: 20,
    },
    {
      id: "blog-subscription-saas",
      slug: "transforming-business-models-with-subscription-based-software",
      title: "Transforming Business Models with Subscription-Based Software",
      category: "SaaS",
      excerpt:
        "Learn how SaaS drives innovation and customer-centric development.",
      imagePath: "figma/blogs/explore-img8.png",
      imageFile: "explore-img8.png",
      order: 21,
    },
  ] as const;

  const uploadedBlogImages = new Map<
    string,
    NonNullable<Awaited<ReturnType<typeof uploadPublicImage>>>
  >();

  for (const post of blogPosts) {
    let coverImage = uploadedBlogImages.get(post.imagePath);
    if (!coverImage) {
      coverImage = await uploadPublicImage(
        post.imagePath,
        post.imageFile,
        post.title,
      );
      if (coverImage) uploadedBlogImages.set(post.imagePath, coverImage);
    }

    const hasBody = "intro" in post && Array.isArray(post.intro);

    const doc: Record<string, unknown> = {
      _id: post.id,
      _type: "blogPost",
      title: post.title,
      slug: { _type: "slug", current: post.slug },
      category: post.category,
      excerpt: post.excerpt,
      order: post.order,
      ...("showOnHomePage" in post && post.showOnHomePage
        ? { showOnHomePage: true }
        : {}),
      ...(coverImage ? { coverImage } : {}),
    };

    if (hasBody) {
      const full = post as (typeof blogPosts)[0];
      doc.date = full.date;
      doc.readTime = full.readTime;
      doc.heroSubtitle = full.heroSubtitle;
      doc.intro = full.intro;
      doc.sections = keyed(
        full.sections.map((section) => ({
          _type: "blogSection" as const,
          heading: section.heading,
          paragraphs: section.paragraphs,
          ...(section.listIntro ? { listIntro: section.listIntro } : {}),
          ...(section.listItems ? { listItems: section.listItems } : {}),
          ...(section.listOutro ? { listOutro: section.listOutro } : {}),
        })),
        `${post.slug}-section`,
      );
    } else {
      doc.intro = [post.excerpt];
      doc.heroSubtitle = post.excerpt;
    }

    await client.createOrReplace(doc as { _id: string; _type: string });
    console.log(`  ✓ Blog — ${post.title}`);
  }

  const blogsHeroImage = await uploadPublicImage(
    "figma/blogs/hero.png",
    "blogs-hero.png",
    "Blogs hero",
  );
  if (blogsHeroImage) console.log("  ✓ Blogs hero image uploaded");

  await client.createOrReplace({
    _id: "blogsPage",
    _type: "blogsPage",
    heroTitle: "Where technology meets insight.",
    ...(blogsHeroImage ? { heroImage: blogsHeroImage } : {}),
    recentTitle: "Recents Insights",
    exploreTitle: "Explore more Insights",
    featuredPost: {
      _type: "reference",
      _ref: "blog-turning-complex-challenges",
    },
    sidebarPosts: [
      {
        _key: "sidebar-0",
        _type: "reference",
        _ref: "blog-harnessing-ai",
      },
      {
        _key: "sidebar-1",
        _type: "reference",
        _ref: "blog-building-technology-scales-sidebar",
      },
      {
        _key: "sidebar-2",
        _type: "reference",
        _ref: "blog-integrating-ai-customer",
      },
    ],
  });
  console.log("  ✓ Blogs Page");

  const whyStoryImage = await uploadPublicImage(
    "figma/why-choose-us/story.png",
    "why-choose-us-story.png",
    "ZurichTech colleagues in discussion",
  );
  if (whyStoryImage) console.log("  ✓ Why Choose Us story image uploaded");

  const whyPillarSources = [
    {
      title: "Design That Stand Out",
      body: "Modern, engaging visuals created to capture attention and connect with your audience.",
      file: "icon-design.svg",
      tint: "bg-[rgba(76,110,245,0.1)]",
    },
    {
      title: "Speed & Security Built In",
      body: "Enjoy seamless performance with solutions designed to keep your data secured and protected.",
      file: "icon-bolt.svg",
      tint: "bg-[rgba(250,82,82,0.1)]",
    },
    {
      title: "Affordable & Built to Scale",
      body: "Flexible pricing and solutions designed to grow alongside your business.",
      file: "icon-scale.svg",
      tint: "bg-[rgba(18,184,134,0.1)]",
    },
    {
      title: "Support Beyond Delivery",
      body: "We remain available after delivery to help maintain, improve, and support your solution.",
      file: "icon-support.svg",
      tint: "bg-[rgba(250,176,5,0.1)]",
    },
  ] as const;

  const whyPillars = [];
  for (const [index, source] of whyPillarSources.entries()) {
    const icon = await uploadPublicImage(
      `figma/why-choose-us/${source.file}`,
      source.file,
      `${source.title} icon`,
    );
    whyPillars.push({
      _key: `why-pillar-${index}`,
      _type: "whyPillar" as const,
      title: source.title,
      body: source.body,
      tint: source.tint,
      ...(icon ? { icon } : {}),
    });
  }
  if (whyPillars.length > 0) {
    console.log(`  ✓ ${whyPillars.length} why-choose-us pillars uploaded`);
  }

  await client.createOrReplace({
    _id: "whyChooseUsPage",
    _type: "whyChooseUsPage",
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
    ...(whyStoryImage ? { storyImage: whyStoryImage } : {}),
    ...(whyPillars.length > 0 ? { pillars: whyPillars } : {}),
    differenceEyebrow: "OUR DIFFERENCE",
    differenceTitlePrefix: "What Sets ",
    differenceTitleHighlight: "Zuritech",
    differenceTitleSuffix: " Apart.",
    difference: keyed(
      [
        {
          _type: "whyDifference",
          title: "Business-First Thinking",
          body: "We don't believe technology should be introduced simply because it is new or popular. We first look at the problem you are trying to solve, the outcome you want to achieve.",
        },
        {
          _type: "whyDifference",
          title: "Solutions Built Around Your Needs",
          body: "Every organization has different processes, challenges, and priorities. We take these differences into consideration when developing solutions. Whether we're building software or improving infrastructure, we focus on what makes sense for your specific environment.",
        },
        {
          _type: "whyDifference",
          title: "Practical Innovation",
          body: "There is always a new technology, platform, framework, or trend promising to change the way businesses operate. We focus on what is genuinely useful. Our approach is to identify where technology can improve.",
        },
        {
          _type: "whyDifference",
          title: "End-to-End Technology Thinking",
          body: "Software, infrastructure, security, websites, data, users, and business processes are often connected. A decision made in one area can affect another. That's why we consider the wider technology environment.",
        },
        {
          _type: "whyDifference",
          title: "Built for Growth",
          body: "We don't believe technology should be introduced simply because it is new or popular. We first look at the problem you are trying to solve, the outcome you want to achieve.",
        },
        {
          _type: "whyDifference",
          title: "Clear and Collaborative",
          body: "Technology can become complicated quickly. We believe communication shouldn't. We aim to keep requirements, decisions, progress, and expectations clear throughout the engagement.",
        },
      ],
      "why-diff",
    ),
  });
  console.log("  ✓ Why Choose Us Page");

  const contactHeroImage = await uploadPublicImage(
    "figma/contact/hero.png",
    "contact-hero.png",
    "Contact page hero",
  );
  if (contactHeroImage) console.log("  ✓ Contact hero image uploaded");

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",
    heroTitle: "Share your ideas with us, and together we can build it.",
    ...(contactHeroImage ? { heroImage: contactHeroImage } : {}),
    formNote: "Your opinion matters to us...",
    submitLabel: "Send enquiry",
    successMessage: "Thanks — your message is in. We will be in touch shortly.",
    infoTitle: "Contact Information",
    infoDescription: "Reach out to us with ease.",
  });
  console.log("  ✓ Contact Page");

  const partnersHeroImage = await uploadPublicImage(
    "figma/partners/hero.png",
    "partners-hero.png",
    "Partners page hero",
  );
  if (partnersHeroImage) console.log("  ✓ Partners hero image uploaded");

  await client.createOrReplace({
    _id: "partnersPage",
    _type: "partnersPage",
    heroTitle: "Let’s build what’s next, together.",
    ...(partnersHeroImage ? { heroImage: partnersHeroImage } : {}),
    trustedByLabel: "TRUSTED BY:",
    inquiryTitle: "SELECT A SERVICE",
    formNote: "Your opinion matters to us...",
    submitLabel: "Send enquiry",
    successMessage: "Thanks — your message is in. We will be in touch shortly.",
    infoTitle: "Contact Information",
    infoDescription: "Reach out to us with ease.",
  });
  console.log("  ✓ Partners Page");

  await client.createOrReplace({
    _id: "projectsPage",
    _type: "projectsPage",
    heroTitle: "Technology Solutions Built to Make an Impact.",
    heroDescription:
      "Explore selected projects that demonstrate how we turn business challenges, ideas, and technology requirements into practical digital solutions.",
    heroCta: { label: "Let’s work Together", href: "/contact" },
    listingEyebrow: "our Projects",
    listingTitle: "Technology solutions built to move your business forward.",
  });
  console.log("  ✓ Projects Page");

  const { PROJECTS, CASE_STUDY } = await import(
    "../../website/lib/site/portfolio"
  );

  const projectSeeds = [
    {
      ...PROJECTS[0],
      id: "project-innovixus-labs-website",
      order: 1,
      imageFile: "project-1.png",
      caseStudyTitle: CASE_STUDY.title,
      detailImagePath: "figma/portfolio/detail-hero.png",
      detailImageFile: "project-detail-hero.png",
      about: CASE_STUDY.about,
      purpose: CASE_STUDY.purpose,
      challenges: CASE_STUDY.challenges,
      approach: CASE_STUDY.approach,
    },
    {
      ...PROJECTS[1],
      id: "project-food-delivery-mobile-app",
      order: 2,
      imageFile: "project-2.png",
    },
    {
      ...PROJECTS[2],
      id: "project-healthcare-ecommerce-platform",
      order: 3,
      imageFile: "project-3.png",
    },
    {
      ...PROJECTS[3],
      id: "project-healthcare-web-mobile",
      order: 4,
      imageFile: "project-1.png",
    },
    {
      ...PROJECTS[4],
      id: "project-healthcare-web-portal",
      order: 5,
      imageFile: "project-5.png",
    },
    {
      ...PROJECTS[5],
      id: "project-school-management-platform",
      order: 6,
      imageFile: "project-6.png",
    },
  ];

  for (const item of projectSeeds) {
    const coverImage = await uploadPublicImage(
      `figma/portfolio/${item.imageFile}`,
      item.imageFile,
      item.title,
    );
    const detailImage =
      "detailImagePath" in item && item.detailImagePath && item.detailImageFile
        ? await uploadPublicImage(
            item.detailImagePath,
            item.detailImageFile,
            item.title,
          )
        : undefined;

    const hasCaseStudy =
      "about" in item && Array.isArray(item.about) && item.about.length > 0;

    await client.createOrReplace({
      _id: item.id,
      _type: "project",
      title: item.title,
      slug: { _type: "slug", current: item.slug },
      category: item.category,
      excerpt: item.excerpt,
      ...(coverImage ? { coverImage } : {}),
      ...(item.imageClass ? { imagePosition: item.imageClass } : {}),
      tags: item.tags,
      order: item.order,
      ...(hasCaseStudy
        ? {
            caseStudyTitle: item.caseStudyTitle,
            ...(detailImage ? { detailImage } : {}),
            about: item.about,
            purpose: {
              heading: item.purpose.heading,
              body: item.purpose.body,
              intro: item.purpose.intro,
              items: item.purpose.items,
            },
            challenges: {
              heading: item.challenges.heading,
              paragraphs: item.challenges.paragraphs,
              intro: item.challenges.intro,
              items: item.challenges.items,
            },
            approach: {
              heading: item.approach.heading,
              body: item.approach.body,
              items: item.approach.items,
            },
          }
        : {
            caseStudyTitle: item.title,
            about: [
              item.excerpt,
              `This case study covers how we delivered ${item.title} as a practical digital solution.`,
            ],
            purpose: {
              heading: `Delivering ${item.title}`,
              body: item.excerpt,
              intro: "The engagement focused on:",
              items: [
                "Clarifying requirements and success criteria",
                "Designing a usable digital experience",
                "Building a maintainable solution",
              ],
            },
            challenges: {
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
            approach: {
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
          }),
    });
    console.log(`  ✓ Project — ${item.title}`);
  }

  const legalHeroImage = await uploadPublicImage(
    "figma/legal/banner.png",
    "legal-banner.png",
    "Legal page banner",
  );
  if (legalHeroImage) console.log("  ✓ Legal banner uploaded");

  const { POLICIES, POLICY_TABS } = await import(
    "../../website/lib/site/legal"
  );

  await client.createOrReplace({
    _id: "legalPage",
    _type: "legalPage",
    heroTitle: "Policy and Legals",
    ...(legalHeroImage ? { heroImage: legalHeroImage } : {}),
    defaultPolicyId: "privacy",
    policies: keyed(
      POLICY_TABS.map((tab) => {
        const policy = POLICIES[tab.id];
        return {
          _type: "policy",
          id: tab.id,
          tabLabel: tab.label,
          heading: policy.heading,
          updated: policy.updated,
          intro: policy.intro,
          sections: keyed(
            policy.sections.map((section) => ({
              _type: "policySection",
              title: section.title,
              paragraphs: section.paragraphs ?? [],
              bullets: section.bullets ?? [],
              after: section.after ?? [],
            })),
            `${tab.id}-section`,
          ),
        };
      }),
      "policy",
    ),
  });
  console.log("  ✓ Legal Page");

  console.log("Seed complete.");
}

seed().catch((error) => {
  console.error(error);
  process.exit(1);
});
