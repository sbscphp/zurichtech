import type { Metadata } from "next";

import { PartnersPageContentView } from "@/components/partners/partners-page-content";
import { getHomePage } from "@/lib/sanity/home";
import { getPartnersPage } from "@/lib/sanity/partners";
import { getServices } from "@/lib/sanity/services";
import { getSiteSettings } from "@/lib/sanity/site-settings";

export const metadata: Metadata = {
  title: "Partner with Us",
};

export default async function PartnersPage() {
  const [page, services, home, siteSettings] = await Promise.all([
    getPartnersPage(),
    getServices(),
    getHomePage(),
    getSiteSettings(),
  ]);

  return (
    <PartnersPageContentView
      initialPage={page}
      initialServices={services}
      initialLogos={home.clientLogos}
      initialSiteSettings={siteSettings}
    />
  );
}
