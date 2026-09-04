import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { INSIGHTS } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Insights",
};

const DETAIL_HREF = "/blogs/migrate-to-cloud-without-downtime";

const FEATURED = INSIGHTS[1];
const SIDEBAR = [
  {
    category: "AI",
    title: "Harnessing Artificial Intelligence for Smarter Decisions",
    excerpt:
      "Explore how AI-driven insights empower businesses to make data-backed decisions that boost productivity and innovation.",
    image: "/figma/home/insight-1.png",
  },
  {
    category: "DATA ANALYSIS",
    title: INSIGHTS[0].title,
    excerpt: INSIGHTS[0].excerpt,
    image: "/figma/blogs/blog-card2.png",
  },
  {
    category: "AI",
    title: "Integrating AI to Enhance Customer Experiences",
    excerpt:
      "Learn how AI technologies can personalize interactions, improve satisfaction, and drive customer loyalty.",
    image: "/figma/home/insight-3.png",
  },
];

const GRID = [
  {
    category: "Cloud",
    title: "Building Technology That Scales With Your Business",
    excerpt:
      "Discover how the right technology foundation can help businesses improve efficiency, adapt to change, and build confidently for long-term growth.",
    image: "/figma/blogs/explore-img1.png",
  },
  {
    category: "IT Consulting",
    title: "Turning Complex Challenges Into Smarter Technology",
    excerpt:
      "Explore how businesses can use the right technology strategy to simplify operations, solve complex challenges, and unlock new opportunities for growth.",
    image: "/figma/blogs/IT-consulting.png",
  },
  {
    category: "Cloud",
    title: "The Role of Cloud Technology in Building Agile Businesses",
    excerpt:
      "Learn how cloud solutions can help organisations become more flexible, efficient, and ready to adapt to changing business demands",
    image: "/figma/blogs/explore-img1.png",
  },
  {
    category: "Risk Management",
    title: "Mitigating Threats Through Proactive Security Measures",
    excerpt:
      "Explore strategies to identify vulnerabilities and implement robust security protocols.",
    image: "/figma/blogs/explore-img4.png",
  },
  {
    category: "Cybersecurity",
    title: "Protecting Your Business in a Digital World",
    excerpt:
      "Understand the essentials of cybersecurity to safeguard your assets and maintain trust with your customers.",
    image: "/figma/blogs/explore-img5.png",
  },
  {
    category: "Cybersecurity",
    title: "Building Resilient Systems Against Cyber Attacks",
    excerpt:
      "Learn best practices for designing infrastructure that can withstand evolving cyber threats.",
    image: "/figma/blogs/explore-img5.png",
  },
  {
    category: "DevOps",
    title: "Accelerating Software Delivery with DevOps",
    excerpt:
      "Discover how DevOps practices improve collaboration, speed, and quality in software development.",
    image: "/figma/blogs/explore-img6.png",
  },
  {
    category: "Web",
    title: "Building Agile Teams for Competitive Advantage",
    excerpt:
      "Learn methods to foster a culture of continuous improvement and innovation.",
    image: "/figma/blogs/explore-img7.png",
  },
  {
    category: "Software",
    title: "Streamlining Workflows for Faster Releases",
    excerpt:
      "Implement pipelines that automate testing and deployment for seamless delivery.",
    image: "/figma/blogs/explore-img7.png",
  },
  {
    category: "SaaS",
    title: "Delivering Scalable Software Solutions on Demand",
    excerpt:
      "Understand the benefits of SaaS models for flexibility, cost-effectiveness, and rapid deployment.",
    image: "/figma/blogs/explore-img8.png",
  },
  {
    category: "Cloud Services",
    title: "Enabling Seamless Access and Collaboration",
    excerpt:
      "Leverage SaaS platforms to improve user experience and operational agility.",
    image: "/figma/blogs/explore-img1.png",
  },
  {
    category: "SaaS",
    title: "Transforming Business Models with Subscription-Based Software",
    excerpt:
      "Learn how SaaS drives innovation and customer-centric development.",
    image: "/figma/blogs/explore-img8.png",
  },
];

export default function BlogsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-brand">
        <img
          alt=""
          src="/figma/blogs/hero.png"
          className="absolute inset-0 size-full object-cover"
        />
        <div className="relative mx-auto flex min-h-105 max-w-225 items-center justify-center px-6 py-24 text-center md:min-h-170.5">
          <h1 className="font-display text-[36px] leading-[1.2] font-medium text-white md:text-[48px]">
            Where technology meets insight.
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            Recents Insights
          </h2>
          <div className="grid gap-8 lg:grid-cols-[660px_610px]">
            <Link href={DETAIL_HREF} className="flex flex-col gap-4">
              <p className="font-display text-sm text-brand uppercase">
                {FEATURED.category}
              </p>
              <div className="relative h-90 overflow-hidden bg-white">
                <Image
                  src={FEATURED.image}
                  alt=""
                  fill
                  sizes="660px"
                  className="object-cover"
                />
              </div>
              <h3 className="font-display text-[22px] leading-[1.4] text-ink lg:text-[32px]">
                {FEATURED.title}
              </h3>
              <p className="font-body text-base leading-[1.4] text-ink-dimmed">
                {FEATURED.excerpt}
              </p>
            </Link>

            <div className="flex flex-col gap-6">
              {SIDEBAR.map((item) => (
                <Link
                  key={item.title}
                  href={DETAIL_HREF}
                  className="flex gap-4"
                >
                  <div className="relative h-35 w-45 shrink-0 overflow-hidden bg-white sm:h-56.5 sm:w-70.5">
                    <Image
                      src={item.image}
                      alt=""
                      fill
                      sizes="282px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex min-w-0 flex-col gap-3">
                    <p className="font-display text-sm text-brand uppercase">
                      {item.category}
                    </p>
                    <h3 className="font-display text-lg leading-[1.4] text-ink sm:text-[22px]">
                      {item.title}
                    </h3>
                    <p className="hidden font-body text-base leading-[1.4] text-ink-dimmed sm:block">
                      {item.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-16 lg:px-20 lg:pb-24">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-8">
          <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            Explore more Insights
          </h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {GRID.map((item, index) => (
              <Link
                key={`${item.title}-${index}`}
                href={DETAIL_HREF}
                className="flex flex-col gap-4"
              >
                <p className="font-display text-sm text-brand uppercase">
                  {item.category}
                </p>
                <div className="relative h-64 overflow-hidden bg-white">
                  <Image
                    src={item.image}
                    alt=""
                    fill
                    sizes="364px"
                    className="object-cover"
                  />
                </div>
                <h3 className="font-display text-[22px] leading-[1.4] text-ink">
                  {item.title}
                </h3>
                <p className="font-body text-base leading-[1.4] text-ink-dimmed">
                  {item.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
