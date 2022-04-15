// https://docs.adyen.com/development-resources/webhooks

import { NextApiRequest, NextApiResponse } from "next";
import { hmacValidator, Types } from "@adyen/api-library";

import { createPayment } from "@/backend/payments/createPayment";
import { verifyPayment } from "@/backend/payments/providers/adyen";

const HMAC = process.env.ADYEN_HMAC;

const validator = new hmacValidator();

const validateNotificationItems = (
  notificationItems: Types.notification.NotificationItem[]
) =>
  notificationItems.map(
    ({ NotificationRequestItem }: Types.notification.NotificationItem) => {
      // first validate the origin
      const valid = validator.validateHMAC(NotificationRequestItem, HMAC);

      if (!valid) {
        throw Error("HMAC key invalid");
      }

      return NotificationRequestItem;
    }
  );

const notificationHandler = async (
  notification: Types.notification.NotificationRequestItem
) => {
  console.log(notification);
  const data = await verifyPayment(notification);
  console.log("verifyPayment data:", data);

  if (!data) {
    return;
  }

  createPayment(data);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get basic auth token
  const encodedCredentials = btoa(
    process.env.ADYEN_BASIC_USERNAME + ":" + process.env.ADYEN_BASIC_PASSWORD
  );

  if (req.headers.authorization !== `Basic ${encodedCredentials}`) {
    return res.status(401).send("Invalid credentials");
  }

  console.log("live: ", req.body.live);

  const items = validateNotificationItems(req.body.notificationItems);
  console.log("items validated");

  res.status(200).send("[accepted]");

  items.forEach(notificationHandler);
}
