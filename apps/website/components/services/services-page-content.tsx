"use client";

import { ServiceShowcase } from "@/components/services/service-showcase";
import { ServicesBanner } from "@/components/services/services-banner";
import { useServices, useServicesPage } from "@/hooks/sanity/use-services";
import {
  FALLBACK_SERVICES,
  FALLBACK_SERVICES_PAGE,
  type Service,
  type ServicesPageContent,
} from "@/lib/sanity/services";

type ServicesPageContentProps = {
  initialPage?: ServicesPageContent;
  initialServices?: Service[];
};

export function ServicesPageContentView({
  initialPage,
  initialServices,
}: ServicesPageContentProps) {
  const { data: page = FALLBACK_SERVICES_PAGE } = useServicesPage(initialPage);
  const { data: services = FALLBACK_SERVICES } = useServices(initialServices);

  return (
    <>
      <ServicesBanner
        title={page.heroTitle}
        description={page.heroDescription}
        cta={page.heroCta}
      />
      <ServiceShowcase services={services} cta={page.showcaseCta} />
    </>
  );
}
