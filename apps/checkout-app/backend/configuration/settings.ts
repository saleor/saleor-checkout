import { mapMetadataToSettings } from "@/frontend/utils";
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
} from "@/graphql";
import { client } from "@/backend/client";
import { defaultActiveChannelPaymentProviders } from "config/defaults";
import { mergeChannelsWithPaymentProvidersSettings } from "./utils";

export const getPrivateSettings = async (includeSecretSettings?: boolean) => {
  const { data, error } = await client
    .query<PrivateMetadataQuery, PrivateMetadataQueryVariables>(
      PrivateMetadataDocument,
      { id: process.env.SALEOR_APP_ID! }
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
  const settings = await getPrivateSettings();

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
  const settings = await getPrivateSettings();

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
