import createMollieClient from "@mollie/api-client";

import { parseAmountToString } from "../utils";

export const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY,
});

export const createMolliePayment = async () => {
  const mollieData = await mollieClient.orders.create({
    lines: [
      {
        name: "Test product",
        unitPrice: {
          value: parseAmountToString(100),
          currency: "USD",
        },
        quantity: 1,
        vatRate: "0.00",
        vatAmount: { value: "0.00", currency: "USD" },
        totalAmount: {
          value: parseAmountToString(100),
          currency: "USD",
        },
      },
    ],
    redirectUrl: "https://saleor.io",
    billingAddress: {
      city: "Wroclaw",
      country: "PL",
      email: "test@example.com",
      familyName: "John",
      givenName: "Doe",
      postalCode: "50-123",
      streetAndNumber: "Teczowa 7",
    },
    webhookUrl: "https://782d-193-239-57-238.ngrok.io/api/webhooks/mollie",
    locale: "en_US",
    amount: {
      value: parseAmountToString(100),
      currency: "USD",
    },
    orderNumber: "order-test-number",
  });

  return mollieData._links.checkout;
};

export const verifyPayment = async (id: string) => {
  const { status } = await mollieClient.orders.get(id);

  return status === "paid";
};
