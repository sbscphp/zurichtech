import Link from "next/link";

import { BrandLogo } from "@/components/brand/logo";
import { SiteCta } from "@/components/layout/site-cta";
import {
  FOOTER_COMPANY,
  FOOTER_SERVICES,
  SITE,
} from "@/lib/site/content";

const CONTACT_ROWS = [
  {
    icon: "/figma/shared/icon-pin.svg",
    lines: [SITE.address],
  },
  {
    icon: "/figma/shared/icon-headset.svg",
    lines: SITE.emails,
    hrefPrefix: "mailto:",
  },
  {
    icon: "/figma/shared/icon-phone.svg",
    lines: [SITE.phone],
    hrefPrefix: "tel:",
    hrefSanitize: true,
  },
];

/**
 * Site footer with overlapping CTA (Figma node 307:9541).
 *
 * The CTA stays in document flow so it never covers page content, then
 * pulls into the black footer with a negative margin (Figma: ~172px of the
 * 500px card sits on the black band).
 */
export function Footer() {
  return (
    <footer className="relative">
      <div className="relative z-10 mx-auto max-w-[1280px] px-6 lg:px-20">
        <div className="-mb-24 md:-mb-[172px]">
          <SiteCta />
        </div>
      </div>

      <div className="bg-black pt-36 md:pt-[241px]">
        <div className="mx-auto w-full max-w-[1440px] px-6 pb-0 lg:px-[82px]">
          <div className="flex flex-col gap-8 lg:flex-row lg:gap-[71px]">
            <div className="flex w-full max-w-[313px] flex-col gap-[18px]">
              <BrandLogo />
              <p className="font-body text-base leading-[1.4] text-white/50">
                {SITE.tagline}
              </p>
            </div>

            <div className="grid flex-1 gap-8 sm:grid-cols-3">
              <FooterColumn title="services" items={FOOTER_SERVICES} />
              <FooterColumn title="Company" items={FOOTER_COMPANY} />
              <div className="flex flex-col gap-2">
                <p className="font-body text-sm leading-[1.4] font-semibold text-white uppercase">
                  Contact Us
                </p>
                <ul className="flex flex-col gap-3">
                  {CONTACT_ROWS.map((row) => (
                    <li key={row.lines.join("-")} className="flex items-start gap-3">
                      <span className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-[6.4px] bg-white/32">
                        <span className="relative size-4 overflow-hidden">
                          <img
                            alt=""
                            src={row.icon}
                            className="block size-full"
                          />
                        </span>
                      </span>
                      <div className="font-body text-base leading-[1.4] text-white/40">
                        {row.lines.map((line) =>
                          row.hrefPrefix ? (
                            <a
                              key={line}
                              href={`${row.hrefPrefix}${
                                row.hrefSanitize
                                  ? line.replace(/\s/g, "")
                                  : line
                              }`}
                              className="block hover:text-brand hover:underline"
                            >
                              {line}
                            </a>
                          ) : (
                            <p key={line}>{line}</p>
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
            <p>© 2026 ZurichTech. All Rights Reserved.</p>
            <p className="md:text-right">
              Designed and Developed by SSBC UK, 2026
            </p>
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
