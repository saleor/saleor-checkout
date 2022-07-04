import { OrderFragment } from "@/checkout-app/graphql";
import { formatRedirectUrl } from "@/checkout-app/backend/payments/utils";

import {
  getDiscountLines,
  getShippingLines,
  getLines,
  parseAmountToString,
  getMollieClient,
} from "./utils";

export interface CreateMolliePaymentData {
  order: OrderFragment;
  redirectUrl: string;
  appUrl: string;
}

export const createMolliePayment = async ({
  order,
  redirectUrl,
  appUrl,
}: CreateMolliePaymentData) => {
  const discountLines = getDiscountLines(order.discounts);
  const shippingLines = getShippingLines(order);
  const lines = getLines(order.lines);
  const mollieClient = await getMollieClient();

  const mollieData = await mollieClient.orders.create({
    orderNumber: order.number!,
    webhookUrl: `${appUrl}/api/webhooks/mollie`,
    locale: "en_US",
    redirectUrl: formatRedirectUrl(redirectUrl, order.id),
    metadata: {
      orderId: order.id,
    },
    lines: [...discountLines, ...shippingLines, ...lines],
    billingAddress: {
      city: order.billingAddress!.city,
      country: order.billingAddress!.country.code,
      email: order.userEmail!,
      givenName: order.billingAddress!.firstName,
      familyName: order.billingAddress!.lastName,
      postalCode: order.billingAddress!.postalCode,
      streetAndNumber: order.billingAddress!.streetAddress1,
      organizationName: order.billingAddress?.companyName,
    },
    amount: {
      value: parseAmountToString(order.total.gross.amount),
      currency: order.total.gross.currency,
    },
    shippingAddress: order.shippingAddress
      ? {
          city: order.shippingAddress.city,
          country: order.shippingAddress.country.code,
          email: order.userEmail!,
          givenName: order.shippingAddress.firstName,
          familyName: order.shippingAddress.lastName,
          postalCode: order.shippingAddress.postalCode,
          streetAndNumber: order.shippingAddress.streetAddress1,
          organizationName: order.shippingAddress.companyName,
        }
      : undefined,
  });

  return { url: mollieData._links.checkout?.href, id: mollieData.id };
};
