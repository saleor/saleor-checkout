import { makeStyles, SaleorTheme } from "@saleor/macaw-ui";
import { VerticalSpacerProps } from "./types";

export const useStyles = makeStyles(
  (theme: SaleorTheme) => ({
    container: ({ spacing }: VerticalSpacerProps) => ({
      height: theme.spacing(spacing || 0),
    }),
  }),
  { name: "VerticalSpacer" }
);
