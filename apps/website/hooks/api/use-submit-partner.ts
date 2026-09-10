"use client";

import { useMutation } from "@tanstack/react-query";

import { submitPartner } from "@/lib/api/partner";
import type { SubmitPartnerPayload } from "@/lib/api/types";

export function useSubmitPartner() {
  return useMutation({
    mutationFn: (payload: SubmitPartnerPayload) => submitPartner(payload),
  });
}
