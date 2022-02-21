import ChannelDetails from "@templates/ChannelDetails";
import { useRouter } from "next/router";

export default function Channel() {
  const router = useRouter();
  const { channelId } = router.query;
  console.log(channelId);

  const paymentMethodsProviders = [
    {
      id: "1",
      name: "Payment Method Provider 1",
      active: true,
    },
    {
      id: "2",
      name: "Payment Method Provider 2",
      active: false,
    },
  ];
  const channels = [
    {
      id: "1",
      name: "B2B Channel",
      paymentMethods: [
        {
          id: "1",
          name: "Payment Method 1",
          providers: paymentMethodsProviders,
        },
        {
          id: "2",
          name: "Payment Method 2",
          providers: paymentMethodsProviders,
        },
        {
          id: "3",
          name: "Payment Method 3",
          providers: paymentMethodsProviders,
        },
      ],
    },
    {
      id: "2",
      name: "B2C Channel",
      paymentMethods: [
        {
          id: "4",
          name: "Payment Method 4",
          providers: paymentMethodsProviders,
        },
        {
          id: "5",
          name: "Payment Method 5",
          providers: paymentMethodsProviders,
        },
        {
          id: "6",
          name: "Payment Method 6",
          providers: paymentMethodsProviders,
        },
      ],
    },
  ];
  const channel = channels.find((channel) => channel.id === channelId);

  return <ChannelDetails selectedChannel={channel} channels={channels} />;
}
