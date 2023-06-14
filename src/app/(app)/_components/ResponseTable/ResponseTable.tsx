import { Response } from "../../_lib/server/getResponses";
import { formatTime } from "../../_lib/client/formatTime";
import { truncateText } from "../../_lib/client/truncateText";
import { Table } from "../Table/Table";
import { TableCol } from "../Table/TableCol";

type Props = {
  data: Response[];
};

export function ResponseTable({ data }: Props) {
  const rows: TableCol[][] = data.map((row) => [
    // Interviewer
    {
      type: "Person",
      hiddenThreshold: "md",
      data: {
        name: row.interviewerName,
        image: row.interviewerImageUrl,
        subtext: row.interviewerCountry,
      },
    },
    // Question
    {
      type: "Text",
      data: {
        text: row.question,
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
    {
      type: "Text",
      data: {
        text: `${row.score} / 10`,
      },
    },
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
  ]);

  return (
    <Table
      headers={[
        { label: "Interviewer", hiddenThreshold: "lg" },
        { label: "Question" },
        { label: "Response" },
        { label: "Score", hiddenThreshold: "sm" },
        { label: "Time", hiddenThreshold: "md" },
        { label: "Date" },
      ]}
      data={rows}
    />
  );
}
