import React, { ReactNode } from "react";
import { handleInputChange } from "@/lib/utils";
import { Radio as UiKitRadio } from "@saleor/ui-kit";

export interface RadioOptionBase {
  onSelect: (value: string) => void;
  selectedValue: string | undefined;
  value: string;
  disabled?: boolean;
}

export type RadioChildren = (
  props: Pick<RadioOptionChildrenProps, "htmlFor">
) => ReactNode;

export interface CustomRadioOption extends RadioOptionBase {
  children: RadioChildren;
  title?: never;
  subtitle?: never;
}

export interface SimpleRadioOption extends RadioOptionBase {
  title: string;
  subtitle?: string;
  children?: never;
}

export type RadioOption = SimpleRadioOption | CustomRadioOption;

export interface RadioOptionChildrenProps
  extends Pick<RadioOptionBase, "disabled"> {
  htmlFor: string;
}

export const Radio: React.FC<SimpleRadioOption | CustomRadioOption> = ({
  children,
  ...rest
}: RadioOption & {
  title?: string;
  subtitle?: string;
  children?: RadioChildren;
}) => {
  const { title, value, onSelect, selectedValue } = rest;

  const isSimpleRadio = title && !children;
  const isCustomRadio = !title && children;

  return (
    <>
      {/* <div
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
        </div> */}
      {isSimpleRadio && (
        <UiKitRadio
          {...rest}
          onSelect={handleInputChange(onSelect)}
          checked={selectedValue === value}
        />
      )}

      {isCustomRadio && children({ htmlFor: value })}
      {/* </div> */}
    </>
  );
};
