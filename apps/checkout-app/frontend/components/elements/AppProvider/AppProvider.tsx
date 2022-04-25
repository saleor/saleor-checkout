import { isSsr } from "@/constants";
import { createApp } from "@saleor/app-bridge";
import { createContext, useEffect, useState } from "react";

const app = !isSsr ? createApp() : undefined;

interface IAppContext {
  app?: ReturnType<typeof createApp>;
  isAuthorized: boolean;
}

export const AppContext = createContext<IAppContext>({
  app: undefined,
  isAuthorized: false,
});

const AppProvider: React.FC = (props) => {
  const [isAuthorized, setIsAuthorized] = useState(!!app?.getState()?.token);

  useEffect(() => {
    if (app) {
      const unsubscribe = app.subscribe("handshake", (payload) => {
        setIsAuthorized(!!payload.token);
      });

      return () => {
        unsubscribe();
      };
    }
  }, []);

  return <AppContext.Provider value={{ app, isAuthorized }} {...props} />;
};
export default AppProvider;
