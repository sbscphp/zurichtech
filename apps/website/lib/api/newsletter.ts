import { apiClient } from "./client";
import { isApiConfigured } from "./env";
import type {
  SubscribeNewsletterPayload,
  SubscribeNewsletterResponse,
} from "./types";

const SUBSCRIBE_PATH = "/newsletter/subscribe";

export async function subscribeNewsletter(
  payload: SubscribeNewsletterPayload,
): Promise<SubscribeNewsletterResponse> {
  if (!isApiConfigured()) {
    throw new Error("API base URL is not configured");
  }

  const { data } = await apiClient.post<SubscribeNewsletterResponse>(
    SUBSCRIBE_PATH,
    payload,
  );

  return data;
}
