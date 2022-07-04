import handler from "@/checkout-app/pages/api/webhooks/mollie"
import { mockRequest } from "@/checkout-app/test-utils"
import { server } from "@/checkout-app/mocks/server"

// Establish API mocking before all tests.
beforeAll(() => server.listen())

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers())

// Clean up after the tests are finished.
afterAll(() => server.close())

jest.setTimeout(100000)

it("handles invalid requests payments", async () => {
  const { req, res } = mockRequest("POST");

  // @ts-ignore
  await handler(req, res);

  expect(res.statusCode).toBe(400)
})

it("handles requests with invalid orderId", async () => {
  const { req, res } = mockRequest("POST");

  req.body = {
    id: "invalid_id"
  }

  // @ts-ignore
  await handler(req, res);

  expect(res.statusCode).toBe(400)
})
