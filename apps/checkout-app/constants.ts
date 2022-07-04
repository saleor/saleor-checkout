export const appName = "Checkout";

export const isSsr = typeof window === "undefined";
export const saleorDomainHeader = "x-saleor-domain";
export const saleorTokenHeader = "x-saleor-token";

export type EnvVar = "apiUrl";
export type ServerEnvVar = "appToken" | "settingsEncryptionSecret";
export type DebugEnvVar = "appUrl";

export type EnvVars = Record<EnvVar, string>;
export type ServerEnvVars = Record<ServerEnvVar, string>;
export type DebugEnvVars = Record<DebugEnvVar, string | undefined>;

// Need to use `var variable = process.env.VARIABLE;`, not `var env = process.env; var variable = env.VARIABLE;`
// https://github.com/vercel/next.js/issues/19420
export const envVars: EnvVars = {
  apiUrl: process.env.NEXT_PUBLIC_SALEOR_API_URL!,
};

export const serverEnvVars: ServerEnvVars = {
  appToken: process.env.SALEOR_APP_TOKEN!,
  settingsEncryptionSecret: process.env.SETTINGS_ENCRYPTION_SECRET!,
};

export const debugEnvVars: DebugEnvVars | null =
  process.env.NODE_ENV !== "development"
    ? null
    : {
      appUrl: process.env.DEBUG_APP_URL,
    };
