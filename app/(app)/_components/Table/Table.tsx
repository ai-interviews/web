"use client";

import { ReactNode } from "react";
import { TableCol } from "./TableCol";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import classNames from "classnames";

type TailwindBreakpoints = "sm" | "md" | "lg" | "xl" | "2xl";

export type Row = { id: string; rowData: TableCol[] };

type Props = {
  headers: {
    label: string;
    hiddenThreshold?: TailwindBreakpoints;
  }[];
  data: Row[];
  size?: "xs" | "sm" | "md" | "lg";
  placeholder?: ReactNode;
  navigateOnRowClick?: boolean;
};

export function Table({
  headers,
  data,
  size = "md",
  placeholder,
  navigateOnRowClick,
}: Props) {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="h-min overflow-x-auto">
      <table className={`table table-${size} h-min`}>
        {/* Headers */}
        <thead>
          <tr>
            {headers.map(({ label, hiddenThreshold }, i) => (
              <th key={i} className={getClassToHideTableCol(hiddenThreshold)}>
                {label}
              </th>
            ))}
          </tr>
        </thead>
        {/* Rows */}
        <tbody>
          {data.length > 0 ? (
            data.map(({ id, rowData }, i) => (
              <tr
                className={classNames("rounded-lg", {
                  "cursor-pointer hover:bg-base-300": navigateOnRowClick,
                })}
                key={i}
                onClick={
                  navigateOnRowClick
                    ? () => router.push(`${pathname}/${id}`)
                    : undefined
                }
              >
                {rowData.map((colData, j) => (
                  <TableCol
                    key={j}
                    colData={colData}
                    className={getClassToHideTableCol(
                      headers[j].hiddenThreshold
                    )}
                  />
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="text-center">
                {placeholder || "No data."}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export const getClassToHideTableCol = (
  hiddenThreshold?: TailwindBreakpoints
) => {
  let hideColClass = "";

  if (hiddenThreshold) {
    hideColClass = "hidden ";
    switch (hiddenThreshold) {
      case "sm":
        hideColClass += "md:table-cell";
        break;
      case "md":
        hideColClass += "lg:table-cell";
        break;
      case "lg":
        hideColClass += "xl:table-cell";
        break;
      case "xl":
        hideColClass += "2xl:table-cell";
        break;
    }
  }

  return hideColClass;
};
