import AppNavigation from "@elements/AppNavigation";
import {
  makeStyles,
  OffsettedList,
  OffsettedListBody,
  OffsettedListHeader,
  OffsettedListItem,
  OffsettedListItemCell,
} from "@saleor/macaw-ui";
import Link from "next/link";
import { useRouter } from "next/router";

const useStyles = makeStyles(
  {
    listItem: {
      height: "70px",
      cursor: "pointer",
    },
  },
  { name: "ChannelList" }
);

interface Channel {
  id: string;
  name: string;
}
interface ChannelListProps {
  channels?: Channel[];
}

const ChannelList: React.FC<ChannelListProps> = ({ channels }) => {
  const router = useRouter();
  const classes = useStyles();

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
              onClick={() =>
                router.push({
                  pathname: "/channels/[channelId]",
                  query: { channelId: channel.id },
                })
              }
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
