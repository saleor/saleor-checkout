import { setPrivateSettings } from "@/backend/configuration/settings";
import { defaultPrivateSettings } from "@/config/defaults";
import { app } from "@/frontend/misc/app";
import { PrivateSettingsValues } from "@/types/api";
import { createContext, Dispatch, SetStateAction, useState } from "react";

interface PrivateSettingsProviderContext {
  privateSettings: PrivateSettingsValues;
  setPrivateSettings: Dispatch<SetStateAction<PrivateSettingsValues>>;
}

export const PrivateSettingsContext =
  createContext<PrivateSettingsProviderContext>({
    privateSettings: defaultPrivateSettings,
    setPrivateSettings: () => undefined,
  });

const PrivateSettingsProvider: React.FC = (props) => {
  const [privateSettings, setPrivateSettings] = useState(
    defaultPrivateSettings
  );

  return (
    <PrivateSettingsContext.Provider
      value={{
        privateSettings,
        setPrivateSettings,
      }}
      {...props}
    />
  );
};
export default PrivateSettingsProvider;
