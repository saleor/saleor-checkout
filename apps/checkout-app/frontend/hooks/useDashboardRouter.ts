import { appId } from "@/constants";
import { actions } from "@saleor/app-bridge";
import { useApp } from "./useApp";
import { stringify } from "query-string";
import { useRouter } from "next/router";
import { useAuthData } from "./useAuthData";

interface DashboardUrl {
  pathname: string;
  query?: Record<string, any>;
}

const getDashboardUrl = (url: DashboardUrl | string) => {
  if (typeof url === "string") {
    return url;
  }

  const queryString = url.query ? `?${stringify(url.query)}` : "";

  return `${url.pathname}${queryString}`;
};

export const useDashboardRouter = () => {
  const app = useApp();
  const authData = useAuthData();
  const router = useRouter();

  const push = (url: DashboardUrl | string) => {
    if (!app) {
      return router.push(url);
    }

    const path = getDashboardUrl(url);

    return app.dispatch(
      actions.Redirect({
        to: `/apps/${encodeURIComponent(authData.app)}/app${path}`,
      })
    );
  };

  return {
    push,
  };
};
