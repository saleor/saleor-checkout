import { FC, ReactNode } from "react";
import clsx from "clsx";

import styles from "./IconButton.module.css";
import { Button, ButtonProps, ButtonLabel } from "../Button/Button";

export interface IconButtonProps extends Omit<ButtonProps, "variant"> {
  icon: ReactNode;
  reverse?: boolean;
  variant?: "bare";
}

export const IconButton: FC<IconButtonProps> = ({
  label,
  icon,
  className,
  variant,
  reverse,
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
            styles[reverse ? "icon-button-label-reverse" : "icon-button-label"]
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
          [styles["icon-button-reverse"]]: reverse,
          [styles["icon-button-nolabel"]]: !label,
        },
        className
      )}
      {...rest}
    />
  );
};
