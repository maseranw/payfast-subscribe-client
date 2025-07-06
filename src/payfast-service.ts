import { BASE_URL } from "./configs/payfast-config";
import { PayFastFormUtils } from "./utils/payfast-form-utils";
import {
  PayFastActionResponse,
  PayFastResponse,
  PayFastServiceInterface,
  PaymentData,
} from "./types/payment";

export class PayFastService implements PayFastServiceInterface {
  private async handleResponse(response: Response): Promise<any> {
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Failed to ${response.url}`);
    }
    return response.json();
  }

  async initiatePayment(data: PaymentData): Promise<PayFastResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/payfast/initiate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      return this.handleResponse(response);
    } catch (err) {
      throw err;
    }
  }

  async cancelSubscriptionById(
    token: string,
    subscriptionId: string
  ): Promise<PayFastActionResponse> {
    try {
      const response = await fetch(
        `${BASE_URL}/api/payfast/cancel/${token}/${subscriptionId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return await this.handleResponse(response);
    } catch (err) {
      throw err;
    }
  }

  async cancelSubscription(token: string): Promise<PayFastActionResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/payfast/cancel/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await this.handleResponse(response);
    } catch (err) {
      throw err;
    }
  }

  async pauseSubscription(token: string): Promise<PayFastActionResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/payfast/pause/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await this.handleResponse(response);
    } catch (err) {
      throw err;
    }
  }

  async unpauseSubscription(token: string): Promise<PayFastActionResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/payfast/unpause/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await this.handleResponse(response);
    } catch (err) {
      throw err;
    }
  }

  async fetchSubscription(token: string): Promise<PayFastActionResponse> {
    try {
      const response = await fetch(`${BASE_URL}/api/payfast/fetch/${token}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await this.handleResponse(response);
    } catch (err) {
      throw err;
    }
  }

  submitPayment(paymentData: Record<string, string>, actionUrl: string): void {
    PayFastFormUtils.submitPayment(paymentData, actionUrl);
  }
}
