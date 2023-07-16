import { NextRequest } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import prisma from "@/app/_lib/server/prismadb";
import { generateApiResponse } from "@/app/api/_lib/generateApiResponse";
import { logErrorMessage } from "@/app/api/_lib/generateErrorMessage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const bodySchema = z.object({
  email: z.string(),
});

export type ApiSignInBody = z.infer<typeof bodySchema>;

export const signIn = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      return generateApiResponse({
        status: 500,
        error: "Already signed in.",
      });
    }

    const { email } = bodySchema.parse(body);

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return generateApiResponse({
        status: 404,
        error: "Email not registered.",
      });
    }

    return generateApiResponse({
      status: 200,
      data: {},
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error signing in.",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};
