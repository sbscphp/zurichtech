import type { Metadata } from "next";

import { LogoMarquee } from "@/components/home/logo-marquee";
import { PartnerInquiry } from "@/components/partners/partner-inquiry";
import { ContactInfo } from "@/components/shared/contact-info";

export const metadata: Metadata = {
  title: "Partner with Us",
};

export default function PartnersPage() {
  return (
    <>
      <section className="relative isolate">
        <div className="relative h-[420px] overflow-hidden bg-[#db7575] md:h-[682px]">
          <img
            alt=""
            src="/figma/partners/hero.png"
            className="absolute top-0 left-1/2 h-[151%] w-[108%] max-w-none -translate-x-[46.5%] object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[33%] to-[#fd5059] to-[83%]" />
          <h1 className="absolute bottom-10 left-6 max-w-[725px] font-display text-[40px] leading-[1.1] font-medium text-white sm:bottom-[96px] sm:text-[56px] lg:left-20 lg:text-[72px]">
            Let’s build what’s next, together.
          </h1>
        </div>
      </section>

      <div className="mx-auto flex w-full max-w-[1280px] items-center gap-2 px-6 py-4 lg:px-20">
        <p className="shrink-0 font-body text-xl text-ink-dimmed">
          TRUSTED BY:
        </p>
        <div className="min-w-0 flex-1">
          <LogoMarquee />
        </div>
      </div>

      <PartnerInquiry />
      <ContactInfo />
    </>
  );
}
