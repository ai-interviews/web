import { getServerUser } from "@/app/_lib/server/getServerUser";
import { Prisma } from "prisma/prisma-client";
import prisma from "@/app/_lib/server/prismadb";

export type InterviewWithMetrics = {
  id: string;
  userId: string;
  timeSeconds: number;
  date: Date;
  interviewerName: string;
  interviewerCountry: string;
  interviewerImageUrl: string;
  interviewerBio: string;
  avgScore: number;
  avgTimeSeconds: number;
  avgQuietTimeSeconds: number;
};

export const getInterviews = async (): Promise<InterviewWithMetrics[]> => {
  try {
    const user = await getServerUser();

    const sql = Prisma.sql`
      SELECT 
        i."id",
        i."userId",
        i."timeSeconds",
        i."date",
        p."name" as "interviewerName",
        p."country" as "interviewerCountry",
        p."imageUrl" as "interviewerImageUrl",
        p."bio" as "interviewerBio",
        AVG(r."score") as "avgScore",
        AVG(r."timeSeconds") as "avgTimeSeconds",
        AVG(r."quietTimeSeconds") as "avgQuietTimeSeconds"
      FROM "Interview" i
      LEFT JOIN "Response" r ON r."interviewId" = i."id"
      LEFT JOIN "Interviewer" p ON p."name" = i."interviewerName" 
      WHERE i."userId" = ${user.id}
      GROUP BY i."id", p."name"
    `;

    const interviews: InterviewWithMetrics[] = await prisma.$queryRaw(sql);

    return interviews;
  } catch (e) {
    console.error("Failed to fetch interviews:", e);
    return [];
  }
};
