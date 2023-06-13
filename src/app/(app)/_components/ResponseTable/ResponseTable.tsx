import { Response } from "../../_lib/db/getResponses";
import { formatTime } from "../../_lib/formatTime";
import { truncateText } from "../../_lib/truncateText";
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
      headers={["Interviewer", "Question", "Response", "Score", "Time", "Date"]}
      data={rows}
    />
  );
}
