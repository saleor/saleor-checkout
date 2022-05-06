import { MetadataItemFragment } from "@/graphql";
import settingsValues from "@/config/defaults";
import { SettingsValues, UnknownSettingsValues } from "@/types/api";
import { allSettingID, Item, NamedNode, Node, SettingID } from "@/types/common";
import reduce from "lodash-es/reduce";
import { CombinedError } from "urql";
import { getSettingsPublicAccess } from "@/config/fields";

export function parseJwt(token: string) {
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    Buffer.from(base64, "base64")
      .toString()
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const flattenSettingId = (optionIdx: number, settingId: string) =>
  `${optionIdx}-${settingId}`;

export const unflattenSettings = <T, S extends Node>(
  flattenedSettings: Record<string, T>,
  options: S[]
) => {
  const unflattenedSettings: UnknownSettingsValues<T> = {};

  Object.keys(flattenedSettings).forEach((flattedKey) => {
    const keys = flattedKey.split(/-(.+)/);

    const mainKey = options[Number(keys[0])]?.id;
    const subKey = keys[1];

    if (mainKey && subKey) {
      unflattenedSettings[mainKey] = {
        ...unflattenedSettings[mainKey],
        [subKey]: flattenedSettings[flattedKey],
      };
    }
  });

  return unflattenedSettings;
};

const isSettingPublic = (
  settingKey: string,
  subSettingKey: string,
  settingsPublicAccess?: Record<string, Record<string, boolean> | undefined>
) => {
  if (settingsPublicAccess) {
    return settingsPublicAccess[settingKey]?.[subSettingKey];
  }
  return true;
};

const getPublicSettingsValues = (
  settingKey: string,
  subSettings: Record<string, string>,
  settingsPublicAccess?: Record<string, Record<string, boolean>>
) => {
  return reduce(
    subSettings,
    (subSettings, subSetting, subSettingKey) => {
      if (isSettingPublic(settingKey, subSettingKey, settingsPublicAccess)) {
        return {
          ...subSettings,
          [subSettingKey]: subSetting,
        };
      }
      return subSettings;
    },
    {} as Record<string, string>
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
  groupSettingsKey?: SettingID[number],
  includeSecretSettings?: boolean
) => {
  return reduce(
    defaultSettings,
    (result, defaultSetting, settingKey) => {
      const settingsPublicAccess = getSettingsPublicAccess(groupSettingsKey);

      const savedSetting = savedSettings[settingKey];
      const hasSettingInBothSettings = !!savedSetting;
      const udpatedSetting = hasSettingInBothSettings
        ? { ...defaultSetting, ...savedSetting }
        : defaultSetting;
      const setting = includeSecretSettings
        ? udpatedSetting
        : getPublicSettingsValues(
            settingKey,
            udpatedSetting,
            settingsPublicAccess
          );
      return {
        ...result,
        [settingKey]: setting,
      };
    },
    savedSettings
  );
};

export const mapMetadataToSettings = (
  metadata: (MetadataItemFragment | null)[],
  includeSecretSettings?: boolean
): SettingsValues => {
  const settings = metadata.reduce((settings, metadataItem) => {
    const settingsKey = metadataItem?.key;

    if (
      !settingsKey ||
      !allSettingID.includes(settingsKey as SettingID[number])
    ) {
      return settings;
    }

    try {
      const metadataItemSettings = JSON.parse(metadataItem?.value);
      return {
        ...settings,
        [settingsKey]: mergeSettingsValues(
          settings[settingsKey as SettingID[number]],
          metadataItemSettings,
          settingsKey as SettingID[number],
          includeSecretSettings
        ),
      };
    } catch (e) {
      return {
        ...settings,
        [settingsKey]: settings[settingsKey as SettingID[number]] || {},
      };
    }
  }, settingsValues);

  return settings;
};

export const mapSettingsToMetadata = (
  settingsValues: Partial<SettingsValues>
) => {
  return Object.keys(settingsValues).reduce(
    (metadata, settingsValuesKey) => {
      const settingsValuesObject =
        settingsValues[settingsValuesKey as keyof SettingsValues];
      const settingsValuesValue = JSON.stringify(settingsValuesObject);

      return [
        ...metadata,
        {
          key: settingsValuesKey,
          value: settingsValuesValue,
        },
      ];
    },
    [] as Array<{
      key: string;
      value: string;
    }>
  );
};

export const mapNodeToItem = (node: NamedNode): Item => ({
  id: node.id,
  label: node.name,
});
export const mapNodesToItems = (nodes?: NamedNode[]): Item[] =>
  nodes?.map(mapNodeToItem) || [];

export const getCommonErrors = (error?: CombinedError) => [
  ...(error?.graphQLErrors || []),
  ...((error?.networkError && [error.networkError]) || []),
];
