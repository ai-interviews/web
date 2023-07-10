import { NextRequest } from "next/server";
import { z } from "zod";
import { getServerSession } from "next-auth";
import { User } from "@prisma/client";
import prisma from "@/app/_lib/server/prismadb";
import { generateApiResponse } from "@/app/api/_lib/generateApiResponse";
import { logErrorMessage } from "@/app/api/_lib/generateErrorMessage";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

const bodySchema = z.object({
  name: z.string().optional(),
  country: z.string().optional(),
  linkedin: z.string().optional(),
  imageUrl: z.string().optional(),
});

export type ApiUpdateUserBody = z.infer<typeof bodySchema>;

export type ApiUpdateUserResp = {
  user: User;
};

export const updateUser = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return generateApiResponse({
        status: 401,
        error: "Unauthorized",
      });
    }

    const { name, country, linkedin, imageUrl } = bodySchema.parse(body);

    const user = await prisma.user.update({
      where: {
        id: session.user.id,
      },
      data: {
        name,
        country,
        linkedin,
        image: imageUrl,
      },
    });

    return generateApiResponse<ApiUpdateUserResp>({
      status: 200,
      data: { user },
    });
  } catch (error) {
    const errorMessage = logErrorMessage({
      message: "Error creating interview",
      error,
    });

    return generateApiResponse({ status: 500, error: errorMessage });
  }
};
