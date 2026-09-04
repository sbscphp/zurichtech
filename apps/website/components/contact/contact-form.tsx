"use client";

import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/api/use-submit-contact";
import { getApiErrorMessage } from "@/lib/api/client";
import { HOME_SERVICES } from "@/lib/site/content";

const EMPTY_FORM = {
  full_name: "",
  email: "",
  phone: "",
  company: "",
  service: HOME_SERVICES[0].title,
  message: "",
};

const fieldClass =
  "h-12 rounded-[4px] border-line bg-white px-4 font-body text-lg placeholder:text-[#adb5bd]";

type ContactFormProps = {
  service?: string;
  onServiceChange?: (value: string) => void;
};

/**
 * Contact form restyled to Figma node 261:25435.
 * Extra fields are folded into the existing API `message` payload so we
 * don't change the backend contract during this conversion pass.
 */
export function ContactForm({ service, onServiceChange }: ContactFormProps = {}) {
  const [form, setForm] = useState(EMPTY_FORM);
  const submit = useSubmitContact();
  const selectedService = service ?? form.service;

  function update<K extends keyof typeof EMPTY_FORM>(
    key: K,
    value: (typeof EMPTY_FORM)[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const message = [
      form.message,
      form.phone ? `Phone: ${form.phone}` : "",
      selectedService ? `Service of interest: ${selectedService}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    submit.mutate(
      {
        full_name: form.full_name,
        email: form.email,
        company: form.company,
        message,
      },
      {
        onSuccess: (data) => {
          setForm(EMPTY_FORM);
          toast.success(data.message ?? "Thanks — we will be in touch.");
        },
        onError: (error) => {
          toast.error(
            getApiErrorMessage(
              error,
              "Could not send your message. Try again.",
            ),
          );
        },
      },
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full max-w-146.5 flex-col gap-8 rounded-2xl bg-surface-muted p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.05)]"
    >
      <div className="flex flex-col gap-6">
        <Field label="Full Name" htmlFor="full_name" required>
          <Input
            id="full_name"
            name="full_name"
            required
            placeholder="Enter your full name"
            value={form.full_name}
            onChange={(event) => update("full_name", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Email" htmlFor="email" required>
          <Input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Enter your mail"
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Phone Number" htmlFor="phone" required>
          <Input
            id="phone"
            name="phone"
            required
            placeholder="Enter your phone number"
            value={form.phone}
            onChange={(event) => update("phone", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Organisation" htmlFor="company" required>
          <Input
            id="company"
            name="company"
            required
            placeholder="Enter your company name"
            value={form.company}
            onChange={(event) => update("company", event.target.value)}
            className={fieldClass}
          />
        </Field>
        <Field label="Service of interest" htmlFor="service" required>
          <div className="relative">
            <select
              id="service"
              name="service"
              required
              value={selectedService}
              onChange={(event) => {
                update("service", event.target.value);
                onServiceChange?.(event.target.value);
              }}
              className={`${fieldClass} w-full appearance-none pr-12 outline-none`}
            >
              {HOME_SERVICES.map((service) => (
                <option key={service.title} value={service.title}>
                  {service.title}
                </option>
              ))}
            </select>
            <img
              alt=""
              src="/figma/contact/chevron-down.svg"
              className="pointer-events-none absolute top-1/2 right-4 size-6 -translate-y-1/2"
            />
          </div>
        </Field>
        <Field label="How can we help" htmlFor="message" required>
          <Textarea
            id="message"
            name="message"
            required
            rows={4}
            placeholder="Start Typing"
            value={form.message}
            onChange={(event) => update("message", event.target.value)}
            className="min-h-30 rounded-lg border-line bg-white px-4 py-6 font-body text-lg placeholder:text-[#adb5bd]"
          />
        </Field>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="brand"
          disabled={submit.isPending}
          className="h-auto w-47.75 gap-2 rounded-lg px-6 py-2.5 font-body text-lg"
        >
          {submit.isPending ? "Sending…" : "Send enquiry"}
          <span className="relative size-6 overflow-hidden">
            <img
              alt=""
              src="/figma/shared/arrow-up-right.svg"
              className="block size-full"
            />
          </span>
        </Button>
      </div>
    </form>
  );
}

function Field({
  label,
  htmlFor,
  required,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <Label
        htmlFor={htmlFor}
        className="mb-0 font-body text-lg leading-[1.4] font-semibold text-black"
      >
        {label}
        {required ? <span className="text-[#fa5252]">*</span> : null}
      </Label>
      {children}
    </div>
  );
}
