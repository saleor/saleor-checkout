import React from "react";
import {
  Checkbox as UiKitCheckbox,
  CheckboxProps as UiKitCheckboxProps,
} from "@saleor/ui-kit";
import { handleInputChange } from "@/lib/utils";

interface CheckboxProps extends Omit<UiKitCheckboxProps, "onChange"> {
  onChange: (value: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({ onChange, ...rest }) => {
  return <UiKitCheckbox onChange={handleInputChange(onChange)} {...rest} />;
};
