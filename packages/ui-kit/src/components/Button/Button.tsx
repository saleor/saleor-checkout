import { FC, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Button.module.css";
import { Text } from "../Text";

export interface ButtonProps extends ButtonHTMLAttributes<{}> {
  variant?: "primary" | "secondary" | "tertiary";
}

export const Button: FC<ButtonProps> = ({
  title,
  className,
  variant = "primary",
  disabled = false,
  ...rest
}) => {
  const classes = clsx(
    styles.button,
    {
      [styles["button-primary"]]: variant === "primary",
      [styles["button-secondary"]]: variant === "secondary",
      [styles["button-tertiary"]]: variant === "tertiary",
    },
    className
  );

  return (
    <button disabled={disabled} className={classes} {...rest}>
      <Text as='span' weight='semibold'>
        {title}
      </Text>
    </button>
  );
};
