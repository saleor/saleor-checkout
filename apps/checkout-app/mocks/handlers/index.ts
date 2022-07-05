import { mollieHandlers } from "./mollie";
import { saleorHandlers } from "./saleor";

export const handlers = [...mollieHandlers, ...saleorHandlers];
