import { getServerUser } from "@/app/_lib/server/getServerUser";
import prisma from "@/app/_lib/server/prismadb";
import type { Prisma } from "@prisma/client";

export type Response = {
  interviewerName: string;
  interviewerCountry: string;
  interviewerImageUrl: string;
  id: string;
  interviewId: string;
  question: string;
  response: string;
  score: number;
  timeSeconds: number;
  quietTimeSeconds: number;
  wordFrequency: Prisma.JsonValue;
  date: Date;
};

export const getResponses = async (
  {
    page,
    limit,
  }: {
    page: number;
    limit: number;
  } = { page: 0, limit: 10 }
): Promise<Response[]> => {
  try {
    const userId = (await getServerUser()).id;
    const skip = page * limit;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        Interview: {
          include: {
            Response: {
              skip,
              take: 3,
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
