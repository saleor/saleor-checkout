import { makeStyles, SaleorTheme } from "@saleor/macaw-ui";

export const useStyles = makeStyles(
  (theme: SaleorTheme) => ({
    root: {
      display: "flex",
      gap: "2rem",
    },
    content: {
      flex: "2",
    },
    settings: {
      display: "flex",
      flexWrap: "wrap",
      gap: theme.spacing(2),
      width: "100%",
    },
  }),
  { name: "AppLayout" }
);
