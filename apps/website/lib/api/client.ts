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

export type ApiError = {
  message: string;
  status?: number;
};

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (!axios.isAxiosError(error)) {
    return error instanceof Error ? error.message : fallback;
  }

  const axiosError = error as AxiosError<{ message?: string }>;
  return (
    axiosError.response?.data?.message ?? axiosError.message ?? fallback
  );
}
