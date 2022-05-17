import { envVars } from "@/constants";
import { decode, verify } from "jsonwebtoken";
import JwksClient from "jwks-rsa";
import { NextApiRequest } from "next";

export const jwksClient = JwksClient({
  jwksUri: `${envVars.saleorUrl}.well-known/jwks.json`,
});

const getTokenFromRequest = (req: NextApiRequest) => {
  const auth = req.headers.authorization?.split(" ") || [];
  const token = auth?.length > 1 ? auth?.[1] : undefined;

  return token;
};

export const isAuthenticated = async (req: NextApiRequest) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return false;
  }

  const key = await jwksClient.getSigningKey();
  const publicKey = key.getPublicKey();

  try {
    verify(token, publicKey);
    return true;
  } catch (err) {
    return false;
  }
};

export const isAuthorized = async (req: NextApiRequest) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    return false;
  }

  const tokenData = decode(token);

  if (typeof tokenData !== "string" && tokenData && tokenData["is_staff"]) {
    return true;
  }
  return false;
};
