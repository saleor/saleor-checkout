import { OrderFragment, TransactionActionEnum } from "@/graphql";
import { Types } from "@adyen/api-library";

export const getAdyenAmountFromSaleor = (float: number) => float * 100;
export const getSaleorAmountFromAdyen = (integer: number) => integer / 100;

export const mapAvailableActions = (
  operations: Types.notification.NotificationRequestItem.OperationsEnum[]
): TransactionActionEnum[] =>
  operations.map((operation) => {
    if (
      operation ===
      Types.notification.NotificationRequestItem.OperationsEnum.Capture
    ) {
      return "CAPTURE";
    }

    if (
      operation ===
      Types.notification.NotificationRequestItem.OperationsEnum.Refund
    ) {
      return "REFUND";
    }

    if (
      operation ===
      Types.notification.NotificationRequestItem.OperationsEnum.Cancel
    ) {
      return "VOID";
    }

    throw "OperationsEnum out of bounds";
  });

export const getLineItems = (
  lines: OrderFragment["lines"]
): Types.checkout.LineItem[] =>
  lines.map((line) => ({
    description: line.productName + " - " + line.variantName,
    quantity: line.quantity,
    taxPercentage: line.taxRate,
    taxAmount: getAdyenAmountFromSaleor(line.totalPrice.tax.amount),
    amountExcludingTax: getAdyenAmountFromSaleor(line.totalPrice.tax.amount),
    amountIncludingTax: getAdyenAmountFromSaleor(line.totalPrice.gross.amount),
    id: line.id,
    imageUrl: line.thumbnail?.url,
    itemCategory: line.variant?.product.category?.name,
  }));
