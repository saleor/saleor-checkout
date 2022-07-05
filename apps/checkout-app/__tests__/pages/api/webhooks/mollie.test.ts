import endpoint from "@/checkout-app/pages/api/webhooks/mollie";
import fs from "fs";
import nock from "nock";
import { PageConfig } from "next";
import { testApiHandler } from "next-test-api-route-handler";
import { GraphQLHandler } from "graphql-mocks";
import "graphql-import-node";
import * as graphqlSchema from "@/checkout-app/schema.graphql";
import { nockHandler } from "@graphql-mocks/network-nock";
import { envVars } from "@/checkout-app/constants";

const handler: typeof endpoint & { cofnig?: PageConfig } = endpoint;

const appendLogToFile = (content: string) => {
  fs.appendFile("record.txt", content, {}, () => {});
};

afterEach(() => {
  nock.restore();
});

nock.recorder.rec({
  logging: appendLogToFile,
});

const graphqlHandler = new GraphQLHandler({
  dependencies: { graphqlSchema },
});

test("it handles invalid API calls", async () => {
  nock(envVars.apiUrl).post("/").reply(nockHandler(graphqlHandler));

  await testApiHandler({
    handler,
    test: async ({ fetch }) => {
      const res = await fetch({
        method: "POST",
        body: "", // empty body
      });
    },
  });
});

test("it handles invalid order ids", async () => {
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
