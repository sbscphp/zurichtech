"use client";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/shared/contact-info";
import { useContactPage } from "@/hooks/sanity/use-contact-page";
import {
  FALLBACK_CONTACT_PAGE,
  type ContactPageContent,
} from "@/lib/sanity/contact";
import {
  FALLBACK_SITE_SETTINGS,
  type SiteSettingsContent,
} from "@/lib/sanity/site-settings";

type ContactPageContentProps = {
  initialPage?: ContactPageContent;
  initialSiteSettings?: SiteSettingsContent;
};

export function ContactPageContentView({
  initialPage,
  initialSiteSettings,
}: ContactPageContentProps) {
  const { data: page = FALLBACK_CONTACT_PAGE } = useContactPage(initialPage);

  return (
    <>
      <section className="relative isolate">
        <div className="relative h-170.5 overflow-hidden bg-[#db7575]">
          <img
            alt={page.heroImageAlt}
            src={page.heroImageUrl}
            className="absolute top-0 left-1/2 h-333.25 w-[2000px] max-w-none -translate-x-1/2 object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-b from-transparent from-33% to-[#fd5059] to-83%" />
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center">
            <h1 className="max-w-243.25 font-display text-[32px] leading-[1.1] font-medium text-white sm:text-[44px] lg:text-[72px]">
              {page.heroTitle}
            </h1>
          </div>
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-146.5 justify-center px-6 py-16">
          <ContactForm
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
