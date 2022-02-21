import AppNavigation from "@elements/AppNavigation";
import {
  OffsettedList,
  OffsettedListBody,
  OffsettedListHeader,
  OffsettedListItem,
  OffsettedListItemCell,
} from "@saleor/macaw-ui";
import { Channel } from "api/saleor/types";
import { useRouter } from "next/router";
import { useStyles } from "./styles";

interface ChannelListProps {
  channels?: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const router = useRouter();
  const classes = useStyles();

  const onChannelClick = (channel: Channel) => {
    router.push({
      pathname: "/channels/[channelId]",
      query: { channelId: channel.id },
    });
  };

  return (
    <>
      <AppNavigation />
      <OffsettedList gridTemplate={["1fr"]}>
        <OffsettedListHeader>
          <OffsettedListItem>
            <OffsettedListItemCell>Channel name</OffsettedListItemCell>
          </OffsettedListItem>
        </OffsettedListHeader>
        <OffsettedListBody>
          {channels?.map((channel) => (
            <OffsettedListItem
              key={channel.id}
              className={classes.listItem}
              onClick={() => onChannelClick(channel)}
            >
              <OffsettedListItemCell>{channel.name}</OffsettedListItemCell>
            </OffsettedListItem>
          ))}
        </OffsettedListBody>
      </OffsettedList>
    </>
  );
};
export default ChannelList;
