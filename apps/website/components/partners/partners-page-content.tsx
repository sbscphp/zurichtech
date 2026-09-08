"use client";

import { useState } from "react";

import { ContactForm } from "@/components/contact/contact-form";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { ContactInfo } from "@/components/shared/contact-info";
import { usePartnersPage } from "@/hooks/sanity/use-partners-page";
import { useServices } from "@/hooks/sanity/use-services";
import type { ClientLogo } from "@/lib/sanity/home";
import {
  FALLBACK_PARTNERS_PAGE,
  type PartnersPageContent,
} from "@/lib/sanity/partners";
import {
  FALLBACK_SERVICES,
  type Service,
} from "@/lib/sanity/services";
import {
  FALLBACK_SITE_SETTINGS,
  type SiteSettingsContent,
} from "@/lib/sanity/site-settings";
import { cn } from "@/lib/utils";

type PartnersPageContentProps = {
  initialPage?: PartnersPageContent;
  initialServices?: Service[];
  initialLogos?: ClientLogo[];
  initialSiteSettings?: SiteSettingsContent;
};

export function PartnersPageContentView({
  initialPage,
  initialServices,
  initialLogos,
  initialSiteSettings,
}: PartnersPageContentProps) {
  const { data: page = FALLBACK_PARTNERS_PAGE } = usePartnersPage(initialPage);
  const { data: services = FALLBACK_SERVICES } = useServices(initialServices);
  const serviceOptions = services.map((service) => ({ title: service.title }));
  const [service, setService] = useState(
    serviceOptions[0]?.title ?? FALLBACK_SERVICES[0].title,
  );

  return (
    <>
      <section className="relative isolate">
        <div className="relative h-105 overflow-hidden bg-[#db7575] md:h-170.5">
          <img
            alt={page.heroImageAlt}
            src={page.heroImageUrl}
            className="absolute top-0 left-1/2 h-[151%] w-[108%] max-w-none translate-x-[-46.5%] object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-33% to-[#fd5059] to-83%" />
          <h1 className="absolute bottom-10 left-6 max-w-181.25 font-display text-[40px] leading-[1.1] font-medium text-white sm:bottom-24 sm:text-[56px] lg:left-20 lg:text-[72px]">
            {page.heroTitle}
          </h1>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-7xl items-center gap-2 px-6 py-4 lg:px-20">
        <p className="shrink-0 font-body text-xl text-ink-dimmed">
          {page.trustedByLabel}
        </p>
        <div className="min-w-0 flex-1">
          <LogoMarquee logos={initialLogos} />
        </div>
      </div>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto grid w-full max-w-[1025px] items-start gap-8 lg:grid-cols-[407px_586px]">
          <div className="rounded-2xl bg-brand-soft p-4">
            <p className="font-body text-xl text-brand">{page.inquiryTitle}</p>
            <div className="mt-[21px] flex flex-col gap-3">
              {serviceOptions.map((item) => {
                const selected = item.title === service;
                return (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setService(item.title)}
                    aria-pressed={selected}
                    className={cn(
                      "flex w-full items-center gap-2 rounded-lg p-5 text-left font-body text-lg leading-[1.4]",
                      selected
                        ? "bg-black text-white"
                        : "border border-line bg-white text-black",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border",
                        selected
                          ? "border-brand bg-brand"
                          : "border-line bg-white",
                      )}
                    >
                      {selected ? (
                        <img
                          alt=""
                          src="/figma/partners/check.svg"
                          className="size-3.5"
                        />
                      ) : null}
                    </span>
                    {item.title}
                  </button>
                );
              })}
            </div>
          </div>
          <ContactForm
            service={service}
            onServiceChange={setService}
            services={serviceOptions}
            formNote={page.formNote}
            submitLabel={page.submitLabel}
            successMessage={page.successMessage}
          />
        </div>
      </section>

      <ContactInfo
        title={page.infoTitle}
        description={page.infoDescription}
        initialSiteSettings={
          initialSiteSettings ?? FALLBACK_SITE_SETTINGS
        }
      />
    </>
  );
}
