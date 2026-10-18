export interface DonateType {
  id: number;
  title: string;
  description: string;
}

export type PaymentType = 'one_time' | 'recurring';

export interface CreateCheckoutSessionRequest {
  amount: number;
  payment_type: PaymentType;
  donate_type?: number | string | { id?: number; title?: string };
  donate_type_id?: number;
}

export interface CheckoutSessionResponse {
  checkout_url: string;
}

export interface DonationErrorResponse {
  error: string;
}
