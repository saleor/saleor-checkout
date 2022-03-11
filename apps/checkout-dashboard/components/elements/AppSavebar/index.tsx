import { Savebar, SavebarLabels, SavebarProps } from "@saleor/macaw-ui";
import React, { useEffect, useState } from "react";
import { useStyles } from "./styles";

interface AppSavebarProps extends Omit<SavebarProps, "labels"> {
  labels?: Partial<SavebarLabels>;
}

const AppSavebar: React.FC<AppSavebarProps> = ({ labels = {}, ...rest }) => {
  const defaultLabels: SavebarLabels = {
    cancel: "Back",
    confirm: "Save",
    delete: "Delete",
    error: "Error",
  };
  const componentLabels: SavebarLabels = {
    ...defaultLabels,
    ...labels,
  };
  const classes = useStyles();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  if (mounted) {
    return (
      <Savebar labels={componentLabels} className={classes.savebar} {...rest} />
    );
  }
  return null;
};
export default AppSavebar;
