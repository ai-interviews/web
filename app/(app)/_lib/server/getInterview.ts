import { getServerUser } from "@/app/_lib/server/getServerUser";
import { Interview, Prisma } from "@prisma/client";
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

export const getInterview = async (interviewId: string) => {
  try {
    if (!interviewId) {
      return undefined;
    }

    const user = await getServerUser();

    const interview = await prisma.interview.findFirst({
      where: {
        userId: user.id,
        id: interviewId,
      },
      include: {
        interviewer: true,
      },
    });

    return interview;
  } catch (e) {
    console.error("Failed to fetch interviews:", e);
    return null;
  }
};
