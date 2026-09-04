export type BlogPost = {
  slug: string;
  title: string;
  heroSubtitle: string;
  date: string;
  readTime: string;
  image: string;
  category: string;
  intro: string[];
  sections: {
    heading: string;
    paragraphs: string[];
    listIntro?: string;
    listItems?: string[];
    listOutro?: string;
  }[];
};

/**
 * Hardcoded blog posts for the Figma conversion pass.
 * Primary article matches Insights - View one (261:25204).
 */
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "migrate-to-cloud-without-downtime",
    title: "How to Migrate to the Cloud Without a Single Minute of Downtime",
    heroSubtitle:
      "Explore fresh perspectives, industry trends, and useful insights from the world of technology and innovation.",
    date: "May 18, 2026",
    readTime: "4 mins read",
    image: "/figma/blogs/insight-heroimage.png",
    category: "Cloud",
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
];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function slugifyBlogTitle(title: string) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
