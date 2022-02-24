import Setting from "@elements/Setting";
import classNames from "classnames";
import { SettingType } from "types";
import { useStyles } from "./styles";

interface Setting {
  id: string;
  type: SettingType;
  label: string;
  value?: string;
}
interface SettingListProps {
  settings: Setting[];
}

const SettingList: React.FC<SettingListProps> = ({ settings }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {settings.map((setting) => (
        <div
          className={classNames({
            [classes.fullWidth]: setting.type === "string",
          })}
          key={setting.id}
        >
          <Setting
            type={setting.type}
            label={setting.label}
            value={setting.value}
          />
        </div>
      ))}
    </div>
  );
};
export default SettingList;
