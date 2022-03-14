import React from "react";
import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { Text } from "@components/Text";
import clsx from "clsx";
import { Classes } from "@lib/globalTypes";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, Classes {
  disabled?: boolean;
  variant?: "primary" | "secondary" | "tertiary";
  title: string;
  onPress: (event: React.SyntheticEvent<HTMLButtonElement, Event>) => any;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  className,
  variant = "primary",
  disabled = false,
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(rest, ref);

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
    <button {...buttonProps} disabled={disabled} className={classes} ref={ref}>
      <Text weight="semibold">{title}</Text>
    </button>
  );
};
