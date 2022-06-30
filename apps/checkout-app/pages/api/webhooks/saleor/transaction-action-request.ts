import { ADYEN_PAYMENT_PREFIX } from "@/checkout-app/backend/payments/providers/adyen";
import { MOLLIE_PAYMENT_PREFIX } from "@/checkout-app/backend/payments/providers/mollie";
import {
  getMollieEventName,
  getMollieClient,
} from "@/checkout-app/backend/payments/providers/mollie/utils";
import {
  TransactionActionEnum,
  TransactionActionPayloadFragment,
  TransactionUpdateDocument,
  TransactionUpdateMutation,
  TransactionUpdateMutationVariables,
} from "@/checkout-app/graphql";
import { NextApiRequest, NextApiResponse } from "next";
import getRawBody from "raw-body";
import { isValidSaleorRequest } from "@/checkout-app/backend/saleor/utils";
import { PaymentStatus } from "@mollie/api-client";
import { getTransactionAmount } from "@/checkout-app/backend/payments/utils";
import { getClient } from "@/checkout-app/backend/client";

export const SALEOR_WEBHOOK_TRANSACTION_ENDPOINT =
  "api/webhooks/saleor/transaction-action-request";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
  const buf = await getRawBody(req, {
    length: req.headers["content-length"],
    limit: "1mb",
  });

  const signature = req.headers["saleor-signature"];

  if (typeof signature !== "string" || signature.length === 0) {
    res.status(401).end("Unathorized");
    console.error("No Saleor signature present in request");
    return;
  }

  if (!(await isValidSaleorRequest(buf, signature))) {
    res.status(401).end("Unauthorized");
    console.error("Invalid Saleor signature", signature);
    return;
  }

  let body: TransactionActionPayloadFragment;

  try {
    body = JSON.parse(buf.toString());
  } catch (e) {
    res.status(400).end("Request data is not valid JSON");
    return;
  }

  const { transaction, action } = body;

  if (action.actionType === "REFUND") {
    if (!transaction?.type || !transaction.reference || !action.amount) {
      throw new Error("Missing transaction data");
    }

    const refund: TransactionRefund = {
      id: transaction.reference,
      amount: action.amount,
      currency: transaction.authorizedAmount.currency,
    };

    try {
      if (transaction.type.includes(MOLLIE_PAYMENT_PREFIX)) {
        await handleMolieRefund(refund, transaction);
      }
      if (transaction.type.includes(ADYEN_PAYMENT_PREFIX)) {
        await handleAdyenRefund(refund);
      }
    } catch (e) {
      console.error("Error while creating refund", e);
      res.status(500).send("Error while processing refund");
      return;
    }
  }

  res.status(200).send("ok");
}

type TransactionRefund = {
  id: string;
  amount: string;
  currency: string;
};

async function handleMolieRefund(
  refund: TransactionRefund,
  transaction: TransactionActionPayloadFragment["transaction"]
) {
  const mollieClient = await getMollieClient();
  const saleorClient = getClient();

  const { id, amount, currency } = refund;
  if (!transaction?.id) {
    throw new Error("Transaction id was not provided");
  }

  const order = await mollieClient.orders.get(id);
  const payments = await order.getPayments();
  const payment = payments.find(
    (payment) => payment.status === PaymentStatus.paid && payment.isRefundable()
  );

  if (!payment) {
    throw new Error("Couldn't find Mollie payment to refund");
  }

  // TODO: Check duplicate webhook invocations
  // based on Saleor-Signature header and metadata saved in transaction

  const getAmount = getTransactionAmount({
    voided: transaction?.voidedAmount.amount,
    charged: transaction?.chargedAmount.amount,
    refunded: transaction?.refundedAmount.amount,
    authorized: transaction?.authorizedAmount.amount,
  });

  const transactionActions: TransactionActionEnum[] = [];

  if (getAmount("charged") < Number(amount)) {
    // Some money in transaction was not refunded
    transactionActions.push("REFUND");
  }

  if (Number(amount) > getAmount("charged")) {
    // Refunded more than charged
    throw new Error("Cannot refund more than charged in transaction");
  }

  const mollieRefund = await mollieClient.payments_refunds.create({
    paymentId: payment?.id,
    amount: {
      value: String(amount),
      currency,
    },
  });

  const { error } = await saleorClient
    .mutation<TransactionUpdateMutation, TransactionUpdateMutationVariables>(
      TransactionUpdateDocument,
      {
        id: transaction.id,
        transaction: {
          availableActions: transactionActions,
        },
        transactionEvent: {
          status: "PENDING",
          name: getMollieEventName("refund requested"),
          reference: mollieRefund.id,
        },
      }
    )
    .toPromise();

  if (error) {
    throw new Error("Transaction couldn't be updated in Saleor", {
      cause: error,
    });
  }
}

async function handleAdyenRefund(refund: TransactionRefund) {
  await new Promise((resolve) => resolve(null));
  throw new Error("Not implemented");
}
