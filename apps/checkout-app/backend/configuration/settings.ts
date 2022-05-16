import {
  ChannelDocument,
  ChannelQuery,
  ChannelQueryVariables,
  ChannelsDocument,
  ChannelsQuery,
  ChannelsQueryVariables,
  PrivateMetadataDocument,
  PrivateMetadataQuery,
  PrivateMetadataQueryVariables,
  PublicMetadataDocument,
  PublicMetadataQuery,
  PublicMetadataQueryVariables,
  UpdatePrivateMetadataDocument,
  UpdatePrivateMetadataMutation,
  UpdatePrivateMetadataMutationVariables,
} from "@/graphql";
import { client } from "@/backend/client";
import { defaultActiveChannelPaymentProviders } from "config/defaults";
import { mergeChannelsWithPaymentProvidersSettings } from "./utils";
import { serverEnvVars } from "@/constants";
import { mapMetadataToSettings } from "@/frontend/misc/mapMetadataToSettings";
import { PrivateSettingsValues } from "@/types/api";
import { mapSettingsToMetadata } from "@/frontend/misc/mapSettingsToMetadata";
import { NextApiRequest } from "next";
import { verify } from "jsonwebtoken";

export const getPrivateSettings = async (includeSecretSettings?: boolean) => {
  const { data, error } = await client
    .query<PrivateMetadataQuery, PrivateMetadataQueryVariables>(
      PrivateMetadataDocument,
      { id: serverEnvVars.appId! }
    )
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  console.log(data?.app?.privateMetadata); // for deployment debug pusposes

  const settingsValues = mapMetadataToSettings({
    metadata: data?.app?.privateMetadata || [],
    type: "private",
    includeSecretSettings,
  });

  return settingsValues;
};

export const getPublicSettings = async (includeSecretSettings?: boolean) => {
  const { data, error } = await client
    .query<PublicMetadataQuery, PublicMetadataQueryVariables>(
      PublicMetadataDocument,
      { id: process.env.SALEOR_APP_ID! }
    )
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  console.log(data?.app?.metadata); // for deployment debug pusposes

  const settingsValues = mapMetadataToSettings({
    metadata: data?.app?.metadata || [],
    type: "public",
    includeSecretSettings,
  });

  return settingsValues;
};

export const getActivePaymentProvidersSettings = async () => {
  const settings = await getPublicSettings(false);

  const { data, error } = await client
    .query<ChannelsQuery, ChannelsQueryVariables>(ChannelsDocument)
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  const activePaymentProvidersSettings =
    mergeChannelsWithPaymentProvidersSettings(settings, data?.channels);

  return activePaymentProvidersSettings;
};

export const getChannelActivePaymentProvidersSettings = async (
  channelId: string
) => {
  const settings = await getPublicSettings(false);

  const { data, error } = await client
    .query<ChannelQuery, ChannelQueryVariables>(ChannelDocument, {
      id: channelId,
    })
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  const channelActivePaymentProvidersSettings =
    settings.channelActivePaymentProviders?.[channelId] ||
    defaultActiveChannelPaymentProviders;

  return channelActivePaymentProvidersSettings;
};

export const setPrivateSettings = async (
  settings: PrivateSettingsValues,
  includeSecretSettings?: boolean
) => {
  const metadata = mapSettingsToMetadata(settings);

  const { data, error } = await client
    .query<
      UpdatePrivateMetadataMutation,
      UpdatePrivateMetadataMutationVariables
    >(UpdatePrivateMetadataDocument, {
      id: serverEnvVars.appId!,
      input: metadata,
    })
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  console.log(data?.updatePrivateMetadata?.item?.privateMetadata); // for deployment debug pusposes

  const settingsValues = mapMetadataToSettings({
    metadata: data?.updatePrivateMetadata?.item?.privateMetadata || [],
    type: "private",
    includeSecretSettings,
  });

  return settingsValues;
};

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
export const getSaleorPublicKey = async () => {
  return SALEOR_PUBLIC_KEY_STRING;
};

export const isAuthorized = async (req: NextApiRequest) => {
  const auth = req.headers.authorization?.split(" ") || [];
  const token = auth?.length > 1 ? auth?.[1] : undefined;

  if (!token) {
    return false;
  }

  const saleorPublicKey = await getSaleorPublicKey();

  try {
    verify(token, saleorPublicKey);
    return true;
  } catch (err) {
    return false;
  }
};
