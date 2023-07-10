"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useMemo, useRef, useState } from "react";
import { Image } from "../Image";
import { Avatar } from "../../(app)/_components/Avatar";

type DropdownPosition =
  | "dropdown-end"
  | "dropdown-top"
  | "dropdown-bottom"
  | "dropdown-left"
  | "dropdown-right";

type Props = {
  onChange: (value: string) => void;
  options: { label: string; value: string; imageUrl?: string }[];
  selected?: string;
  title?: string;
  wide?: boolean;
  noOutline?: boolean;
  dropdownPosition?: DropdownPosition;
};

export function Dropdown({
  onChange,
  options,
  title,
  selected,
  wide,
  noOutline,
  dropdownPosition = "dropdown-bottom",
}: Props) {
  const [selectedValue, setSelectedValue] = useState(selected);
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [selectedValue, options]
  );
  const ref = useRef<HTMLDetailsElement>(null);

  const onClickOption = (value: string) => {
    setSelectedValue(value);
    onChange(value);
    ref.current?.removeAttribute("open");
  };

  return (
    <details className={`dropdown ${dropdownPosition}`} ref={ref}>
      <summary
        className={`btn ${
          noOutline ? "btn-ghost" : "btn-outline"
        } no-animation flex flex-nowrap items-center`}
      >
        <span className="flex flex-row items-center gap-3 whitespace-nowrap">
          {selectedOption?.imageUrl && (
            <Image
              src={selectedOption.imageUrl}
              size={32}
              className="rounded-full"
              alt="dropdown item"
            />
          )}
          {selectedOption?.label || title}
        </span>
        <ChevronDownIcon className="h-4 w-4" />
      </summary>
      <ul
        className={`p-2 shadow menu dropdown-content bg-neutral rounded-box z-10 ${
          wide ? "w-96" : "w-52"
        } max-h-96 overflow-auto`}
      >
        {options.map(({ label, value, imageUrl }, i) => (
          <li
            className="flex flex-row items-center"
            key={i}
            onClick={() => onClickOption(value)}
          >
            <a className="text-white w-full flex gap-3">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  size={32}
                  className="rounded-full"
                  alt="dropdown item"
                />
              )}
              {label}
            </a>
          </li>
        ))}
      </ul>
    </details>
  );
}
