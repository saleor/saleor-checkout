import createMollieClient, { OrderStatus } from "@mollie/api-client";

import { OrderFragment } from "@graphql";

import { parseAmountToString } from "../utils";
import { createPayment } from "../createPayment";

export const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

export const createMolliePayment = async (data: OrderFragment) => {
  const mollieData = await mollieClient.orders.create({
    orderNumber: data.number!,
    webhookUrl: "https://90a1-193-239-57-238.ngrok.io/api/webhooks/mollie",
    locale: "en_US",
    redirectUrl: `https://90a1-193-239-57-238.ngrok.io/order?id=${data.id}`,
    metadata: {
      orderId: data.id,
    },
    lines: data.lines.map((line) => ({
      name: line!.variantName,
      quantity: line!.quantity,
      vatRate: parseAmountToString(line!.taxRate),
      vatAmount: {
        currency: line!.totalPrice.tax.currency,
        value: parseAmountToString(line!.totalPrice.tax.amount),
      },
      unitPrice: {
        currency: line!.totalPrice.gross.currency,
        value: parseAmountToString(line!.totalPrice.gross.amount),
      },
      totalAmount: {
        currency: line!.totalPrice.gross.currency,
        value: parseAmountToString(line!.totalPrice.gross.amount),
      },
    })),
    billingAddress: {
      city: data.billingAddress!.city,
      country: data.billingAddress!.country.code,
      email: data.userEmail!,
      givenName: data.billingAddress!.firstName,
      familyName: data.billingAddress!.lastName,
      postalCode: data.billingAddress!.postalCode,
      streetAndNumber: data.billingAddress!.streetAddress1,
      organizationName: data.billingAddress?.companyName,
    },
    amount: {
      value: parseAmountToString(data.total.gross.amount),
      currency: data.total.gross.currency,
    },
    shippingAddress: data.shippingAddress
      ? {
          city: data.shippingAddress.city,
          country: data.shippingAddress.country.code,
          email: data.userEmail!,
          givenName: data.shippingAddress.firstName,
          familyName: data.shippingAddress.lastName,
          postalCode: data.shippingAddress.postalCode,
          streetAndNumber: data.shippingAddress.streetAddress1,
          organizationName: data.shippingAddress.companyName,
        }
      : undefined,
  });

  return mollieData._links.checkout;
};

export const verifyPayment = async (id: string) => {
  const { status, amountCaptured, metadata, method, amount } =
    await mollieClient.orders.get(id);

  if (status === OrderStatus.authorized) {
    await createPayment({
      id: metadata.orderId,
      payment: {
        status,
        type: `mollie-${method}`,
        amountAuthorized: {
          amount: amount.value,
          currency: amount.currency,
        },
      },
    });

    return true;
  }

  if (status === OrderStatus.paid) {
    await createPayment({
      id: metadata.orderId,
      payment: {
        status,
        type: `mollie-${method}`,
        amountCaptured: amountCaptured && {
          amount: parseFloat(amountCaptured.value),
          currency: amountCaptured.currency,
        },
      },
    });

    return true;
  }

  if ([OrderStatus.expired, OrderStatus.canceled].includes(status)) {
    return false;
  }
};
