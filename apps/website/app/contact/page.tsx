import type { Metadata } from "next";

import { ContactForm } from "@/components/contact/contact-form";
import { ContactInfo } from "@/components/shared/contact-info";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative isolate">
        <div className="relative h-[682px] overflow-hidden bg-[#db7575]">
          <img
            alt=""
            src="/figma/contact/hero.png"
            className="absolute top-0 left-1/2 h-[1333px] w-[2000px] max-w-none -translate-x-1/2 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent from-[33%] to-[#fd5059] to-[83%]" />
          <h1 className="absolute bottom-[96px] left-6 max-w-[725px] font-display text-[40px] leading-[1.1] font-medium text-white sm:text-[56px] lg:left-20 lg:text-[72px]">
            Tell Us What you are Building...
          </h1>
        </div>

        <div className="relative z-10 mx-auto -mt-16 flex w-full max-w-[586px] justify-center px-6 pb-16 lg:-mt-24">
          <ContactForm />
        </div>
      </section>

      <ContactInfo />
    </>
  );
}
