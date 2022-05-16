import { defaultActiveChannelPaymentProviders } from "@/config/defaults";
import { ChannelFragment } from "@/graphql";
import {
  ChannelActivePaymentProviders,
  PublicSettingsValues,
} from "@/types/api";

export const mergeChannelsWithPaymentProvidersSettings = (
  settings: PublicSettingsValues,
  channels?: ChannelFragment[] | null
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
