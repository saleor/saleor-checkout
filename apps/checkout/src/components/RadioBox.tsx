import React from "react";
import { handleInputChange } from "@/lib/utils";
import {
  Text,
  Radio as UiKitRadio,
  RadioProps as UiKitRadioProps,
} from "@saleor/ui-kit";

export interface RadioBoxProps extends Omit<UiKitRadioProps, "onSelect"> {
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
  subtitle?: string;
}

export const RadioBox: React.FC<RadioBoxProps> = ({
  subtitle,
  title,
  ...rest
}) => {
  const { value, onSelect, selectedValue } = rest;

  return (
    <div className="radio-box">
      <UiKitRadio
        {...rest}
        label={title}
        onSelect={handleInputChange(onSelect)}
        checked={selectedValue === value}
      />
      {subtitle && <Text>{subtitle}</Text>}
    </div>
  );
};
