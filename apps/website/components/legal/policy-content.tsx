"use client";

import { useState } from "react";

import {
  POLICIES,
  POLICY_TABS,
  type PolicyId,
} from "@/lib/site/legal";
import { cn } from "@/lib/utils";

export function PolicyContent() {
  const [active, setActive] = useState<PolicyId>("privacy");
  const policy = POLICIES[active];

  return (
    <section className="px-6 py-16 lg:px-20">
      <div className="mx-auto flex w-full max-w-[991px] flex-col items-start gap-[45px] lg:flex-row">
        <nav className="w-full shrink-0 rounded bg-surface-muted p-2 lg:w-[246px]">
          <div className="flex flex-col gap-2.5">
            {POLICY_TABS.map((tab) => (
                <button
                key={tab.id}
                type="button"
                onClick={() => setActive(tab.id)}
                aria-pressed={active === tab.id}
                className={cn(
                  "rounded px-8 py-3 text-left font-body text-xl leading-[1.4]",
                  active === tab.id
                    ? "bg-brand text-white"
                    : "text-[#868e96]",
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        <article className="flex w-full max-w-[700px] flex-col gap-4 px-5 py-6">
          <h2 className="font-display text-2xl leading-[1.2] tracking-[-0.24px] text-black">
            {policy.heading}
          </h2>
          <p className="font-body text-base font-semibold tracking-[0.24px] text-black">
            {policy.updated}
          </p>
          <p className="font-body text-base leading-[1.4] text-ink-dimmed">
            {policy.intro}
          </p>

          {policy.sections.map((section, index) => (
            <section key={section.title} className="flex flex-col gap-4">
              <h3 className="font-body text-base font-semibold text-black">
                {index + 1}. {section.title}
              </h3>
              {section.paragraphs?.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="font-body text-base leading-[1.4] text-ink-dimmed"
                >
                  {paragraph}
                </p>
              ))}
              {section.bullets ? (
                <ul className="list-disc space-y-1 pl-6 font-body text-base leading-[1.4] text-ink-dimmed">
                  {section.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              ) : null}
              {section.after?.map((paragraph) => (
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
  );
}
