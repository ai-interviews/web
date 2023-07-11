import { NextRequest } from "next/server";
import { z } from "zod";
import { logErrorMessage } from "../../../_lib/generateErrorMessage";
import { generateApiResponse } from "../../../_lib/generateApiResponse";
import { authOptions } from "../../../auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import prisma from "@/app/_lib/server/prismadb";

export const deleteResponse = async (
  _: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return generateApiResponse({
        status: 401,
        error: "Unauthenticated.",
      });
    }

    const response = await prisma.response.findUnique({
      where: {
        id,
      },
      include: {
        interview: true,
      },
    });

    if (!response || response.interview.userId !== session.user.id) {
      return generateApiResponse({
        status: 404,
        error: "Not found.",
      });
    }

    await prisma.response.delete({
      where: {
        id,
      },
    });

    return generateApiResponse<{}>({
      status: 200,
      data: {},
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error creating interview",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};
