export const siteSettingsQuery = `*[_type == "siteSettings" && _id == "siteSettings"][0] {
  siteName,
  tagline,
  navLinks[]{ label, href },
  headerCta{ label, href },
  footerServicesTitle,
  footerServiceLinks[]{ label, href },
  footerCompanyTitle,
  footerCompanyLinks[]{ label, href },
  footerContactTitle,
  copyrightText,
  creditText,
  footerLinks[]{ label, href },
  socialLinks[]{ label, href },
  newsletterTitle,
  newsletterDescription,
  ctaTitlePrefix,
  ctaTitleHighlight,
  ctaDescription,
  ctaButton{ label, href },
  ctaPattern{ alt, asset },
  contactEmails,
  contactPhones,
  contactEmail,
  contactPhone,
  contactAddress
}`;

export const homePageQuery = `*[_type == "homePage" && _id == "homePage"][0] {
  heroTitleLine1,
  heroTitleLine2,
  heroTitleHighlight,
  heroDescription,
  heroPrimaryCta{ label, href },
  heroSecondaryCta{ label, href },
  heroImage{ alt, asset },
  clientLogos[]{ name, logoSrc, logo{ alt, asset } },
  statsTitle,
  statsDescription,
  stats[]{ value, label },
  whyImage{ alt, asset },
  whyEyebrow,
  whyTitlePrefix,
  whyTitleHighlight,
  whyTitle,
  whyPoints[]{ number, title, body },
  whyCta{ label, href },
  servicesTitle,
  servicesCta{ label, href },
  insightsTitle,
  insightsCta{ label, href },
  insights[]{ category, title, excerpt, imageSrc, href, image{ alt, asset } },
  teamEyebrow,
  teamTitle,
  homeTeam[]{ name, role, imageSrc, objectPosition, raised, photo{ alt, asset } }
}`;

export const aboutPageQuery = `*[_type == "aboutPage" && _id == "aboutPage"][0] {
  heroTitle,
  heroDescription,
  heroCta{ label, href },
  storyEyebrow,
  storyTitleHighlight,
  storyTitleRest,
  storyBody,
  storyCta{ label, href },
  storyImage{ alt, asset },
  missionVisionTitle,
  missionVisionCta{ label, href },
  missionTitle,
  missionBody,
  visionTitle,
  visionBody,
  teamEyebrow,
  teamTitle,
  team[]{ name, role, objectPosition, photo{ alt, asset } },
  valuesEyebrow,
  valuesTitle,
  values[]{ title, description, tint, icon{ alt, asset } },
  testimonialsEyebrow,
  testimonialsTitle,
  testimonials[]{ category, quote, name, role, objectPosition, photo{ alt, asset } }
}`;

export const servicesPageQuery = `*[_type == "servicesPage" && _id == "servicesPage"][0] {
  heroTitle,
  heroDescription,
  heroCta{ label, href },
  showcaseCta{ label, href }
}`;

export const servicesQuery = `*[_type == "service" && defined(slug.current)] | order(coalesce(order, 99) asc, title asc) {
  _id,
  title,
  "slug": slug.current,
  number,
  summary,
  icon,
  order,
  features,
  coverImage{ alt, asset },
  imageSide,
  imageHeight,
  imageFrame,
  imagePosition,
  overview,
  deliverables,
  process[]{ title, description }
}`;

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  number,
  summary,
  icon,
  order,
  features,
  coverImage{ alt, asset },
  imageSide,
  imageHeight,
  imageFrame,
  imagePosition,
  overview,
  deliverables,
  process[]{ title, description }
}`;

export const contactPageQuery = `*[_type == "contactPage" && _id == "contactPage"][0] {
  heroTitle,
  heroImage{ alt, asset },
  formNote,
  submitLabel,
  successMessage,
  infoTitle,
  infoDescription
}`;

export const whyChooseUsPageQuery = `*[_type == "whyChooseUsPage" && _id == "whyChooseUsPage"][0] {
  heroTitle,
  heroDescription,
  heroCta{ label, href },
  storyEyebrow,
  storyTitlePrefix,
  storyTitleHighlight,
  storyTitleSuffix,
  storyBody,
  storyImage{ alt, asset },
  pillars[]{ title, body, tint, icon{ alt, asset } },
  differenceEyebrow,
  differenceTitlePrefix,
  differenceTitleHighlight,
  differenceTitleSuffix,
  difference[]{ title, body }
}`;

const blogCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  coverImage{ alt, asset }
}`;

export const blogsPageQuery = `*[_type == "blogsPage" && _id == "blogsPage"][0] {
  heroTitle,
  heroImage{ alt, asset },
  recentTitle,
  exploreTitle,
  featuredPost->${blogCardProjection},
  sidebarPosts[]->${blogCardProjection}
}`;

export const blogPostsQuery = `*[_type == "blogPost" && defined(slug.current)] | order(coalesce(order, 99) asc, title asc) ${blogCardProjection}`;

export const blogPostsForHomeQuery = `*[_type == "blogPost" && defined(slug.current)] {
  ${blogCardProjection.slice(1, -1).trim()},
  showOnHomePage,
  order,
  _createdAt
}`;

export const blogPostBySlugQuery = `*[_type == "blogPost" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  coverImage{ alt, asset },
  date,
  readTime,
  heroSubtitle,
  intro,
  sections[]{
    heading,
    paragraphs,
    listIntro,
    listItems,
    listOutro
  }
}`;

export const legalPageQuery = `*[_type == "legalPage" && _id == "legalPage"][0] {
  heroTitle,
  heroImage{ alt, asset },
  defaultPolicyId,
  policies[]{
    id,
    tabLabel,
    heading,
    updated,
    intro,
    sections[]{
      title,
      paragraphs,
      bullets,
      after
    }
  }
}`;

export const partnersPageQuery = `*[_type == "partnersPage" && _id == "partnersPage"][0] {
  heroTitle,
  heroImage{ alt, asset },
  trustedByLabel,
  inquiryTitle,
  formNote,
  submitLabel,
  successMessage,
  infoTitle,
  infoDescription
}`;

const projectCardProjection = `{
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  coverImage{ alt, asset },
  imagePosition,
  tags,
  order
}`;

export const projectsPageQuery = `*[_type == "projectsPage" && _id == "projectsPage"][0] {
  heroTitle,
  heroDescription,
  heroCta{ label, href },
  listingEyebrow,
  listingTitle
}`;

export const projectsQuery = `*[_type == "project" && defined(slug.current)] | order(coalesce(order, 99) asc, title asc) ${projectCardProjection}`;

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  category,
  excerpt,
  coverImage{ alt, asset },
  imagePosition,
  tags,
  order,
  caseStudyTitle,
  detailImage{ alt, asset },
  about,
  purpose{ heading, body, intro, items },
  challenges{ heading, paragraphs, intro, items },
  approach{ heading, body, items }
}`;
