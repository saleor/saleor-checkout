import React from "react";
import { Divider } from "./Divider";
import { useRadioGroup } from "@react-aria/radio";
import { RadioGroupState } from "@react-stately/radio";
import { Radio, RadioOption } from "./Radio";

interface RadioGroupProps {
  options: RadioOption[];
  state: RadioGroupState;
  label: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  options,
  state,
  label,
}) => {
  const { radioGroupProps, labelProps } = useRadioGroup({ label }, state);

  return (
    <div {...radioGroupProps} className="radio-group">
      {options.map(({ id, ...rest }) => (
        <Radio state={state} key={id} id={id} {...rest} />
      ))}
    </div>
  );
};
