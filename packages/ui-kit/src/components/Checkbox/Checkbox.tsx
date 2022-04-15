import { FC, ReactNode, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";

import styles from "./Checkbox.module.css";
import { CheckIcon } from "../icons";
import { Label } from "../Label";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string | ReactNode;
  classNames?: {
    container?: string;
    inputContainer?: string;
    input?: string;
    checkbox?: string;
    label?: string;
  };
}

export const Checkbox: FC<CheckboxProps> = ({
  label,
  checked,
  value,
  classNames,
  id = nanoid(),
  ...rest
}) => (
  <div className={clsx(styles.checkbox, classNames?.container)}>
    <div
      className={clsx(styles["box"], {
        [styles["box-static"]]: !label,
      })}>
      <input
        type='checkbox'
        value={value}
        checked={checked}
        id={id}
        className={classNames?.input}
        {...rest}
      />
      <div className={clsx(styles["checkbox-input"], classNames?.checkbox)}>
        <CheckIcon />
      </div>
    </div>
    {label && (
      <Label
        className={clsx(styles["checkbox-label"], classNames?.label)}
        htmlFor={id}>
        {label}
      </Label>
    )}
  </div>
);
