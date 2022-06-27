import type { FC } from "react";
import { useMemo } from "react";
import React, { Children } from "react";
import type { CardBodyProps } from "./CardBody";
import type { CardFooterProps } from "./CardFooter";
import type { CardHeaderProps } from "./CardHeader";

export type CardProps = {
  children:
    | React.ReactElement<CardBodyProps>
    | (
        | React.ReactElement<CardHeaderProps>
        | React.ReactElement<CardBodyProps>
        | React.ReactElement<CardFooterProps>
      )[];
  className?: string;
};

export const Card: FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={`flex flex-col rounded-lg bg-white px-8 py-4 text-slate-900 shadow-md dark:bg-gray-800 dark:text-slate-50 ${className}`}
    >
      {Children.toArray(children)}
    </div>
  );
};
