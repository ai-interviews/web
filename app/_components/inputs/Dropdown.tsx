"use client";

import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { useMemo, useRef, useState } from "react";
import { Image } from "../Image";
import classNames from "classnames";

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
  disabled?: boolean;
  dropdownPosition?: DropdownPosition;
};

export function Dropdown({
  onChange,
  options,
  title,
  selected,
  wide,
  noOutline,
  disabled,
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
    <details className={classNames("dropdown", dropdownPosition)} ref={ref}>
      <summary
        className={classNames(
          "no-animation btn flex flex-nowrap items-center",
          noOutline ? "btn-ghost" : "btn-outline",
          { "btn-disabled": disabled }
        )}
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
        className={classNames(
          "dropdown-content menu rounded-box z-10 max-h-96 overflow-auto bg-neutral p-2 shadow",
          wide ? "w-96" : "w-52"
        )}
      >
        {options.map(({ label, value, imageUrl }, i) => (
          <li
            className="flex flex-row items-center"
            key={i}
            onClick={() => onClickOption(value)}
          >
            <a className="flex w-full gap-3 text-white">
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
