import { makeStyles, SaleorTheme } from "@saleor/macaw-ui";

export const useStyles = makeStyles(
  (theme: SaleorTheme) => ({
    root: {
      padding: theme.spacing(0, 0, 2, 0),
    },
  }),
  {
    name: "AppContainer",
  }
);
