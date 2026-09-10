import axios, { type AxiosError } from "axios";

import { apiBaseUrl } from "./env";

export const apiClient = axios.create({
  baseURL: apiBaseUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 30_000,
});

type LaravelErrorBody = {
  message?: string;
  errors?: Record<string, string[] | string>;
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const axiosError = error as AxiosError<LaravelErrorBody>;
  const body = axiosError.response?.data;

  if (body?.message?.trim()) {
    return body.message;
  }

  const fieldErrors = getApiFieldErrors(error);
  const firstFieldError = Object.values(fieldErrors)[0];
  if (firstFieldError) {
    return firstFieldError;
  }

  return axiosError.message || fallback;
}

/** Maps Laravel 422 `errors` into a flat field → first message map. */
export function getApiFieldErrors(error: unknown): Record<string, string> {
  if (!axios.isAxiosError(error)) {
    return {};
  }

  const axiosError = error as AxiosError<LaravelErrorBody>;
  const errors = axiosError.response?.data?.errors;
  if (!errors || typeof errors !== "object") {
    return {};
  }

  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(errors)) {
    if (Array.isArray(value) && value[0]) {
      result[key] = String(value[0]);
    } else if (typeof value === "string" && value.trim()) {
      result[key] = value;
    }
  }
  return result;
}

export function assertApiSuccess<T>(
  response: { error?: boolean; message?: string; data: T },
  fallbackMessage: string,
): T {
  if (response.error) {
    throw new Error(response.message?.trim() || fallbackMessage);
  }
  return response.data;
}
