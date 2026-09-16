"use client";

import Image from "next/image";

import { ContactInfo } from "@/components/shared/contact-info";
import { PageBanner } from "@/components/shared/page-banner";
import { useWhyChooseUsPage } from "@/hooks/sanity/use-why-choose-us-page";
import {
  FALLBACK_WHY_CHOOSE_US_PAGE,
  type WhyChooseUsPageContent,
} from "@/lib/sanity/why-choose-us";

type WhyChooseUsPageContentProps = {
  initialPage?: WhyChooseUsPageContent;
};

export function WhyChooseUsPageContentView({
  initialPage,
}: WhyChooseUsPageContentProps) {
  const { data: page = FALLBACK_WHY_CHOOSE_US_PAGE } =
    useWhyChooseUsPage(initialPage);

  return (
    <>
      <PageBanner
        title={page.heroTitle}
        description={page.heroDescription}
        cta={page.heroCta}
      />

      <section className="px-6 py-16 lg:px-20 lg:py-20.5">
        <div className="mx-auto flex w-full max-w-7xl flex-col gap-20.5">
          <div className="grid items-center gap-12 lg:grid-cols-[601px_1fr]">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-3">
                <p className="font-display text-lg leading-[1.2] text-brand uppercase">
                  {page.storyEyebrow}
                </p>
                <h2 className="font-display text-[36px] leading-[1.2] text-black lg:text-[48px]">
                  {`${page.storyTitlePrefix} `}
                  <span className="text-brand">{`${page.storyTitleHighlight} `}</span>
                  {page.storyTitleSuffix}
                </h2>
              </div>
              <div className="flex flex-col gap-4 font-body text-lg leading-[1.4] text-ink-dimmed">
                {page.storyBody.map((paragraph, index) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className={index === page.storyBody.length - 1 ? "text-[#555c62]" : undefined}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-brand-soft p-5">
              <div className="relative h-110 overflow-hidden rounded-2xl">
                <Image
                  src={page.storyImageUrl}
                  alt={page.storyImageAlt}
                  fill
                  sizes="(min-width: 1024px) 592px, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {page.pillars.map((pillar) => (
              <article
                key={pillar.title}
                className="flex flex-col items-center gap-6 text-center"
              >
                <span
                  className={`flex size-23.5 items-center justify-center overflow-hidden rounded-full ${pillar.tint}`}
                >
                  <img alt="" src={pillar.iconSrc} className="size-11" />
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
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="flex items-center gap-2">
              <img
                alt=""
                src="/figma/why-choose-us/icon-arrows.svg"
                className="size-6 rotate-180"
              />
              <p className="font-body text-lg text-black">{page.differenceEyebrow}</p>
            </div>
            <h2 className="font-display text-[32px] leading-[1.4] font-semibold text-ink-heading lg:text-[40px]">
              {`${page.differenceTitlePrefix} `}
              <span className="text-brand">{`${page.differenceTitleHighlight} `}</span>
              {page.differenceTitleSuffix}
            </h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {page.difference.map((card) => (
              <article
                key={card.title}
                className="flex flex-col gap-4 rounded-4xl border-b-4 border-transparent bg-white p-6 transition-colors duration-300 hover:border-brand"
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
