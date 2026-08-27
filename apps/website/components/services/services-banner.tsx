import Link from "next/link";

import { BannerGrid } from "@/components/shared/banner-grid";
import { Button } from "@/components/ui/button";

const BANNER = {
  title: "Technology solutions for every stage of your digital journey.",
  description:
    "From digital products to cloud, security, and data, we deliver the expertise businesses need to solve complex challenges and move forward with confidence.",
  cta: { label: "Let’s work Together", href: "/contact" },
};

/**
 * Services page banner (Figma node 261:24755).
 *
 * Copy is inline on purpose — this section is hardcoded ahead of the Sanity
 * wiring that follows in a later phase.
 */
export function ServicesBanner() {
  return (
    <section className="relative isolate overflow-hidden bg-brand">
      <BannerGrid />

      <div className="relative mx-auto flex w-full max-w-[750px] flex-col items-center gap-6 px-6 py-24 text-center text-white md:py-[135px]">
        <h1 className="font-display text-[32px] leading-[1.2] font-medium sm:text-[40px] lg:text-[48px]">
          {BANNER.title}
        </h1>
        <p className="max-w-[579px] font-body text-base leading-[1.4] opacity-80 lg:text-xl">
          {BANNER.description}
        </p>
        <Button asChild variant="inverse" size="xl" className="mt-2 font-body">
          <Link href={BANNER.cta.href}>{BANNER.cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
