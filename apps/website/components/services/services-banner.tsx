import Link from "next/link";

import { BannerGrid } from "@/components/shared/banner-grid";
import { Button } from "@/components/ui/button";

const BANNER = {
  title: "Technology solutions for every stage of your digital journey.",
  description:
    "From digital products to cloud, security, and data, we deliver the expertise businesses need to solve complex challenges and move forward with confidence.",
  cta: { label: "Let’s work Together", href: "/partners" },
};

/**
 * Services page banner (Figma node 261:24755).
 */
export function ServicesBanner() {
  return (
    <section className="relative isolate flex min-h-170.5 items-center overflow-hidden bg-brand">
      <BannerGrid />

      <div className="relative mx-auto flex w-full max-w-175.5 flex-col items-center gap-6 px-6 py-16 text-center text-white">
        <h1 className="font-display text-[32px] leading-[1.2] font-medium sm:text-[40px] lg:text-[48px]">
          {BANNER.title}
        </h1>
        <p className="max-w-144.75 font-body text-base leading-[1.4] text-white/80 lg:text-xl">
          {BANNER.description}
        </p>
        <Button asChild variant="inverse" size="xl" className="mt-2 font-body">
          <Link href={BANNER.cta.href}>{BANNER.cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
