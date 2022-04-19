import { useApp } from "@/frontend/hooks/useApp";
import { useAuthData } from "@/frontend/hooks/useAuthData";
import { actions } from "@saleor/app-bridge";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useStyles } from "./styles";

const AppContainer: React.FC = (props) => {
  const classes = useStyles();
  // const router = useRouter();

  // const app = useApp();
  // const authData = useAuthData();

  // useEffect(() => {
  //   const state = app?.getState();
  //   console.log(state?.domain);
  //   // app?.subscribe("response", )
  // }, [app]);

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

  //     await app?.dispatch(
  //       actions.Redirect({ to: `/apps/${authData.app}/app/${url}` })
  //     );
  //   };

  //   router.events.on("routeChangeComplete", handleRouteChange);

  //   // If the component is unmounted, unsubscribe
  //   // from the event with the `off` method:
  //   return () => {
  //     router.events.off("routeChangeComplete", handleRouteChange);
  //   };
  // }, [app, authData]);

  return <div className={classes.root} {...props} />;
};
export default AppContainer;
