import {
  defaultPrivateSettings,
  defaultPublicSettings,
} from "@/config/defaults";
import { isSsr } from "@/constants";
import { MetadataItemFragment } from "@/graphql";
import {
  Encrypted,
  EncryptionType,
  SettingsField,
  SettingsValues,
  UnknownSettingsValues,
} from "@/types/api";
import { allSettingID, SettingsType } from "@/types/common";
import reduce from "lodash-es/reduce";
import { decryptSetting } from "@/backend/encryption";

const readSettings = <E extends EncryptionType>(
  subSettings: Record<string, SettingsField<E>>,
  includeEncryptedSettings?: boolean
) => {
  return reduce(
    subSettings,
    (subSettings, subSetting, subSettingKey) => {
      const isEncrypted =
        typeof subSetting !== "string" && "encrypted" in subSetting;

      if (isEncrypted && (!includeEncryptedSettings || !isSsr)) {
        return subSettings;
      }

      return {
        ...subSettings,
        [subSettingKey]: isEncrypted
          ? decryptSetting(subSetting as Encrypted<string>)
          : subSetting,
      };
    },
    {} as Record<string, SettingsField<E>>
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
  defaultSettings: UnknownSettingsValues<"unencrypted">,
  savedSettings: UnknownSettingsValues<"encrypted" | "unencrypted">,
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
      const setting = readSettings(udpatedSetting, includeEncryptedSettings);

      return {
        ...result,
        [settingKey]: setting,
      };
    },
    savedSettings as Record<
      string,
      Record<string, SettingsField<"encrypted" | "unencrypted">>
    >
  );
};

export const mapMetadataToSettings = <T extends SettingsType>({
  metadata,
  type,
  includeEncryptedSettings,
}: {
  metadata: (MetadataItemFragment | null)[];
  type: T;
  includeEncryptedSettings?: T extends "public" ? false : boolean;
}): SettingsValues<T, "unencrypted"> => {
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

  return settings as SettingsValues<T, "unencrypted">;
};
