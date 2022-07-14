import { PermissionEnum } from "@/checkout-app/graphql";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { debugEnvVars, envVars } from "../constants";
import { isAuthenticated, isAuthorized } from "./auth";

export const allowCors =
  (fn: NextApiHandler): NextApiHandler =>
  async (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", req.headers.origin || "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS,POST");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
    );

    if (req.method === "OPTIONS") {
      res.status(200).end();
      return;
    }

    return await fn(req, res);
  };

export const requireAuthorization =
  (
    fn: NextApiHandler,
    requiredPermissions?: PermissionEnum[]
  ): NextApiHandler =>
  async (req, res) => {
    const authenticated = await isAuthenticated(req);

    if (!authenticated) {
      return res.status(401).json({
        error: {
          message: "Unauthenticated",
        },
      });
    }

    const authorized = isAuthorized(req, requiredPermissions);

    if (!authorized) {
      return res.status(403).json({
        error: {
          message: "Unauthorized",
        },
      });
    }

    return await fn(req, res);
  };

export const getBaseUrl = (req: NextApiRequest) => {
  if (debugEnvVars?.appUrl) {
    console.debug("Using DEBUG_APP_URL: ", debugEnvVars.appUrl);
    return debugEnvVars.appUrl;
  }

  const { host, "x-forwarded-proto": protocol = "http" } = req.headers;

  return `${protocol}://${host}`;
};

export const getSaleorDomain = () => {
  if (!envVars.apiUrl) {
    throw new Error("Mising NEXT_PUBLIC_SALEOR_API_URL env variable");
  }
  const url = new URL(envVars.apiUrl);
  return url.hostname;
};
