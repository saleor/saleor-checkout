import { API_URL } from "@constants";
import { useAuthContext } from "@frontend/hooks/useAuthContext";
import { useChannelsQuery } from "@graphql";
import ChannelDetails from "frontend/components/templates/ChannelDetails";
import { getChannelPaymentOptions } from "mocks/app";
import { useChannelList } from "mocks/saleor";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";

const Channel = () => {
  const router = useRouter();
  const { channelId } = router.query;

  const authContext = useAuthContext();
  const [channelsQuery] = useChannelsQuery({
    context: authContext,
  });
  const mockedChannels = useChannelList();
  const channels = [...mockedChannels, ...(channelsQuery.data?.channels || [])];

  const channelPaymentOptions = getChannelPaymentOptions(channelId?.toString());

  return (
    <ChannelDetails
      channelPaymentOptions={channelPaymentOptions}
      channels={channels}
      loading={channelsQuery.fetching}
    />
  );
};
export default withUrqlClient(() => ({
  url: API_URL,
}))(Channel);
