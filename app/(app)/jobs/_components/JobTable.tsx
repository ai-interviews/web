import React from "react";
import { truncateText } from "../../_lib/client/truncateText";
import { Row, Table } from "../../_components/Table/Table";
import { Job } from "@prisma/client";

type Props = {
  data: Job[];
  rowClickPath?: string;
};

export function JobTable({ data, rowClickPath }: Props) {
  const rows: Row[] = data.map((row) => ({
    id: row.id,
    rowData: [
      // Title
      {
        type: "Text",
        data: {
          text: row.title || "",
        },
      },
      // Company
      {
        type: "Text",
        data: {
          text: row.company || "",
        },
      },
      // Location
      {
        type: "Text",
        data: {
          text: row.location || "",
        },
      },
      // Description
      {
        type: "Text",
        data: {
          text: truncateText({ text: row.description || "", length: 100 }),
        },
      },
    ],
  }));

  return (
    <div>
      <Table
        headers={[
          { label: "Title", hiddenThreshold: "lg" },
          { label: "Company" },
          { label: "Location" },
          { label: "Description", hiddenThreshold: "sm" },
        ]}
        data={rows}
        rowClickPath={rowClickPath}
      />
    </div>
  );
}
