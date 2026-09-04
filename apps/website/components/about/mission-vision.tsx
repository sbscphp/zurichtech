import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ColorStripe } from "@/components/shared/color-stripe";

/**
 * Mission / vision band (Figma node 261:24675).
 */
export function MissionVision() {
  return (
    <section>
      <ColorStripe inverted />
      <div className="relative overflow-hidden bg-brand px-6 py-16 lg:px-20 lg:py-23.5">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "linear-gradient(to right, #fecdca 1px, transparent 1px), linear-gradient(to bottom, #fecdca 1px, transparent 1px)",
            backgroundSize: "71px 71px",
          }}
        />
        <div className="relative mx-auto grid w-full max-w-7xl items-center gap-8 lg:grid-cols-[419px_1fr]">
          <div className="flex flex-col items-start gap-4">
            <h2 className="font-display text-[32px] leading-[1.2] text-white lg:text-[40px]">
              Helping Organizations Get More From Technology
            </h2>
            <Button asChild variant="inverse" size="xl" className="font-body">
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
          <div className="relative min-h-85 lg:min-h-100">
            <article
              className="group flex flex-col gap-6 rounded-lg bg-white p-5 transition-colors duration-300 hover:bg-brand lg:absolute lg:left-0 lg:top-5.75 lg:w-105.5"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-soft transition-colors duration-300 group-hover:bg-white">
                <img alt="" src="/figma/home/icon-code.svg" className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-[22px] leading-[1.4] text-black transition-colors duration-300 group-hover:text-white">
                  Our Mission
                </h3>
                <p className="mt-2 font-body text-base leading-[1.4] text-ink-dimmed transition-colors duration-300 group-hover:text-white/80">
                  We aim to combine technical excellence with practical
                  problem-solving so that the technology we deliver is not only
                  functional, but also relevant to the people and organizations
                  using it.
                </p>
              </div>
            </article>
            <article
              className="group mt-6 flex flex-col gap-6 rounded-lg bg-white p-5 shadow-[0px_1px_1.5px_rgba(0,0,0,0.05),0px_17px_8.5px_rgba(0,0,0,0.04),0px_36px_14px_rgba(0,0,0,0.1)] transition-colors duration-300 hover:bg-brand lg:absolute lg:right-0 lg:top-0 lg:mt-0 lg:w-102.5 lg:px-5 lg:py-8"
            >
              <span className="flex size-10 items-center justify-center rounded-lg bg-brand-soft transition-colors duration-300 group-hover:bg-white">
                <img alt="" src="/figma/home/icon-code.svg" className="size-5" />
              </span>
              <div>
                <h3 className="font-display text-[22px] leading-[1.4] text-black transition-colors duration-300 group-hover:text-white">
                  Our Vision
                </h3>
                <p className="mt-2 font-body text-base leading-[1.4] text-ink-dimmed transition-colors duration-300 group-hover:text-white/80">
                  Our vision is to become a trusted technology partner for
                  organizations seeking to use technology to improve, transform,
                  and grow. We believe the future belongs to organizations that
                  can adapt to changing technology.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
      <ColorStripe />
    </section>
  );
}
