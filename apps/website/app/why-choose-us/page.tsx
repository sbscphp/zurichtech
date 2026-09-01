import type { Metadata } from "next";
import Image from "next/image";

import { ContactInfo } from "@/components/shared/contact-info";
import { PageBanner } from "@/components/shared/page-banner";

export const metadata: Metadata = {
  title: "Why Choose Us",
};

const PILLARS = [
  {
    title: "Design That Stand Out",
    body: "Modern, engaging visuals created to capture attention and connect with your audience.",
    icon: "/figma/why-choose-us/icon-design.svg",
    tint: "bg-[rgba(76,110,245,0.1)]",
  },
  {
    title: "Speed & Security Built In",
    body: "Enjoy seamless performance with solutions designed to keep your data secured and protected.",
    icon: "/figma/why-choose-us/icon-bolt.svg",
    tint: "bg-[rgba(250,82,82,0.1)]",
  },
  {
    title: "Affordable & Built to Scale",
    body: "Flexible pricing and solutions designed to grow alongside your business.",
    icon: "/figma/why-choose-us/icon-scale.svg",
    tint: "bg-[rgba(18,184,134,0.1)]",
  },
  {
    title: "Support Beyond Delivery",
    body: "We remain available after delivery to help maintain, improve, and support your solution.",
    icon: "/figma/why-choose-us/icon-support.svg",
    tint: "bg-[rgba(250,176,5,0.1)]",
  },
];

const DIFFERENCE = [
  {
    title: "Business-First Thinking",
    body: "We don't believe technology should be introduced simply because it is new or popular. We first look at the problem you are trying to solve, the outcome you want to achieve.",
  },
  {
    title: "Solutions Built Around Your Needs",
    body: "Every organization has different processes, challenges, and priorities. We take these differences into consideration when developing solutions. Whether we're building software or improving infrastructure, we focus on what makes sense for your specific environment.",
  },
  {
    title: "Practical Innovation",
    body: "There is always a new technology, platform, framework, or trend promising to change the way businesses operate. We focus on what is genuinely useful. Our approach is to identify where technology can improve.",
  },
  {
    title: "End-to-End Technology Thinking",
    body: "Software, infrastructure, security, websites, data, users, and business processes are often connected. A decision made in one area can affect another. That's why we consider the wider technology environment.",
  },
  {
    title: "Built for Growth",
    body: "We don't believe technology should be introduced simply because it is new or popular. We first look at the problem you are trying to solve, the outcome you want to achieve.",
  },
  {
    title: "Clear and Collaborative",
    body: "Technology can become complicated quickly. We believe communication shouldn't. We aim to keep requirements, decisions, progress, and expectations clear throughout the engagement.",
  },
];

export default function WhyChooseUsPage() {
  return (
    <>
      <PageBanner
        title="A Technology Partner You Can Actually Rely On."
        description="Plenty of developers can write code. Here's what businesses tell us keeps them coming back to SaidByte Technologies."
        cta={{ label: "Our Projects", href: "/projects" }}
      />

      <section className="px-6 py-16 lg:px-20 lg:py-[82px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[82px]">
          <div className="grid items-center gap-12 lg:grid-cols-[601px_1fr]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-display text-lg leading-[1.2] text-brand uppercase">
                  why choose us
                </p>
                <h2 className="font-display text-[36px] leading-[1.2] text-black lg:text-[48px]">
                  Your Technology Partner for Growth
                </h2>
              </div>
              <div className="flex flex-col gap-4 font-body text-lg leading-[1.4] text-ink-dimmed">
                <p>
                  Choosing a technology partner is about more than finding
                  someone who can build software or manage infrastructure. You
                  need a partner who understands the problem behind the
                  technology and can help you make the right decisions.
                </p>
                <p>
                  At Zuritech, we take a practical approach to technology. We
                  begin by understanding your objectives, challenges, users, and
                  existing environment before recommending a solution.
                </p>
                <p className="text-[#555c62]">
                  Whether you need software development, cloud and DevOps,
                  cybersecurity, or web development, our goal is to make
                  technology work better for your organisation.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-brand-soft p-5">
              <div className="relative h-[440px] overflow-hidden rounded-2xl">
                <Image
                  src="/figma/why-choose-us/story.png"
                  alt="ZurichTech colleagues in discussion"
                  fill
                  sizes="(min-width: 1024px) 592px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((pillar) => (
              <article
                key={pillar.title}
                className="flex flex-col items-center gap-6 text-center"
              >
                <span
                  className={`flex size-[94px] items-center justify-center overflow-hidden rounded-full ${pillar.tint}`}
                >
                  <img alt="" src={pillar.icon} className="size-11" />
                </span>
                <div>
                  <h3 className="font-display text-xl leading-[1.4] text-black">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 font-body text-base leading-[1.4] text-[#5e554a]">
                    {pillar.body}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-surface-rose px-6 py-16 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <img
                alt=""
                src="/figma/why-choose-us/icon-arrows.svg"
                className="size-6 rotate-180"
              />
              <p className="font-body text-lg text-black">OUR DIFFERENCE</p>
            </div>
            <h2 className="font-display text-[32px] leading-[1.4] font-semibold text-ink-heading lg:text-[40px]">
              What Sets <span className="text-brand">Zuritech</span> Apart.
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENCE.map((card) => (
              <article
                key={card.title}
                className="flex flex-col gap-4 rounded-[32px] bg-white p-6"
              >
                <h3 className="font-body text-xl font-semibold text-black">
                  {card.title}
                </h3>
                <p className="font-body text-sm leading-[1.4] text-[#5e554a]">
                  {card.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ContactInfo />
    </>
  );
}
