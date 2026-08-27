import type { Metadata } from "next";

import { ServiceShowcase } from "@/components/services/service-showcase";
import { ServicesBanner } from "@/components/services/services-banner";

export const metadata: Metadata = {
  title: "Services",
};

export default function ServicesPage() {
  return (
    <>
      <ServicesBanner />
      <ServiceShowcase />
    </>
  );
}
