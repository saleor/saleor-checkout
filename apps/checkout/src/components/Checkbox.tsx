// import {useCheckbox} from '@react-aria/checkbox' -> won't work now because of React 18, add after official release

import { ChangeEvent } from "react";
import { Text } from "@components/Text";
import { CheckIcon } from "@icons";

interface CheckboxProps {
  label: string;
  value: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  checked,
  value,
  onChange,
}) => {
  return (
    <div className="checkbox">
      <div className="relative h-5 w-5 mr-2">
        <input type="checkbox" value={value} checked={checked} />
        <div className="checkbox-input" onClick={() => onChange(!checked)}>
          <img src={CheckIcon} />
        </div>
      </div>
      <Text className="checkbox-label">{label}</Text>
    </div>
  );
};
