import { NextRequest } from "next/server";
import { z } from "zod";
import { logErrorMessage } from "../_lib/generateErrorMessage";
import { generateApiResponse } from "../_lib/generateApiResponse";
import { getServerSession } from "next-auth";
import { Response } from "@prisma/client";
import prisma from "@/app/_lib/server/prismadb";
import { authOptions } from "../auth/[...nextauth]/route";

const bodySchema = z.object({
  interviewId: z.string(),
  question: z.string(),
  response: z.string(),
  timeSeconds: z.number(),
  wordFrequency: z.record(z.number()),
  score: z.number().optional(),
  quietTimeSeconds: z.number(),
});

export type ApiCreateResponseBody = z.infer<typeof bodySchema>;

export type ApiCreateResponseResp = {
  response: Response;
};

const createResponse = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return generateApiResponse({
        status: 401,
        error: "Unauthorized",
      });
    }

    const {
      interviewId,
      question,
      response,
      timeSeconds,
      wordFrequency,
      score,
      quietTimeSeconds,
    } = bodySchema.parse(body);

    const dbResponse = await prisma.response.create({
      data: {
        interviewId,
        question,
        response,
        timeSeconds,
        wordFrequency,
        score,
        quietTimeSeconds,
      },
    });

    return generateApiResponse<ApiCreateResponseResp>({
      status: 200,
      data: {
        response: dbResponse,
      },
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error creating interview",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};

export { createResponse as POST };
