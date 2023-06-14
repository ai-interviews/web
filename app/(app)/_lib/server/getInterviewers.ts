import prisma from "../../../_lib/server/prismadb";

export const getInterviewers = async () => {
  const data = await prisma.interviewer.findMany();

  return data;
};
