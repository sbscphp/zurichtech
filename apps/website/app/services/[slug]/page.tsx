import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Section } from "@/components/shared/section";
import { PageHero } from "@/components/shared/page-hero";
import { getImageUrl } from "@/lib/sanity/image";
import { getServiceBySlug, getServices } from "@/lib/sanity/services";

type ServiceDetailProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: ServiceDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  return {
    title: service?.title ?? "Service",
    description: service?.summary,
  };
}

export default async function ServiceDetailPage({
  params,
}: ServiceDetailProps) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const coverUrl = getImageUrl(service.coverImage, 1600);

  return (
    <>
      <PageHero
        eyebrow="Service"
        title={service.title}
        description={service.summary}
      >
        <Link
          href="/services"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
        >
          <ArrowLeft className="size-4" />
          All services
        </Link>
      </PageHero>

      {coverUrl ? (
        <div className="mx-auto max-w-6xl px-6 pt-16">
          <Image
            src={coverUrl}
            alt={service.title}
            width={1600}
            height={900}
            priority
            className="w-full rounded-xl object-cover"
          />
        </div>
      ) : null}

      {service.overview.length > 0 ? (
        <Section title="Overview">
          <div className="max-w-3xl space-y-4 text-muted-foreground">
            {service.overview.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Section>
      ) : null}

      {service.deliverables.length > 0 ? (
        <Section title="What you get" className="border-t border-border/60">
          <ul className="max-w-2xl space-y-3">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="border-b border-border/60 pb-3 text-sm last:border-b-0"
              >
                {item}
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      {service.process.length > 0 ? (
        <Section title="How it runs" className="border-t border-border/60">
          <ol className="grid gap-6 md:grid-cols-3">
            {service.process.map((step, index) => (
              <li
                key={step.title}
                className="rounded-xl border border-border p-6"
              >
                <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Step {index + 1}
                </span>
                <h3 className="mt-2 font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Section>
      ) : null}
    </>
  );
}
