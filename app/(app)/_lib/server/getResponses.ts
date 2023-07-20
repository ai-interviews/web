import { getServerUser } from "../../../_lib/server/getServerUser";
import prisma from "../../../_lib/server/prismadb";
import type { Prisma } from "@prisma/client";

export type Response = {
  interviewerName: string;
  interviewerCountry: string;
  interviewerImageUrl: string;
  id: string;
  interviewId: string;
  question: string;
  response: string;
  score: number | null;
  timeSeconds: number;
  quietTimeSeconds: number;
  quantifiedMetric: number | null;
  wordFrequency: Prisma.JsonValue;
  date: Date;
};

export const getResponses = async ({
  interviewId,
}: {
  interviewId?: string;
} = {}): Promise<Response[]> => {
  try {
    const userId = (await getServerUser()).id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Interview: {
          where: {
            ...(interviewId ? { id: interviewId } : {}),
          },
          include: {
            Response: {
              include: {
                interview: {
                  include: {
                    interviewer: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    if (!user || !user.Interview) {
      throw new Error("User or Interviews not found");
    }

    const responses = user.Interview.flatMap((interview) => interview.Response);

    return responses.map((row) => ({
      ...row,
      timeSeconds: row.timeSeconds.toNumber(),
      quietTimeSeconds: row.quietTimeSeconds.toNumber(),
      quantifiedMetric: row.quantifiedMetric ? row.quantifiedMetric : 0,
      interviewerName: row.interview.interviewer.name,
      interviewerCountry: row.interview.interviewer.country,
      interviewerImageUrl: row.interview.interviewer.imageUrl,
      date: row.interview.date,
    }));
  } catch (e) {
    console.error("Failed to get user responses", e);
    return [];
  }
};
