import { VFC, HTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./ChipButton.module.css";

export interface ChipButtonProps extends HTMLAttributes<HTMLSpanElement> {
  label: string;
  selected?: boolean;
}

export const ChipButton: VFC<ChipButtonProps> = ({
  label,
  selected,
  className,
  ...rest
}) => (
  <span
    className={clsx(
      styles["chip-button"],
      {
        [styles["chip-button-active"]]: selected,
      },
      className
    )}
    {...rest}>
    {label}
  </span>
);
