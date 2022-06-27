export type SelectOptionProps = {
  children: string;
  icon?: React.ReactNode;
  value?: any;
  selected?: boolean;
  onClick?: ({ label, value }: { label: string; value: any }) => void;
};

export const SelectOption: React.FC<SelectOptionProps> = ({
  children,
  value,
  selected,
  onClick,
}) => {
  return (
    <li
      className="relative cursor-default select-none py-2 px-3 hover:bg-blue-300"
      role="option"
      aria-selected={selected}
      tabIndex={-1}
      onClick={() => onClick && onClick({ label: children, value })}
    >
      {children}
    </li>
  );
};
