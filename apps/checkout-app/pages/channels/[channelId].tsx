import { API_URL } from "@constants";
import { getChannelPaymentOptions } from "@frontend/data";
import { useAuthContext } from "@frontend/hooks/useAuthContext";
import { useAuthData } from "@frontend/hooks/useAuthData";
import { mapMetadataToSettings, mapSettingsToMetadata } from "@frontend/utils";
import {
  useChannelsQuery,
  usePrivateMetadataQuery,
  useUpdatePrivateMetadataMutation,
} from "@graphql";
import ChannelDetails from "frontend/components/templates/ChannelDetails";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import { ChannelActivePaymentProviders } from "types/api";

const Channel = () => {
  const router = useRouter();
  const { channelId } = router.query;

  const authContext = useAuthContext();
  const { app } = useAuthData();
  const [metadataQuery] = usePrivateMetadataQuery({
    variables: {
      id: app,
    },
    context: authContext,
  });
  const [metadataMutation, setPrivateMetadata] =
    useUpdatePrivateMetadataMutation();

  const settingsValues = mapMetadataToSettings(
    metadataQuery.data?.app?.privateMetadata || []
  );

  const [channelsQuery] = useChannelsQuery({
    context: authContext,
  });
  const channels = channelsQuery.data?.channels || [];

  const channelPaymentOptions = getChannelPaymentOptions(
    channels,
    settingsValues.channelActivePaymentProviders,
    channelId?.toString()
  );

  const handleCancel = () => {
    router.back();
  };

  const handleSubmit = (data: ChannelActivePaymentProviders) => {
    const metadata = mapSettingsToMetadata({
      channelActivePaymentProviders: {
        ...settingsValues.channelActivePaymentProviders,
        ...data,
      },
    });

    setPrivateMetadata(
      {
        id: app,
        input: metadata,
      },
      authContext
    );
  };

  return (
    <ChannelDetails
      channelPaymentOptions={channelPaymentOptions}
      channels={channels}
      saveButtonBarState="default"
      loading={
        channelsQuery.fetching ||
        metadataQuery.fetching ||
        metadataMutation.fetching
      }
      onCancel={handleCancel}
      onSubmit={handleSubmit}
    />
  );
};
export default withUrqlClient(() => ({
  url: API_URL,
}))(Channel);
