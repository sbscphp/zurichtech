/**
 * Maps home / CMS service titles and slugs onto the section IDs used on
 * `/services` (see `ServiceShowcase`).
 */
const SECTION_BY_KEY: Record<string, string> = {
  "software development": "software-development",
  "software-development": "software-development",
  "web development": "web-development",
  "web-development": "web-development",
  "mobile app development": "web-development",
  "mobile-app-development": "web-development",
  "cybersecurity and id audit": "cybersecurity-and-id-audit",
  "cybersecurity-and-id-audit": "cybersecurity-and-id-audit",
  "cloud solutions and devops": "cloud-solutions-and-devops",
  "cloud-solutions-and-devops": "cloud-solutions-and-devops",
  "cloud services (aws, azure, gcp)": "cloud-solutions-and-devops",
  "cloud-services-aws-azure-gcp": "cloud-solutions-and-devops",
  "it consulting & advisory": "it-consulting-and-advisory",
  "it-consulting-and-advisory": "it-consulting-and-advisory",
  "it support & maintenance": "it-support-and-maintenance",
  "it-support-and-maintenance": "it-support-and-maintenance",
  "data science & ai/ml solutions": "software-development",
  "data-science-and-ai-ml-solutions": "software-development",
};

export function getServiceSectionHref(service: {
  title: string;
  slug: string;
}): string {
  const byTitle = SECTION_BY_KEY[service.title.trim().toLowerCase()];
  if (byTitle) return `/services#${byTitle}`;

  const bySlug = SECTION_BY_KEY[service.slug.trim().toLowerCase()];
  if (bySlug) return `/services#${bySlug}`;

  return "/services";
}
