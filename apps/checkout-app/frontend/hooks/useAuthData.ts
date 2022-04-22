import { parseJwt } from "@/frontend/utils";
import { useApp } from "./useApp";

export interface AuthTokenPayload {
  app: string;
  isAuthorized: boolean;
}

export const useAuthData = (): AuthTokenPayload => {
  const app = useApp();
  const appState = app.app?.getState();
  const payload = appState?.token ? parseJwt(appState.token) : {};

  return {
    app: payload.app || "",
    isAuthorized: !!payload.app,
    ...payload,
  };
};
