export const appName = "Checkout";

export const isSsr = typeof window === "undefined";
export const saleorDomainHeader = "x-saleor-domain";
export const saleorTokenHeader = "x-saleor-token";

export type EnvVar = "appDomain" | "appUrl" | "appId" | "apiUrl";
export type ServerEnvVar = "appToken";

export type EnvVars = Record<EnvVar, string>;
export type ServerEnvVars = Record<ServerEnvVar, string>;

const env = process.env;

export const envVars: EnvVars = {
  appDomain: env.NEXT_PUBLIC_VERCEL_URL!,
  appUrl: `https://${env.NEXT_PUBLIC_VERCEL_URL!}`,
  appId: env.SALEOR_APP_ID!,
  apiUrl: env.NEXT_PUBLIC_API_URL!,
} as EnvVars;

export const serverEnvVars: ServerEnvVars = {
  appToken: env.SALEOR_APP_TOKEN,
} as ServerEnvVars;
