import { API_URL } from "@/constants";
import { useApp } from "@/frontend/hooks/useApp";
import { getClient } from "@/frontend/misc/auth";
import { useEffect, useRef } from "react";
import { Provider } from "urql";

const ClientProvider: React.FC = ({ children, ...props }) => {
  const { app } = useApp();

  const client = useRef(getClient(API_URL, app));

  useEffect(() => {
    if (app) {
      const unsubscribe = app.subscribe("handshake", () => {
        client.current = getClient(API_URL, app);
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
