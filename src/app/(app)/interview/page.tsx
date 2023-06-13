import { InterviewerDropdown } from "./_components/Dropdown";
import { getInterviewers } from "../_lib/server/getInterviewers";

export default async function InterviewPage() {
  const interviewers = await getInterviewers();

  return (
    <div className="flex items-center h-full">
      <div className="">
        <InterviewerDropdown data={interviewers} />
      </div>
    </div>
  );
}
