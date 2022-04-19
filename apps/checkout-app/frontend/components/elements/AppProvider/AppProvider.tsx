import { parseJwt } from "@/frontend/utils";
import { actions, createApp } from "@saleor/app-bridge";
import { useRouter } from "next/router";
import { createContext, useMemo, useEffect } from "react";

interface IAppContext {
  app?: any;
}

export const AppContext = createContext<IAppContext>({ app: undefined });

const AppProvider: React.FC = (props) => {
  // const router = useRouter();

  const app = useMemo(() => {
    if (typeof window !== "undefined") {
      return createApp();
    }
  }, []);

  // const appState = app?.getState();
  // const authData = appState?.token ? parseJwt(appState.token) : { app: "" };

  // useEffect(() => {
  //   const handleRouteChange = async (
  //     url: string,
  //     { shallow }: { shallow: boolean }
  //   ) => {
  //     console.log(
  //       `App is changing to ${url} ${
  //         shallow ? "with" : "without"
  //       } shallow routing`
  //     );

  //     (await authData.app) &&
  //       app?.dispatch(
  //         actions.Redirect({
  //           to: `/apps/${encodeURIComponent(authData.app)}/app${url}`,
  //         })
  //       );
  //   };

  //   router.events.on("beforeHistoryChange", handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [authData?.app]);

  return <AppContext.Provider value={{ app }} {...props} />;
};
export default AppProvider;
