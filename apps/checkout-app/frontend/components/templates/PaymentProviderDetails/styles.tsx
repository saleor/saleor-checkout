import { makeStyles, SaleorTheme } from "@saleor/macaw-ui";

export const useStyles = makeStyles(
  (theme: SaleorTheme) => ({
    settings: {
      width: "100%",
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(2),
    },
  }),
  { name: "PaymentProviderDetails" }
);
