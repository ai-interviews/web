import { getInterviewers } from "../_lib/server/getInterviewers";
import { getInterviews } from "../_lib/server/getInterviews";
import { InterviewLayout } from "./_components/InterviewLayout";

export default async function InterviewPage() {
  const interviewers = await getInterviewers();
  const interviews = await getInterviews();

  console.log(interviews);

  return (
    <InterviewLayout interviewers={interviewers} interviews={interviews} />
  );
}
