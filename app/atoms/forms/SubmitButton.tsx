import type { FC } from "react";
import { useIsSubmitting } from "remix-validated-form";
import { Button } from "../buttons/Button";

export type SubmitButtonProps = {
  label: string;
  whileSubmittingLabel?: string;
};

export const SubmitButton: FC<SubmitButtonProps> = ({
  label,
  whileSubmittingLabel,
}) => {
  const isSubmitting = useIsSubmitting();
  return (
    <Button type="submit" disabled={isSubmitting}>
      {whileSubmittingLabel && isSubmitting ? whileSubmittingLabel : label}
    </Button>
  );
};
