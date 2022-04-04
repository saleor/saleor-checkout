import { FC, ReactNode, MouseEvent } from "react";
import clsx from "clsx";

import styles from "./Chip.module.css";
import { ButtonLabel } from "../Button/Button";
import { RemoveIcon } from "../icons";

export interface ChipProps {
  icon?: ReactNode;
  label: string;
  className?: string;
  onCloseClick: (e?: MouseEvent) => void;
}

export const Chip: FC<ChipProps> = ({
  label,
  icon,
  className,
  onCloseClick,
  ...rest
}) => (
  <div className={clsx(styles.chip, className)} {...rest}>
    {icon}
    <ButtonLabel
      content={label}
      className={clsx({ [styles["chip-label-margin"]]: !!icon })}
    />
    <button className={styles["chip-button"]} onClick={onCloseClick}>
      <RemoveIcon />
    </button>
  </div>
);
