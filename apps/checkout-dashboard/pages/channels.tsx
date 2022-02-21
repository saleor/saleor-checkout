import ChannelList from "@templates/ChannelList";

export default function Channels() {
  const channels = [
    { id: "1", name: "B2B Channel" },
    { id: "2", name: "B2C Channel" },
  ];

  return <ChannelList channels={channels} />;
}
