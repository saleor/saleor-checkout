import { API_URL } from "@constants";
import ChannelList from "frontend/components/templates/ChannelList";
import { withUrqlClient } from "next-urql";
import { useChannelsQuery } from "@graphql";
import { useAuthContext } from "@frontend/hooks/useAuthContext";
import { mockedChannels } from "mocks/saleor";

const Channels = () => {
  const authContext = useAuthContext();
  const [channelsQuery] = useChannelsQuery({
    context: authContext,
  });
  const channels = [
    ...(mockedChannels || []),
    ...(channelsQuery.data?.channels || []),
  ];

  return <ChannelList channels={channels} loading={channelsQuery.fetching} />;
};
export default withUrqlClient(() => ({
  url: API_URL,
}))(Channels);
