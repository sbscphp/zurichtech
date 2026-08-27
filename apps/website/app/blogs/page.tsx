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
    image: "/figma/home/insight-3.png",
  },
  {
    category: "UI",
    title: INSIGHTS[3].title,
    excerpt: INSIGHTS[3].excerpt,
    image: "/figma/home/insight-4.png",
  },
];

const GRID = [
  ...INSIGHTS,
  {
    category: "Blockchain",
    title: "Preparing Your Technology for What Comes Next",
    excerpt: INSIGHTS[4].excerpt,
    image: "/figma/home/insight-5.png",
  },
  {
    category: "IoT",
    title: "The Role of Cloud Technology in Building Agile Businesses",
    excerpt: INSIGHTS[2].excerpt,
    image: "/figma/home/insight-2.png",
  },
  {
    category: "DevOps",
    title: "Building Better Digital Experiences Through Technology",
    excerpt: INSIGHTS[3].excerpt,
    image: "/figma/home/insight-4.png",
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
        <div className="relative mx-auto flex min-h-[420px] max-w-[900px] items-center justify-center px-6 py-24 text-center md:min-h-[682px]">
          <h1 className="font-display text-[36px] leading-[1.2] font-medium text-white md:text-[48px]">
            Where technology meets insight.
          </h1>
        </div>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
          <h2 className="font-display text-[32px] leading-[1.2] text-ink lg:text-[40px]">
            Recents Insights
          </h2>
          <div className="grid gap-8 lg:grid-cols-[660px_610px]">
            <Link href={DETAIL_HREF} className="flex flex-col gap-4">
              <div className="relative h-[360px] overflow-hidden bg-white">
                <Image
                  src={FEATURED.image}
                  alt=""
                  fill
                  sizes="660px"
                  className="object-cover"
                />
              </div>
              <p className="font-display text-sm text-brand uppercase">
                {FEATURED.category}
              </p>
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
                  <div className="relative h-[140px] w-[180px] shrink-0 overflow-hidden bg-white sm:h-[226px] sm:w-[282px]">
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
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
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
