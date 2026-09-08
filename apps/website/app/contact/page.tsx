import type { Metadata } from "next";

import { ContactPageContentView } from "@/components/contact/contact-page-content";
import { getContactPage } from "@/lib/sanity/contact";
import { getServices } from "@/lib/sanity/services";
import { getSiteSettings } from "@/lib/sanity/site-settings";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default async function ContactPage() {
  const [page, services, siteSettings] = await Promise.all([
    getContactPage(),
    getServices(),
    getSiteSettings(),
  ]);

  return (
    <ContactPageContentView
      initialPage={page}
      initialServices={services}
      initialSiteSettings={siteSettings}
    />
  );
}
