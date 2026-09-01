export type NavLink = {
  label: string;
  href: string;
};

export const NAV_LINKS: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Projects", href: "/projects" },
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
  { label: "Projects", href: "/projects" },
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
  phone: "+234 8055053800",
  phones: ["+234 802 863 3332", "+234 809 868 6767"],
  emails: [
    "info@zurichtechnologies.com.ng",
    "princesanni@zurichtechnologies.com.ng",
  ],
};

export const HOME_SERVICES = [
  {
    title: "Software Development",
    description:
      "We design and develop tailored software solutions that help businesses solve complex challenges, improve efficiency, and create new opportunities for growth.",
    href: "/services",
  },
  {
    title: "Web Development",
    description:
      "We create modern, responsive web experiences that bring your brand, products, and services to life while delivering a seamless experience across devices.",
    href: "/services",
  },
  {
    title: "Mobile App Development",
    description:
      "We create intuitive, high-performing mobile applications that help businesses connect with customers and deliver value wherever they are",
    href: "/services",
  },
  {
    title: "IT Consulting & Advisory",
    description:
      "We provide strategic technology guidance to help businesses make informed decisions, overcome challenges, and get more value from their technology investments.",
    href: "/services",
  },
  {
    title: "Cloud Services (AWS, Azure, GCP)",
    description:
      "We help businesses leverage cloud technology to build flexible, scalable, and reliable infrastructure designed for changing business needs.",
    href: "/services",
  },
  {
    title: "Data Science & AI/ML Solutions",
    description:
      "We help businesses turn data into actionable intelligence and explore AI-powered solutions that support smarter decisions and new opportunities.",
    href: "/services",
  },
];

export const INSIGHTS = [
  {
    category: "Cloud",
    title: "Building Technology That Scales With Your Business",
    excerpt:
      "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
    image: "/figma/home/insight-1.png",
    href: "/blogs",
  },
  {
    category: "IT consulting",
    title: "Turning Complex Challenges Into Smarter Technology",
    excerpt:
      "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
    image: "/figma/home/insight-2.png",
    href: "/blogs",
  },
  {
    category: "Cloud",
    title: "The Role of Cloud Technology in Building Agile Businesses",
    excerpt:
      "Learn how cloud solutions can help organisations become more flexible, efficient, and ready to adapt to changing business demands",
    image: "/figma/home/insight-3.png",
    href: "/blogs",
  },
  {
    category: "web development",
    title: "Building Better Digital Experiences Through Technology",
    excerpt:
      "From websites to custom software, discover how thoughtfully designed digital solutions can create better experiences for both businesses and their customers.",
    image: "/figma/home/insight-4.png",
    href: "/blogs",
  },
  {
    category: "IT consulting",
    title: "Preparing Your Technology for What Comes Next",
    excerpt:
      "Technology should support where your business is going, not just where it is today. Explore how scalable solutions can help you build with confidence for the future.",
    image: "/figma/home/insight-5.png",
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
    image: "/figma/home/team-1.png",
    offset: "object-[center_20%]",
  },
  {
    name: "Dr. Onyinyechi",
    role: "Chief of Operation",
    image: "/figma/home/team-2.png",
    offset: "object-center",
    raised: true,
  },
  {
    name: "Jadesola Alao",
    role: "Chief Marketing Officer",
    image: "/figma/home/team-3.png",
    offset: "object-[center_top]",
  },
  {
    name: "Dr. Joy Godiya",
    role: "Chief Executive Officer",
    image: "/figma/home/team-4.png",
    offset: "object-[center_15%]",
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
