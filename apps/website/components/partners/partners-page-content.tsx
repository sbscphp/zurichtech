"use client";

import { useEffect, useState } from "react";

import { PartnerForm } from "@/components/partners/partner-form";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { ContactInfo } from "@/components/shared/contact-info";
import { useServiceOfInterest } from "@/hooks/api/use-service-of-interest";
import { usePartnersPage } from "@/hooks/sanity/use-partners-page";
import type { ClientLogo } from "@/lib/sanity/home";
import {
  FALLBACK_PARTNERS_PAGE,
  type PartnersPageContent,
} from "@/lib/sanity/partners";
import {
  FALLBACK_SITE_SETTINGS,
  type SiteSettingsContent,
} from "@/lib/sanity/site-settings";
import { FALLBACK_SERVICE_OF_INTEREST } from "@/lib/api/types";
import { cn } from "@/lib/utils";

type PartnersPageContentProps = {
  initialPage?: PartnersPageContent;
  initialLogos?: ClientLogo[];
  initialSiteSettings?: SiteSettingsContent;
};

export function PartnersPageContentView({
  initialPage,
  initialLogos,
  initialSiteSettings,
}: PartnersPageContentProps) {
  const { data: page = FALLBACK_PARTNERS_PAGE } = usePartnersPage(initialPage);
  const {
    data: serviceOptions = [...FALLBACK_SERVICE_OF_INTEREST],
    isLoading: servicesLoading,
    isError: servicesError,
  } = useServiceOfInterest();

  const [service, setService] = useState(serviceOptions[0] ?? "");

  useEffect(() => {
    if (!serviceOptions.length) return;
    setService((current) =>
      current && serviceOptions.includes(current) ? current : serviceOptions[0],
    );
  }, [serviceOptions]);

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
            {servicesError ? (
              <p className="mt-3 font-body text-sm text-ink-dimmed">
                Showing default service options. You can still submit your
                enquiry.
              </p>
            ) : null}
            <div className="mt-[21px] flex flex-col gap-3">
              {servicesLoading && serviceOptions.length === 0
                ? Array.from({ length: 4 }).map((_, index) => (
                    <div
                      key={index}
                      className="h-[68px] animate-pulse rounded-lg bg-white/70"
                    />
                  ))
                : serviceOptions.map((item) => {
                    const selected = item === service;
                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setService(item)}
                        aria-pressed={selected}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-2 rounded-lg p-5 text-left font-body text-lg leading-[1.4]",
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
                        {item}
                      </button>
                    );
                  })}
            </div>
          </div>
          <PartnerForm
            service={service}
            onServiceChange={setService}
            serviceOptions={serviceOptions}
            servicesLoading={servicesLoading}
            submitLabel={page.submitLabel}
            successMessage={page.successMessage}
          />
        </div>
      </section>

      <ContactInfo
        title={page.infoTitle}
        description={page.infoDescription}
        initialSiteSettings={initialSiteSettings ?? FALLBACK_SITE_SETTINGS}
      />
    </>
  );
}
