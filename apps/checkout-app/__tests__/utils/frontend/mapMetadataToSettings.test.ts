import {
  defaultPrivateSettings,
  defaultPublicSettings,
} from "@/config/defaults";
import { mapMetadataToSettings } from "@/frontend/misc/mapMetadataToSettings";
import { MetadataItemFragment } from "@/graphql";
import { PrivateSettingsValues, PublicSettingsValues } from "@/types/api";

describe("/utils/frontend/misc/mapMetadataToSettings", () => {
  it("maps public metadata to settings", async () => {
    const metadata: MetadataItemFragment[] = [
      {
        key: "customizations",
        value:
          '{"branding":{"buttonBgColorPrimary":"#fff","buttonBgColorHover":"#fff"}}',
      },
    ];

    const mergedSettings = mapMetadataToSettings({
      metadata,
      type: "public",
    });

    const expectedSettings: PublicSettingsValues = {
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

    expect(mergedSettings).toEqual(expectedSettings);
  });

  it("maps private metadata to settings", async () => {
    const metadata: MetadataItemFragment[] = [
      {
        key: "paymentProviders",
        value:
          '{"mollie":{"partnerId":"some_not_encrypted_id","liveApiKey":{"encrypted":"302c2e261c272620313a333726271c28263a"}}}',
      },
    ];

    const mergedSettings = mapMetadataToSettings({
      metadata,
      type: "private",
      includeEncryptedSettings: true,
    });

    const expectedSettings: PrivateSettingsValues<"unencrypted"> = {
      ...defaultPrivateSettings,
      paymentProviders: {
        ...defaultPrivateSettings.paymentProviders,
        mollie: {
          ...defaultPrivateSettings.paymentProviders.mollie,
          partnerId: "some_not_encrypted_id",
          liveApiKey: "some_decrypted_key",
        },
      },
    };

    expect(mergedSettings).toEqual(expectedSettings);
  });

  it("maps private metadata to settings and returns only not encrypted", async () => {
    const metadata: MetadataItemFragment[] = [
      {
        key: "paymentProviders",
        value:
          '{"mollie":{"partnerId":"some_not_encrypted_id","liveApiKey":{"encrypted":"302c2e261c272620313a333726271c28263a"}}}',
      },
    ];

    const mergedSettings = mapMetadataToSettings({
      metadata,
      type: "private",
      includeEncryptedSettings: false,
    });

    const expectedSettings: PrivateSettingsValues<"unencrypted"> = {
      ...defaultPrivateSettings,
      paymentProviders: {
        ...defaultPrivateSettings.paymentProviders,
        mollie: {
          partnerId: "some_not_encrypted_id",
          testApiKey: "",
        },
        adyen: {
          clientKey: "",
          merchantAccount: "",
          supportedCurrencies: "",
        },
      },
    };

    expect(mergedSettings).toEqual(expectedSettings);
  });
});
