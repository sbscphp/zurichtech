import type { Metadata } from "next";

import { ServicesPageContentView } from "@/components/services/services-page-content";
import { getServices, getServicesPage } from "@/lib/sanity/services";

export const metadata: Metadata = {
  title: "Services",
};

export default async function ServicesPage() {
  const [page, services] = await Promise.all([
    getServicesPage(),
    getServices(),
  ]);

  return (
    <ServicesPageContentView
      initialPage={page}
      initialServices={services}
    />
  );
}
