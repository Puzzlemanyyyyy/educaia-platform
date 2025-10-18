export type PaymentProvider = 'STRIPE' | 'NOVALNET' | 'REVOLUT';

export interface CreatePaymentRequest {
  orderId: string;
  provider: PaymentProvider;
  method: 'CARD' | 'SEPA_DEBIT' | 'WALLET';
}

export interface PaymentResult {
  paymentId: string;
  clientSecret?: string;
  redirectUrl?: string;
}
