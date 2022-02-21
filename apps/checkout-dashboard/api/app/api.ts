import { channelList } from "api/saleor/api";
import { paymentMethods, paymentProviders } from "consts";
import { ChannelPaymentOptions, DesignOption } from "./types";

export const channelPaymentOptionsList: ChannelPaymentOptions[] = [
  {
    id: "1",
    channel: channelList[0],
    paymentOptions: [
      {
        id: "1",
        method: paymentMethods[0],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[0],
      },
      {
        id: "2",
        method: paymentMethods[1],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[0],
      },
      {
        id: "3",
        method: paymentMethods[2],
        availableProviders: paymentProviders,
        activeProvider: null,
      },
    ],
  },
  {
    id: "2",
    channel: channelList[1],
    paymentOptions: [
      {
        id: "1",
        method: paymentMethods[0],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[1],
      },
      {
        id: "2",
        method: paymentMethods[1],
        availableProviders: paymentProviders,
        activeProvider: paymentProviders[1],
      },
      {
        id: "3",
        method: paymentMethods[2],
        availableProviders: paymentProviders,
        activeProvider: null,
      },
    ],
  },
];
export const useChannelPaymentOptions = (channelId: string) =>
  channelPaymentOptionsList.find(
    (channelPayments) => channelPayments.channel.id === channelId
  );

export const designOptionList: DesignOption[] = [
  { id: "1", name: "Branding" },
  { id: "2", name: "Layout" },
  { id: "3", name: "Sections" },
];
export const useDesignOptionList = () => designOptionList;
