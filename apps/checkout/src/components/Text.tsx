import React from "react";
import clsx from "clsx";

export interface TextProps {
  size?: "sm" | "lg" | "xl";
  color?: "secondary" | "tertiary" | "error";
  bold?: boolean;
  title?: boolean;
  className?: string;
}

export const Text: React.FC<TextProps> = ({
  children,
  size,
  color,
  bold,
  title,
  className,
}) => {
  const classes = clsx(
    {
      "text-text-primary": !color,
      "text-text-secondary": color === "secondary",
      "text-text-tertiary": color === "tertiary",
      "text-error": color === "error",
      "text-sm": size === "sm",
      "text-base": !size,
      "text-lg": size === "lg",
      "text-xl": size === "xl" || title,
      "font-bold": bold || title,
    },
    className
  );

  if (size === "xl") {
    return <h2 className={classes}>{children}</h2>;
  }

  return <p className={classes}>{children}</p>;
};
