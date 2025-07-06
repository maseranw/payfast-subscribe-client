# @ngelekanyo/payfast-subscribe-client

A lightweight TypeScript SDK for initiating and submitting PayFast subscription payments from the browser.

🔗 **Designed to work with [@ngelekanyo/payfast-subscribe](https://www.npmjs.com/package/@ngelekanyo/payfast-subscribe)** — a backend package for handling PayFast signatures, subscriptions, and ITN.

---

## ✨ Features

- Initiate subscription or once-off payments
- Submit payment forms to PayFast securely
- Pause, unpause, cancel, and fetch subscriptions
- Written in TypeScript, works in all frontend frameworks

---

## 📦 Installation

```bash
npm install @ngelekanyo/payfast-subscribe-client
```

---

## 🧩 Prerequisites

This package **requires a backend** using `@ngelekanyo/payfast-subscribe` to:
- Sign and prepare payment data
- Handle PayFast's ITN (Instant Transaction Notifications)
- Manage subscriptions securely

---

## 🚀 Usage

```ts
import {
  initPayFastClient,
  PayFastService,
  PaymentData
} from "@ngelekanyo/payfast-subscribe-client";

// 1. Set your backend API base URL
initPayFastClient("https://your-backend.com");

// 2. Prepare payment data
const paymentData: PaymentData = {
  amount: "99.00",
  item_name: "Pro Plan",
  item_description: "Monthly subscription to Pro Plan",
  name_first: "John",
  name_last: "Doe",
  email_address: "you@example.com",
  m_payment_id: "uuid-123",
  subscription_type: "1",
  billing_date: "2025-07-05",
  recurring_amount: "99.00",
  frequency: "3",
  cycles: "0",
  subscription_notify_email: "you@example.com",
  subscription_notify_buyer: "1"
};

const payfast = new PayFastService();

// 3. Initiate payment via backend
const response = await payfast.initiatePayment(paymentData);

// 4. Submit to PayFast
payfast.submitPayment(response.paymentData, response.payfastUrl);
```

```ts

 const handlePause = async (token: string) => {
    setLoading(true);
    setError(null);
    try {
      const payfast = new PayFastService();
      const response: PayFastActionResponse = await payfast.pauseSubscription(
        token
      );

      const success =
        response?.data?.code === 200 && response?.data?.status === "success";
      if (!success) {
        throw new Error(response?.data?.data?.message || "Pause failed");
      }

      await fetchSubscriptions();
    } catch (err: any) {
      setError(err.message || "Failed to pause subscription");
    } finally {
      setLoading(false);
    }
  };

```
---

## 🔧 Available Methods

| Method | Description |
|--------|-------------|
| `initPayFastClient(url)` | Set the backend base URL |
| `initiatePayment(data)` | Call backend to prepare PayFast form |
| `submitPayment(data, url)` | Submit a form to PayFast |
| `pauseSubscription(token)` | Pause a subscription |
| `unpauseSubscription(token)` | Resume a paused subscription |
| `cancelSubscription(token, subscriptionId)` | Cancel a subscription |
| `cancelSubscription(token)` | Cancel a subscription |
| `fetchSubscription(token)` | Retrieve PayFast subscription details |

---

## ⚠️ Pause/Unpause Disclaimer

> **Important Notice:**  
> The `pause` and `unpause` subscription features provided by this package rely on PayFast's native subscription behavior. Please review the following carefully before implementing:

- Pausing a subscription **does not cancel it** — it only delays future billing by the number of paused cycles (e.g. `cycles: 1` = 1 billing interval).
- The **subscription end date is automatically extended** by PayFast for each paused cycle.
- **Unpausing early** (before the pause period ends) will **not adjust the next billing date** — billing still resumes after the full pause duration.
- ⚠️ This may result in a user receiving more than a full billing cycle of access without being charged, unless you **enforce access control** on your side.
- This package does **not automatically manage user access** during pause periods. You must implement that logic in your backend or authorization layer.

📚 For accurate and up-to-date details on PayFast's pause/unpause behavior, refer to the official PayFast documentation:

👉 [PayFast Developer Docs](https://developers.payfast.co.za/docs)


## 📚 Backend Setup

Use [@ngelekanyo/payfast-subscribe](https://www.npmjs.com/package/@ngelekanyo/payfast-subscribe) in your Node.js/Express backend to:

- Handle `/api/payfast/initiate`
- Handle `/api/payfast/notify` (ITN callback)
- Handle `/api/payfast/cancel/:token`
- Handle `/api/payfast/cancel/:token/:subscriptionId`
- (And optionally) pause/unpause/fetch routes

🔒 Your backend should manage signing, verifying, and securing transactions.

---

## 👥 Maintainers

- [@ngelekanyo](https://github.com/maseranw) (author & maintainer)

## 🤝 Contributing

Contributions, suggestions, and issues welcome!  
Please open an issue or submit a pull request.

## 📄 License

This project is licensed under the MIT License.  
See the [LICENSE](./LICENSE) file for details.

MIT — © 2025 Ngelekanyo Masera
