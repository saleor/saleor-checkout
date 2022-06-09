import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "@adyen/api-library";

import { createMolliePayment } from "@/checkout-app/backend/payments/providers/mollie";
import { createOrder } from "@/checkout-app/backend/payments/createOrder";
import { allowCors } from "@/checkout-app/backend/utils";
import {
  OrderPaymentMetafield,
  PaymentProviderID,
} from "@/checkout-app/types/common";
import { createAdyenPayment } from "@/checkout-app/backend/payments/providers/adyen";
import { OrderFragment } from "@/checkout-app/graphql";
import { getOrderDetails } from "@/checkout-app/backend/payments/getOrderDetails";
import { Body, Response, ErrorResponse } from "@/checkout-app/types/api/pay";
import { verifySession } from "@/checkout-app/backend/payments/providers/adyen/verifySession";
import { updatePaymentMetafield } from "@/checkout-app/backend/payments/updatePaymentMetafield";

const paymentProviders: PaymentProviderID[] = ["mollie", "adyen"];

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.headers.host);
  if (req.method !== "POST") {
    res.status(405).send({ message: "Only POST requests allowed" });
    return;
  }

  let body: Body =
    typeof req.body === "string" ? JSON.parse(req.body) : req.body;

  // check if correct provider was passed
  if (!paymentProviders.includes(body.provider)) {
    return res
      .status(400)
      .json({ ok: false, errors: ["UNKNOWN_PROVIDER"] } as ErrorResponse);
  }

  let order: OrderFragment;
  // check if order needs to be created
  if ("checkoutId" in body) {
    const data = await createOrder(body.checkoutId, body.totalAmount);

    if ("errors" in data) {
      return res.status(400).json({
        ok: false,
        errors: data.errors,
      } as ErrorResponse);
    }

    order = data.data;
  } else if ("orderId" in body) {
    const data = await getOrderDetails(body.orderId);

    if ("errors" in data) {
      return res.status(400).json({
        ok: false,
        errors: data.errors,
      } as ErrorResponse);
    }

    order = data.data;
  } else {
    return res.status(400).json({
      ok: false,
      errors: ["MISSING_CHECKOUT_OR_ORDER_ID"],
    } as ErrorResponse);
  }

  let response: Response;

  if (order.privateMetafield) {
    const payment: OrderPaymentMetafield = JSON.parse(order.privateMetafield);

    if (payment.provider === body.provider && payment.session) {
      if (payment.provider === "mollie") {
        // TODO: handle mollie payment session
        // return;
      } else if (payment.provider === "adyen") {
        const session = await verifySession(payment.session);
        const StatusEnum = Types.checkout.PaymentLinkResource.StatusEnum;

        if (session.status === StatusEnum.Active) {
          response = {
            ok: true,
            provider: payment.provider,
            orderId: order.id,
            data: {
              paymentUrl: session.url,
            },
          };

          return res.status(200).json(response);
        } else if (
          [StatusEnum.Completed, StatusEnum.PaymentPending].includes(
            session.status
          )
        ) {
          response = {
            ok: false,
            provider: payment.provider,
            orderId: order.id,
            errors: ["ALREADY_PAID"],
          };

          return res.status(200).json(response);
        }
      }
    }
  }

  if (body.provider === "mollie") {
    const url = await createMolliePayment(order, body.redirectUrl);

    if (url) {
      response = {
        ok: true,
        provider: "mollie",
        orderId: order.id,
        data: {
          paymentUrl: url.href,
        },
      };

      return res.status(200).json(response);
    }
  } else if (body.provider === "adyen") {
    const { url, id } = await createAdyenPayment(order, body.redirectUrl);

    if (url) {
      response = {
        ok: true,
        provider: "adyen",
        orderId: order.id,
        data: {
          paymentUrl: url,
        },
      };

      const payment: OrderPaymentMetafield = {
        provider: body.provider,
        session: id,
      };

      await updatePaymentMetafield(order.id, payment);

      return res.status(200).json(response);
    }
  }

  res.status(400).json({ ok: false, orderId: order.id });
}

export default allowCors(handler);
