import { FC, ReactNode, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";

import styles from "./Checkbox.module.css";
import { CheckIcon } from "../icons";
import { Label } from "../Label";

export interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string | ReactNode;
  className?: {
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
  className,
  id = nanoid(),
  ...rest
}) => (
  <div className={clsx(styles.checkbox, className?.container)}>
    <div
      className={clsx(styles["box"], {
        [styles["box-static"]]: !label,
      })}>
      <input
        type='checkbox'
        value={value}
        checked={checked}
        id={id}
        className={className?.input}
        {...rest}
      />
      <div className={clsx(styles["checkbox-input"], className?.checkbox)}>
        <CheckIcon />
      </div>
    </div>
    {label && (
      <Label
        className={clsx(styles["checkbox-label"], className?.label)}
        htmlFor={id}>
        {label}
      </Label>
    )}
  </div>
);