import { NextApiRequest } from "next";
import * as jose from "jose";
import { envVars, serverEnvVars } from "@/checkout-app/constants";

const JWKS = jose.createRemoteJWKSet(
  new URL(envVars.apiUrl + "/.well-known/jwks.json")
);

export function validateSaleorRequest(
  rawBody: string,
  signature: string
): boolean {
  // TODO: Add validation
  return true;
}
