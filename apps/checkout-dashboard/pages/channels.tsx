import ChannelList from "@templates/ChannelList";
import { useChannelList } from "@api/saleor";
import { withUrqlClient } from "next-urql";
// import { useChannelsQuery } from "@graphql";

const Channels = () => {
  // const [channelsQuery] = useChannelsQuery();
  const channels = useChannelList();

  return <ChannelList channels={channels} />;
};
export default withUrqlClient(() => ({
  url: process.env.API_URL,
}))(Channels);
