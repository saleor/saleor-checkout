import { NextApiRequest, NextApiResponse } from "next";
import { isAuthenticated, isAuthorized } from "./auth";

export const allowCors =
  (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
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
  (fn: (req: NextApiRequest, res: NextApiResponse) => Promise<void>) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    const authenticated = await isAuthenticated(req);
    console.log(
      authenticated
        ? "JWT check: authenticated"
        : "JWT check: not authenticated"
    ); // for deployment debug pusposes
    if (!authenticated) {
      return res.status(401).json({
        error: {
          message: "Unauthenticated",
        },
      });
    }

    const authorized = await isAuthorized(req);
    console.log(
      authorized ? "JWT check: authorized" : "JWT check: not authorized"
    ); // for deployment debug pusposes
    if (!authorized) {
      return res.status(403).json({
        error: {
          message: "Unauthorized",
        },
      });
    }

    return await fn(req, res);
  };
