import { Job } from "../../_lib/server/getJobs";
import { truncateText } from "../../_lib/client/truncateText";
import { Table } from "../../_components/Table/Table";
import { TableCol } from "../../_components/Table/TableCol";

type Props = {
  data: Job[];
};

export function JobTable({ data }: Props) {
    const rows: TableCol[][] = data.map((row) => [
        // Title
        {
          type: "Text",
          data: {
            text: row.title || '',
          },
        },
        // Company
        {
          type: "Text",
          data: {
            text: row.company || '',
          },
        },
        // Location
        {
          type: "Text",
          data: {
            text: row.location || '',
          },
        },
        // Description
        {
            type: "Text",
            data: {
              text: truncateText({ text: row.description || '', length: 100 }),
            },
          },
      ]);
     
  return (
    <Table
      headers={[
        { label: "Title", hiddenThreshold: "lg" },
        { label: "Company" },
        { label: "Location" },
        { label: "Description", hiddenThreshold: "sm" },
      ]}
      data={rows}
    />
  );
}
