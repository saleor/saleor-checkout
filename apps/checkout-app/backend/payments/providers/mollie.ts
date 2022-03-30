import createMollieClient, {
  OrderStatus,
  OrderLineType,
  OrderCreateParams,
} from "@mollie/api-client";

import { OrderFragment, OrderLineFragment } from "@graphql";

import { parseAmountToString } from "../utils";
import { createPayment } from "../createPayment";

export const mollieClient = createMollieClient({
  apiKey: process.env.MOLLIE_API_KEY!,
});

const getProductType = (line: OrderLineFragment): OrderLineType | undefined => {
  if (!line.variant) {
    return undefined;
  }

  const { isDigital, kind } = line.variant.product.productType;

  if (isDigital) {
    return OrderLineType.digital;
  }

  if (kind === "NORMAL") {
    return OrderLineType.physical;
  }

  if (kind === "GIFT_CARD") {
    return OrderLineType.store_credit;
  }
};

export const createMolliePayment = async (data: OrderFragment) => {
  const discountLines: OrderCreateParams["lines"] = data.discounts
    ? data.discounts.map((discount) => ({
        name: discount.name || "Discount",
        quantity: 1,
        vatRate: "0.00",
        vatAmount: {
          currency: discount.amount.currency,
          value: "0.00",
        },
        unitPrice: {
          currency: discount.amount.currency,
          value: parseAmountToString(discount.amount.amount, true),
        },
        totalAmount: {
          currency: discount.amount.currency,
          value: parseAmountToString(discount.amount.amount, true),
        },
        type: OrderLineType.discount,
      }))
    : [];

  const shippingLines: OrderCreateParams["lines"] = [
    {
      name: data.shippingMethodName || "Shipping",
      quantity: 1,
      vatRate: parseAmountToString(data.shippingTaxRate),
      vatAmount: {
        currency: data.shippingPrice.tax.currency,
        value: parseAmountToString(data.shippingPrice.tax.amount),
      },
      unitPrice: {
        currency: data.shippingPrice.gross.currency,
        value: parseAmountToString(data.shippingPrice.gross.amount),
      },
      totalAmount: {
        currency: data.shippingPrice.gross.currency,
        value: parseAmountToString(data.shippingPrice.gross.amount),
      },
      type: OrderLineType.shipping_fee,
    },
  ];

  const mollieData = await mollieClient.orders.create({
    orderNumber: data.number!,
    webhookUrl: `${process.env.VERCEL_URL}/api/webhooks/mollie`,
    locale: "en_US",
    redirectUrl: `${process.env.VERCEL_URL}/order?id=${data.id}`,
    metadata: {
      orderId: data.id,
    },
    lines: [
      ...discountLines,
      ...shippingLines,
      ...data.lines.map((line) => ({
        name: line!.productName + " - " + line!.variantName,
        quantity: line!.quantity,
        vatRate: parseAmountToString(line!.taxRate),
        vatAmount: {
          currency: line!.totalPrice.tax.currency,
          value: parseAmountToString(line!.totalPrice.tax.amount),
        },
        unitPrice: {
          currency: line!.unitPrice.gross.currency,
          value: parseAmountToString(line!.unitPrice.gross.amount),
        },
        totalAmount: {
          currency: line!.totalPrice.gross.currency,
          value: parseAmountToString(line!.totalPrice.gross.amount),
        },
        type: getProductType(line!),
      })),
    ],
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
