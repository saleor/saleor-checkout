import {
  EncryptionType,
  SettingsField,
  UnknownSettingsValues,
} from "@/types/api";
import { Item, NamedNode, Node } from "@/types/common";
import { CombinedError } from "urql";

export const flattenSettingId = (optionIdx: number, settingId: string) =>
  `${optionIdx}-${settingId}`;

export const unflattenSettings = <E extends EncryptionType, S extends Node>(
  flattenedSettings: Record<string, SettingsField<E>>,
  options: S[]
) => {
  const unflattenedSettings: UnknownSettingsValues<E> = {};

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

export const mapNodeToItem = (node: NamedNode): Item => ({
  id: node.id,
  label: node.name,
});
export const mapNodesToItems = (nodes?: NamedNode[]): Item[] =>
  nodes?.map(mapNodeToItem) || [];

export const getCommonErrors = (error?: CombinedError) =>
  error?.graphQLErrors || error?.networkError
    ? [
        ...(error?.graphQLErrors || []),
        ...(error?.networkError ? [error.networkError] : []),
      ]
    : [...(error ? [error] : [])];
