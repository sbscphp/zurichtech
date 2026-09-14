"use client";

import Link from "next/link";

import { BrandLogo } from "@/components/brand/logo";
import { SiteCta } from "@/components/layout/site-cta";
import { useSiteSettings } from "@/hooks/sanity/use-site-settings";
import {
  FALLBACK_SITE_SETTINGS,
  type SiteSettingsContent,
} from "@/lib/sanity/site-settings";

type FooterProps = {
  initialSiteSettings?: SiteSettingsContent;
};

/**
 * Site footer with overlapping CTA (Figma node 307:9541).
 *
 * The CTA stays in document flow so it never covers page content, then
 * pulls into the black footer with a negative margin (Figma: ~172px of the
 * 500px card sits on the black band).
 */
export function Footer({ initialSiteSettings }: FooterProps) {
  const { data = FALLBACK_SITE_SETTINGS } = useSiteSettings(initialSiteSettings);

  const contactRows = [
    {
      icon: "/figma/shared/icon-pin.svg",
      lines: [data.contactAddress],
    },
    {
      icon: "/figma/shared/icon-headset.svg",
      lines: data.contactEmails,
      hrefPrefix: "mailto:",
    },
    {
      icon: "/figma/shared/icon-phone.svg",
      lines: data.contactPhones,
      hrefPrefix: "tel:",
      hrefSanitize: true,
    },
  ];

  return (
    <footer className="relative">
      <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-20">
        <div className="-mb-24 md:-mb-43">
          <SiteCta
            titlePrefix={data.ctaTitlePrefix}
            titleHighlight={data.ctaTitleHighlight}
            description={data.ctaDescription}
            button={data.ctaButton}
            patternUrl={data.ctaPatternUrl}
          />
        </div>
      </div>

      <div className="bg-black pt-36 md:pt-60.25">
        <div className="mx-auto w-full max-w-360 px-6 pb-0 lg:px-20.5">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-17.75">
            <div className="flex w-full max-w-78.25 flex-col gap-4.5">
              <BrandLogo />
              <p className="font-body text-base leading-[1.4] text-white/50">
                {data.tagline}
              </p>
            </div>

            <div className="grid min-w-0 flex-1 gap-8 sm:grid-cols-3">
              <FooterColumn
                title={data.footerServicesTitle}
                items={data.footerServiceLinks}
              />
              <FooterColumn
                title={data.footerCompanyTitle}
                items={data.footerCompanyLinks}
              />
              <div className="flex min-w-0 flex-col gap-2">
                <p className="font-body text-sm leading-[1.4] font-semibold text-white uppercase">
                  {data.footerContactTitle}
                </p>
                <ul className="flex min-w-0 flex-col gap-3">
                  {contactRows.map((row) => (
                    <li
                      key={row.lines.join("-")}
                      className="flex min-w-0 items-start gap-3"
                    >
                      <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[6.4px] bg-white/32">
                        <span className="relative size-4 overflow-hidden">
                          <img
                            alt=""
                            src={row.icon}
                            className="block size-full"
                          />
                        </span>
                      </span>
                      <div className="min-w-0 flex-1 font-body text-base leading-[1.4] text-white/40">
                        {row.lines.map((line) =>
                          row.hrefPrefix ? (
                            <a
                              key={line}
                              href={`${row.hrefPrefix}${
                                row.hrefSanitize
                                  ? line.replace(/\s/g, "")
                                  : line
                              }`}
                              className="block wrap-break-word hover:text-brand hover:underline"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={line} className="wrap-break-word">
                              {line}
                            </p>
                          ),
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-2 border-t border-brand py-8 font-body text-base text-white/50 md:flex-row md:justify-between">
            <p>{data.copyrightText}</p>
            <p className="md:text-right">{data.creditText}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <p className="font-body text-sm leading-[1.4] font-semibold text-white uppercase">
        {title}
      </p>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li key={item.label}>
            <Link
              href={item.href}
              className="inline-block py-1 font-body text-base leading-[1.4] text-white/40 transition-colors hover:text-brand hover:underline"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
