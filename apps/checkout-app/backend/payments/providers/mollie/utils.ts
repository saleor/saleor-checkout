import { OrderFragment, OrderLineFragment } from "@/graphql";
import { OrderCreateParams, OrderLineType } from "@mollie/api-client";

export const parseAmountToString = (amount: number, negative = false) => {
  const value = amount.toFixed(2).toString();

  return negative ? "-" + value : value;
};

const getProductType = (line: OrderLineFragment): OrderLineType | undefined => {
  if (!line.variant) {
    return undefined;
  }

  const { isDigital, kind } = line.variant.product.productType;

  if (isDigital || kind === "GIFT_CARD") {
    return OrderLineType.digital;
  }

  if (kind === "NORMAL") {
    return OrderLineType.physical;
  }
};

export const getDiscountLines = (
  discounts: OrderFragment["discounts"]
): OrderCreateParams["lines"] =>
  discounts
    ? discounts.map((discount) => ({
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

export const getShippingLines = (
  data: OrderFragment
): OrderCreateParams["lines"] => [
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

export const getLines = (lines: OrderFragment["lines"]) =>
  lines.map((line) => ({
    name: line.productName + " - " + line.variantName,
    quantity: line.quantity,
    vatRate: parseAmountToString(line.taxRate),
    vatAmount: {
      currency: line.totalPrice.tax.currency,
      value: parseAmountToString(line.totalPrice.tax.amount),
    },
    unitPrice: {
      currency: line.unitPrice.gross.currency,
      value: parseAmountToString(line.unitPrice.gross.amount),
    },
    totalAmount: {
      currency: line.totalPrice.gross.currency,
      value: parseAmountToString(line.totalPrice.gross.amount),
    },
    type: getProductType(line),
  }));
