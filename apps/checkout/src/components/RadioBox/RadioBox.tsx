import React from "react";
import {
  Text,
  Radio as UiKitRadio,
  RadioProps as UiKitRadioProps,
} from "@saleor/ui-kit";
import { getRadioPropsFromRadioBoxProps } from "./utils";

export interface RadioBoxProps extends Omit<UiKitRadioProps, "onSelect"> {
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
  subtitle?: string;
}

export const RadioBox: React.FC<RadioBoxProps> = ({ subtitle, ...rest }) => {
  return (
    <div className="radio-box">
      <UiKitRadio {...getRadioPropsFromRadioBoxProps(rest)} />
      {subtitle && <Text>{subtitle}</Text>}
    </div>
  );
};
