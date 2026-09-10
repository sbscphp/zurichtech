"use client";

import { Select } from "radix-ui";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

/**
 * Figma 261:25413 field chrome.
 * Explicit md: overrides beat Input/Textarea defaults (`md:text-sm` / `text-sm`).
 */
const fieldClass = cn(
  "h-12 w-full rounded-[4px] border border-solid border-line bg-white px-4",
  "font-body text-[18px] leading-[1.4] font-normal text-ink",
  "md:text-[18px]",
  "outline-none transition-colors",
  "placeholder:font-body placeholder:text-[18px] placeholder:leading-[1.4] placeholder:font-normal placeholder:text-[#adb5bd]",
  "md:placeholder:text-[18px]",
  "focus-visible:border-ink/30 focus-visible:ring-3 focus-visible:ring-ink/10",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

export const inquiryFieldClass = fieldClass;

export const inquiryTextareaClass = cn(
  "min-h-30 w-full resize-none rounded-[4px] border border-solid border-line bg-white px-4 py-6 shadow-none",
  "font-body text-[18px] leading-[1.2] font-normal text-ink",
  "md:text-[18px]",
  "outline-none transition-colors",
  "placeholder:font-body placeholder:text-[18px] placeholder:leading-[1.2] placeholder:font-normal placeholder:text-[#adb5bd]",
  "md:placeholder:text-[18px]",
  "focus-visible:border-ink/30 focus-visible:ring-3 focus-visible:ring-ink/10",
  "disabled:cursor-not-allowed disabled:opacity-60",
);

export function InquiryField({
  label,
  htmlFor,
  required,
  error,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-1">
      <Label
        htmlFor={htmlFor}
        className="mb-0 font-body text-[18px] leading-[1.4] font-semibold text-black"
      >
        {label}
        {required ? <span className="text-[#fa5252]">*</span> : null}
      </Label>
      {children}
      {error ? (
        <p
          id={`${htmlFor}-error`}
          role="alert"
          className="font-body text-sm text-[#fa5252]"
        >
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function inquiryControlClass(hasError?: boolean, className?: string) {
  return cn(
    fieldClass,
    hasError &&
      "border-[#fa5252] focus-visible:border-[#fa5252] focus-visible:ring-[#fa5252]/20",
    className,
  );
}

export function inquiryTextareaControlClass(
  hasError?: boolean,
  className?: string,
) {
  return cn(
    inquiryTextareaClass,
    hasError &&
      "border-[#fa5252] focus-visible:border-[#fa5252] focus-visible:ring-[#fa5252]/20",
    className,
  );
}

type InquirySelectProps = {
  id: string;
  name?: string;
  value: string;
  placeholder?: string;
  options: string[];
  disabled?: boolean;
  hasError?: boolean;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

/** Styled select (Radix) — white menu, same 18px type as text inputs. */
export function InquirySelect({
  id,
  name,
  value,
  placeholder = "Software development",
  options,
  disabled,
  hasError,
  onChange,
  onBlur,
}: InquirySelectProps) {
  return (
    <Select.Root
      value={value || undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <Select.Trigger
        id={id}
        name={name}
        aria-invalid={hasError || undefined}
        onBlur={onBlur}
        className={inquiryControlClass(
          hasError,
          cn(
            "group flex cursor-pointer items-center justify-between gap-3 text-left data-placeholder:text-[#adb5bd]",
            !value && "text-[#adb5bd]",
          ),
        )}
      >
        <Select.Value
          placeholder={placeholder}
          className="truncate font-body text-[18px] leading-[1.4] font-normal"
        />
        <Select.Icon className="flex size-6 shrink-0 items-center justify-center">
          <img
            alt=""
            src="/figma/contact/chevron-down.svg"
            className="size-6 transition-transform group-data-[state=open]:rotate-180"
          />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={4}
          className="z-50 max-h-72 w-[var(--radix-select-trigger-width)] overflow-hidden rounded-[4px] border border-line bg-white shadow-[0px_1px_2px_0px_rgba(0,0,0,0.1),0px_1px_3px_0px_rgba(0,0,0,0.05)]"
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option}
                value={option}
                className={cn(
                  "relative flex cursor-pointer items-center rounded-[4px] px-3 py-2.5 outline-none select-none",
                  "font-body text-[18px] leading-[1.4] font-normal text-ink",
                  "data-[highlighted]:bg-surface-muted data-[state=checked]:bg-brand-soft data-[state=checked]:text-brand",
                )}
              >
                <Select.ItemText>{option}</Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}
