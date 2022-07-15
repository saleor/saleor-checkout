import type { Middleware } from "retes";
import { Response } from "retes/response";
import { withSaleorDomainPresent } from "@saleor/app-sdk/middleware";
import { SALEOR_DOMAIN_HEADER } from "@saleor/app-sdk/const";
import { getSaleorDomain } from "./utils";
import { getErrorMessage } from "@/checkout-app/utils/errors";

export const withSaleorDomainMatch: Middleware = (handler) =>
  withSaleorDomainPresent((request) => {
    let saleorDomain: string;

    try {
      saleorDomain = getSaleorDomain();
    } catch (error) {
      return Response.InternalServerError({
        success: false,
        message: getErrorMessage(error),
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
