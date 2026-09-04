import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Overlapping footer CTA (Figma node 307:9541 / 249:12477).
 */
export function SiteCta() {
  return (
    <div className="relative h-[500px] overflow-hidden rounded-2xl bg-surface-rose">
      <div className="pointer-events-none absolute inset-y-0 -left-[63px] -right-[63px] top-0">
        <img
          alt=""
          src="/figma/shared/cta-pattern.png"
          className="size-full object-cover"
        />
      </div>

      <div className="relative flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
        <div className="flex max-w-[603px] flex-col items-center gap-4">
          <h2 className="font-display text-[32px] leading-[1.1] font-semibold md:text-[48px]">
            <span className="text-white">Powering Opportunities. </span>
            <span className="text-[var(--brand)]">Building the Future.</span>
          </h2>
          <p className="max-w-[549px] font-body text-xl leading-[1.4] text-[#adb5bd]">
            Unlock sustainable opportunities, develop transformative energy
            solutions, and create lasting value for the future.
          </p>
        </div>
        <Button asChild variant="brand" size="xl" className="font-body">
          <Link href="/partners">Work With Us</Link>
        </Button>
      </div>
    </div>
  );
}
