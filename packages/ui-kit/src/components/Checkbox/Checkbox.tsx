import { InputHTMLAttributes } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";

import styles from "./Checkbox.module.css";
import { CheckIcon } from "../icons";
import { Label } from "../Label";

export interface CheckboxProps extends InputHTMLAttributes<{}> {
  label: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  value,
  className,
  id = nanoid(),
  ...rest
}) => (
  <div className={clsx(styles.checkbox, className)}>
    <div className={styles["box"]}>
      <input
        type='checkbox'
        value={value}
        checked={checked}
        id={id}
        {...rest}
      />
      <div className={styles["checkbox-input"]}>
        <CheckIcon />
      </div>
    </div>
    <Label className={styles["checkbox-label"]} htmlFor={id}>
      {label}
    </Label>
  </div>
);
