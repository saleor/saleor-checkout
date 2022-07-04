import endpoint from "@/checkout-app/pages/api/webhooks/mollie";
import fs from "fs";
import nock from "nock";
import { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";

const handler: typeof endpoint & { cofnig?: PageConfig } = endpoint;

const appendLogToFile = (content) => {
  fs.appendFile("record.txt", content, {}, () => {});
};

afterEach(() => {
  nock.restore();
});

nock.recorder.rec({
  logging: appendLogToFile,
});

test.only("it handles completed payments", async () => {
  // const scope = nock("https://api.mollie.com/v2")
  const orderId = "123";

  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        headers: {
          "content-type": "application/json", // Must use correct content type
        },
        body: JSON.stringify({
          id: orderId,
        }),
      });
    },
  });
});

test("handles refunded payments in Mollie dashboard", async () => {
  // TODO
});

test("it handles invalid API calls", async () => {});
