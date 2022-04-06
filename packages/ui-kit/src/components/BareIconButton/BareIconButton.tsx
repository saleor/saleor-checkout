import { VFC, ReactNode, ButtonHTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./BareIconButton.module.css";
import { Button, ButtonProps, ButtonLabel } from "../Button/Button";

export interface BareIconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: ReactNode | string;
}

export const BareIconButton: VFC<BareIconButtonProps> = ({
  icon,
  className,
  ...rest
}) => (
  <button className={clsx(styles["bare-icon-button"], className)} {...rest}>
    {icon}
  </button>
);
