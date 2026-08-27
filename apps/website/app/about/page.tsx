import type { Metadata } from "next";

import { MissionVision } from "@/components/about/mission-vision";
import { Story } from "@/components/about/story";
import { Team } from "@/components/about/team";
import { Testimonials } from "@/components/about/testimonials";
import { Values } from "@/components/about/values";
import { PageBanner } from "@/components/shared/page-banner";

export const metadata: Metadata = {
  title: "About Us",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner
        title="Powering Progress. Creating Lasting Value."
        description="We bring together expertise, innovation and partnerships to deliver energy solutions that drive sustainable growth"
        cta={{ label: "Partner With Us", href: "/partners" }}
      />
      <Story />
      <MissionVision />
      <Team />
      <section className="bg-surface-blush px-6 py-16 lg:px-20 lg:py-[60px]">
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-[60px]">
          <Values />
          <Testimonials />
        </div>
      </section>
    </>
  );
}
