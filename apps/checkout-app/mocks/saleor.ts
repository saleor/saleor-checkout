import { ChannelsQuery } from "@graphql";

// Should be fetched from saleor backend
export const mockedChannels: Exclude<
  ChannelsQuery["channels"],
  null | undefined
> = [
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
