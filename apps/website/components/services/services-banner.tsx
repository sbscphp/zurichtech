import Link from "next/link";

import { BannerGrid } from "@/components/shared/banner-grid";
import { Button } from "@/components/ui/button";
import type { CtaLink } from "@/lib/sanity/types";

type ServicesBannerProps = {
  title: string;
  description: string;
  cta: CtaLink;
};

/**
 * Services page banner (Figma node 261:24755).
 */
export function ServicesBanner({ title, description, cta }: ServicesBannerProps) {
  return (
    <section className="relative isolate flex min-h-170.5 items-center overflow-hidden bg-brand">
      <BannerGrid />

      <div className="relative mx-auto flex w-full max-w-175.5 flex-col items-center gap-6 px-6 py-16 text-center text-white">
        <h1 className="font-display text-[32px] leading-[1.2] font-medium sm:text-[40px] lg:text-[48px]">
          {title}
        </h1>
        <p className="max-w-144.75 font-body text-base leading-[1.4] text-white/80 lg:text-xl">
          {description}
        </p>
        <Button asChild variant="inverse" size="xl" className="mt-2 font-body">
          <Link href={cta.href}>{cta.label}</Link>
        </Button>
      </div>
    </section>
  );
}
