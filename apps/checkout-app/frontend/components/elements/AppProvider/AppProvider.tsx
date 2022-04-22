import { isSsr } from "@/constants";
import { createApp } from "@saleor/app-bridge";
import { createContext, useEffect, useMemo, useState } from "react";

interface IAppContext {
  app?: any;
  token?: string;
}

export const AppContext = createContext<IAppContext>({
  app: undefined,
  token: undefined,
});

const AppProvider: React.FC = (props) => {
  const [token, setToken] = useState<string>();

  const app = useMemo(() => {
    if (!isSsr) {
      return createApp();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSsr]);

  useEffect(() => {
    if (app) {
      const unsubscribe = app.subscribe("handshake", (payload) => {
        setToken(payload.token);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [app]);

  return <AppContext.Provider value={{ app, token }} {...props} />;
};
export default AppProvider;
