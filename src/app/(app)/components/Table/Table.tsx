import { TableCol } from "./TableCol";

type Props = {
  headers: string[];
  data: TableCol[][];
  size?: "xs" | "sm" | "md" | "lg";
};

export function Table({ headers, data, size = "md" }: Props) {
  return (
    <div className="overflow-x-auto">
      <table className={`table table-${size}`}>
        {/* Headers */}
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        {/* Rows */}
        <tbody>
          {data.map((rowData, i) => (
            <tr key={i}>
              {rowData.map((colData, j) => (
                <TableCol key={j} colData={colData} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
