import clsx from "clsx";
import React from "react";

interface SkeletonProps {
  className?: string;
}

const Skeleton: React.FC<SkeletonProps> = ({ children, className }) => {
  if (children) return <>{children}</>;

  const classes = clsx(
    "bg-background-tertiary",
    className,
    !className && "w-full h-full"
  );

  return <div className={classes} />;
};

export default Skeleton;
