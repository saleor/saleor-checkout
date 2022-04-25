import { API_URL } from "@/constants";
import { useApp } from "@/frontend/hooks/useApp";
import { getClient } from "@/frontend/misc/auth";
import { useEffect, useRef } from "react";
import { Provider } from "urql";

const ClientProvider: React.FC = ({ children, ...props }) => {
  const { app } = useApp();

  const token = app?.getState()?.token;

  const client = useRef(getClient(API_URL, token));

  useEffect(() => {
    if (app) {
      const unsubscribe = app.subscribe("handshake", (payload) => {
        client.current = getClient(API_URL, payload.token);
      });

      return () => {
        unsubscribe();
      };
    }
  }, [app]);

  if (client) {
    return (
      <Provider value={client.current} {...props}>
        {children}
      </Provider>
    );
  }

  if (children) {
    return <>{children}</>;
  }

  return null;
};
export default ClientProvider;
