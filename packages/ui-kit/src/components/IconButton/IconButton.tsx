import { FC, ReactNode } from "react";
import clsx from "clsx";

import styles from "./IconButton.module.css";
import { Button, ButtonProps, ButtonLabel } from "../Button/Button";

export interface IconButtonProps extends Omit<ButtonProps, "variant"> {
  icon: ReactNode;
  alignment?: "left" | "right";
  variant?: "bare";
}

export const IconButton: FC<IconButtonProps> = ({
  label,
  icon,
  className,
  variant,
  alignment = "left",
  ...rest
}) => {
  if (variant === "bare") {
    return (
      <button
        aria-label={typeof label === "string" ? label : undefined}
        className={clsx(styles["bare-icon-button"], className)}
        {...rest}>
        {icon}
      </button>
    );
  }

  const content = (
    <>
      {icon}
      {typeof label === "string" && (
        <ButtonLabel
          className={
            styles[
              alignment === "right"
                ? "icon-button-label-reverse"
                : "icon-button-label"
            ]
          }
          content={label}
        />
      )}
    </>
  );

  return (
    <Button
      label={content}
      variant='secondary'
      className={clsx(
        styles["icon-button"],
        {
          [styles["icon-button-reverse"]]: alignment === "right",
          [styles["icon-button-nolabel"]]: !label,
        },
        className
      )}
      {...rest}
    />
  );
};
