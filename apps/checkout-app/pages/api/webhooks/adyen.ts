// https://docs.adyen.com/development-resources/webhooks

import { NextApiRequest, NextApiResponse } from "next";
import { hmacValidator, Types } from "@adyen/api-library";

import { createTransaction } from "@/backend/payments/createTransaction";
import {
  getOrderId,
  isNotificationDuplicate,
  verifyPayment,
} from "@/backend/payments/providers/adyen";

const HMAC = process.env.ADYEN_HMAC!;

const validator = new hmacValidator();

const validateNotificationItems = ({
  NotificationRequestItem,
}: Types.notification.NotificationItem) => {
  // first validate the origin
  const valid = validator.validateHMAC(NotificationRequestItem, HMAC);

  if (!valid) {
    throw "Invalid HMAC key";
  }

  return NotificationRequestItem;
};

const notificationHandler = async (
  notification: Types.notification.NotificationRequestItem
) => {
  const orderId = await getOrderId(notification);

  if (!orderId) {
    return;
  }

  const duplicate = await isNotificationDuplicate(orderId, notification);

  if (duplicate) {
    return;
  }

  const data = await verifyPayment(orderId, notification);

  if (!data) {
    return;
  }

  createTransaction(data);
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Get basic auth token
  const encodedCredentials = Buffer.from(
    process.env.ADYEN_BASIC_USERNAME + ":" + process.env.ADYEN_BASIC_PASSWORD,
    "ascii"
  ).toString("base64");

  if (req.headers.authorization !== `Basic ${encodedCredentials}`) {
    return res.status(401).send("Invalid credentials");
  }

  let notificationItem: Types.notification.NotificationRequestItem;
  try {
    // https://docs.adyen.com/development-resources/webhooks/understand-notifications#notification-structure
    // notificationItem will always contain a single item for HTTP POST
    notificationItem = validateNotificationItems(req.body.notificationItems[0]);
  } catch (error) {
    return res.status(401).send(error);
  }

  res.status(200).send("[accepted]");

  notificationHandler(notificationItem);
}
