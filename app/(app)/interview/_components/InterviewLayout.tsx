"use client";

import { useState } from "react";
import { InterviewBot } from "./InterviewBot/InterviewBot";
import { InterviewerDropdown } from "./inputs/InterviewerDropdown";
import { JobListingDropdown } from "./inputs/JobListingDropdown";
import { Interviewer, Job, User } from "@prisma/client";
import { InterviewWithMetrics } from "@/app/(app)/_lib/server/getInterviews";

type Props = {
  interviewers: Interviewer[];
  interviews: InterviewWithMetrics[];
  jobs: Job[];
  user: User;
};

export function InterviewLayout({
  interviewers,
  interviews,
  jobs,
  user,
}: Props) {
  const [interviewer, setInterviewer] = useState<Interviewer>(interviewers[0]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center">
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
        user={user}
      />
    </div>
  );
}
