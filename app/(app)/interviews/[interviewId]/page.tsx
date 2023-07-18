import { Card } from "@/app/_components/Card";
import { getInterview } from "../../_lib/server/getInterview";
import { InterviewChat } from "../../interview/_components/InterviewBot/InterviewChat";
import { getResponses } from "../../_lib/server/getResponses";

type Props = {
  searchParams: { interviewId: string };
};

export default async function PastInterview({
  searchParams: { interviewId },
}: Props) {
  const interview = await getInterview(interviewId);
  const responses = await getResponses({ interviewId });
  const messages: string[] = [];

  if (!interview) return <>Interview not found.</>;

  for (const { question, response } of responses) {
    messages.push(question);
    messages.push(response);
  }

  return (
    <div className="flex h-full gap-5">
      <Card className="w-1/2 space-y-2">
        <div className="text-2xl">Feedback</div>
        <div>{interview.feedback}</div>
      </Card>
      <Card className="h-1/2 w-1/2 space-y-10 overflow-hidden px-4 ">
        <div className="text-2xl">Responses</div>

        <InterviewChat
          messages={[
            "dasddsasdsasa",
            "dasddsasdsasa",
            "dasddsasdsasa",
            "dasddsasdsasa",
            "dasddsasdsasa",
            "dasddsasdsasa",
          ]}
          interviewerImageUrl={interview.interviewer.imageUrl}
        />
      </Card>
    </div>
  );
}
