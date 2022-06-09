import { NextApiRequest, NextApiResponse } from "next";
import { Types } from "@adyen/api-library";

import { allowCors } from "@/checkout-app/backend/utils";
import { getOrderPaymentDetails } from "@/checkout-app/backend/payments/getOrderPaymentDetails";
import { OrderPaymentMetafield } from "@/checkout-app/types";
import { verifySession } from "@/checkout-app/backend/payments/providers/adyen/verifySession";
import { PaymentStatusResponse } from "@/checkout-app/types/api/payment-status";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.status(405).send({ message: "Only GET requests allowed" });
    return;
  }

  const orderId = req.query.orderId as string;

  const order = await getOrderPaymentDetails(orderId);

  if ("errors" in order) {
    return res.status(400).json({
      ok: false,
      errors: order.errors,
    });
  }

  let response: PaymentStatusResponse = {
    status: "UNPAID",
  };

  // INFO: This logic needs to be revisited for multi-payment flow
  if (
    order.data.isPaid ||
    order.data.authorizeStatus === "FULL" ||
    order.data.chargeStatus === "FULL"
  ) {
    response.status = "PAID";
  } else if (order.data.privateMetafield) {
    const data: OrderPaymentMetafield = JSON.parse(order.data.privateMetafield);

    if (data.provider === "adyen" && data.session) {
      const session = await verifySession(data.session);

      const StatusEnum = Types.checkout.PaymentLinkResource.StatusEnum;

      if (session.status === StatusEnum.Active) {
        // Session was previously generated but has not been completed
        response.status = "UNPAID";
        response.sessionLink = session.url;
      } else if (
        [StatusEnum.Completed, StatusEnum.PaymentPending].includes(
          session.status
        )
      ) {
        // Session was successfully completed but Saleor has not yet registered the payment
        response.status = "PENDING";
      } else if (session.status === StatusEnum.Expired) {
        response.status = "UNPAID";
      } else {
        throw new Error("Session status unknown");
      }
    } else if (data.provider === "mollie") {
      // TODO: Handle mollie session
    }
  }

  res.status(200).json(response);
}

export default allowCors(handler);
