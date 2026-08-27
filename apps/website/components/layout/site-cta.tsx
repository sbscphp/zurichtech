import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Overlapping footer CTA (Figma node 249:12477).
 */
export function SiteCta() {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-surface-rose">
      <img
        alt=""
        src="/figma/shared/cta-pattern.png"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="relative mx-auto flex max-w-[603px] flex-col items-center gap-6 px-6 py-16 text-center md:py-[88px]">
        <h2 className="font-display text-[32px] leading-[1.1] font-semibold text-white md:text-[48px]">
          Powering Opportunities. Building the Future.
        </h2>
        <p className="max-w-[549px] font-body text-base leading-[1.4] text-ink-dimmed md:text-xl">
          Unlock sustainable opportunities, develop transformative energy
          solutions, and create lasting value for the future.
        </p>
        <Button asChild variant="brand" size="xl" className="font-body">
          <Link href="/contact">Work With Us</Link>
        </Button>
      </div>
    </div>
  );
}
