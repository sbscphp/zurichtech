import Link from "next/link";

import { BannerGrid } from "@/components/shared/banner-grid";
import { Button } from "@/components/ui/button";

/**
 * Projects page banner (Figma node 314:11557).
 */
export function ProjectsBanner() {
  return (
    <section className="relative isolate flex min-h-[682px] items-center overflow-hidden bg-brand">
      <BannerGrid />

      <div className="relative mx-auto flex w-full max-w-[702px] flex-col items-center gap-6 px-6 py-16 text-center text-white">
        <h1 className="font-display text-[32px] leading-[1.2] font-medium sm:text-[40px] lg:text-[48px]">
          Technology Solutions Built to Make an Impact.
        </h1>
        <p className="max-w-[579px] font-body text-base leading-[1.4] text-white/80 lg:text-xl">
          Explore selected projects that demonstrate how we turn business
          challenges, ideas, and technology requirements into practical digital
          solutions.
        </p>
        <Button asChild variant="inverse" size="xl" className="mt-2 font-body">
          <Link href="/contact">Let’s work Together</Link>
        </Button>
      </div>
    </section>
  );
}
