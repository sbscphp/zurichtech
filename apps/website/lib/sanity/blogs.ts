import type { SanityImageSource } from "@sanity/image-url";

import { BLOG_POSTS } from "@/lib/site/blogs";

import { sanityFetch } from "./fetch";
import { getImageUrl } from "./image";
import {
  blogPostBySlugQuery,
  blogPostsForHomeQuery,
  blogPostsQuery,
  blogsPageQuery,
} from "./queries";
import { mapStrings, type InsightCard } from "./types";

export type BlogCard = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
};

export type BlogSection = {
  heading: string;
  paragraphs: string[];
  listIntro?: string;
  listItems?: string[];
  listOutro?: string;
};

export type BlogPost = {
  _id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  imageSrc: string;
  imageAlt: string;
  date: string;
  readTime: string;
  heroSubtitle: string;
  intro: string[];
  sections: BlogSection[];
};

export type BlogsPageContent = {
  heroTitle: string;
  heroImageUrl: string;
  heroImageAlt: string;
  recentTitle: string;
  exploreTitle: string;
  featured: BlogCard | null;
  sidebar: BlogCard[];
  explore: BlogCard[];
};

const FALLBACK_HERO = "/figma/blogs/hero.png";

const FALLBACK_CARDS: BlogCard[] = [
  {
    _id: "fallback-featured",
    slug: "migrate-to-cloud-without-downtime",
    title: "Turning Complex Challenges Into Smarter Technology",
    category: "IT consulting",
    excerpt:
      "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
    imageSrc: "/figma/blogs/IT-consulting.png",
    imageAlt: "",
  },
  {
    _id: "fallback-sidebar-1",
    slug: "harnessing-artificial-intelligence-for-smarter-decisions",
    title: "Harnessing Artificial Intelligence for Smarter Decisions",
    category: "AI",
    excerpt:
      "Explore how AI-driven insights empower businesses to make data-backed decisions that boost productivity and innovation.",
    imageSrc: "/figma/home/insight-1.png",
    imageAlt: "",
  },
  {
    _id: "fallback-sidebar-2",
    slug: "building-technology-that-scales-with-your-business",
    title: "Building Technology That Scales With Your Business",
    category: "DATA ANALYSIS",
    excerpt:
      "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
    imageSrc: "/figma/blogs/blog-card2.png",
    imageAlt: "",
  },
  {
    _id: "fallback-sidebar-3",
    slug: "integrating-ai-to-enhance-customer-experiences",
    title: "Integrating AI to Enhance Customer Experiences",
    category: "AI",
    excerpt:
      "Learn how AI technologies can personalize interactions, improve satisfaction, and drive customer loyalty.",
    imageSrc: "/figma/home/insight-3.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-1",
    slug: "building-technology-that-scales-with-your-business-grid",
    title: "Building Technology That Scales With Your Business",
    category: "Cloud",
    excerpt:
      "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
    imageSrc: "/figma/blogs/explore-img1.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-2",
    slug: "turning-complex-challenges-into-smarter-technology",
    title: "Turning Complex Challenges Into Smarter Technology",
    category: "IT Consulting",
    excerpt:
      "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
    imageSrc: "/figma/blogs/IT-consulting.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-3",
    slug: "the-role-of-cloud-technology-in-building-agile-businesses",
    title: "The Role of Cloud Technology in Building Agile Businesses",
    category: "Cloud",
    excerpt:
      "Learn how cloud solutions can help organisations become more flexible, efficient, and ready to adapt to changing business demands",
    imageSrc: "/figma/blogs/explore-img1.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-4",
    slug: "mitigating-threats-through-proactive-security-measures",
    title: "Mitigating Threats Through Proactive Security Measures",
    category: "Risk Management",
    excerpt:
      "Explore strategies to identify vulnerabilities and implement robust security protocols.",
    imageSrc: "/figma/blogs/explore-img4.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-5",
    slug: "protecting-your-business-in-a-digital-world",
    title: "Protecting Your Business in a Digital World",
    category: "Cybersecurity",
    excerpt:
      "Understand the essentials of cybersecurity to safeguard your assets and maintain trust with your customers.",
    imageSrc: "/figma/blogs/explore-img5.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-6",
    slug: "building-resilient-systems-against-cyber-attacks",
    title: "Building Resilient Systems Against Cyber Attacks",
    category: "Cybersecurity",
    excerpt:
      "Learn best practices for designing infrastructure that can withstand evolving cyber threats.",
    imageSrc: "/figma/blogs/explore-img5.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-7",
    slug: "accelerating-software-delivery-with-devops",
    title: "Accelerating Software Delivery with DevOps",
    category: "DevOps",
    excerpt:
      "Discover how DevOps practices improve collaboration, speed, and quality in software development.",
    imageSrc: "/figma/blogs/explore-img6.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-8",
    slug: "building-agile-teams-for-competitive-advantage",
    title: "Building Agile Teams for Competitive Advantage",
    category: "Web",
    excerpt:
      "Learn methods to foster a culture of continuous improvement and innovation.",
    imageSrc: "/figma/blogs/explore-img7.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-9",
    slug: "streamlining-workflows-for-faster-releases",
    title: "Streamlining Workflows for Faster Releases",
    category: "Software",
    excerpt:
      "Implement pipelines that automate testing and deployment for seamless delivery.",
    imageSrc: "/figma/blogs/explore-img7.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-10",
    slug: "delivering-scalable-software-solutions-on-demand",
    title: "Delivering Scalable Software Solutions on Demand",
    category: "SaaS",
    excerpt:
      "Understand the benefits of SaaS models for flexibility, cost-effectiveness, and rapid deployment.",
    imageSrc: "/figma/blogs/explore-img8.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-11",
    slug: "enabling-seamless-access-and-collaboration",
    title: "Enabling Seamless Access and Collaboration",
    category: "Cloud Services",
    excerpt:
      "Leverage SaaS platforms to improve user experience and operational agility.",
    imageSrc: "/figma/blogs/explore-img1.png",
    imageAlt: "",
  },
  {
    _id: "fallback-grid-12",
    slug: "transforming-business-models-with-subscription-based-software",
    title: "Transforming Business Models with Subscription-Based Software",
    category: "SaaS",
    excerpt:
      "Learn how SaaS drives innovation and customer-centric development.",
    imageSrc: "/figma/blogs/explore-img8.png",
    imageAlt: "",
  },
];

