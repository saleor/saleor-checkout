import handler from "@/checkout-app/pages/api/webhooks/mollie";
import { mockRequest } from "@/checkout-app/test-utils";

it("handles invalid requests payments", async () => {
  const { req, res } = mockRequest("POST");

  // @ts-ignore
  await handler(req, res);

  expect(res.statusCode).toBe(400);
});

it("handles requests with invalid orderId", async () => {
  const { req, res } = mockRequest("POST");

  req.body = {
    id: "invalid_id",
  };

  // @ts-ignore
  await handler(req, res);

  expect(res.statusCode).toBe(500);
});
