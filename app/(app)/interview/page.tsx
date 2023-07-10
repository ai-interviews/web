import { getInterviewers } from "../_lib/server/getInterviewers";
import { getInterviews } from "../_lib/server/getInterviews";
import { InterviewLayout } from "./_components/InterviewLayout";
import prisma from "@/app/_lib/server/prismadb";

export default async function InterviewPage() {
  const interviewers = await getInterviewers();
  const interviews = await getInterviews();
  const jobs = await prisma.job.findMany({
    where: {
      userId: "b3f7g9h2j1k4m8p5r7t9v1x3z6a8c5e1",
    },
  });

  return (
    <InterviewLayout
      interviewers={interviewers}
      interviews={interviews}
      jobs={jobs}
    />
  );
}
