import { Table } from "@/app/(app)/_components/Table/Table";
import { formatTime } from "@/app/(app)/_lib/client/formatTime";
import { InterviewWithMetrics } from "@/app/(app)/_lib/server/getInterviews";

type Props = {
  interviews: InterviewWithMetrics[];
};

export function InterviewTable({ interviews }: Props) {
  return (
    <Table
      headers={[
        { label: "Interviewer" },
        { label: "Length" },
        { label: "Score" },
        { label: "Date" },
      ]}
      data={interviews.map(
        ({
          timeSeconds,
          interviewerName,
          interviewerImageUrl,
          interviewerCountry,
          avgScore,
          date,
        }) => [
          {
            type: "Person",
            data: {
              name: interviewerName,
              country: interviewerCountry,
              image: interviewerImageUrl,
            },
          },
          {
            type: "Text",
            data: {
              text: formatTime({ seconds: timeSeconds }),
            },
          },
          {
            type: "Text",
            data: {
              text: `${avgScore} / 10`,
            },
          },
          {
            type: "Date",
            data: {
              date,
            },
          },
        ]
      )}
    />
  );
}
