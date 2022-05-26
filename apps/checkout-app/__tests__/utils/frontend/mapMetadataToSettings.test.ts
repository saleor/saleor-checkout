import {
  defaultPrivateSettings,
  defaultPublicSettings,
} from "@/config/defaults";
import { mapPrivateMetafieldsToSettings } from "@/backend/configuration/mapPrivateMetafieldsToSettings";
import { mapPublicMetafieldsToSettings } from "@/frontend/misc/mapPublicMetafieldsToSettings";
import {
  PrivateMetafieldsValues,
  PrivateSettingsValues,
  PublicMetafieldsValues,
  PublicSettingsValues,
} from "@/types/api";

describe("/utils/frontend/misc/mapMetadataToSettings", () => {
  it("maps public metadata to settings", async () => {
    const metafields: PublicMetafieldsValues = {
      customizations:
        '{"branding":{"buttonBgColorPrimary":"#fff","buttonBgColorHover":"#fff"}}',
    };
    const mergedSettings = mapPublicMetafieldsToSettings(metafields);

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
    const metafields: PrivateMetafieldsValues = {
      paymentProviders:
        '{"mollie":{"partnerId":{"encrypted":false,"value":"some_not_encrypted_id"},"liveApiKey":{"encrypted":true,"value":"U2FsdGVkX18zfzUyZy2f00/5BoS3s3WtAOo7wY0yELlwuW6hX0R/zCn/ppPnsBRk"}}}',
    };

    const mergedSettings = mapPrivateMetafieldsToSettings(metafields);

    const expectedSettings = {
      ...defaultPrivateSettings,
      paymentProviders: {
        adyen: {},
        mollie: {
          partnerId: "some_not_encrypted_id",
          liveApiKey: "some_decrypted_key",
        },
      },
    };

    expect(mergedSettings).toEqual(expectedSettings);
  });
});
