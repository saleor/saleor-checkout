import { OrderStatus } from "@mollie/api-client";

import { TransactionCreateMutationVariables } from "@/checkout-app/graphql";

import { getMollieClient } from "./utils";
import { getTransactionAmount } from "../../utils";

export const verifyPayment = async (
  id: string
): Promise<TransactionCreateMutationVariables | undefined> => {
  const mollieClient = await getMollieClient();

  const { status, amountCaptured, amountRefunded, metadata, method, amount } =
    await mollieClient.orders.get(id);

  const type = `mollie-${method}`;
  const reference = id;
  const eventName = `Mollie status update: ${status}`;

  const getAmount = getTransactionAmount({
    authorized: amount?.value,
    voided: undefined,
    refunded: amountRefunded?.value,
    charged: amountCaptured?.value,
  });

  if (status === OrderStatus.created || status === OrderStatus.pending) {
    return {
      id: metadata.orderId,
      transaction: {
        status,
        reference,
        availableActions: ["VOID"],
        type,
      },
      transactionEvent: {
        status: "PENDING",
        name: eventName,
      },
    };
  }

  if (status === OrderStatus.canceled || status === OrderStatus.expired) {
    return {
      id: metadata.orderId,
      transaction: {
        status,
        reference,
        type,
        availableActions: [],
      },
      transactionEvent: {
        status: "FAILURE",
        name: eventName,
      },
    };
  }

  if (status === OrderStatus.authorized) {
    return {
      id: metadata.orderId,
      transaction: {
        status,
        reference: id,
        type,
        amountAuthorized: {
          amount: getAmount("authorized"),
          currency: amount.currency,
        },
        availableActions: [],
      },
      transactionEvent: {
        status: "PENDING",
        name: eventName,
      },
    };
  }

  if (status === OrderStatus.paid) {
    if (amountRefunded) {
      // Order was refunded in Mollie dashboard
      return {
        id: metadata.orderId,
        transaction: {
          status,
          reference: id,
          type,
          amountRefunded: {
            amount: getAmount("refunded"),
            currency: amountRefunded.currency,
          },
          amountCharged: {
            amount: getAmount("charged"),
            currency: amountCaptured?.currency ?? amountRefunded.currency,
          },
          amountAuthorized: {
            amount: getAmount("authorized"),
            currency: amount.currency,
          },
          availableActions: [],
        },
        transactionEvent: {
          status: "FAILURE",
          name: "Mollie status update - payment was refunded",
        },
      };
    }

    return {
      id: metadata.orderId,
      transaction: {
        status,
        reference: id,
        type,
        amountAuthorized: {
          amount: getAmount("authorized"),
          currency: amount.currency,
        },
        amountCharged: amountCaptured && {
          amount: getAmount("charged"),
          currency: amountCaptured.currency,
        },
        availableActions: ["REFUND"],
      },
      transactionEvent: {
        status: "SUCCESS",
        name: eventName,
      },
    };
  }
};
