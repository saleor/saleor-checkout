import {
  defaultPrivateSettings,
  defaultPublicSettings,
} from "@/config/defaults";
import { mapSettingsToMetadata } from "@/frontend/misc/mapSettingsToMetadata";
import { MetadataItemFragment } from "@/graphql";
import { PrivateSettingsValues, PublicSettingsValues } from "@/types/api";

describe("/utils/frontend/misc/mapSettingsToMetadata", () => {
  it("maps settings to public metadata", async () => {
    const settingsValues: PublicSettingsValues = {
      ...defaultPublicSettings,
      customizations: {
        ...defaultPublicSettings.customizations,
        branding: {
          ...defaultPublicSettings.customizations.branding,
          buttonBgColorPrimary: "#fff",
          buttonBgColorHover: "#fff",
        },
      },
    };

    const mappedMetadata = mapSettingsToMetadata(settingsValues);

    const expectedMetadata: MetadataItemFragment[] = [
      {
        key: "customizations",
        value:
          '{"branding":{"buttonBgColorPrimary":"#fff","buttonBgColorHover":"#fff","borderColorPrimary":"#FAFAFA","errorColor":"#B65757","successColor":"#2C9B2A","buttonTextColor":"#ffffff","textColor":"#000000","logoUrl":""},"productSettings":{"lowStockThreshold":""}}',
      },
      {
        key: "channelActivePaymentProviders",
        value: "{}",
      },
    ];

    expect(mappedMetadata).toEqual(expectedMetadata);
  });

  it("maps settings to private metadata", async () => {
    const settingsValues: PrivateSettingsValues<"unencrypted"> = {
      ...defaultPrivateSettings,
      paymentProviders: {
        ...defaultPrivateSettings.paymentProviders,
        mollie: {
          ...defaultPrivateSettings.paymentProviders.mollie,
          partnerId: "some_unencrypted_id",
          liveApiKey: "some_unencrypted_key",
        },
      },
    };

    const mappedMetadata = mapSettingsToMetadata(settingsValues);

    const expectedMetadata: MetadataItemFragment[] = [
      {
        key: "paymentProviders",
        value:
          '{"mollie":{"partnerId":{"encrypted":"302c2e261c362d262d20313a333726271c2a27"},"liveApiKey":{"encrypted":"302c2e261c362d262d20313a333726271c28263a"},"testApiKey":""},"adyen":{"merchantAccount":"","clientKey":"","supportedCurrencies":""}}',
      },
    ];

    expect(mappedMetadata).toEqual(expectedMetadata);
  });
});
