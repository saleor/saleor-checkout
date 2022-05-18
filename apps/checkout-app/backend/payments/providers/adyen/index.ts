import { Client, CheckoutAPI, Types } from "@adyen/api-library";

import {
  OrderFragment,
  TransactionCreateMutationVariables,
  TransactionEventInput,
  TransactionFragment,
  TransactionUpdateMutationVariables,
} from "@/graphql";
import { formatRedirectUrl } from "@/backend/payments/utils";
import { getOrderTransactions } from "@/backend/payments/getOrderTransactions";

import {
  getAdyenAmountFromSaleor,
  getSaleorAmountFromAdyen,
  mapAvailableActions,
  getLineItems,
  createEventUniqueKey,
} from "./utils";

const client = new Client({
  apiKey: process.env.ADYEN_API_KEY!,
  environment: "TEST",
});

const checkout = new CheckoutAPI(client);

export const createAdyenPayment = async (
  data: OrderFragment,
  redirectUrl: string
) => {
  const total = data.total.gross;

  const { url } = await checkout.paymentLinks({
    amount: {
      currency: total.currency,
      value: getAdyenAmountFromSaleor(total.amount),
    },
    reference: data.number || data.id,
    returnUrl: formatRedirectUrl(redirectUrl, data.token),
    merchantAccount: "SaleorECOM",
    countryCode: data.billingAddress?.country.code,
    metadata: {
      orderId: data.id,
    },
    lineItems: getLineItems(data.lines),
    shopperEmail: data.userEmail!,
    shopperLocale: "EN", //TODO: get from checkout and pass here
    telephoneNumber:
      data.shippingAddress?.phone || data.billingAddress?.phone || undefined,
    billingAddress: data.billingAddress
      ? {
          city: data.billingAddress.city,
          country: data.billingAddress.country.code,
          street: data.billingAddress.streetAddress1,
          houseNumberOrName: data.billingAddress.streetAddress2,
          postalCode: data.billingAddress.postalCode,
          stateOrProvince: data.billingAddress.countryArea,
        }
      : undefined,
    deliveryAddress: data.shippingAddress
      ? {
          city: data.shippingAddress.city,
          country: data.shippingAddress.country.code,
          street: data.shippingAddress.streetAddress1,
          houseNumberOrName: data.shippingAddress.streetAddress2,
          postalCode: data.shippingAddress.postalCode,
          stateOrProvince: data.shippingAddress.countryArea,
        }
      : undefined,
  });

  return url;
};

export const isNotificationDuplicate = async (
  transactions: TransactionFragment[],
  notificationItem: Types.notification.NotificationRequestItem
) => {
  const eventKeys = transactions
    .map(({ events }) => events.map(createEventUniqueKey))
    .flat();
  const newEventKey = createEventUniqueKey({
    reference: notificationItem.pspReference,
    name: notificationItem.eventCode.toString(),
  });

  return eventKeys.includes(newEventKey);
};

export const getOrderId = async (
  notification: Types.notification.NotificationRequestItem
) => {
  const { additionalData } = notification;
  const paymentLinkId = additionalData?.paymentLinkId;

  if (!paymentLinkId) {
    return;
  }

  const { metadata } = await checkout.getPaymentLinks(paymentLinkId);

  return metadata?.orderId;
};

export const getUpdatedTransactionData = (
  transactionId: string,
  notification: Types.notification.NotificationRequestItem
): TransactionUpdateMutationVariables => {
  const { eventCode, amount, pspReference, originalReference, operations } =
    notification;

  if (!originalReference) {
    throw "originalReference does not exit on notification";
  }

  const failureStates = [
    Types.notification.NotificationRequestItem.EventCodeEnum.CaptureFailed,
    Types.notification.NotificationRequestItem.EventCodeEnum.RefundFailed,
  ];

  const transactionEvent: TransactionEventInput = {
    name: eventCode.toString(),
    status: failureStates.includes(eventCode) ? "FAILURE" : "SUCCESS",
    reference: pspReference,
  };

  return {
    id: transactionId,
    transaction: {
      status: eventCode.toString(),
      ...(operations && { availableActions: mapAvailableActions(operations) }),
    },
    transactionEvent,
  };
};

export const getNewTransactionData = (
  orderId: string,
  notification: Types.notification.NotificationRequestItem
): TransactionCreateMutationVariables | undefined => {
  const {
    eventCode,
    amount,
    pspReference,
    paymentMethod,
    additionalData,
    operations,
  } = notification;
  const paymentLinkId = additionalData?.paymentLinkId;

  if (!paymentLinkId) {
    throw "Payment link does not exist";
  }

  const transactionEvent: TransactionEventInput = {
    name: eventCode.toString(),
    status: "SUCCESS",
    reference: pspReference,
  };

  if (
    eventCode ===
    Types.notification.NotificationRequestItem.EventCodeEnum.Authorisation
  ) {
    return {
      id: orderId,
      transactionEvent,
      transaction: {
        status: eventCode.toString(),
        type: `adyen-${paymentMethod}`,
        amountAuthorized: {
          amount: getSaleorAmountFromAdyen(amount.value!),
          currency: amount.currency!,
        },
        reference: pspReference,
        availableActions: operations ? mapAvailableActions(operations) : [],
      },
    };
  }

  if (
    eventCode ===
    Types.notification.NotificationRequestItem.EventCodeEnum.Capture
  ) {
    return {
      id: orderId,
      transactionEvent,
      transaction: {
        status: eventCode.toString(),
        type: `adyen-${paymentMethod}`,
        amountCaptured: {
          amount: getSaleorAmountFromAdyen(amount.value!),
          currency: amount.currency!,
        },
        reference: pspReference,
        availableActions: operations ? mapAvailableActions(operations) : [],
      },
    };
  }
};
