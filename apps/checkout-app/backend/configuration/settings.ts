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

export const getPrivateSettings = async (
  includeEncryptedSettings?: boolean
) => {
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
    includeEncryptedSettings,
  });

  return settingsValues;
};

export const getPublicSettings = async (includeEncryptedSettings?: boolean) => {
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
    includeEncryptedSettings,
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
  includeEncryptedSettings?: boolean
) => {
  const metadata = mapSettingsToMetadata(settings);

  const { data, error } = await client
    .mutation<
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
    includeEncryptedSettings,
  });

  return settingsValues;
};
