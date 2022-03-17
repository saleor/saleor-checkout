import { useMetadataQuery } from "@graphql";

export const usePaymentProviderSettings = () => {
  const [metadataQuery] = useMetadataQuery({
    variables: {
      id: process.env.APP_ID,
    },
  });

  // TODO: map metadata to settings values
  return metadataQuery.data?.app?.privateMetadata || [];
};
