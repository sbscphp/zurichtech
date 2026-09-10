import type { Metadata } from "next";

import { ContactPageContentView } from "@/components/contact/contact-page-content";
import { getContactPage } from "@/lib/sanity/contact";
import { getSiteSettings } from "@/lib/sanity/site-settings";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default async function ContactPage() {
  const [page, siteSettings] = await Promise.all([
    getContactPage(),
    getSiteSettings(),
  ]);

  return (
    <ContactPageContentView
      initialPage={page}
      initialSiteSettings={siteSettings}
    />
  );
}
