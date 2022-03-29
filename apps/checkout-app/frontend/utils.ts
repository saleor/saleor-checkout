import { CustomizationSettingsValues, UnknownSettingsValues } from "types/api";
import { Item, NamedNode, Node } from "types/common";

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

export const unflattenSettings = <T extends Node>(
  flattedSettings: Record<string, string>,
  options: T[]
) => {
  const unflattedSettings: UnknownSettingsValues = {};

  Object.keys(flattedSettings).forEach((flattedKey) => {
    const keys = flattedKey.split(/-(.+)/);

    const mainKey = options[Number(keys[0])]?.id;
    const subKey = keys[1];

    if (mainKey && subKey) {
      unflattedSettings[mainKey] = {
        ...unflattedSettings[mainKey],
        [subKey]: flattedSettings[flattedKey],
      };
    }
  });

  return unflattedSettings;
};

export const flattenMetadataKey = (optionId: string, settingId: string) =>
  `${optionId}-${settingId}`;

export const mapMetadataItemToSettingsItem = ({
  key,
  value,
}: {
  key: string;
  value: string;
}) => {
  const nameKey = key.split(/-(.+)/);

  return {
    id: nameKey[0],
    settingId: nameKey[1],
    value,
  };
};
export const mapMetadataToSettings = (
  metadata: Array<{
    __typename?: "MetadataItem";
    key: string;
    value: string;
  } | null>
): UnknownSettingsValues => {
  const settings = metadata.reduce((settings, item) => {
    if (!item) {
      return settings;
    }
    const settingItem = mapMetadataItemToSettingsItem(item);
    return {
      ...settings,
      [settingItem.id]: {
        ...settings[settingItem.id],
        [settingItem.settingId]: settingItem.value,
      },
    };
  }, {} as UnknownSettingsValues);

  return settings;
};

export const mapSettingsToMetadata = (
  settingsValues: UnknownSettingsValues
): Array<{
  key: string;
  value: string;
}> => {
  return Object.keys(settingsValues).reduce(
    (metadata, settingsValuesItemKey) => {
      const nextMetadata = Object.keys(
        settingsValues[settingsValuesItemKey]
      ).map((settingsItemKey) => {
        const key = flattenMetadataKey(settingsValuesItemKey, settingsItemKey);
        const value =
          settingsValues[settingsValuesItemKey][settingsItemKey] || "";

        return { key, value };
      });
      return [...metadata, ...nextMetadata];
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
