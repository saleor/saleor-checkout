import { useRadio } from "@react-aria/radio";
import { RadioGroupState } from "@react-stately/radio";
import React from "react";
import { Divider } from "./Divider";
import { Text } from "@components/Text";
import clsx from "clsx";

export interface RadioOption {
  title: string;
  subtitle?: string;
  id: string;
}

interface RadioProps extends RadioOption {
  state: RadioGroupState;
}

export const Radio: React.FC<RadioProps> = ({ state, id, title, subtitle }) => {
  const ref = React.useRef(null);
  const { inputProps } = useRadio({ value: id }, state, ref);

  return (
    <>
      <div
        className={clsx(
          "radio-option",
          subtitle && "with-subtitle",
          state.selectedValue === id && "selected"
        )}
      >
        <div className="radio-input-container">
          <input
            {...inputProps}
            ref={ref}
            className="radio-input"
            id={inputProps.name}
          />
          <span className="radio-input-icon" />
        </div>
        <label htmlFor={inputProps.name} className="radio-label">
          <Text>{title}</Text>
          {subtitle && <Text>{subtitle}</Text>}
        </label>
      </div>
    </>
  );
};
