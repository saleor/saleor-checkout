import { NextApiRequest } from "next";
import * as jose from "jose";
import crypto from "crypto";
import { envVars, serverEnvVars } from "@/checkout-app/constants";

const getSaleorDomain = () => {
  const url = new URL(envVars.apiUrl);
  return url.origin;
};

const JWKS = jose.createRemoteJWKSet(
  new URL(getSaleorDomain() + "/.well-known/jwks.json")
);

export async function isValidSaleorRequest(
  bodyBuffer: Buffer,
  signature: string
): Promise<boolean> {
  // TODO: Use JWS (JSON Web Signature) when implemented in core

  let key;
  try {
    // @ts-expect-error using fake JWS to get the key
    key = await JWKS({ alg: "RS256", kid: "1" }, {});
  } catch (e) {
    console.warn("Error while getting Saleor JWK", e);
    return false;
  }

  return crypto.verify(
    "rsa-sha256",
    bodyBuffer,
    // @ts-expect-error mismatch between node types and jose
    key,
    Buffer.from(signature, "hex")
  );
}
