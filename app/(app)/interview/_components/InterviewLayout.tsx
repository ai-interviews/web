"use client";

import { useState } from "react";
import { InterviewBot } from "./InterviewBot/InterviewBot";
import { InterviewerDropdown } from "./inputs/InterviewerDropdown";
import { JobListingDropdown } from "./inputs/JobListingDropdown";
import { Interviewer, Job } from "@prisma/client";
import { InterviewWithMetrics } from "@/app/(app)/_lib/server/getInterviews";

type Props = {
  interviewers: Interviewer[];
  interviews: InterviewWithMetrics[];
  jobs: Job[];
};

export function InterviewLayout({ interviewers, interviews, jobs }: Props) {
  const [interviewer, setInterviewer] = useState<Interviewer>(interviewers[0]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center h-20">
        <InterviewerDropdown
          data={interviewers}
          onChange={setInterviewer}
          value={interviewer}
        />
        <JobListingDropdown jobs={jobs} />
      </div>

      <InterviewBot
        interviewer={interviewer}
        interviews={interviews}
        interviewers={interviewers}
      />
    </div>
  );
}
