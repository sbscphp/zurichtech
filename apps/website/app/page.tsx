import { Hero } from "@/components/home/hero";
import { Insights } from "@/components/home/insights";
import { LogoMarquee } from "@/components/home/logo-marquee";
import { ServicesGrid } from "@/components/home/services-grid";
import { StatsBand } from "@/components/home/stats-band";
import { Team } from "@/components/home/team";
import { WhyChooseUs } from "@/components/home/why-choose-us";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoMarquee />
      <StatsBand />
      <WhyChooseUs />
      <ServicesGrid />
      <Insights />
      <Team />
    </>
  );
}
