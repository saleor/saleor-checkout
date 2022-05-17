import { CommonField, fields } from "@/config/fields";
import { serverEnvVars } from "@/constants";
import { Encrypted } from "@/types/api";
import { SettingID } from "@/types/common";
import reduce from "lodash-es/reduce";

// TODO: use library instead of this function
const encrypt = (salt: any, text: string) => {
  const textToChars = (text: string) =>
    text.split("").map((c) => c.charCodeAt(0));
  const byteHex = (n: any) => ("0" + Number(n).toString(16)).substr(-2);
  const applySaltToChar = (code: any) =>
    textToChars(salt).reduce((a, b) => a ^ b, code);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

const encryptSetting = (settingValue: string): Encrypted<string> => {
  return {
    encrypted: encrypt(serverEnvVars.settingsEncryptionSecret, settingValue),
  };
};

const encryptSubSettings = (
  defaultSetting: Record<string, any>,
  subSettingsFields?: CommonField[]
) => {
  const encryptedSubSetting = reduce(
    defaultSetting,
    (result, value, valueKey) => {
      const setting = subSettingsFields?.find(
        (setting) => setting.id === valueKey
      );

      if (setting?.encrypt && value) {
        return {
          ...result,
          [valueKey]: encryptSetting(value),
        };
      }
      return {
        ...result,
        [valueKey]: value,
      };
    },
    {} as Record<string, any>
  );

  return encryptedSubSetting;
};

const encryptSettings = <T extends Record<string, any>>(
  settingsValues: T[] | undefined,
  settingsFields: Record<string, CommonField[]>
) => {
  const encrypteSettings = reduce(
    settingsValues,
    (result, defaultSetting, settingKey) => {
      console.log(defaultSetting);

      const subSettingsFields = settingsFields[settingKey];

      const encryptedSubSetting = encryptSubSettings(
        defaultSetting,
        subSettingsFields
      );

      return {
        ...result,
        [settingKey]: encryptedSubSetting,
      };
    },
    {} as Record<SettingID[number], T>
  );
  return encrypteSettings;
};

export const mapSettingsToMetadata = <T extends Record<string, any>>(
  settingsValues: Partial<T>
) => {
  return Object.keys(settingsValues).reduce(
    (metadata, settingsValuesKey) => {
      const settingsValuesObject = encryptSettings(
        settingsValues[settingsValuesKey as keyof T],
        fields[settingsValuesKey as SettingID[number]]
      );
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
