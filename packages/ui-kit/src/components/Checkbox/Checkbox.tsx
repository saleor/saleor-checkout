import {
  Ref,
  ReactNode,
  InputHTMLAttributes,
  useId,
  forwardRef,
  MouseEvent,
} from "react";
import clsx from "clsx";

import styles from "./Checkbox.module.css";
import { CheckIcon } from "../icons";
import { Label } from "../Label";
import { ClassNames } from "@lib/globalTypes";

export interface CheckboxProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "className" | "onChange"
  > {
  onChange: (event: MouseEvent<HTMLDivElement>) => void;
  label?: string | ReactNode;
  classNames?: ClassNames<
    "container" | "inputContainer" | "input" | "checkbox" | "label"
  >;
}

export const Checkbox = forwardRef(
  (
    { label, checked, value, classNames, onChange, ...rest }: CheckboxProps,
    ref: Ref<HTMLInputElement>
  ) => {
    const id = rest?.id || useId();

    return (
      <div className={clsx(styles.checkbox, classNames?.container)}>
        <div className={clsx(styles["box"], "select-none")} onClick={onChange}>
          <input
            ref={ref}
            {...rest}
            type="checkbox"
            value={value}
            checked={!!checked}
            id={id}
            className={classNames?.input}
          />
          <div className={clsx(styles["checkbox-input"], classNames?.checkbox)}>
            <CheckIcon />
          </div>
        </div>
        {label && (
          <Label className={clsx(classNames?.label)} htmlFor={id}>
            {label}
          </Label>
        )}
      </div>
    );
  }
);
