import { CustomizationSettingsValues } from "@/types/api";
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
