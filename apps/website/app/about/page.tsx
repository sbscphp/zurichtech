import type { Metadata } from "next";

import { AboutPageContentView } from "@/components/about/about-page-content";
import { getAboutPage } from "@/lib/sanity/about";

export const metadata: Metadata = {
  title: "About Us",
};

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  return <AboutPageContentView initialAboutPage={aboutPage} />;
}
