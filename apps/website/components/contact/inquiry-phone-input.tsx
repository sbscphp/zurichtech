"use client";

import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

import { cn } from "@/lib/utils";

type InquiryPhoneInputProps = {
  id: string;
  value: string;
  disabled?: boolean;
  hasError?: boolean;
  placeholder?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
};

function toDigits(value: string) {
  return value.replace(/\D/g, "");
}

function toE164(digits: string) {
  return digits ? `+${digits}` : "";
}

/**
 * Phone field for inquiry forms — react-phone-input-2 styled to Figma inputs.
 * Stores E.164 values (e.g. +2348012345678) for the API.
 */
export function InquiryPhoneInput({
  id,
  value,
  disabled,
  hasError,
  placeholder = "Enter your phone number",
  onChange,
  onBlur,
}: InquiryPhoneInputProps) {
  return (
    <PhoneInput
      country="ng"
      preferredCountries={["ng", "gb", "us", "ae", "gh", "ke", "za"]}
      enableSearch
      disableSearchIcon
      countryCodeEditable={false}
      value={toDigits(value)}
      disabled={disabled}
      placeholder={placeholder}
      onChange={(phone) => onChange(toE164(phone))}
      onBlur={onBlur}
      inputProps={{
        id,
        name: "phone_number",
        autoComplete: "tel",
        "aria-invalid": hasError || undefined,
      }}
      containerClass={cn("inquiry-phone", hasError && "inquiry-phone-error")}
      inputClass="inquiry-phone-input"
      buttonClass="inquiry-phone-button"
      dropdownClass="inquiry-phone-dropdown"
      searchClass="inquiry-phone-search"
    />
  );
}
