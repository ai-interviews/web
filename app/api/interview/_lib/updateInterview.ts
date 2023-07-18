import { NextRequest } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { Interview } from "@prisma/client";
import prisma from "@/app/_lib/server/prismadb";
import { generateApiResponse } from "@/app/api/_lib/generateApiResponse";
import { logErrorMessage } from "@/app/api/_lib/generateErrorMessage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const bodySchema = z.object({
  id: z.string(),
  data: z.object({
    interviewerName: z.string().optional(),
    feedback: z.string().optional(),
    timeSeconds: z.number().min(1).optional(),
  }),
});

export type ApiUpdateInterviewBody = z.infer<typeof bodySchema>;

export type ApiUpdateInterviewResp = {
  interview: Interview;
};

export const updateInterview = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return generateApiResponse({
        status: 401,
        error: "Unauthenticated",
      });
    }

    const { id, data } = bodySchema.parse(body);

    const interview = await prisma.interview.findUnique({
      where: {
        id,
      },
    });

    if (!interview || interview.userId !== session.user.id) {
      return generateApiResponse({
        status: 404,
        error: "Not found.",
      });
    }

    const updatedInterview = await prisma.interview.update({
      where: {
        id,
      },
      data,
    });

    return generateApiResponse<ApiUpdateInterviewResp>({
      status: 200,
      data: { interview: updatedInterview },
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error creating interview",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};
