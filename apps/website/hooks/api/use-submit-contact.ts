"use client";

import { useMutation } from "@tanstack/react-query";

import { submitContact } from "@/lib/api/contact";
import type { SubmitContactPayload } from "@/lib/api/types";

export function useSubmitContact() {
  return useMutation({
    mutationFn: (payload: SubmitContactPayload) => submitContact(payload),
  });
}
