"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Section } from "@/components/shared/section";
import { Skeleton } from "@/components/ui/skeleton";
import { useServices, useServicesPage } from "@/hooks/sanity/use-services";
import {
  FALLBACK_SERVICES,
  FALLBACK_SERVICES_PAGE,
  type Service,
  type ServicesPageContent,
} from "@/lib/sanity/services";

type ServiceDirectoryProps = {
  initialPage?: ServicesPageContent;
  initialServices?: Service[];
};

export function ServiceDirectory({
  initialPage,
  initialServices,
}: ServiceDirectoryProps) {
  const { data: page = FALLBACK_SERVICES_PAGE } = useServicesPage(initialPage);
  const { data: services = FALLBACK_SERVICES, isPending } =
    useServices(initialServices);

  return (
    <Section title={page.directoryTitle} description={page.directoryDescription}>
      {isPending ? (
        <ServiceDirectorySkeleton />
      ) : (
        <ul className="grid gap-6 md:grid-cols-3">
          {services.map((service) => (
            <li key={service._id}>
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col rounded-xl border border-border p-6 transition-colors hover:bg-muted/40"
              >
                <h3 className="font-semibold">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm text-muted-foreground">
                  {service.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium">
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Section>
  );
}

function ServiceDirectorySkeleton() {
  return (
    <ul className="grid gap-6 md:grid-cols-3">
      {Array.from({ length: 3 }).map((_, index) => (
        <li key={index} className="rounded-xl border border-border p-6">
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="mt-3 h-4 w-full" />
          <Skeleton className="mt-2 h-4 w-4/5" />
        </li>
      ))}
    </ul>
  );
}
