import type { FC } from "react";

export type CardBodyProps = {
  children?: React.ReactNode;
};

export const CardBody: FC<CardBodyProps> = ({ children }) => {
  return <div className="flex-1">{children}</div>;
};
