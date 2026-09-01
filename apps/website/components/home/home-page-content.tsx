"use client";

import { Hero } from "@/components/home/hero";
import { Insights } from "@/components/home/insights";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { ServicesGrid } from "@/components/home/services-grid";
import { StatsBand } from "@/components/home/stats-band";
import { Team } from "@/components/home/team";
import { WhyChooseUs } from "@/components/home/why-choose-us";
import { useHomePage } from "@/hooks/sanity/use-home-page";
import { useServices } from "@/hooks/sanity/use-services";
import { FALLBACK_HOME_PAGE, type HomePageContent } from "@/lib/sanity/home";
import {
  FALLBACK_SERVICES,
  type Service,
} from "@/lib/sanity/services";

type HomePageContentProps = {
  initialHomePage?: HomePageContent;
  initialServices?: Service[];
};

export function HomePageContent({
  initialHomePage,
  initialServices,
}: HomePageContentProps) {
  const { data: home = FALLBACK_HOME_PAGE } = useHomePage(initialHomePage);
  const { data: services = FALLBACK_SERVICES } = useServices(initialServices);

  return (
    <>
      <Hero content={home} />
      <LogoMarquee logos={home.clientLogos} />
      <StatsBand
        title={home.statsTitle}
        description={home.statsDescription}
        stats={home.stats}
      />
      <WhyChooseUs
        eyebrow={home.whyEyebrow}
        titlePrefix={home.whyTitlePrefix}
        titleHighlight={home.whyTitleHighlight}
        imageUrl={home.whyImageUrl}
        imageAlt={home.whyImageAlt}
        points={home.whyPoints}
        cta={home.whyCta}
      />
      <ServicesGrid
        title={home.servicesTitle}
        cta={home.servicesCta}
        services={services}
      />
      <Insights
        title={home.insightsTitle}
        cta={home.insightsCta}
        insights={home.insights}
      />
      <Team
        eyebrow={home.teamEyebrow}
        title={home.teamTitle}
        members={home.homeTeam}
      />
    </>
  );
}
