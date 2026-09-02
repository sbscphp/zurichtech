export type Project = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  imageClass?: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    slug: "innovixus-labs-website",
    category: "Web application",
    title: "Innovixus Labs Website",
    excerpt:
      "Comprehensive patient management system for healthcare providers with appointment scheduling.",
    image: "/figma/portfolio/project-1.png",
    imageClass: "object-cover object-[8%_15%]",
    tags: ["Next.js", "Node.js"],
  },
  {
    slug: "food-delivery-mobile-app",
    category: "Mobile application",
    title: "Food Delivery Mobile App",
    excerpt:
      "Comprehensive patient management system for healthcare providers with appointment scheduling.",
    image: "/figma/portfolio/project-2.png",
    imageClass: "object-cover object-top",
    tags: ["Next.js", "Node.js"],
  },
  {
    slug: "healthcare-ecommerce-platform",
    category: "E - commerce platform",
    title: "Healthcare Management system",
    excerpt:
      "Comprehensive patient management system for healthcare providers with appointment scheduling.",
    image: "/figma/portfolio/project-3.png",
    imageClass: "object-cover object-top",
    tags: ["Next.js", "Node.js"],
  },
  {
    slug: "healthcare-web-mobile",
    category: "Web / Mobile Application",
    title: "Healthcare Management system",
    excerpt:
      "Comprehensive patient management system for healthcare providers with appointment scheduling.",
    image: "/figma/portfolio/project-1.png",
    imageClass: "object-cover object-[8%_15%]",
    tags: ["Next.js", "Node.js"],
  },
  {
    slug: "healthcare-web-portal",
    category: "Web application",
    title: "Healthcare Management system",
    excerpt:
      "Comprehensive patient management system for healthcare providers with appointment scheduling.",
    image: "/figma/portfolio/project-5.png",
    imageClass: "object-cover object-top",
    tags: ["Next.js", "Node.js"],
  },
  {
    slug: "school-management-platform",
    category: "school management system",
    title: "School Management Platform",
    excerpt:
      "Comprehensive patient management system for healthcare providers with appointment scheduling.",
    image: "/figma/portfolio/project-6.png",
    imageClass: "object-cover object-top",
    tags: ["Next.js", "Node.js"],
  },
];

export const CASE_STUDY = {
  title: "Innovixus Labs Website - Simplifying Hajj Management Operations",
  image: "/figma/portfolio/detail-hero.png",
  about: [
    "The Innovixus Labs Corporate Website project was created to establish a modern, professional, and responsive digital presence for Innovixus Labs Limited.",
    "The project involves the design and development of a customer-facing corporate website alongside a dedicated content management system that allows authorised Innovixus Labs staff to manage important website content without relying on developers for routine updates.",
    "The website is designed to communicate Innovixus Labs services, capabilities, and business identity while providing visitors with a clear and accessible way to understand the organisation and engage with its services.",
  ],
  purpose: {
    heading: "Creating a Website That Communicates, Performs, and Evolves",
    body: "The primary purpose of the project is to provide Innovixus Labs with a modern corporate website that effectively represents the organisation and provides visitors with access to clear, structured information.",
    intro: "The website is intended to:",
    items: [
      "Establish a Professional Digital Presence",
      "Communicate Key Information Clearly",
      "Provide a Responsive Experience",
      "Give Innovixus Labs Control Over Its Content",
      "Create a Maintainable Digital Foundation",
      "What happens if the migration needs to be reversed?",
    ],
  },
  challenges: {
    heading: "Turning Business Requirements Into a Clear Digital Experience",
    paragraphs: [
      "One of the central challenges of the project is translating the organisation's requirements and brand identity into a website that is both visually engaging and easy to navigate.",
      "A corporate website needs to communicate a considerable amount of information without overwhelming the visitor. The design therefore needs to establish a clear hierarchy between the different types of content and create a straightforward path through the website.",
    ],
    intro: "The website is intended to:",
    items: [
      "Balancing Content With Simplicity",
      "Designing Across Multiple Devices",
      "Creating a Simple Content Management Experience",
      "Keeping the Website Flexible",
    ],
  },
  approach: {
    heading: "From Requirements to a Working Digital Experience.",
    body: "The project follows a structured process that moves from understanding the requirements to creating, testing, and launching the final website.",
    items: [
      "Discovery",
      "Information & Content Structure",
      "UI Design",
      "Design Sign-Off",
      "Development",
      "Testing",
      "Launch",
    ],
  },
};
