import { NextRequest, NextResponse } from 'next/server';
import prisma from "@/app/_lib/server/prismadb";

export const GET = async (req: NextRequest) => {
  const jobs = await prisma.job.findMany();

  return NextResponse.json(jobs);
}
