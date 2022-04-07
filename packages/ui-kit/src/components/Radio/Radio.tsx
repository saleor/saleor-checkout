import { FC, ReactNode, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { nanoid } from "nanoid";

import styles from "./Radio.module.css";
import { CheckIcon } from "../icons";
import { Label } from "../Label";

export interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "className"> {
  label?: string | ReactNode;
  className?: {
    container?: string;
    inputContainer?: string;
    input?: string;
    radio?: string;
    label?: string;
  };
}

export const Radio: FC<RadioProps> = ({
  label,
  checked,
  value,
  className,
  id = nanoid(),
  ...rest
}) => (
  <div className={clsx(styles.radio, className?.container)}>
    <div
      className={clsx(styles["box"], {
        [styles["box-static"]]: !label,
      })}>
      <input
        type='radio'
        value={value}
        checked={checked}
        id={id}
        className={className?.input}
        {...rest}
      />
      <div className={clsx(styles["radio-input"], className?.radio)} />
    </div>
    {label && (
      <Label
        className={clsx(styles["radio-label"], className?.label)}
        htmlFor={id}>
        {label}
      </Label>
    )}
  </div>
);
