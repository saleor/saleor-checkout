import { API_URL } from "@constants";
import ChannelList from "frontend/components/templates/ChannelList";
import { useChannelList } from "mocks/saleor";
import { withUrqlClient } from "next-urql";
import { useChannelsQuery } from "@graphql";
import { useAuthContext } from "@frontend/hooks/useAuthContext";

const Channels = () => {
  const authContext = useAuthContext();
  const [channelsQuery] = useChannelsQuery({
    context: authContext,
  });
  const mockedChannels = useChannelList();
  const channels = [...mockedChannels, ...(channelsQuery.data?.channels || [])];

  return <ChannelList channels={channels} loading={channelsQuery.fetching} />;
};
export default withUrqlClient(() => ({
  url: API_URL,
}))(Channels);
