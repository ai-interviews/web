import { Table } from "@/app/(app)/_components/Table/Table";
import { formatTime } from "@/app/(app)/_lib/client/formatTime";
import { InterviewWithMetrics } from "@/app/(app)/_lib/server/getInterviews";

type Props = {
  interviews: InterviewWithMetrics[];
};

export function InterviewTable({ interviews }: Props) {
  return (
    <div className="max-h-[70vh] overflow-auto">
      <Table
        headers={[
          { label: "Interviewer" },
          { label: "Length" },
          // { label: "Score" },
          { label: "Date" },
        ]}
        data={interviews.map(
          ({
            id,
            timeSeconds,
            interviewerName,
            interviewerImageUrl,
            interviewerCountry,
            date,
          }) => ({
            id,
            rowData: [
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
              // {
              //   type: "Text",
              //   data: {
              //     text: `${avgScore} / 10`,
              //   },
              // },
              {
                type: "Date",
                data: {
                  date,
                },
              },
            ],
          })
        )}
      />
    </div>
  );
}
