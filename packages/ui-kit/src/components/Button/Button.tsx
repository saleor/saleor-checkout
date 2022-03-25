import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import { Text } from "../Text";

export interface ButtonProps extends ButtonHTMLAttributes<{}> {
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button: FC<ButtonProps> = ({
  title,
  className,
  variant = "primary",
  disabled = false,
  onClick,
  ...rest
}) => {
  const classes = clsx(
    "button",
    {
      "button-primary": variant === "primary",
      "button-secondary": variant === "secondary",
      "button-tertiary": variant === "tertiary",
    },
    className
  );

  return (
    <button onClick={onClick} disabled={disabled} className={classes} {...rest}>
      <Text weight='semibold'>{title}</Text>
    </button>
  );
};
