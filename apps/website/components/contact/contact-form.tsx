"use client";

import { useId, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import {
  InquiryCharacterCount,
  InquiryField,
  inquiryControlClass,
  inquiryTextareaControlClass,
} from "@/components/contact/inquiry-field";
import { InquiryPhoneInput } from "@/components/contact/inquiry-phone-input";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSubmitContact } from "@/hooks/api/use-submit-contact";
import { getApiErrorMessage, getApiFieldErrors } from "@/lib/api/client";
import {
  contactFormSchema,
  emptyContactForm,
  MESSAGE_MAX_LENGTH,
  type ContactFormValues,
  zodIssuesToFieldErrors,
} from "@/lib/api/form-schemas";

type ContactFormProps = {
  formNote?: string;
  submitLabel?: string;
  successMessage?: string;
};

/**
 * Contact enquiry form → POST /api/v1/contact/submit
 * Fields: full_name, email, phone_number, organisation, message
 */
export function ContactForm({
  formNote = "Your opinion matters to us...",
  submitLabel = "Send enquiry",
  successMessage = "Thanks — we will be in touch.",
}: ContactFormProps = {}) {
  const formId = useId();
  const [form, setForm] = useState<ContactFormValues>(emptyContactForm);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormValues, string>>>(
    {},
  );
  const [submitted, setSubmitted] = useState(false);
  const submit = useSubmitContact();

  function update<K extends keyof ContactFormValues>(
    key: K,
    value: ContactFormValues[K],
  ) {
    setForm((current) => ({ ...current, [key]: value }));
    setSubmitted(false);
    if (errors[key]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[key];
        return next;
      });
    }
  }

  function validateField<K extends keyof ContactFormValues>(key: K) {
    const shape = contactFormSchema.shape[key];
    const result = shape.safeParse(form[key]);
    setErrors((current) => {
      const next = { ...current };
      if (result.success) {
        delete next[key];
      } else {
        next[key] = result.error.issues[0]?.message ?? "Invalid value.";
      }
      return next;
    });
  }

  function handleSubmit(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();

    const parsed = contactFormSchema.safeParse(form);
    if (!parsed.success) {
      setErrors(zodIssuesToFieldErrors(parsed.error));
      toast.error("Please fix the highlighted fields and try again.");
      return;
    }

    setErrors({});
    submit.mutate(parsed.data, {
      onSuccess: (data) => {
        setForm(emptyContactForm());
        setSubmitted(true);
        toast.success(data.message?.trim() || successMessage);
      },
      onError: (error) => {
        const fieldErrors = getApiFieldErrors(error);
        if (Object.keys(fieldErrors).length > 0) {
          setErrors(fieldErrors);
        }
        toast.error(
          getApiErrorMessage(
            error,
            "Could not send your message. Please try again.",
          ),
        );
      },
    });
  }

  const isPending = submit.isPending;
  const isFormValid = contactFormSchema.safeParse(form).success;

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      aria-busy={isPending}
      className="flex w-full max-w-146.5 flex-col gap-8 rounded-2xl bg-surface-muted p-6 shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.05)]"
    >
      {submitted ? (
        <output className="block rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 font-body text-base text-emerald-800">
          {successMessage}
        </output>
      ) : null}

      <div className="flex flex-col gap-6">
        <InquiryField
          label="Full Name"
          htmlFor={`${formId}-full_name`}
          required
          error={errors.full_name}
        >
          <Input
            id={`${formId}-full_name`}
            name="full_name"
            autoComplete="name"
            placeholder="Enter your full name"
            value={form.full_name}
            disabled={isPending}
            aria-invalid={Boolean(errors.full_name)}
            aria-describedby={
              errors.full_name ? `${formId}-full_name-error` : undefined
            }
            onBlur={() => validateField("full_name")}
            onChange={(event) => update("full_name", event.target.value)}
            className={inquiryControlClass(Boolean(errors.full_name))}
          />
        </InquiryField>

        <InquiryField
          label="Email"
          htmlFor={`${formId}-email`}
          required
          error={errors.email}
        >
          <Input
            id={`${formId}-email`}
            name="email"
            type="email"
            autoComplete="email"
            inputMode="email"
            placeholder="Enter your mail"
            value={form.email}
            disabled={isPending}
            aria-invalid={Boolean(errors.email)}
            onBlur={() => validateField("email")}
            onChange={(event) => update("email", event.target.value)}
            className={inquiryControlClass(Boolean(errors.email))}
          />
        </InquiryField>

        <InquiryField
          label="Phone Number"
          htmlFor={`${formId}-phone_number`}
          required
          error={errors.phone_number}
        >
          <InquiryPhoneInput
            id={`${formId}-phone_number`}
            value={form.phone_number}
            disabled={isPending}
            hasError={Boolean(errors.phone_number)}
            placeholder="Enter your phone number"
            onBlur={() => validateField("phone_number")}
            onChange={(value) => update("phone_number", value)}
          />
        </InquiryField>

        <InquiryField
          label="Organisation"
          htmlFor={`${formId}-organisation`}
          required
          error={errors.organisation}
        >
          <Input
            id={`${formId}-organisation`}
            name="organisation"
            autoComplete="organization"
            placeholder="Enter your company name"
            value={form.organisation}
            disabled={isPending}
            aria-invalid={Boolean(errors.organisation)}
            onBlur={() => validateField("organisation")}
            onChange={(event) => update("organisation", event.target.value)}
            className={inquiryControlClass(Boolean(errors.organisation))}
          />
        </InquiryField>

        <InquiryField
          label="How can we help"
          htmlFor={`${formId}-message`}
          required
          error={errors.message}
        >
          <Textarea
            id={`${formId}-message`}
            name="message"
            rows={4}
            maxLength={MESSAGE_MAX_LENGTH}
            placeholder="Start Typing"
            value={form.message}
            disabled={isPending}
            aria-invalid={Boolean(errors.message)}
            onBlur={() => validateField("message")}
            onChange={(event) => update("message", event.target.value)}
            className={inquiryTextareaControlClass(Boolean(errors.message))}
          />
          <InquiryCharacterCount
            value={form.message}
            max={MESSAGE_MAX_LENGTH}
          />
          {formNote ? (
            <p className="mt-1 font-body text-[18px] font-normal text-ink italic">
              {formNote}
            </p>
          ) : null}
        </InquiryField>
      </div>

      <div className="flex justify-end">
        <Button
          type="submit"
          variant="brand"
          disabled={isPending || !isFormValid}
          className="h-auto w-47.75 cursor-pointer gap-2 rounded-lg px-6 py-2.5 font-body text-lg hover:bg-[#B30008]"
        >
          {isPending ? (
            <>
              <Loader2 className="size-5 animate-spin" aria-hidden />
              Sending…
            </>
          ) : (
            <>
              {submitLabel}
              <span className="relative size-6 overflow-hidden">
                <img
                  alt=""
                  src="/figma/shared/arrow-up-right.svg"
                  className="block size-full"
                />
              </span>
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
