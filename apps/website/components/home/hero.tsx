import Link from "next/link";

import { Button } from "@/components/ui/button";

/**
 * Home hero (Figma node 282:8621).
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden bg-surface-rose">
      <div className="relative mx-auto flex min-h-[520px] w-full max-w-[1440px] flex-col justify-center px-6 py-16 lg:min-h-[600px] lg:px-20">
        <div className="relative z-10 flex max-w-[707px] flex-col gap-6">
          <div className="flex flex-col gap-4">
            <h1 className="font-display text-[36px] leading-[1.1] font-medium text-[#2b2822] sm:text-[44px] lg:text-[48px]">
              Engineering the systems
              <br />
              your{" "}
              <span className="text-brand">business actually runs on.</span>
            </h1>
            <p className="font-body text-lg leading-[1.4] text-ink-dimmed lg:text-xl">
              We design, build and secure software, cloud platforms and digital
              products with senior engineers, written commitments and delivery
              dates that hold
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <Button asChild variant="brand" size="xl" className="font-body">
              <Link href="/about">
                Learn more
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
              variant="brand-ghost"
              size="xl"
              className="font-body"
            >
              <Link href="/services">Our services</Link>
            </Button>
          </div>
        </div>

        <div className="pointer-events-none absolute top-0 right-0 hidden h-full w-[60%] lg:block">
          <img
            alt=""
            src="/figma/home/hero.png"
            className="absolute top-[-8%] left-[-28%] h-[120%] w-[120%] max-w-none object-contain"
          />
        </div>
      </div>
    </section>
  );
}
