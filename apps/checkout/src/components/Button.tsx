import React, { ElementType } from "react";
import { useButton } from "@react-aria/button";
import { useRef } from "react";
import { Text, TextProps } from "@components/Text";
import { AriaButtonProps } from "@react-types/button";
import clsx from "clsx";

interface ButtonProps extends AriaButtonProps<ElementType<HTMLButtonElement>> {
  variant?: "primary" | "secondary";
  title: string;
}

const Button: React.FC<ButtonProps> = ({
  title,
  variant = "primary",
  ...rest
}) => {
  const ref = useRef<HTMLButtonElement | null>(null);
  const { buttonProps } = useButton(rest, ref);

  const classes = clsx("button", {
    "button-primary": variant === "primary",
    "button-secondary": variant === "secondary",
  });

  return (
    <button className={classes} ref={ref} {...buttonProps}>
      <Text>{title}</Text>
    </button>
  );
};

export default Button;
