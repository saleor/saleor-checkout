import React, { ReactNode } from "react";
import { Text } from "@components/Text";
import clsx from "clsx";

export interface RadioOptionBase {
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
  value: string;
  disabled?: boolean;
}

export type ContentFunction = (
  props: Pick<RadioOptionContentProps, "htmlFor">
) => ReactNode;

export interface CustomRadioOption extends RadioOptionBase {
  content: ContentFunction;
  title?: never;
  subtitle?: never;
}

export interface SimpleRadioOption extends RadioOptionBase {
  title: string;
  subtitle?: string;
  content?: never;
}

export type RadioOption = SimpleRadioOption | CustomRadioOption;

export interface RadioOptionContentProps
  extends Pick<RadioOptionBase, "disabled"> {
  htmlFor: string;
}

export const Radio: React.FC<SimpleRadioOption | CustomRadioOption> = ({
  value,
  title,
  subtitle,
  content,
  selectedValue,
  onSelect,
  disabled,
}: RadioOption & {
  title?: string;
  subtitle?: string;
  content?: ContentFunction;
}) => (
  <>
    <div
      className={clsx(
        "radio-option",
        disabled && "disabled",
        subtitle && "with-subtitle",
        { selected: selectedValue === value && !disabled }
      )}
    >
      <div
        className="radio-input-container"
        onClick={() => {
          if (!disabled) {
            onSelect(value);
          }
        }}
      >
        <input
          disabled={disabled}
          name={title}
          className="radio-input"
          id={value}
          checked={selectedValue === value}
        />
        <span className="radio-input-icon" />
      </div>
      {title && (
        <label htmlFor={value} className="radio-label">
          <Text className={clsx(disabled && "text-text-secondary")}>
            {title}
          </Text>
          {subtitle && <Text>{subtitle}</Text>}
        </label>
      )}

      {content && content({ htmlFor: value })}
    </div>
  </>
);
