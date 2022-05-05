import { Skeleton } from "@/components/Skeleton";
import React from "react";

export const ContactSkeleton: React.FC = () => {
  return (
    <div>
      <Skeleton variant="title" className="w-1/3" />
      <div className="flex flex-row justify-between">
        <Skeleton className="w-3/4" />
        <div className="skeleton-horizontal-spacer w-1/2" />
        <Skeleton className="w-1/4" />
      </div>
    </div>
  );
};
