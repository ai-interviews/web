import { InterviewerDropdown } from "./_components/InterviewerDropdown";
import { getInterviewers } from "../_lib/server/getInterviewers";

export default async function InterviewPage() {
  const interviewers = await getInterviewers();

  return (
    <div className="flex items-center h-full">
      <div>
        <InterviewerDropdown data={interviewers} />
      </div>
    </div>
  );
}
