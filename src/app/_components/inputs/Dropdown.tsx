"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

type DropdownPosition =
  | "dropdown-end"
  | "dropdown-top"
  | "dropdown-bottom"
  | "dropdown-left"
  | "dropdown-right";

type Props = {
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  selected?: string;
  title?: string;
  wide?: boolean;
  dropdownPosition?: DropdownPosition;
};

export function Dropdown({
  onChange,
  options,
  title,
  selected,
  wide,
  dropdownPosition = "dropdown-bottom",
}: Props) {
  const [selectedValue, setSelectedValue] = useState(selected);

  const onClickOption = (value: string) => {
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <details className={`dropdown ${dropdownPosition}`}>
      <summary className="btn btn-ghost no-animation flex items-center">
        <span>
          {title ||
            options.find((option) => option.value === selectedValue)?.label}
        </span>
        <ChevronDownIcon className="h-4 w-4" />
      </summary>
      <ul
        className={`p-2 shadow menu dropdown-content bg-neutral rounded-box z-10 ${
          wide ? "w-96" : "w-52"
        } max-h-96 overflow-auto`}
      >
        {options.map(({ label, value }, i) => (
          <li key={i} onClick={() => onClickOption(value)}>
            <a className="text-white">{label}</a>
          </li>
        ))}
      </ul>
    </details>
  );
}