export const FALLBACK_BLOGS_PAGE: BlogsPageContent = {
  heroTitle: "Where technology meets insight.",
  heroImageUrl: FALLBACK_HERO,
  heroImageAlt: "",
  recentTitle: "Recents Insights",
  exploreTitle: "Explore more Insights",
  featured: FALLBACK_CARDS[0],
  sidebar: FALLBACK_CARDS.slice(1, 4),
  explore: FALLBACK_CARDS.slice(4),
};

export const FALLBACK_BLOG_POSTS: BlogPost[] = BLOG_POSTS.map((post) => ({
  _id: `fallback-${post.slug}`,
  slug: post.slug,
  title: post.title,
  category: post.category,
  excerpt: post.heroSubtitle,
  imageSrc: post.image,
  imageAlt: "",
  date: post.date,
  readTime: post.readTime,
  heroSubtitle: post.heroSubtitle,
  intro: post.intro,
  sections: post.sections,
}));

type SanityImage = {
  alt?: string;
  asset?: SanityImageSource;
};

type SanityBlogCard = {
  _id?: string;
  title?: string;
  slug?: string;
  category?: string;
  excerpt?: string;
  coverImage?: SanityImage;
};

type SanityBlogCardForHome = SanityBlogCard & {
  showOnHomePage?: boolean;
  order?: number;
  _createdAt?: string;
};

type SanityBlogSection = {
  heading?: string;
  paragraphs?: string[];
  listIntro?: string;
  listItems?: string[];
  listOutro?: string;
};

type SanityBlogPost = SanityBlogCard & {
  date?: string;
  readTime?: string;
  heroSubtitle?: string;
  intro?: string[];
  sections?: SanityBlogSection[];
};

type SanityBlogsPage = {
  heroTitle?: string;
  heroImage?: SanityImage;
  recentTitle?: string;
  exploreTitle?: string;
  featuredPost?: SanityBlogCard | null;
  sidebarPosts?: SanityBlogCard[] | null;
};

export function blogCardToInsight(card: BlogCard): InsightCard {
  return {
    category: card.category,
    title: card.title,
    excerpt: card.excerpt,
    imageSrc: card.imageSrc,
    href: `/blogs/${card.slug}`,
  };
}

function compareByLatest(a: SanityBlogCardForHome, b: SanityBlogCardForHome) {
  const aTime = a._createdAt ?? "";
  const bTime = b._createdAt ?? "";
  return bTime.localeCompare(aTime);
}

function compareByDisplayOrder(
  a: SanityBlogCardForHome,
  b: SanityBlogCardForHome,
) {
  const orderA = a.order ?? 99;
  const orderB = b.order ?? 99;
  if (orderA !== orderB) return orderA - orderB;
  return compareByLatest(a, b);
}

/**
 * Home insights: posts tagged "Show on home page", else the three newest posts.
 */
export function resolveHomeInsightsFromBlogPosts(
  docs: SanityBlogCardForHome[] | null | undefined,
  legacyFallback: InsightCard[],
): InsightCard[] {
  const entries =
    docs
      ?.map((doc) => {
        const card = mapCard(doc);
        if (!card) return null;
        return { card, doc };
      })
      .filter(
        (
          entry,
        ): entry is { card: BlogCard; doc: SanityBlogCardForHome } =>
          entry !== null,
      ) ?? [];

  if (entries.length === 0) {
    return legacyFallback;
  }

  const featured = entries
    .filter(({ doc }) => doc.showOnHomePage === true)
    .sort((a, b) => compareByDisplayOrder(a.doc, b.doc));

  const selected =
    featured.length > 0
      ? featured.slice(0, 5)
      : [...entries].sort((a, b) => compareByLatest(a.doc, b.doc)).slice(0, 3);

  return selected.map(({ card }) => blogCardToInsight(card));
}

