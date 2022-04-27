import createSafeContext from "@/providers/createSafeContext";
import { PropsWithChildren, useMemo } from "react";
import { EnvVars, envVars as configEnvVars } from "@/lib/utils";

export interface EnvContextConsumerProps {
  envVars?: EnvVars;
  location: Location;
}

export const [useEnvContext, Provider] =
  createSafeContext<EnvContextConsumerProps>();

interface EnvProviderProps {
  envVars?: EnvVars;
  location: Location;
}

export const EnvProvider: React.FC<PropsWithChildren<EnvProviderProps>> = ({
  children,
  envVars: propsEnvVars,
  location,
}) => {
  const envVars = useMemo(
    () => ({
      ...configEnvVars,
      ...propsEnvVars,
    }),
    [propsEnvVars]
  );

  return <Provider value={{ envVars, location }}>{children}</Provider>;
};
