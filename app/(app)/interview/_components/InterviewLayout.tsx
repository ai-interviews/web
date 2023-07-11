"use client";

import { useCallback, useState } from "react";
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
  const [job, setJob] = useState<Job>();
  const [disabledDropdowns, setIsDisabledDropdowns] = useState<boolean>(false);

  const onInterviewStart = useCallback(() => {
    setIsDisabledDropdowns(true);
  }, []);

  const onInterviewEnd = () => {
    setIsDisabledDropdowns(false);
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex h-20 items-center">
        <InterviewerDropdown
          data={interviewers}
          value={interviewer}
          onChange={setInterviewer}
          disabled={disabledDropdowns}
        />
        <JobListingDropdown
          data={jobs}
          value={job}
          onChange={setJob}
          disabled={disabledDropdowns}
        />
      </div>

      <InterviewBot
        interviewer={interviewer}
        interviews={interviews}
        interviewers={interviewers}
        user={user}
        job={job}
        onInterviewStart={onInterviewStart}
        onInterviewEnd={onInterviewEnd}
      />
    </div>
  );
}
