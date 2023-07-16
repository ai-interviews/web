import { NextRequest } from "next/server";
import { z } from "zod";
import { logErrorMessage } from "../../_lib/generateErrorMessage";
import { generateApiResponse } from "../../_lib/generateApiResponse";
import { authOptions } from "../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Response } from "@prisma/client";
import prisma from "@/app/_lib/server/prismadb";

const bodySchema = z.object({
  interviewId: z.string(),
  question: z.string(),
  response: z.string(),
  timeSeconds: z.number(),
  wordFrequency: z.record(z.number()),
  score: z.number().optional(),
  quietTimeSeconds: z.number(),
  quantifiedMetric: z.number().optional(),
});

export type ApiCreateResponseBody = z.infer<typeof bodySchema>;

export type ApiCreateResponseResp = {
  response: Response;
};

export const createResponse = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return generateApiResponse({
        status: 401,
        error: "Unauthenticated",
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
      quantifiedMetric
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
        quantifiedMetric,
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
