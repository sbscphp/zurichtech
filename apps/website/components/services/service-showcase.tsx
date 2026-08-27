import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ShowcaseService = {
  /** Designer's index label, kept verbatim from the Figma frame. */
  number: string;
  title: string;
  description: string;
  features: string[];
  image: { src: string; alt: string };
  /** Which side the photo sits on from `lg` up; rows alternate. */
  imageSide: "left" | "right";
};

const CTA = { label: "Let’s work Together", href: "/contact" };

/**
 * Services listed in the order they appear in Figma node 261:24836 — the
 * designer's numbering is not sequential down the page, so it is preserved
 * as-is rather than renumbered.
 */
const SERVICES: ShowcaseService[] = [
  {
    number: "01",
    title: "Software Development",
    description:
      "Custom software solutions designed to solve complex business challenges and support long-term growth.",
    features: [
      "Enterprise applications and business platforms",
      "Custom software and system integration",
      "API development and third-party integrations",
      "Application modernisation and optimisation",
    ],
    image: {
      src: "/figma/services/service-01-software-development.png",
      alt: "Developer working across a desktop and laptop filled with code",
    },
    imageSide: "right",
  },
  {
    number: "02",
    title: "Web Development",
    description:
      "Intuitive, high-performing mobile experiences built to keep your business connected with users wherever they are.",
    features: [
      "Native and cross-platform mobile applications",
      "Customer-facing and enterprise mobile solutions",
      "API and backend integration",
      "App maintenance and performance optimisation",
    ],
    image: {
      src: "/figma/services/service-02-web-development.png",
      alt: "Person using a mobile application",
    },
    imageSide: "left",
  },
  {
    number: "05",
    title: "Cybersecurity and ID Audit",
    description:
      "Practical security solutions designed to protect your systems, data and operations in an evolving digital landscape.",
    features: [
      "Security assessments and risk management",
      "Infrastructure and application security",
      "Identity and access management",
      "Security monitoring and incident readiness",
    ],
    image: {
      src: "/figma/services/service-05-cybersecurity.png",
      alt: "Security operations dashboard being monitored",
    },
    imageSide: "right",
  },
  {
    number: "04",
    title: "Cloud Solutions and Devops",
    description:
      "Flexible and scalable cloud solutions that help your business operate efficiently, securely and with confidence.",
    features: [
      "Cloud strategy and migration",
      "Cloud infrastructure and architecture",
      "Multi-cloud and hybrid cloud solutions",
      "Cloud optimisation and cost management",
    ],
    image: {
      src: "/figma/services/service-04-cloud-devops.png",
      alt: "Server infrastructure powering cloud workloads",
    },
    imageSide: "left",
  },
  {
    number: "03",
    title: "IT Consulting & Advisory",
    description:
      "Strategic technology guidance that helps you make smarter decisions and get more value from your technology investments.",
    features: [
      "Technology strategy and digital transformation",
      "IT infrastructure and architecture advisory",
      "Technology assessments and roadmaps",
      "Systems and process optimisation",
    ],
    image: {
      src: "/figma/services/service-03-it-consulting.png",
      alt: "Consultants reviewing a technology roadmap together",
    },
    imageSide: "right",
  },
  {
    number: "08",
    title: "IT Support & Maintenance",
    description:
      "Reliable, ongoing support that keeps your technology secure, efficient and performing at its best.",
    features: [
      "Proactive system monitoring and maintenance",
      "Technical support and issue resolution",
      "Software updates and infrastructure management",
      "Performance, security and reliability optimisation",
    ],
    image: {
      src: "/figma/services/service-08-it-support.png",
      alt: "Support engineer assisting a colleague at a workstation",
    },
    imageSide: "left",
  },
];

/**
 * Alternating service rows (Figma node 261:24836).
 *
 * Copy is inline on purpose — this section is hardcoded ahead of the Sanity
 * wiring that follows in a later phase.
 */
export function ServiceShowcase() {
  return (
    <section className="mx-auto w-full max-w-251 px-6 py-16 md:py-24">
      <div className="flex flex-col gap-12">
        {SERVICES.map((service) => (
          <ServiceRow key={service.number} service={service} />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({ service }: { service: ShowcaseService }) {
  return (
    <article className="grid items-center gap-8 lg:grid-cols-[470fr_454fr]">
      <div className="flex flex-col items-start gap-8">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            <p className="font-display text-lg leading-[1.2] text-brand uppercase">
              {service.number}
            </p>
            <h2 className="font-display text-[28px] leading-[1.2] text-ink lg:text-[32px]">
              {service.title}
            </h2>
          </div>
          <p className="font-body text-lg leading-[1.4] text-ink-dimmed">
            {service.description}
          </p>
        </div>

        <ul className="flex w-full flex-col gap-4.5">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-4 border-b border-line pb-5"
            >
              <span className="flex shrink-0 items-center rounded-full bg-brand-soft p-[6.4px]">
                <img
                  alt=""
                  src="/figma/services/check.svg"
                  className="block size-[19.2px]"
                />
              </span>
              <span className="font-body text-lg leading-[1.4] text-ink">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <Button asChild variant="brand" size="xl" className="font-body">
          <Link href={CTA.href}>{CTA.label}</Link>
        </Button>
      </div>

      <div
        className={cn(
          "relative aspect-454/564 w-full overflow-hidden rounded-[8px]",
          service.imageSide === "left" && "lg:order-first",
        )}
      >
        <Image
          src={service.image.src}
          alt={service.image.alt}
          fill
          sizes="(min-width: 1024px) 454px, 100vw"
          className="object-cover"
        />
      </div>
    </article>
  );
}
