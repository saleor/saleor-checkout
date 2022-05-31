import { createFetch } from "@saleor/sdk";

export const authorizedFetch = createFetch({ waitForAuth: true });

export const unauthorizedFetch = createFetch();
