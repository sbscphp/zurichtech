export type SubmitContactPayload = {
  full_name: string;
  email: string;
  company?: string;
  message: string;
};

export type SubmitContactResponse = {
  message?: string;
};

export type SubscribeNewsletterPayload = {
  email: string;
};

export type SubscribeNewsletterResponse = {
  message?: string;
};
