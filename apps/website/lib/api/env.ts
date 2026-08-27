export const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";

export function isApiConfigured() {
  return Boolean(apiBaseUrl);
}
