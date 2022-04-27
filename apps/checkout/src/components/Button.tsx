import React from "react";
import {
  Button as UiKitButton,
  ButtonProps as UiKitButtonProps,
} from "@saleor/ui-kit";

export interface ButtonProps extends UiKitButtonProps {
  ariaLabel: string;
}

export const Button: React.FC<ButtonProps> = ({ ariaLabel, ...rest }) => {
  return <UiKitButton {...rest} aria-label={ariaLabel} />;
};
