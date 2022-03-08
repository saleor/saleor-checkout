import ColorInput from "@elements/ColorInput";
import FileInput from "@elements/FileInput";
import { TextField } from "@material-ui/core";
import { SettingType } from "types";

interface SettingProps {
  name: string;
  type: SettingType;
  label: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}

const Setting: React.FC<SettingProps> = ({
  name,
  type,
  label,
  value,
  onChange,
  onBlur,
}) => {
  if (type === "string") {
    return (
      <TextField
        name={name}
        label={label}
        value={value}
        fullWidth={true}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }
  if (type === "color") {
    return (
      <ColorInput
        name={name}
        label={label}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    );
  }
  if (type === "image") {
    return (
      <FileInput
        name={name}
        label={label}
        fileUrl={value}
        onFileUpload={() => undefined}
        onFileDelete={() => undefined}
      />
    );
  }
  return null;
};
export default Setting;
