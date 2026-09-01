import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { HomePageContent } from "@/lib/sanity/home";

type HeroProps = {
  content: Pick<
    HomePageContent,
    | "heroTitleLine1"
    | "heroTitleLine2"
    | "heroTitleHighlight"
    | "heroDescription"
    | "heroPrimaryCta"
    | "heroSecondaryCta"
    | "heroImageUrl"
    | "heroImageAlt"
  >;
};

/**
 * Home hero (Figma node 425:16852).
 */
export function Hero({ content }: HeroProps) {
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-[#fef2f2]">
      <div className="pointer-events-none absolute inset-0">
        <img
          alt=""
          src={content.heroImageUrl}
          className="h-full w-full object-cover"
        />
      </div>

      <div className="relative mx-auto flex min-h-[600px] w-full max-w-[1440px] items-center px-6 py-16 lg:px-20">
        <div className="flex max-w-[707px] flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[36px] leading-[1.1] font-medium text-white sm:text-[44px] lg:text-[48px]">
              {content.heroTitleLine1}
              <br />
              {content.heroTitleLine2}
              <span>{content.heroTitleHighlight}</span>
            </h1>
            <p className="font-body text-lg leading-[1.4] text-white lg:text-xl">
              {content.heroDescription}
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild variant="brand" size="xl" className="font-body">
              <Link href={content.heroPrimaryCta.href}>
                {content.heroPrimaryCta.label}
                <span className="relative size-8 overflow-hidden">
                  <img
                    alt=""
                    src="/figma/shared/arrow-up-right.svg"
                    className="block size-full"
                  />
                </span>
              </Link>
            </Button>
            <Button
              asChild
              size="xl"
              className="bg-white font-body text-brand hover:bg-white/90"
            >
              <Link href={content.heroSecondaryCta.href}>
                {content.heroSecondaryCta.label}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
