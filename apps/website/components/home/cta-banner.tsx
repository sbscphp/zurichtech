"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { useHomePage } from "@/hooks/sanity/use-home-page";
import { FALLBACK_HOME_PAGE, type HomePageContent } from "@/lib/sanity/home";

type CtaBannerProps = {
  initialData?: HomePageContent;
};

export function CtaBanner({ initialData }: CtaBannerProps) {
  const { data = FALLBACK_HOME_PAGE } = useHomePage(initialData);

  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="rounded-xl border border-border bg-muted/30 px-8 py-14 text-center">
        <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {data.ctaTitle}
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
          {data.ctaDescription}
        </p>
        <Button asChild size="lg" className="mt-8">
          <Link href={data.ctaButton.href}>{data.ctaButton.label}</Link>
        </Button>
      </div>
    </section>
  );
}
