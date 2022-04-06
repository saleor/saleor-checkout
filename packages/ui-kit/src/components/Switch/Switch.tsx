import { VFC } from "react";
import clsx from "clsx";
import { Switch as HeadlessSwitch } from "@headlessui/react";

import styles from "./Switch.module.css";
import labelStyles from "../Label/Label.module.css";

export interface SwitchProps {
  checked?: boolean;
  label?: string;
  className?: {
    container?: string;
    toggle?: string;
    label?: string;
  };
  onChange(checked: boolean): void;
}

export const Switch: VFC<SwitchProps> = ({
  checked = false,
  label,
  className,
  onChange,
}) => (
  <div className={className?.container}>
    <HeadlessSwitch.Group>
      <HeadlessSwitch
        checked={checked}
        onChange={onChange}
        className={clsx(
          styles.toggle,
          {
            [styles["toggle-active"]]: checked,
          },
          className?.toggle
        )}>
        <span
          aria-hidden='true'
          className={clsx(styles.dot, {
            [styles["dot-active"]]: checked,
          })}
        />
      </HeadlessSwitch>
      {label && (
        <HeadlessSwitch.Label
          className={clsx(labelStyles.label, styles.label, className?.label)}>
          {label}
        </HeadlessSwitch.Label>
      )}
    </HeadlessSwitch.Group>
  </div>
);
