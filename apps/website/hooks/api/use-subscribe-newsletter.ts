"use client";

import { useMutation } from "@tanstack/react-query";

import { subscribeNewsletter } from "@/lib/api/newsletter";
import type { SubscribeNewsletterPayload } from "@/lib/api/types";

export function useSubscribeNewsletter() {
  return useMutation({
    mutationFn: (payload: SubscribeNewsletterPayload) =>
      subscribeNewsletter(payload),
  });
}
