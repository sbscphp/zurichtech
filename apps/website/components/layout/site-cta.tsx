import Link from "next/link";

import { Button } from "@/components/ui/button";
import type { CtaLink } from "@/lib/sanity/types";

type SiteCtaProps = {
  titlePrefix: string;
  titleHighlight: string;
  description: string;
  button: CtaLink;
  patternUrl: string;
};

/**
 * Overlapping footer CTA (Figma node 307:9541 / 249:12477).
 */
export function SiteCta({
  titlePrefix,
  titleHighlight,
  description,
  button,
  patternUrl,
}: SiteCtaProps) {
  return (
    <div className="relative h-125 overflow-hidden rounded-2xl bg-surface-rose">
      <div className="pointer-events-none absolute inset-y-0 -left-15.75 -right-15.75 top-0">
        <img alt="" src={patternUrl} className="size-full object-cover" />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="flex max-w-150.75 flex-col items-center gap-4">
          <h2 className="font-display text-[32px] leading-[1.1] font-semibold md:text-[48px]">
            <span className="text-white">{titlePrefix} </span>
            <span className="text-brand">{titleHighlight}</span>
          </h2>
          <p className="max-w-137.25 font-body text-xl leading-[1.4] text-[#adb5bd]">
            {description}
          </p>
        </div>
        <Button
          asChild
          variant="brand"
          size="xl"
          className="font-body hover:bg-[#B30008]"
        >
          <Link href={button.href}>{button.label}</Link>
        </Button>
      </div>
    </div>
  );
}
