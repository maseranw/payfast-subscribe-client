export interface PaymentData {
  amount: string;
  item_name: string;
  item_description?: string;
  name_first?: string;
  name_last?: string;
  email_address?: string;
  m_payment_id: string;
  subscription_type?: string;
  billing_date?: string;
  recurring_amount?: string;
  frequency?: string;
  cycles?: string;
  subscription_notify_email?: string;
  subscription_notify_webhook?: string;
  subscription_notify_buyer?: string;
}

export interface PayFastResponse {
  paymentData: Record<string, string>;
  payfastUrl: string;
}

export interface PayFastActionResponse {
  data: {
    code: number;
    status: string;
    data: {
      response: any;
      message: string;
    };
  };
}


export interface PayFastServiceInterface {
  initiatePayment(data: PaymentData): Promise<PayFastResponse>;
  cancelSubscriptionById(token: string, subscriptionId: string): Promise<PayFastActionResponse>;
  cancelSubscription(token: string): Promise<PayFastActionResponse>;
  pauseSubscription(token: string): Promise<PayFastActionResponse>;
  unpauseSubscription(token: string): Promise<PayFastActionResponse>;
  fetchSubscription(token: string): Promise<PayFastActionResponse>;
  submitPayment(paymentData: Record<string, string>, actionUrl: string): void;
}
