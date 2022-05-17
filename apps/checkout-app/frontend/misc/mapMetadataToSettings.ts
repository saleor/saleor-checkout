import {
  defaultPrivateSettings,
  defaultPublicSettings,
} from "@/config/defaults";
import { serverEnvVars } from "@/constants";
import { MetadataItemFragment } from "@/graphql";
import { Encrypted, SettingsValues, UnknownSettingsValues } from "@/types/api";
import { allSettingID, SettingsType } from "@/types/common";
import reduce from "lodash-es/reduce";

// TODO: use library instead of this function
const decrypt = (salt: any, encoded: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);
  return encoded
    .match(/.{1,2}/g)
    ?.map((hex: string) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode: number) => String.fromCharCode(charCode))
    .join("");
};

const decryptSetting = (settingValue: Encrypted<string>) => {
  return (
    decrypt(serverEnvVars.settingsEncryptionSecret, settingValue.encrypted) ||
    ""
  );
};

const decryptSettings = (
  subSettings: Record<string, string | Encrypted<string>>,
  includeEncryptedSettings?: boolean
) => {
  return reduce(
    subSettings,
    (subSettings, subSetting, subSettingKey) => {
      const isEncrypted =
        typeof subSetting !== "string" && "encrypted" in subSetting;

      if (isEncrypted && !includeEncryptedSettings) {
        return subSettings;
      }

      return {
        ...subSettings,
        [subSettingKey]: isEncrypted
          ? decryptSetting(subSetting as Encrypted<string>)
          : subSetting,
      };
    },
    {} as Record<string, string | Encrypted<string>>
  );
};

/**
 * Merges settings. To be used when default and saved settings may differ (e.g. after app update).
 * @param defaultSettings default settings
 * @param savedSettings saved settings
 * @param groupSettingsKey current settings key
 * @param onlyPublic only return public settings
 * @returns Returns either previously saved settings values or default settings values. If settings values are present in default and saved at the same time, then saved value is returned.
 */
export const mergeSettingsValues = (
  defaultSettings: UnknownSettingsValues,
  savedSettings: UnknownSettingsValues,
  includeEncryptedSettings?: boolean
) => {
  return reduce(
    defaultSettings,
    (result, defaultSetting, settingKey) => {
      const savedSetting = savedSettings[settingKey];
      const hasSettingInBothSettings = !!savedSetting;
      const udpatedSetting = hasSettingInBothSettings
        ? { ...defaultSetting, ...savedSetting }
        : defaultSetting;
      const setting = decryptSettings(udpatedSetting, includeEncryptedSettings);

      return {
        ...result,
        [settingKey]: setting,
      };
    },
    savedSettings
  );
};

export const mapMetadataToSettings = <T extends SettingsType>({
  metadata,
  type,
  includeEncryptedSettings,
}: {
  metadata: (MetadataItemFragment | null)[];
  type: T;
  includeEncryptedSettings?: boolean;
}): SettingsValues<T> => {
  const defaultSettings =
    type === "public" ? defaultPublicSettings : defaultPrivateSettings;

  const settings = metadata.reduce((settings, metadataItem) => {
    const settingsKey = metadataItem?.key as keyof typeof settings;

    if (!settingsKey || !allSettingID.includes(settingsKey)) {
      return settings;
    }

    try {
      const metadataItemSettings = JSON.parse(metadataItem?.value || "");
      return {
        ...settings,
        [settingsKey]: mergeSettingsValues(
          settings[settingsKey],
          metadataItemSettings,
          includeEncryptedSettings
        ),
      };
    } catch (e) {
      return {
        ...settings,
        [settingsKey]: settings[settingsKey] || {},
      };
    }
  }, defaultSettings);

  return settings as SettingsValues<T>;
};
