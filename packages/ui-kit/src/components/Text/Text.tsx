import { FC, HTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./Text.module.css";

export interface TextProps extends HTMLAttributes<{}> {
  as?: keyof JSX.IntrinsicElements;
  size?: "sm" | "md" | "lg";
  color?: "secondary" | "tertiary" | "error";
  weight?: "normal" | "regular" | "semibold" | "bold";
}

export const Text: FC<TextProps> = ({
  as = "p",
  size,
  color,
  weight,
  className,
  ...rest
}) => {
  const classes = clsx(
    {
      [styles["txt-primary"]]: !color,
      [styles["txt-secondary"]]: color === "secondary",
      [styles["txt-tertiary"]]: color === "tertiary",
      [styles["txt-error"]]: color === "error",
      [styles["txt-sm"]]: size === "sm",
      [styles["txt-base"]]: !size,
      [styles["txt-md"]]: size === "md",
      [styles["txt-lg"]]: size === "lg",
      [styles["txt-bold"]]: weight === "bold",
      [styles["txt-semibold"]]: weight === "semibold",
      [styles["txt-regular"]]: weight === "regular",
    },
    className
  );

  const CustomTag = as;

  return <CustomTag className={classes} {...rest} />;
};
