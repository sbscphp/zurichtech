export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Blogs", href: "/blogs" },
  { label: "Why Choose Us", href: "/why-choose-us" },
];

export const FOOTER_SERVICES: NavLink[] = [
  { label: "Software Development", href: "/services" },
  { label: "Web Development", href: "/services" },
  { label: "Cloud Solution & DevOps", href: "/services" },
  { label: "Cybersecurity & IT audit", href: "/services" },
  { label: "IT Consulting", href: "/services" },
];

export const FOOTER_COMPANY: NavLink[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Insights", href: "/blogs" },
  { label: "Contact Us", href: "/contact" },
  { label: "Policy and Legal", href: "/legal" },
];

export const SITE = {
  name: "ZurichTech",
  tagline:
    "Engineering the systems your business runs on. Software, cloud and security engineering for organisations that cannot afford to get it wrong.",
  address:
    "No. 7 Rhine Street, Off Ibrahim Babangida Boulevard, Ministers Hill, Maitama, Abuja",
  email: "support@zuritechnologies.com",
  phone: "+234 802 863 3332",
  phones: ["+234 802 863 3332"],
  emails: [
    "info@zurichtechnologies.com.ng",
    "princesanni@zurichtechnologies.com.ng",
  ],
};

export const HOME_SERVICES = [
  {
    title: "Software Development",
    description:
      "Custom software solutions designed to solve complex business challenges and support long-term growth.",
    href: "/services#software-development",
  },
  {
    title: "Web Development",
    description:
      "Intuitive, high-performing mobile experiences built to keep your business connected with users wherever they are.",
    href: "/services#web-development",
  },
  {
    title: "Cybersecurity and ID Audit",
    description:
      "Practical security solutions designed to protect your systems, data and operations in an evolving digital landscape.",
    href: "/services#cybersecurity-and-id-audit",
  },
  {
    title: "Cloud Solutions and Devops",
    description:
      "Flexible and scalable cloud solutions that help your business operate efficiently, securely and with confidence.",
    href: "/services#cloud-solutions-and-devops",
  },
  {
    title: "IT Consulting & Advisory",
    description:
      "Strategic technology guidance that helps you make smarter decisions and get more value from your technology investments.",
    href: "/services#it-consulting-and-advisory",
  },
  {
    title: "IT Support & Maintenance",
    description:
      "Reliable, ongoing support that keeps your technology secure, efficient and performing at its best.",
    href: "/services#it-support-and-maintenance",
  },
];

export const INSIGHTS = [
  {
    category: "Cloud",
    title: "Building Technology That Scales With Your Business",
    excerpt:
      "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
    image: "/figma/home/cloud-tech.png",
    href: "/blogs",
  },
  {
    category: "IT consulting",
    title: "Turning Complex Challenges Into Smarter Technology",
    excerpt:
      "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
    image: "/figma/blogs/IT-consulting.png",
    href: "/blogs",
  },
  {
    category: "Cloud",
    title: "The Role of Cloud Technology in Building Agile Businesses",
    excerpt:
      "Learn how cloud solutions can help organisations become more flexible, efficient, and ready to adapt to changing business demands",
    image: "/figma/home/cloud-tech.png",
    href: "/blogs",
  },
  {
    category: "web development",
    title: "Building Better Digital Experiences Through Technology",
    excerpt:
      "From websites to custom software, discover how thoughtfully designed digital solutions can create better experiences for both businesses and their customers.",
    image: "/figma/home/code-image.png",
    href: "/blogs",
  },
  {
    category: "IT consulting",
    title: "Preparing Your Technology for What Comes Next",
    excerpt:
      "Technology should support where your business is going, not just where it is today. Explore how scalable solutions can help you build with confidence for the future.",
    image: "/figma/blogs/IT-consulting.png",
    href: "/blogs",
  },
  {
    category: "AI",
    title: "Harnessing Artificial Intelligence for Smarter Decisions",
    excerpt:
      "Explore how AI-driven insights empower businesses to make data-backed decisions that boost productivity and innovation.",
    image: "/figma/home/insight-1.png",
    href: "/blogs",
  },
];

export const TEAM = [
  {
    name: "Adekunle, Muh’D Thanni",
    role: "Chief Technology Officer",
    image: "/figma/home/teammate-1.png",
    offset: "object-center",
  },
  {
    name: "Dr. Onyinyechi",
    role: "Chief of Operation",
    image: "/figma/home/teammate-2.png",
    offset: "object-center",
    raised: true,
  },
  {
    name: "Jadesola Alao",
    role: "Chief Marketing Officer",
    image: "/figma/home/teammate-3.png",
    offset: "object-center",
  },
  {
    name: "Dr. Joy Godiya",
    role: "Chief Executive Officer",
    image: "/figma/home/teammate-4.png",
    offset: "object-center",
    raised: true,
  },
];

export const CLIENT_LOGOS = [
  { name: "Synergy", src: "/figma/home/logo-synergy.svg" },
  { name: "Horizon", src: "/figma/home/logo-horizon.svg" },
  { name: "Catalyst", src: "/figma/home/logo-catalyst.svg" },
  { name: "Phoenix", src: "/figma/home/logo-phoenix.svg" },
  { name: "Solaris", src: "/figma/home/logo-solaris.svg" },
  { name: "Apex", src: "/figma/home/logo-apex.svg" },
  { name: "Aurora", src: "/figma/home/logo-aurora.svg" },
  { name: "Pulse", src: "/figma/home/logo-pulse.svg" },
];
