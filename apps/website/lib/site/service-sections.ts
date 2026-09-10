/**
 * Maps home / CMS / footer service titles and slugs onto the section IDs used on
 * `/services` (see `ServiceShowcase` `id={service.slug}`).
 */
const SECTION_BY_KEY: Record<string, string> = {
  "software development": "software-development",
  "software-development": "software-development",
  "web development": "web-development",
  "web-development": "web-development",
  "mobile app development": "web-development",
  "mobile-app-development": "web-development",
  "cybersecurity and id audit": "cybersecurity-and-id-audit",
  "cybersecurity & it audit": "cybersecurity-and-id-audit",
  "cybersecurity-and-id-audit": "cybersecurity-and-id-audit",
  "cloud solutions and devops": "cloud-solutions-and-devops",
  "cloud solution & devops": "cloud-solutions-and-devops",
  "cloud solutions & devops": "cloud-solutions-and-devops",
  "cloud-solutions-and-devops": "cloud-solutions-and-devops",
  "cloud services (aws, azure, gcp)": "cloud-solutions-and-devops",
  "cloud-services-aws-azure-gcp": "cloud-solutions-and-devops",
  "it consulting & advisory": "it-consulting-and-advisory",
  "it consulting": "it-consulting-and-advisory",
  "it-consulting-and-advisory": "it-consulting-and-advisory",
  "it support & maintenance": "it-support-and-maintenance",
  "it-support-and-maintenance": "it-support-and-maintenance",
  "data science & ai/ml solutions": "software-development",
  "data-science-and-ai-ml-solutions": "software-development",
};

function normalizeKey(value: string) {
  return value.trim().toLowerCase().replace(/\s+/g, " ");
}

export function getServiceSectionId(key: string): string | undefined {
  return SECTION_BY_KEY[normalizeKey(key)] ?? SECTION_BY_KEY[key.trim().toLowerCase()];
}

export function getServiceSectionHref(service: {
  title: string;
  slug: string;
}): string {
  const byTitle = getServiceSectionId(service.title);
  if (byTitle) return `/services#${byTitle}`;

  const bySlug = getServiceSectionId(service.slug);
  if (bySlug) return `/services#${bySlug}`;

  if (service.slug.trim()) return `/services#${service.slug.trim()}`;

  return "/services";
}

/**
 * Resolves footer / nav links that point at `/services` (or already include a
 * hash) onto the matching showcase section.
 */
export function resolveFooterServiceHref(label: string, href?: string): string {
  const existingHash = href?.includes("#") ? href.split("#")[1]?.trim() : "";
  if (existingHash) {
    const mapped = getServiceSectionId(existingHash) ?? existingHash;
    return `/services#${mapped}`;
  }

  const byLabel = getServiceSectionId(label);
  if (byLabel) return `/services#${byLabel}`;

  if (href?.startsWith("/services")) return href;

  return "/services";
}
