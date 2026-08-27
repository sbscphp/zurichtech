import Link from "next/link";

import { BannerGrid } from "@/components/shared/banner-grid";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type PageBannerProps = {
  title: string;
  description?: string;
  cta?: { label: string; href: string };
  tone?: "brand" | "ink";
};

/**
 * Centered inner-page hero. Brand tone matches Services; ink tone matches
 * About / Why Choose Us (Figma nodes 261:24755 and 261:24577).
 */
export function PageBanner({
  title,
  description,
  cta,
  tone = "ink",
}: PageBannerProps) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden",
        tone === "brand" ? "bg-brand" : "bg-black",
      )}
    >
      <BannerGrid />

      <div className="relative mx-auto flex w-full max-w-[750px] flex-col items-center gap-6 px-6 py-24 text-center text-white md:py-[135px]">
        <h1 className="font-display text-[32px] leading-[1.2] font-medium sm:text-[40px] lg:text-[48px]">
          {title}
        </h1>
        {description ? (
          <p className="max-w-[579px] font-body text-base leading-[1.4] text-white/80 lg:text-xl">
            {description}
          </p>
        ) : null}
        {cta ? (
          <Button
            asChild
            variant={tone === "brand" ? "inverse" : "brand"}
            size="xl"
            className="mt-2 font-body"
          >
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        ) : null}
      </div>
    </section>
  );
}
