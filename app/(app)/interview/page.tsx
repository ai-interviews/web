import { InterviewerDropdown } from "./_components/InterviewerDropdown";
import { getInterviewers } from "../_lib/server/getInterviewers";
import { JobListingDropdown } from "./_components/JobListingDropdown";
import { InterviewBot } from "./_components/InterviewBot";

export default async function InterviewPage() {
  const interviewers = await getInterviewers();

  return (
    <div className="flex flex-col justify-center h-full">
      <div className="flex items-center h-20">
        <InterviewerDropdown data={interviewers} />
        <JobListingDropdown
          data={["Sanitation Engineer II", "Sr. Sanitation Specialist"]}
        />
      </div>

      <InterviewBot />
    </div>
  );
}
