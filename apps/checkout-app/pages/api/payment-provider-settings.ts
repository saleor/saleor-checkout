import { getPrivateSettings } from "@/backend/configuration/settings";
import { allowCors } from "@/backend/utils";
import { verify } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

// Fetch and cache from https://SALEOR_ADDRESS/.well-known/jwks.json
const SALEOR_PUBLIC_KEY_STRING = `{"kty": "RSA", "key_ops": ["verify"], "n": "4eBXKg2JYGMMbowzvbQcZ4ntSG1HczDavKuvcA3ONkQiQkKg665zNB7koKoGerLf7NFylJm2hQKFDnbG5mfZVgsxz8TOXyJFbKkMQxJ72RFnmyk6diuBo8Sh4h-EdDnm265KvMshU0NTUknlzfRfPYHvQyGsWV5yEyZUErZXMqete3Qovj9Hlq8ASVgGLgjRDzFT09dwXjvZh3YmtZYvPvEL_mrzG4EWw96G9a52Jv646VFRdTeWUYwicWyPNHcVoJB_7KGPpDubJIr8ZCWlcKtavts6ilaDtIgJ-tuQvlAToqwKJo8wYnc5s7FojDyJGZ5aBbNR25PTRZu3-sx1Gw", "e": "AQAB", "use": "sig", "kid": "1"}`;
const SALEOR_PUBLIC_KEY = {
  kty: "RSA",
  key_ops: ["verify"],
  n: "4eBXKg2JYGMMbowzvbQcZ4ntSG1HczDavKuvcA3ONkQiQkKg665zNB7koKoGerLf7NFylJm2hQKFDnbG5mfZVgsxz8TOXyJFbKkMQxJ72RFnmyk6diuBo8Sh4h-EdDnm265KvMshU0NTUknlzfRfPYHvQyGsWV5yEyZUErZXMqete3Qovj9Hlq8ASVgGLgjRDzFT09dwXjvZh3YmtZYvPvEL_mrzG4EWw96G9a52Jv646VFRdTeWUYwicWyPNHcVoJB_7KGPpDubJIr8ZCWlcKtavts6ilaDtIgJ-tuQvlAToqwKJo8wYnc5s7FojDyJGZ5aBbNR25PTRZu3-sx1Gw",
  e: "AQAB",
  use: "sig",
  kid: "1",
};

const isAuthorized = (req: NextApiRequest) => {
  const auth = req.headers.authorization?.split(" ") || [];
  const token = auth?.length > 1 ? auth?.[1] : undefined;

  if (!token) {
    return false;
  }

  try {
    verify(token, SALEOR_PUBLIC_KEY_STRING);
    return true;
  } catch (err) {
    return false;
  }
};

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const authorized = isAuthorized(req);
  console.log(authorized ? "JWT check: authorized" : "JWT check: unauthorized");

  if (!authorized) {
    return res.status(401).json({ ok: false });
  }

  const settings = await getPrivateSettings();

  console.log(settings); // for deployment debug pusposes

  res.status(200).json(settings.paymentProviders);
}
export default allowCors(handler);
