import { Response } from "../../_lib/server/getResponses";
import { formatTime } from "../../_lib/client/formatTime";
import { truncateText } from "../../_lib/client/truncateText";
import { Row, Table } from "../Table/Table";
import { TableCol } from "../Table/TableCol";
import { DeleteResponseButton } from "./DeleteResponseButton";

type Props = {
  data: Response[];
};

export function ResponseTable({ data }: Props) {
  const rows: Row[] = data.map((row) => ({
    id: row.id,
    rowData: [
      // Interviewer
      {
        type: "Person",
        hiddenThreshold: "md",
        data: {
          name: row.interviewerName,
          image: row.interviewerImageUrl,
          country: row.interviewerCountry,
        },
      },
      // Question
      {
        type: "Text",
        data: {
          text: truncateText({ text: row.question, length: 100 }),
        },
      },
      // Response
      {
        type: "Text",
        data: {
          text: truncateText({ text: row.response, length: 100 }),
        },
      },
      // Score
      // {
      //   type: "Text",
      //   data: {
      //     text: `${row.score} / 10`,
      //   },
      // },
      // Time
      {
        type: "Text",
        data: {
          text: formatTime({ seconds: row.timeSeconds }),
        },
      },
      // Date
      {
        type: "Date",
        data: {
          date: row.date,
        },
      },
      // Delete
      {
        type: "Custom",
        data: {
          content: <DeleteResponseButton responseId={row.id} />,
        },
      },
    ],
  }));

  return (
    <Table
      headers={[
        { label: "Interviewer", hiddenThreshold: "lg" },
        { label: "Question" },
        { label: "Response" },
        // { label: "Score", hiddenThreshold: "sm" },
        { label: "Time", hiddenThreshold: "md" },
        { label: "Date" },
        { label: "" },
      ]}
      data={rows}
    />
  );
}
