import { apiClient, assertApiSuccess } from "./client";
import { isApiConfigured } from "./env";
import {
  FALLBACK_SERVICE_OF_INTEREST,
  type ServiceOfInterestResponse,
} from "./types";

const SERVICE_OF_INTEREST_PATH = "/service-of-interest";

export async function fetchServiceOfInterest(): Promise<string[]> {
  if (!isApiConfigured()) {
    return [...FALLBACK_SERVICE_OF_INTEREST];
  }

  const { data } = await apiClient.get<ServiceOfInterestResponse>(
    SERVICE_OF_INTEREST_PATH,
  );

  const options = assertApiSuccess(
    data,
    "Could not load service options.",
  );

  if (!Array.isArray(options) || options.length === 0) {
    return [...FALLBACK_SERVICE_OF_INTEREST];
  }

  return options.map(String);
}
