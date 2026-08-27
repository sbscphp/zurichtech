import type { Metadata } from "next";

import { PolicyContent } from "@/components/legal/policy-content";

export const metadata: Metadata = {
  title: "Policy and Legals",
};

export default function LegalPage() {
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
          alt=""
          src="/figma/legal/banner.png"
          className="absolute top-1/2 left-1/2 h-[178%] w-[127%] max-w-none -translate-x-1/2 -translate-y-[45%] object-cover"
        />
        <img
          alt=""
          src="/figma/legal/banner.png"
          className="absolute top-1/2 left-1/2 h-[158%] w-[112%] max-w-none -translate-x-1/2 -translate-y-[44%] object-cover opacity-20"
        />
        <h1 className="absolute top-1/2 left-1/2 w-[min(480px,calc(100%-48px))] -translate-x-1/2 -translate-y-1/2 text-center font-display text-[32px] leading-[1.2] font-medium text-white sm:text-[40px] lg:text-[48px]">
          Policy and Legals
        </h1>
      </section>
      <PolicyContent />
    </>
  );
}
