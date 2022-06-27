import type { FC } from "react";

export type CardFooterProps = {
  children: React.ReactNode | React.ReactNode[];
};

export const CardFooter: FC<CardFooterProps> = ({ children }) => {
  return <div className="mt-3 flex flex-row">{children}</div>;
};
