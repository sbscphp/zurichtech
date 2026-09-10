"use client";

import { useEffect } from "react";

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

  useEffect(() => {
    function scrollToHash() {
      const hash = window.location.hash.replace(/^#/, "");
      if (!hash) return;
      document.getElementById(hash)?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    const frame = window.requestAnimationFrame(scrollToHash);
    window.addEventListener("hashchange", scrollToHash);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", scrollToHash);
    };
  }, [services]);

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
