import { getServerUser } from "../../../_lib/server/getServerUser";
import prisma from "../../../_lib/server/prismadb";
import type { Job, Prisma } from "@prisma/client";

export const getJobs = async (
  {
    page,
    limit,
  }: {
    page: number;
    limit: number;
  } = { page: 0, limit: 50 }
): Promise<Job[]> => {
  try {
    const user = await getServerUser();
    const skip = page * limit;

    const jobs = await prisma.job.findMany({
      where: { userId: user.id },
      skip,
      take: limit,
    });

    return jobs;
  } catch (e) {
    console.error("Failed to get user responses", e);
    return [];
  }
};
