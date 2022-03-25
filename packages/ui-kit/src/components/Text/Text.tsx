import { FC, ParamHTMLAttributes } from "react";
import clsx from "clsx";

export interface TextProps extends ParamHTMLAttributes<{}> {
  size?: "sm" | "md" | "lg";
  color?: "secondary" | "tertiary" | "error";
  weight?: "normal" | "regular" | "semibold" | "bold";
}

export const Text: FC<TextProps> = ({
  children,
  size,
  color,
  weight,
  className,
}) => {
  const classes = clsx(
    "text",
    {
      "text-text-primary": !color,
      "text-text-secondary": color === "secondary",
      "text-text-tertiary": color === "tertiary",
      "text-error": color === "error",
      "text-sm": size === "sm",
      "text-base": !size,
      "text-md": size === "md",
      "text-lg": size === "lg",
      "font-bold": weight === "bold",
      "font-semibold": weight === "semibold",
      "font-regular": weight === "regular",
    },
    className
  );

  return <p className={classes}>{children}</p>;
};