export async function getHomeInsightsFromBlogPosts(
  legacyFallback: InsightCard[],
): Promise<InsightCard[]> {
  const docs = await sanityFetch<SanityBlogCardForHome[] | null>(
    blogPostsForHomeQuery,
  );
  return resolveHomeInsightsFromBlogPosts(docs, legacyFallback);
}

function mapCard(doc: SanityBlogCard | null | undefined): BlogCard | null {
  const title = doc?.title?.trim();
  const slug = doc?.slug?.trim();
  const category = doc?.category?.trim();
  const excerpt = doc?.excerpt?.trim();
  if (!doc || !title || !slug || !category || !excerpt) return null;

  const imageSrc = getImageUrl(doc.coverImage, 1200);
  if (!imageSrc) return null;

  return {
    _id: doc._id ?? slug,
    slug,
    title,
    category,
    excerpt,
    imageSrc,
    imageAlt: doc.coverImage?.alt?.trim() || "",
  };
}

function mapSections(sections: SanityBlogSection[] | undefined): BlogSection[] {
  return (
    sections
      ?.map((section) => {
        const heading = section.heading?.trim();
        if (!heading) return null;
        const paragraphs = mapStrings(section.paragraphs, []);
        const listItems = mapStrings(section.listItems, []);
        return {
          heading,
          paragraphs,
          ...(section.listIntro?.trim()
            ? { listIntro: section.listIntro.trim() }
            : {}),
          ...(listItems.length > 0 ? { listItems } : {}),
          ...(section.listOutro?.trim()
            ? { listOutro: section.listOutro.trim() }
            : {}),
        };
      })
      .filter((section): section is BlogSection => section !== null) ?? []
  );
}

function mapPost(doc: SanityBlogPost | null): BlogPost | null {
  const card = mapCard(doc);
  if (!card || !doc) return null;

  return {
    ...card,
    date: doc.date?.trim() || "",
    readTime: doc.readTime?.trim() || "",
    heroSubtitle: doc.heroSubtitle?.trim() || card.excerpt,
    intro: mapStrings(doc.intro, [card.excerpt]),
    sections: mapSections(doc.sections),
  };
}

function mapBlogsPage(
  doc: SanityBlogsPage | null,
  allPosts: BlogCard[],
): BlogsPageContent {
  if (!doc?.heroTitle?.trim()) return FALLBACK_BLOGS_PAGE;

  const featured = mapCard(doc.featuredPost) ?? allPosts[0] ?? null;
  const sidebar =
    doc.sidebarPosts
      ?.map(mapCard)
      .filter((post): post is BlogCard => post !== null) ?? [];

  const reservedIds = new Set([
    ...(featured ? [featured._id] : []),
    ...sidebar.map((post) => post._id),
  ]);
  const explore = allPosts.filter((post) => !reservedIds.has(post._id));

  return {
    heroTitle: doc.heroTitle.trim(),
    heroImageUrl: getImageUrl(doc.heroImage, 2400) || FALLBACK_HERO,
    heroImageAlt: doc.heroImage?.alt?.trim() || "",
    recentTitle: doc.recentTitle?.trim() || FALLBACK_BLOGS_PAGE.recentTitle,
    exploreTitle: doc.exploreTitle?.trim() || FALLBACK_BLOGS_PAGE.exploreTitle,
    featured,
    sidebar: sidebar.length > 0 ? sidebar : FALLBACK_BLOGS_PAGE.sidebar,
    explore: explore.length > 0 ? explore : FALLBACK_BLOGS_PAGE.explore,
  };
}

export async function getBlogPosts(): Promise<BlogCard[]> {
  const docs = await sanityFetch<SanityBlogCard[] | null>(blogPostsQuery);
  const posts =
    docs?.map(mapCard).filter((post): post is BlogCard => post !== null) ?? [];
  return posts.length > 0 ? posts : FALLBACK_CARDS;
}

export async function getBlogsPage(): Promise<BlogsPageContent> {
  const [page, posts] = await Promise.all([
    sanityFetch<SanityBlogsPage | null>(blogsPageQuery),
    getBlogPosts(),
  ]);
  return mapBlogsPage(page, posts);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const doc = await sanityFetch<SanityBlogPost | null>(blogPostBySlugQuery, {
    slug,
  });
  const post = mapPost(doc);
  if (post) return post;

  return FALLBACK_BLOG_POSTS.find((item) => item.slug === slug) ?? null;
}
