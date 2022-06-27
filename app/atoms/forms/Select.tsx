import type { FC } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import React from "react";
import { Children } from "react";
import { useState } from "react";
import type { SelectOptionProps } from "./SelectOption";
import { useOutsideClick } from "~/hooks/useOutsideClick";

export type SelectProps = {
  children:
    | React.ReactElement<SelectOptionProps>
    | React.ReactElement<SelectOptionProps>[];
  onChange?: (value: any) => void;
  placeholder?: string;
  initialValue?: any;
};

export const Select: FC<SelectProps> = ({
  children,
  onChange,
  placeholder,
  initialValue,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<
    { label: string; value: any } | undefined
  >();

  const selectRef = useRef(null);
  useOutsideClick(selectRef, () => setIsOpen(false));

  useEffect(() => {
    const options = Children.toArray(children);
    const getInitialSelected = (options: any[], initialValue: any) => {
      // If an initial value was given, find the option with that value and return.
      if (initialValue) {
        return options.find(
          (option: any) => option.props.value == initialValue
        );
      }
      // Else check if any option was marked as selected initially and return that.
      return options.find((opt) => (opt as any).props.selected);
    };

    const selectedOption = getInitialSelected(options, initialValue);
    if (selectedOption) {
      setSelected({
        label: (selectedOption as any).props.children,
        value: (selectedOption as any).props.value,
      });
    }
    // The dependency array is empty, because it should only ever run once upon mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onOptionSelected = ({
    label,
    value,
  }: {
    label: string;
    value: any;
  }) => {
    setIsOpen(false);
    setSelected({ label, value });
    onChange?.(value);
  };

  return (
    <div className="relative" ref={selectRef}>
      <button
        type="button"
        className="w-full cursor-default rounded-md border border-gray-300 bg-white py-2 pl-3 pr-10 text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selected && <span className="block truncate">{selected?.label}</span>}
        {!selected && (
          <span className="block truncate text-gray-400">
            {placeholder ?? "Select an option"}
          </span>
        )}
        <span className="position-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
          <svg
            className="h-5 w-5 text-gray-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </span>
      </button>
      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white shadow-lg">
          <div>
            <ul className="max-h-56 overflow-auto rounded-md py-1 ring-1 ring-black ring-opacity-5 focus:outline-none">
              {Children.map(children, (child) => {
                if (React.isValidElement(child)) {
                  return React.cloneElement(child, {
                    onClick: onOptionSelected,
                  });
                }
                return child;
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};
