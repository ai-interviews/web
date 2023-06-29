"use client";
import { TableCol } from "./TableCol";

type TailwindBreakpoints = "sm" | "md" | "lg" | "xl" | "2xl";

type Props = {
  headers: {
    label: string;
    hiddenThreshold?: TailwindBreakpoints;
  }[];
  data: TableCol[][];
  size?: "xs" | "sm" | "md" | "lg";
  onRowClick?: (index: number, rowData: TableCol[]) => void;
};

export function Table({ headers, data, size = "md", onRowClick }: Props) {
  return (
    <div className="overflow-x-auto h-min">
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
          {data.map((rowData, i) => (
            <tr key={i} onClick={() => onRowClick && onRowClick(i, rowData)}>
              {rowData.map((colData, j) => (
                <TableCol
                  key={j}
                  colData={colData}
                  className={getClassToHideTableCol(headers[j].hiddenThreshold)}
                />
              ))}
            </tr>
          ))}
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
