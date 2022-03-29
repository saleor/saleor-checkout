import { Channel } from "types/saleor";

// Should be fetched from saleor backend
export const channelList: Channel[] = [
  {
    id: "channel-1",
    slug: "channel-1",
    name: "B2B Channel",
  },
  {
    id: "channel-2",
    slug: "channel-2",
    name: "B2C Channel",
  },
];
export const useChannelList = () => channelList;
