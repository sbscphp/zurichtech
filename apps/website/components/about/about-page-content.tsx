"use client";

import { MissionVision } from "@/components/about/mission-vision";
import { Story } from "@/components/about/story";
import { Team } from "@/components/about/team";
import { Testimonials } from "@/components/about/testimonials";
import { Values } from "@/components/about/values";
import { PageBanner } from "@/components/shared/page-banner";
import { useAboutPage } from "@/hooks/sanity/use-about-page";
import {
  FALLBACK_ABOUT_PAGE,
  type AboutPageContent,
} from "@/lib/sanity/about";

type AboutPageContentProps = {
  initialAboutPage?: AboutPageContent;
};

export function AboutPageContentView({
  initialAboutPage,
}: AboutPageContentProps) {
  const { data: about = FALLBACK_ABOUT_PAGE } = useAboutPage(initialAboutPage);

  return (
    <>
      <PageBanner
        title={about.heroTitle}
        description={about.heroDescription}
        cta={about.heroCta}
      />
      <Story
        eyebrow={about.storyEyebrow}
        titleHighlight={about.storyTitleHighlight}
        titleRest={about.storyTitleRest}
        paragraphs={about.storyBody}
        cta={about.storyCta}
        imageUrl={about.storyImageUrl}
        imageAlt={about.storyImageAlt}
      />
      <MissionVision
        title={about.missionVisionTitle}
        cta={about.missionVisionCta}
        missionTitle={about.missionTitle}
        missionBody={about.missionBody}
        visionTitle={about.visionTitle}
        visionBody={about.visionBody}
      />
      <Team
        eyebrow={about.teamEyebrow}
        title={about.teamTitle}
        members={about.team}
      />
      <section className="bg-surface-blush px-6 py-16 lg:px-20 lg:py-20">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[60px]">
          <Values
            eyebrow={about.valuesEyebrow}
            title={about.valuesTitle}
            values={about.values}
          />
          <Testimonials
            eyebrow={about.testimonialsEyebrow}
            title={about.testimonialsTitle}
            testimonials={about.testimonials}
          />
        </div>
      </section>
    </>
  );
}
