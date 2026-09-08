import type { Metadata } from "next";

import { LegalPageContentView } from "@/components/legal/legal-page-content";
import { getLegalPage } from "@/lib/sanity/legal";

export const metadata: Metadata = {
  title: "Policy and Legals",
};

export default async function LegalPage() {
  const page = await getLegalPage();
  return <LegalPageContentView initialPage={page} />;
}
