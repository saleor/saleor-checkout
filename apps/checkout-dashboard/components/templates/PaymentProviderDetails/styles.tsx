import { makeStyles } from "@saleor/macaw-ui";

export const useStyles = makeStyles(
  () => ({
    root: {
      display: "flex",
      gap: "2rem",
    },
    providerSettings: {
      flex: "2",
    },
  }),
  { name: "PaymentProviderDetails" }
);
