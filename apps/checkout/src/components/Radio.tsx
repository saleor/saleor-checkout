import React, { cloneElement, ReactNode } from "react";
import { Text } from "@components/Text";
import clsx from "clsx";

export type RadioOption = {
  id: string;
  title?: string;
  subtitle?: string;
  content?: ReactNode;
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
}) => (
  <>
    <div
      className={clsx(
        "radio-option",
        subtitle && "with-subtitle",
        selectedValue === id && "selected",
        alignment === "top" && "items-start"
      )}
    >
      <div className="radio-input-container" onClick={() => onSelect(id)}>
        <input
          name={title}
          className="radio-input"
          id={id}
          checked={selectedValue === id}
        />
        <span className="radio-input-icon" />
      </div>
      {title ? (
        <label htmlFor={id} className="radio-label">
          <Text>{title}</Text>
          {subtitle && <Text>{subtitle}</Text>}
        </label>
      ) : (
        cloneElement(content, { htmlFor: id })
      )}
    </div>
  </>
);
