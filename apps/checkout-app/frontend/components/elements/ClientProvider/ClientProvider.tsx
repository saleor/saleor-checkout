import { API_URL, isSsr } from "@/constants";
import { useApp } from "@/frontend/hooks/useApp";
import { getClient } from "@/frontend/misc/auth";
import { useMemo } from "react";
import { Provider } from "urql";

const ClientProvider: React.FC = ({ children, ...props }) => {
  const app = useApp();

  const token = app.token || app.app?.getState()?.token;

  const client = useMemo(() => {
    return getClient(API_URL, token);
  }, [token]);

  if (client) {
    return (
      <Provider value={client} {...props}>
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
