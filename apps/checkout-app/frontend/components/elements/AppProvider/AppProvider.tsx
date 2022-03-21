import { createApp } from "@saleor/app-bridge";
import { createContext, useEffect, useMemo } from "react";

interface IAppContext {
  app?: any;
}

export const AppContext = createContext<IAppContext>({ app: undefined });

const AppProvider: React.FC = (props) => {
  const app = useMemo(() => {
    if (typeof window !== "undefined") {
      return createApp();
    }
  }, []);

  // useEffect(() => {
  //   const unsubscribe = app.subscribe("handshake", (payload) => {
  //     setToken(payload.token); // do something with event payload
  //     const { token } = app.getState(); // you can also get app's current state here
  //   });

  //   return () => {
  //     unsubscribe();
  //   };
  // }, [app]);

  return <AppContext.Provider value={{ app }} {...props} />;
};
export default AppProvider;
