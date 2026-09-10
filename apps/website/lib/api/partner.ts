import { apiClient, assertApiSuccess } from "./client";
import { isApiConfigured } from "./env";
import type { SubmitPartnerPayload, SubmitPartnerResponse } from "./types";

const PARTNER_PATH = "/partner/submit";

export async function submitPartner(
  payload: SubmitPartnerPayload,
): Promise<SubmitPartnerResponse> {
  if (!isApiConfigured()) {
    throw new Error("API base URL is not configured");
  }

  const { data } = await apiClient.post<SubmitPartnerResponse>(
    PARTNER_PATH,
    payload,
  );

  assertApiSuccess(data, "Could not send your enquiry. Please try again.");
  return data;
}
