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
import { getClient } from "@/backend/client";
import { defaultActiveChannelPaymentProviders } from "config/defaults";
import { mergeChannelsWithPaymentProvidersSettings } from "./utils";
import { envVars, serverEnvVars } from "@/constants";
import { PrivateSettingsValues } from "@/types/api";
import { mapPrivateSettingsToMetadata } from "./mapPrivateSettingsToMetadata";
import { mapPrivateMetadataToSettings } from "./mapPrivateMetadataToSettings";
import { mapPublicMetadataToSettings } from "@/frontend/misc/mapPublicMetadataToSettings";

export const getPrivateSettings = async (apiUrl: string) => {
  const { data, error } = await getClient(apiUrl, serverEnvVars.appToken)
    .query<PrivateMetadataQuery, PrivateMetadataQueryVariables>(
      PrivateMetadataDocument,
      { id: serverEnvVars.appId }
    )
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  console.log(data?.app?.privateMetadata); // for deployment debug pusposes

  const settingsValues = mapPrivateMetadataToSettings(
    data?.app?.privateMetadata || []
  );

  return settingsValues;
};

export const getPublicSettings = async () => {
  const { data, error } = await getClient(
    envVars.apiUrl,
    serverEnvVars.appToken
  )
    .query<PublicMetadataQuery, PublicMetadataQueryVariables>(
      PublicMetadataDocument,
      { id: serverEnvVars.appId }
    )
    .toPromise();

  console.log(data, error); // for deployment debug pusposes

  if (error) {
    throw error;
  }

  console.log(data?.app?.metadata); // for deployment debug pusposes

  const settingsValues = mapPublicMetadataToSettings(data?.app?.metadata || []);

  return settingsValues;
};

export const getActivePaymentProvidersSettings = async () => {
  const settings = await getPublicSettings();

  const { data, error } = await getClient(
    envVars.apiUrl,
    serverEnvVars.appToken
  )
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
  const settings = await getPublicSettings();

  const { data, error } = await getClient(
    envVars.apiUrl,
    serverEnvVars.appToken
  )
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
  apiUrl: string,
  settings: PrivateSettingsValues<"unencrypted">
) => {
  const metadata = mapPrivateSettingsToMetadata(settings);

  const { data, error } = await getClient(apiUrl, serverEnvVars.appToken)
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

  const settingsValues = mapPrivateMetadataToSettings(
    data?.updatePrivateMetadata?.item?.privateMetadata || []
  );

  return settingsValues;
};
