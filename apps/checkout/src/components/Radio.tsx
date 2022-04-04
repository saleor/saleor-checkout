import React, { cloneElement, ReactNode } from "react";
import { Text } from "@components/Text";
import clsx from "clsx";

export type RadioOption = {
  id: string;
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  disabled?: boolean;
};

export interface RadioProps extends RadioOption {
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
  alignment: "top" | "center";
}

export interface RadioOptionContentProps {
  htmlFor: string;
}

export const Radio: React.FC<RadioProps> = ({
  id,
  title,
  subtitle,
  content,
  selectedValue,
  onSelect,
  alignment = "center",
  disabled,
}) => (
  <>
    <div
      className={clsx(
        "radio-option",
        disabled && "disabled",
        subtitle && "with-subtitle",
        { selected: selectedValue === id && !disabled },
        alignment === "top" && "items-start"
      )}
    >
      <div
        className="radio-input-container"
        onClick={() => {
          if (!disabled) {
            onSelect(id);
          }
        }}
      >
        <input
          disabled={disabled}
          name={title}
          className="radio-input"
          id={id}
          checked={selectedValue === id}
        />
        <span className="radio-input-icon" />
      </div>
      {title ? (
        <label htmlFor={id} className="radio-label">
          <Text className={clsx(disabled && "text-text-secondary")}>
            {title}
          </Text>
          {subtitle && <Text>{subtitle}</Text>}
        </label>
      ) : (
        // @ts-ignore to be removed after this is moved to ui kit
        cloneElement(content, { htmlFor: id })
      )}
    </div>
  </>
);
