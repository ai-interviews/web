import { InterviewerDropdown } from "./_components/InterviewerDropdown";
import { getInterviewers } from "../_lib/server/getInterviewers";

export default async function InterviewPage() {
  const interviewers = await getInterviewers();

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex items-center h-20">
        <InterviewerDropdown data={interviewers} />
      </div>
      <div className="h-full w-full bg-accent rounded-lg"></div>
    </div>
  );
}
