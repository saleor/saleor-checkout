import { VFC, HTMLAttributes } from "react";
import clsx from "clsx";

import styles from "./RemoveButton.module.css";
import { Button, ButtonProps } from "../Button";
import { RemoveIcon } from "../icons";

export interface RemoveButtonProps extends Omit<ButtonProps, "label"> {}

export const RemoveButton: VFC<RemoveButtonProps> = ({
  className,
  ...rest
}) => (
  <Button
    label={<RemoveIcon />}
    variant='secondary'
    className={clsx(
      styles["remove-button"],
      // {
      //   [styles["chip-button-active"]]: selected,
      // },
      className
    )}
    {...rest}
  />
);
