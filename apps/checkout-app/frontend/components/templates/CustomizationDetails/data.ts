import { unflattenSettings } from "@/frontend/utils";
import { CustomizationSettingsValues } from "@/types/api";
import { useEffect, useState } from "react";
import { FieldValues, UseFormWatch } from "react-hook-form";
import { Customization, CustomizationID } from "types/common";

export const getFormDefaultValues = (
  options: Customization<CustomizationID>[]
): CustomizationSettingsValues =>
  options.reduce(
    (settingsGroup, option) => ({
      ...settingsGroup,
      [option.id]: option.settings.reduce(
        (values, setting) => ({
          ...values,
          [setting.id]: setting.value,
        }),
        {}
      ),
    }),
    {} as CustomizationSettingsValues
  );

export const useSettingsFromValues = (
  options: Customization<CustomizationID>[],
  watch: UseFormWatch<FieldValues>
) => {
  const [previewSettings, setPreviewSettings] =
    useState<CustomizationSettingsValues>(getFormDefaultValues(options));

  useEffect(() => {
    setPreviewSettings(getFormDefaultValues(options));
  }, [options]);

  useEffect(() => {
    const subscription = watch((flattenedSettings) => {
      const updatedSettings = unflattenSettings(
        flattenedSettings,
        options
      ) as CustomizationSettingsValues;

      setPreviewSettings(updatedSettings);
    });
    return () => subscription.unsubscribe();
  }, []);

  return previewSettings;
};
