import { defaultActiveChannelPaymentProviders } from "@/config/defaults";
import { ChannelActivePaymentProviders, SettingsValues } from "@/types/api";

export const mergeChannelsWithPaymentProvidersSettings = (
  settings: SettingsValues,
  channels?:
    | {
        __typename?: "Channel" | undefined;
        id: string;
        name: string;
        slug: string;
      }[]
    | null // Will be changed in future to fragment type
): ChannelActivePaymentProviders =>
  channels?.reduce((assignedSettings, channel) => {
    const channelSettings =
      assignedSettings[channel.id] || defaultActiveChannelPaymentProviders;

    return {
      ...assignedSettings,
      [channel.id]: channelSettings,
    };
  }, settings.channelActivePaymentProviders) ||
  settings.channelActivePaymentProviders;
