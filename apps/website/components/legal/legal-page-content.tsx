"use client";

import { useState } from "react";

import { useLegalPage } from "@/hooks/sanity/use-legal-page";
import {
  FALLBACK_LEGAL_PAGE,
  type LegalPageContent,
  type PolicyContent,
} from "@/lib/sanity/legal";
import { cn } from "@/lib/utils";

type LegalPageContentProps = {
  initialPage?: LegalPageContent;
};

export function LegalPageContentView({ initialPage }: LegalPageContentProps) {
  const { data: page = FALLBACK_LEGAL_PAGE } = useLegalPage(initialPage);
  const [activeId, setActiveId] = useState(page.defaultPolicyId);

  const activePolicy: PolicyContent =
    page.policies.find((policy) => policy.id === activeId) ??
    page.policies[0] ??
    FALLBACK_LEGAL_PAGE.policies[0];

  return (
    <>
      <section className="relative isolate h-[420px] overflow-hidden md:h-[682px]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(120% 90% at 50% 47%, #fd5059 0%, #d73c44 25%, #b1282f 50%, #8c141a 75%, #660005 100%)",
          }}
        />
        <img
          alt={page.heroImageAlt}
          src={page.heroImageUrl}
          className="absolute top-1/2 left-1/2 h-[178%] w-[127%] max-w-none -translate-x-1/2 -translate-y-[45%] object-cover"
        />
        <img
          alt=""
          src={page.heroImageUrl}
          className="absolute top-1/2 left-1/2 h-[158%] w-[112%] max-w-none -translate-x-1/2 -translate-y-[44%] object-cover opacity-20"
        />
        <h1 className="absolute top-1/2 left-1/2 w-[min(480px,calc(100%-48px))] -translate-x-1/2 -translate-y-1/2 text-center font-display text-[32px] leading-[1.2] font-medium text-white sm:text-[40px] lg:text-[48px]">
          {page.heroTitle}
        </h1>
      </section>

      <section className="px-6 py-16 lg:px-20">
        <div className="mx-auto flex w-full max-w-[991px] flex-col items-start gap-[45px] lg:flex-row">
          <nav className="w-full shrink-0 rounded bg-surface-muted p-2 lg:w-[246px]">
            <div className="flex flex-col gap-2.5">
              {page.policies.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveId(tab.id)}
                  aria-pressed={activeId === tab.id}
                  className={cn(
                    "cursor-pointer rounded px-8 py-3 text-left font-body text-xl leading-[1.4]",
                    activeId === tab.id
                      ? "bg-brand text-white"
                      : "text-[#868e96]",
                  )}
                >
                  {tab.tabLabel}
                </button>
              ))}
            </div>
          </nav>

          <article className="flex w-full max-w-[700px] flex-col gap-4 px-5 py-6">
            <h2 className="font-display text-2xl leading-[1.2] tracking-[-0.24px] text-black">
              {activePolicy.heading}
            </h2>
            {activePolicy.updated ? (
              <p className="font-body text-base font-semibold tracking-[0.24px] text-black">
                {activePolicy.updated}
              </p>
            ) : null}
            <p className="font-body text-base leading-[1.4] text-ink-dimmed">
              {activePolicy.intro}
            </p>

            {activePolicy.sections.map((section, index) => (
              <section key={section.title} className="flex flex-col gap-4">
                <h3 className="font-body text-base font-semibold text-black">
                  {index + 1}. {section.title}
                </h3>
                {section.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="font-body text-base leading-[1.4] text-ink-dimmed"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.bullets.length > 0 ? (
                  <ul className="list-disc space-y-1 pl-6 font-body text-base leading-[1.4] text-ink-dimmed">
                    {section.bullets.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
                {section.after.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 48)}
                    className="font-body text-base leading-[1.4] text-ink-dimmed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
