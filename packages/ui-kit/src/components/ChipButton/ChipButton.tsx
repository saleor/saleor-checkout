import { VFC, HTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./ChipButton.module.css";

export interface ChipButtonProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  active?: boolean;
}

export const ChipButton: VFC<ChipButtonProps> = ({
  label,
  active,
  className,
  ...rest
}) => (
  <span
    className={clsx(
      styles["chip-button"],
      {
        [styles["chip-button-active"]]: active,
      },
      className
    )}
    {...rest}>
    {label}
  </span>
);
