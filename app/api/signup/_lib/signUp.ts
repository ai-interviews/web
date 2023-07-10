import { NextRequest } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { Account, User } from "@prisma/client";
import prisma from "@/app/_lib/server/prismadb";
import { generateApiResponse } from "@/app/api/_lib/generateApiResponse";
import { logErrorMessage } from "@/app/api/_lib/generateErrorMessage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const bodySchema = z.object({
  name: z.string(),
  email: z.string(),
  linkedin: z.string().optional(),
});

export type ApiSignUpBody = z.infer<typeof bodySchema>;

export type ApiSignUpResp = {
  user: User;
  account: Account;
};

export const signUp = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (session?.user) {
      return generateApiResponse({
        status: 500,
        error: "Already signed in.",
      });
    }

    const { name, email, linkedin } = bodySchema.parse(body);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        linkedin,
      },
    });

    const account = await prisma.account.create({
      data: {
        userId: user.id,
        provider: "email",
        type: "email",
        providerAccountId: email,
      },
    });

    return generateApiResponse<ApiSignUpResp>({
      status: 200,
      data: { user, account },
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error creating interview",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};
