import type { FC } from "react";
import { useField } from "remix-validated-form";

export type TextAreaProps = {
  name: string;
  label: string;
};

export const TextArea: FC<TextAreaProps> = ({ name, label }) => {
  const { error, getInputProps } = useField(name);
  return (
    <div className="py-4">
      <label className="mr-2" htmlFor={name}>
        {label}
      </label>
      <textarea
        className="rounded-md border"
        {...getInputProps({ id: name })}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
