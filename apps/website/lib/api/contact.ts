import { apiClient } from "./client";
import { isApiConfigured } from "./env";
import type { SubmitContactPayload, SubmitContactResponse } from "./types";

const CONTACT_PATH = "/contact/submit";

export async function submitContact(
  payload: SubmitContactPayload,
): Promise<SubmitContactResponse> {
  if (!isApiConfigured()) {
    throw new Error("API base URL is not configured");
  }

  const { data } = await apiClient.post<SubmitContactResponse>(
    CONTACT_PATH,
    payload,
  );

  return data;
}
