import { getServerUser } from "@/app/_lib/server/getServerUser";
import { getInterviewers } from "../_lib/server/getInterviewers";
import { getInterviews } from "../_lib/server/getInterviews";
import { InterviewLayout } from "./_components/InterviewLayout";
import prisma from "@/app/_lib/server/prismadb";
import { getJobs } from "../_lib/server/getJobs";

export default async function InterviewPage() {
  const interviewers = await getInterviewers();
  const interviews = await getInterviews();
  const jobs = await getJobs();
  const user = await getServerUser();

  return (
    <InterviewLayout
      interviewers={interviewers}
      interviews={interviews}
      jobs={jobs}
      user={user}
    />
  );
}
