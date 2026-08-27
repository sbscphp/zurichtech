"use client";

import { useState } from "react";

import { ContactForm } from "@/components/contact/contact-form";
import { HOME_SERVICES } from "@/lib/site/content";
import { cn } from "@/lib/utils";

export function PartnerInquiry() {
  const [service, setService] = useState(HOME_SERVICES[0].title);

  return (
    <section className="px-6 py-16 lg:px-20">
      <div className="mx-auto grid w-full max-w-[1025px] items-start gap-8 lg:grid-cols-[407px_586px]">
        <div className="rounded-2xl bg-brand-soft p-4">
          <p className="font-body text-xl text-brand">SELECT A SERVICE</p>
          <div className="mt-[21px] flex flex-col gap-3">
            {HOME_SERVICES.map((item) => {
              const selected = item.title === service;
              return (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => setService(item.title)}
                  aria-pressed={selected}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-lg p-5 text-left font-body text-lg leading-[1.4]",
                    selected
                      ? "bg-black text-white"
                      : "border border-line bg-white text-black",
                  )}
                >
                  <span
                    className={cn(
                      "flex size-4 shrink-0 items-center justify-center overflow-hidden rounded-[3px] border",
                      selected
                        ? "border-brand bg-brand"
                        : "border-line bg-white",
                    )}
                  >
                    {selected ? (
                      <img
                        alt=""
                        src="/figma/partners/check.svg"
                        className="size-3.5"
                      />
                    ) : null}
                  </span>
                  {item.title}
                </button>
              );
            })}
          </div>
        </div>
        <ContactForm service={service} onServiceChange={setService} />
      </div>
    </section>
  );
}
