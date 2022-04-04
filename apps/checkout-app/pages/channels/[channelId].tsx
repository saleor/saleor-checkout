import { getChannelPaymentOptions } from "@frontend/data";
import { useAuthData } from "@frontend/hooks/useAuthData";
import { mapMetadataToSettings, mapSettingsToMetadata } from "@frontend/utils";
import {
  useChannelsQuery,
  usePrivateMetadataQuery,
  useUpdatePrivateMetadataMutation,
} from "@graphql";
import ChannelDetails from "frontend/components/templates/ChannelDetails";
import { useRouter } from "next/router";
import { ChannelActivePaymentProviders } from "types/api";

const Channel = () => {
  const router = useRouter();
  const { channelId } = router.query;

  const { app } = useAuthData();
  const [metadataQuery] = usePrivateMetadataQuery({
    variables: {
      id: app,
    },
  });
  const [metadataMutation, setPrivateMetadata] =
    useUpdatePrivateMetadataMutation();

  const settingsValues = mapMetadataToSettings(
    metadataQuery.data?.app?.privateMetadata || []
  );

  const [channelsQuery] = useChannelsQuery();
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

    setPrivateMetadata({
      id: app,
      input: metadata,
    });
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
export default Channel;
