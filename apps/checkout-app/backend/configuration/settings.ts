import { mapMetadataToSettings } from "@frontend/utils";
import {
  PrivateMetadataDocument,
  PrivateMetadataQuery,
  PrivateMetadataQueryVariables,
} from "@graphql";
import { client } from "@graphql/client";

export const getSettings = async (args: PrivateMetadataQueryVariables) => {
  const { data, error } = await client
    .query<PrivateMetadataQuery, PrivateMetadataQueryVariables>(
      PrivateMetadataDocument,
      { id: process.env.SALEOR_APP_ID! }
    )
    .toPromise();

  if (error) {
    throw error;
  }

  const settingsValues = mapMetadataToSettings(
    data?.app?.privateMetadata || []
  );

  return settingsValues;
};
