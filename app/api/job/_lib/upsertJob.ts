import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/app/_lib/server/prismadb";
import { logErrorMessage } from "@/app/api/_lib/generateErrorMessage";
import { generateApiResponse } from "@/app/api/_lib/generateApiResponse";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { Job } from "@prisma/client";

const bodySchema = z.object({
  id: z.string().optional(),
  title: z.string(),
  company: z.string(),
  description: z.string(),
  location: z.string().optional(),
  url: z.string().optional(),
});

export type ApiUpsertJobBody = z.infer<typeof bodySchema>;

export type ApiUpsertJobResp = {
  job: Job;
};

export const upsertJob = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return generateApiResponse({
        status: 401,
        data: {
          error: "Unauthorized.",
        },
      });
    }

    const data = bodySchema.parse(body);

    const job = await prisma.job.upsert({
      where: {
        id: data.id || "",
      },
      update: {
        ...data,
      },
      create: {
        userId: session.user.id,
        ...data,
      },
    });

    return generateApiResponse<ApiUpsertJobResp>({
      status: 200,
      data: { job },
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error creating interview",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};
