import React from "react";
import { Radio, RadioOption, RadioProps } from "./Radio";

interface RadioGroupProps extends RadioProps {
  options: RadioOption[];
  label: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  label,
  ...rest
}) => {
  return (
    <div className="radio-group">
      {options.map(({ id, ...optionProps }) => (
        <Radio key={id} id={id} {...optionProps} {...rest} />
      ))}
    </div>
  );
};
