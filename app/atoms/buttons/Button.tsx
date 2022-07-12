import type { FC, ReactNode } from "react";
import { useMemo } from "react";
import { useClassnames } from "~/hooks/useVariant";

type ButtonColourSchemes = "primary" | "secondary" | "danger" | "success";

const buttonColourSchemes: Record<ButtonColourSchemes, string> = {
  primary: "bg-blue-500 hover:bg-blue-700 text-white focus:ring-blue-300",
  secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700 focus:ring-gray-300",
  danger: "bg-red-500 hover:bg-red-700 text-white focus:ring-red-300",
  success: "bg-green-500 hover:bg-green-700 text-white focus:ring-green-300",
};

export type ButtonProps = {
  children: string | ReactNode;
  colourScheme?: ButtonColourSchemes;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = ({
  children,
  colourScheme = "primary",
  className,
  ...restBtnProps
}) => {
  const colourSchemeClassnames = useClassnames(
    colourScheme,
    buttonColourSchemes
  );

  const fullClassnames = useMemo(
    () => colourSchemeClassnames + " " + className,
    [colourSchemeClassnames, className]
  );

  return (
    <button
      {...restBtnProps}
      className={`transform cursor-pointer rounded-md px-4 py-2 font-medium capitalize tracking-wide transition-colors duration-200 focus:outline-none focus:ring focus:ring-opacity-80 ${fullClassnames}`}
    >
      {children}
    </button>
  );
};
