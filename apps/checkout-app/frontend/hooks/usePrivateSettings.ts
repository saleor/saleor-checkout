import { useContext } from "react";
import { PrivateSettingsContext } from "../components/elements/PrivateSettingsProvider";

export const usePrivateSettings = () => {
  const app = useContext(PrivateSettingsContext);

  return app;
};
