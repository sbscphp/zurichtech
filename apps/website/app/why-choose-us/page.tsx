import type { Metadata } from "next";

import { WhyChooseUsPageContentView } from "@/components/why-choose-us/why-choose-us-page-content";
import { getWhyChooseUsPage } from "@/lib/sanity/why-choose-us";

export const metadata: Metadata = {
  title: "Why Choose Us",
};

export default async function WhyChooseUsPage() {
  const page = await getWhyChooseUsPage();
  return <WhyChooseUsPageContentView initialPage={page} />;
}
