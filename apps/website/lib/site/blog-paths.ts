/**
 * Blog detail URLs for static export.
 * Always hit the always-built `/blogs/view` shell so new Studio posts
 * work without a rebuild. Pretty `/blogs/[slug]` pages still exist for
 * posts that were known at the last export (SEO), and hosting rules can
 * redirect missing pretty URLs here.
 */
export function blogPostHref(slug: string): string {
  const cleaned = slug.trim().replace(/^\/+|\/+$/g, "");
  return `/blogs/view/?slug=${encodeURIComponent(cleaned)}`;
}
