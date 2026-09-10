export type ApiEnvelope<T = unknown> = {
  error: boolean;
  message: string;
  data: T;
};

export type SubmitContactPayload = {
  full_name: string;
  email: string;
  phone_number: string;
  organisation: string;
  message: string;
};

export type SubmitPartnerPayload = SubmitContactPayload & {
  service_of_interest: string;
};

export type SubmitContactResponse = ApiEnvelope<unknown[]>;
export type SubmitPartnerResponse = ApiEnvelope<unknown[]>;

export type ServiceOfInterestResponse = ApiEnvelope<string[]>;

export type SubscribeNewsletterPayload = {
  email: string;
};

export type SubscribeNewsletterResponse = {
  message?: string;
};

/** Fallback when the service-of-interest endpoint is unavailable. */
export const FALLBACK_SERVICE_OF_INTEREST = [
  "Software Development",
  "Web Development",
  "Cybersecurity and ID Audit",
  "Cloud Solutions and Devops",
  "IT Consulting & Advisory",
  "IT Support & Maintenance",
] as const;
