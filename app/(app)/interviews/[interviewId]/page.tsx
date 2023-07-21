import { Card } from "@/app/_components/Card";
import { getInterview } from "@/app/(app)/_lib/server/getInterview";
import { InterviewChat } from "@/app/(app)/interview/_components/InterviewBot/InterviewChat";
import { getResponses } from "@/app/(app)/_lib/server/getResponses";
import { DashboardMetrics } from "@/app/(app)/dashboard/_components/DashboardMetrics";
import { Header } from "@/app/(app)/_components/Header";

type Props = {
  params: { interviewId: string };
};

export default async function PastInterview({
  params: { interviewId },
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
    <div className="space-y-4">
      <Header title="Interview report" />
      <DashboardMetrics responses={responses} />
      <div className="flex h-[34rem] gap-5">
        <Card className="h-full w-1/2 space-y-2">
          <div className="text-2xl">Feedback</div>
          <div className="overflow-y-auto">{interview.feedback}</div>
        </Card>
        <Card className="h-full w-1/2 space-y-2 overflow-hidden px-4 ">
          <div className="text-2xl">Responses</div>
          <InterviewChat
            messages={messages}
            interviewerImageUrl={interview.interviewer.imageUrl}
          />
        </Card>
      </div>
    </div>
  );
}
