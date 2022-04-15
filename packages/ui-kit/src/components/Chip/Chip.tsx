import { VFC, ReactNode, MouseEvent } from "react";
import clsx from "clsx";

import styles from "./Chip.module.css";
import { ButtonLabel } from "../Button/Button";
import { RemoveIcon } from "../icons";

export interface ChipProps {
  icon?: ReactNode;
  label: string;
  className?: string;
  onClick: (e?: MouseEvent) => void;
}

export const Chip: VFC<ChipProps> = ({
  label,
  icon,
  className,
  onClick,
  ...rest
}) => (
  <div className={clsx(styles.chip, className)} {...rest}>
    {icon}
    <ButtonLabel
      content={label}
      className={clsx({ [styles["chip-label-margin"]]: !!icon })}
    />
    <button className={styles["chip-button"]} onClick={onClick}>
      <RemoveIcon />
    </button>
  </div>
);
