import React from "react";
import { Text } from "@components/Text";
import clsx from "clsx";

export interface RadioOption {
  title: string;
  subtitle?: string;
  id: string;
}

export interface RadioProps extends RadioOption {
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
}

export const Radio: React.FC<RadioProps> = ({
  id,
  title,
  subtitle,
  selectedValue,
  onSelect,
}) => (
  <>
    <div
      className={clsx(
        "radio-option",
        subtitle && "with-subtitle",
        selectedValue === id && "selected"
      )}
    >
      <div className="radio-input-container" onClick={() => onSelect(id)}>
        <input
          name={title}
          className="radio-input"
          id={title}
          checked={selectedValue === id}
        />
        <span className="radio-input-icon" />
      </div>
      <label htmlFor={title} className="radio-label">
        <Text>{title}</Text>
        {subtitle && <Text>{subtitle}</Text>}
      </label>
    </div>
  </>
);
