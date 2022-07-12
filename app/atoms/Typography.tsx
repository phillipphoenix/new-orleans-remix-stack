import type { FC } from "react";
import { useMemo } from "react";
import { useClassnames } from "~/hooks/useVariant";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "lead"
  | "paragraph";

const variantClassnames: Record<TypographyVariant, string> = {
  h1: "text-5xl leading-normal font-semibold font-serif mb-4",
  h2: "text-4xl leading-normal font-semibold font-serif mb-4",
  h3: "text-2xl  leading-normal font-semibold font-serif mb-3",
  h4: "text-lg  leading-normal font-semibold font-sans mb-2",
  h5: "text-md  leading-normal font-semibold font-sans mb-1",
  h6: "text-sm  leading-normal font-semibold font-sans mb-1",
  lead: "text-base font-semibold font-sans",
  paragraph: "text-base font-sans",
};

export type TypographyProps = {
  children?: string | React.ReactFragment;
  variant?: TypographyVariant;
  className?: string;
};

export const Typography: FC<TypographyProps> = ({
  variant = "paragraph",
  className,
  children,
}) => {
  const classnames = useClassnames(variant, variantClassnames);
  const fullClassnames = useMemo(
    () => classnames + " " + className,
    [classnames, className]
  );

  switch (variant) {
    case "h1":
      return <h1 className={fullClassnames}>{children}</h1>;
    case "h2":
      return <h2 className={fullClassnames}>{children}</h2>;
    case "h3":
      return <h3 className={fullClassnames}>{children}</h3>;
    case "h4":
      return <h4 className={fullClassnames}>{children}</h4>;
    case "h5":
      return <h5 className={fullClassnames}>{children}</h5>;
    case "h6":
      return <h6 className={fullClassnames}>{children}</h6>;
    case "lead":
    case "paragraph":
    default:
      return <p className={fullClassnames}>{children}</p>;
  }
};
