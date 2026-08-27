export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  siteName,
  tagline,
  navLinks[]{ label, href },
  footerLinks[]{ label, href },
  socialLinks[]{ label, href },
  newsletterTitle,
  newsletterDescription,
  contactEmail,
  contactPhone,
  contactAddress
}`;

export const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0] {
  heroEyebrow,
  heroTitle,
  heroDescription,
  heroPrimaryCta{ label, href },
  heroSecondaryCta{ label, href },
  highlightsTitle,
  highlights[]{ title, description },
  ctaTitle,
  ctaDescription,
  ctaButton{ label, href }
}`;

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0] {
  heroEyebrow,
  heroTitle,
  heroDescription,
  storyTitle,
  storyBody,
  missionTitle,
  missionBody,
  visionTitle,
  visionBody,
  values[]{ title, description },
  team[]{ name, role, bio }
}`;

export const servicesPageQuery = `*[_type == "servicesPage" && _id == "servicesPage"][0] {
  heroEyebrow,
  heroTitle,
  heroDescription,
  directoryTitle,
  directoryDescription
}`;

export const servicesQuery = `*[_type == "service" && defined(slug.current)] | order(coalesce(order, 99) asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  summary,
  icon,
  order,
  coverImage,
  overview,
  deliverables,
  process[]{ title, description }
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  summary,
  icon,
  order,
  coverImage,
  overview,
  deliverables,
  process[]{ title, description }
}`;

export const contactPageQuery = `*[_type == "contactPage" && _id == "contactPage"][0] {
  heroEyebrow,
  heroTitle,
  heroDescription,
  formTitle,
  formDescription,
  successMessage
}`;
