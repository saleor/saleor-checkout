export const appName = "Checkout";

export const isSsr = typeof window === "undefined";
export const saleorDomainHeader = "x-saleor-domain";
export const saleorTokenHeader = "x-saleor-token";

export type EnvVar = "appDomain" | "appUrl" | "apiUrl";
export type ServerEnvVar = "appId" | "appToken";

export type EnvVars = Record<EnvVar, string>;
export type ServerEnvVars = Record<ServerEnvVar, string>;

// Need to use `var variable = process.env.VARIABLE;`, not `var env = process.env; var variable = env.VARIABLE;`
// https://github.com/vercel/next.js/issues/19420
export const envVars: EnvVars = {
  appDomain: process.env.NEXT_PUBLIC_VERCEL_URL!,
  appUrl: `https://${process.env.NEXT_PUBLIC_VERCEL_URL!}`,
  apiUrl: process.env.NEXT_PUBLIC_API_URL!,
};

export const serverEnvVars: ServerEnvVars = {
  appId: process.env.SALEOR_APP_ID!,
  appToken: process.env.SALEOR_APP_TOKEN!,
};
