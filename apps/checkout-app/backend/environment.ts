import fs from "fs";
import { serverEnvVars } from "../constants";

const maskToken = (token: string) =>
  "*".repeat(Math.max(token.length - 4, 0)) + token.slice(-4);

export const getAuthToken = () => {
  let token;
  if (serverEnvVars.appToken) {
    token = serverEnvVars.appToken;
  }

  if (!token && process.env.VERCEL !== "1") {
    token = fs.readFileSync(".auth_token", "utf-8");
  }

  if (!token) {
    if (process.env.VERCEL) {
      console.warn(
        "⚠️ Warning! Auth token is empty. Make sure SALEOR_APP_TOKEN env variable is set"
      );
    } else {
      console.warn(
        "⚠️ Warning! Auth token is not set. Make sure the app is installedd in Saleor or set SALEOR_APP_TOKEN environment variable"
      );
    }
    token = "";
  }

  console.log("Using authToken: ", maskToken(token));
  return token;
};

export const setAuthToken = async (token: string) => {
  if (process.env.VERCEL === "1") {
    console.warn(
      "App was installed in Saleor, please update SALEOR_APP_TOKEN and SALEOR_APP_ID environment variables in Vercel"
    );
  } else {
    console.log("Setting authToken: ", maskToken(token));
    fs.writeFileSync(".auth_token", token);
  }
};
