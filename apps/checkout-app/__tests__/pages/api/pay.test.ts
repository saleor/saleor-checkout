import {
  PayRequestBody,
  PayRequestErrorResponse,
  PayRequestSuccessResponse,
} from "@/checkout-app/types/api/pay";
import pay from "@/checkout-app/pages/api/pay";
import { mockRequest } from "@/checkout-app/test-utils";

import { createMolliePayment } from "@/checkout-app/backend/payments/providers/mollie";
import { createAdyenPayment } from "@/checkout-app/backend/payments/providers/adyen";
import { createOrder } from "@/checkout-app/backend/payments/createOrder";
import { updatePaymentMetafield } from "@/checkout-app/backend/payments/updatePaymentMetafield";
import { verifyMollieSession } from "@/checkout-app/backend/payments/providers/mollie/verifySession";
import { verifyAdyenSession } from "@/checkout-app/backend/payments/providers/adyen/verifySession";

jest.mock("@/checkout-app/backend/payments/createOrder");
jest.mock("@/checkout-app/backend/payments/providers/mollie");
jest.mock("@/checkout-app/backend/payments/providers/adyen");
jest.mock("@/checkout-app/backend/payments/updatePaymentMetafield");
jest.mock("@/checkout-app/backend/payments/providers/adyen/verifySession");
jest.mock("@/checkout-app/backend/payments/providers/mollie/verifySession");
jest.mock("@mollie/api-client");
jest.mock("urql");

const mockedCreateOrder = <jest.Mock>createOrder;
const mockedCreateMolliePayment = <jest.Mock>createMolliePayment;
const mockedCreateAdyenPayment = <jest.Mock>createAdyenPayment;
const mockedUpdatePaymentMetafield = <jest.Mock>updatePaymentMetafield;
const mockedVerifyAdyenSession = <jest.Mock>verifyAdyenSession;
const mockedVerifyMollieSession = <jest.Mock>verifyMollieSession;

