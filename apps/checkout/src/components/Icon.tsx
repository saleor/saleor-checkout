import React from "react";

type Context = __WebpackModuleApi.RequireContext;

type IconType = "add" | "alert" | "back" | "chevron" | "edit" | "discount";

const importAll = (context: Context) => {
  const keys = context.keys();
  return keys.reduce(
    (icons, key) => ({
      ...icons,
      [key.replace("./", "").replace(".svg", "")]: context(key),
    }),
    {} as Record<IconType, string>
  );
};

const iconsContext = importAll(
  require.context("/public/icons", false, /\.svg/)
);

interface IconProps {
  type: IconType;
}

const Icon: React.FC<IconProps> = ({}) => {
  return <div></div>;
};

export default Icon;
