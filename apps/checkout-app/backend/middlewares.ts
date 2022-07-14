import type { Middleware } from "retes";
import { Response } from "retes/response";
import { withSaleorDomainPresent } from "@saleor/app-sdk/middleware";
import { SALEOR_DOMAIN_HEADER } from "@saleor/app-sdk/const";
import { getSaleorDomain } from "./utils";

export const withSaleorDomainMatch: Middleware = (handler) =>
  withSaleorDomainPresent((request) => {
    const saleorDomain = getSaleorDomain();

    if (saleorDomain === undefined) {
      return Response.InternalServerError({
        success: false,
        message: "Missing NEXT_PUBLIC_SALEOR_API_URL environment variable.",
      });
    }

    if (saleorDomain !== request.headers[SALEOR_DOMAIN_HEADER]) {
      return Response.BadRequest({
        success: false,
        message: `Invalid ${SALEOR_DOMAIN_HEADER} header.`,
      });
    }

    return handler(request);
  });