describe("/api/pay", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("rejects when wrong request method is used", async () => {
    const { req, res } = mockRequest("GET");

    // @ts-ignore
    await pay(req, res);

    expect(res.statusCode).toBe(405);
  });

  it("throws an error if incorrect provider is passed", async () => {
    const { req, res } = mockRequest("POST");

    req.body = {
      checkoutId: "id",
      provider: "unknown",
      totalAmount: 100,
    };

    // @ts-ignore
    await pay(req, res);

    expect(mockedCreateOrder).not.toHaveBeenCalled();
    expect(mockedCreateMolliePayment).not.toHaveBeenCalled();

    const data: PayRequestErrorResponse = res._getJSONData();
    expect(res.statusCode).toBe(400);
    expect(data.ok).toBe(false);
    expect(data.errors.length).toBe(1);
    expect(data.errors[0]).toBe("UNKNOWN_PROVIDER");
  });

  it("accepts and processes new payment: mollie", async () => {
    const mockOrderData = {};

    mockedCreateOrder.mockImplementationOnce(() => ({ data: mockOrderData }));
    mockedCreateMolliePayment.mockImplementationOnce(() => ({
      url: "mollie-redirect-url",
      id: "test-id",
    }));
    mockedUpdatePaymentMetafield.mockImplementationOnce(async () => true);
    const { req, res } = mockRequest("POST");

    req.body = {
      checkoutId: "id",
      provider: "mollie",
      totalAmount: 100,
      redirectUrl: "example.com",
    } as PayRequestBody;

    req.headers = {
      host: "app.com",
    };

    // @ts-ignore
    await pay(req, res);

    expect(mockedCreateOrder).toHaveBeenCalledWith("id", 100);
    expect(mockedCreateOrder).toHaveBeenCalledTimes(1);

    expect(mockedCreateMolliePayment).toHaveBeenCalledWith({
      order: mockOrderData,
      redirectUrl: "example.com",
      appUrl: "http://app.com",
    });
    expect(mockedCreateMolliePayment).toHaveBeenCalledTimes(1);

    const data: PayRequestSuccessResponse = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.provider).toBe("mollie");
    expect(data.data.paymentUrl).toBe("mollie-redirect-url");
  });

  it("accepts and reuses existing payment session: mollie", async () => {
    const mockOrderData = {
      privateMetafield: JSON.stringify({
        provider: "mollie",
        session: "session-id-1",
      }),
    };

    mockedCreateOrder.mockImplementationOnce(() => ({ data: mockOrderData }));
    mockedVerifyMollieSession.mockImplementationOnce(async () => ({
      status: "created",
      url: "mollie-redirect-url",
    }));
    const { req, res } = mockRequest("POST");

    req.body = {
      checkoutId: "id",
      provider: "mollie",
      totalAmount: 100,
      redirectUrl: "example.com",
    } as PayRequestBody;

    req.headers = {
      host: "app.com",
    };

    // @ts-ignore
    await pay(req, res);

    expect(mockedCreateOrder).toHaveBeenCalledWith("id", 100);
    expect(mockedCreateOrder).toHaveBeenCalledTimes(1);
    expect(mockedCreateMolliePayment).not.toHaveBeenCalled();
    expect(mockedUpdatePaymentMetafield).not.toHaveBeenCalled();

    const data: PayRequestSuccessResponse = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.provider).toBe("mollie");
    expect(data.data.paymentUrl).toBe("mollie-redirect-url");
  });

  it("accepts and processes new payment: adyen", async () => {
    const mockOrderData = {};

    mockedCreateOrder.mockImplementationOnce(() => ({ data: mockOrderData }));
    mockedCreateAdyenPayment.mockImplementationOnce(() => ({
      url: "adyen-redirect-url",
      id: "test-id",
    }));
    mockedUpdatePaymentMetafield.mockImplementationOnce(async () => true);
    const { req, res } = mockRequest("POST");

    req.body = {
      checkoutId: "id",
      provider: "adyen",
      totalAmount: 100,
      redirectUrl: "example.com",
    } as PayRequestBody;

    // @ts-ignore
    await pay(req, res);

    expect(mockedCreateOrder).toHaveBeenCalledWith("id", 100);
    expect(mockedCreateOrder).toHaveBeenCalledTimes(1);

    expect(mockedCreateAdyenPayment).toHaveBeenCalledWith(
      mockOrderData,
      "example.com"
    );
    expect(mockedCreateAdyenPayment).toHaveBeenCalledTimes(1);

    const data: PayRequestSuccessResponse = res._getJSONData();
    expect(res.statusCode).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.provider).toBe("adyen");
    expect(data.data.paymentUrl).toBe("adyen-redirect-url");
  });

  it("accepts and reuses existing payment session: adyen", async () => {
    const mockOrderData = {
      privateMetafield: JSON.stringify({
        provider: "adyen",
        session: "session-id-2",
      }),
    };

    mockedCreateOrder.mockImplementationOnce(() => ({ data: mockOrderData }));
    mockedVerifyAdyenSession.mockImplementationOnce(async () => ({
      status: "active",
      url: "adyen-redirect-url",
    }));
    const { req, res } = mockRequest("POST");

    req.body = {
      checkoutId: "id",
      provider: "adyen",
      totalAmount: 100,
      redirectUrl: "example.com",
    } as PayRequestBody;

    req.headers = {
      host: "app.com",
    };

    // @ts-ignore
    await pay(req, res);

    expect(mockedCreateOrder).toHaveBeenCalledWith("id", 100);
    expect(mockedCreateOrder).toHaveBeenCalledTimes(1);
    expect(mockedCreateAdyenPayment).not.toHaveBeenCalled();
    expect(mockedUpdatePaymentMetafield).not.toHaveBeenCalled();

    const data: PayRequestSuccessResponse = res._getJSONData();

    expect(res.statusCode).toBe(200);
    expect(data.ok).toBe(true);
    expect(data.provider).toBe("adyen");
    expect(data.data.paymentUrl).toBe("adyen-redirect-url");
  });
});
