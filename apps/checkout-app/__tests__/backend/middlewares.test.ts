import { withSaleorDomainMatch } from "@/checkout-app/backend/middlewares";
import { getSaleorDomain } from "@/checkout-app/backend/utils";

jest.mock("@/checkout-app/backend/utils.ts");

const mockedGetSaleorDomain = <jest.Mock>getSaleorDomain;

const TEST_SALEOR_DOMAIN = "master.staging.saleor.cloud";

describe("withSaleorDomainMatch", () => {
  mockedGetSaleorDomain.mockImplementation(() => TEST_SALEOR_DOMAIN);
  it("handles missing Saleor domain in configuration", async () => {
    const handler = jest.fn();
    mockedGetSaleorDomain.mockImplementationOnce(() => null);

    const result = await withSaleorDomainMatch(handler)({});
    expect(result.body).toHaveProperty("success", false);
    expect(result.body).toHaveProperty("message");
    expect(result.status).toBe(500);
    expect(handler).not.toHaveBeenCalled();
  });

  it("handles missing Saleor domain in request", async () => {
    const handler = jest.fn();

    const result = await withSaleorDomainMatch(handler)({});
    expect(result.body).toHaveProperty("success", false);
    expect(result.body).toHaveProperty("message");
    expect(result.status).toBe(400);
    expect(handler).not.toHaveBeenCalled();
  });

  it("handles mismatched Saleor domain in request", async () => {
    const handler = jest.fn();

    const result = await withSaleorDomainMatch(handler)({
      headers: {
        [SALEOR_DOMAIN_HEADER]: "some-other-comain.com",
      },
    });
    expect(result.body).toHaveProperty("success", false);
    expect(result.body).toHaveProperty("message");
    expect(result.status).toBe(400);
    expect(handler).not.toHaveBeenCalled();
  });

  it("handles correct Saleor domain in request", async () => {
    const handler = jest.fn();

    const result = await withSaleorDomainMatch(handler)({
      headers: {
        [SALEOR_DOMAIN_HEADER]: TEST_SALEOR_DOMAIN,
      },
    });
    expect(handler).toHaveBeenCalled();
  });
});
