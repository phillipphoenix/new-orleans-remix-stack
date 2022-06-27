import type { FC } from "react";
import { useField } from "remix-validated-form";

export type InputProps = {
  name: string;
  label: string;
  type?: "text";
};

export const Input: FC<InputProps> = ({ name, label, type = "text" }) => {
  const { error, getInputProps } = useField(name);
  return (
    <div className="py-4">
      <label className="mr-2" htmlFor={name}>
        {label}
      </label>
      <input
        className="rounded-md border"
        type={type}
        {...getInputProps({ id: name })}
      />
      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};
