import type { FC } from "react";

export type CardHeaderProps = {
  children: string | React.ReactNode;
};

export const CardHeader: FC<CardHeaderProps> = ({ children }) => {
  return <div className="mb-3">{children}</div>;
};
