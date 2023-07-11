import { NextRequest } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { Interview } from "@prisma/client";
import prisma from "@/app/_lib/server/prismadb";
import { generateApiResponse } from "@/app/api/_lib/generateApiResponse";
import { logErrorMessage } from "@/app/api/_lib/generateErrorMessage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const bodySchema = z.object({
  interviewerName: z.string(),
});

export type ApiCreateInterviewBody = z.infer<typeof bodySchema>;

export type ApiCreateInterviewResp = {
  interview: Interview;
};

export const createInterview = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return generateApiResponse({
        status: 401,
        error: "Unauthenticated",
      });
    }

    const { interviewerName } = bodySchema.parse(body);

    const interview = await prisma.interview.create({
      data: {
        userId: session.user.id,
        interviewerName,
      },
    });

    return generateApiResponse<ApiCreateInterviewResp>({
      status: 200,
      data: { interview },
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error creating interview",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};
