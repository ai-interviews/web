import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from "@/app/_lib/server/prismadb";

const bodySchema = z.object({
  userId: z.string(),
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  description: z.string(),
  url: z.string().optional(),
});

const handlePostJob = async (req: NextRequest) => {
  const body = await req.json();

  try {
    const jobData = bodySchema.parse(body);
    const newJob = await prisma.job.create({ data: jobData });
    return NextResponse.json(newJob);
  } catch (error) {
    if (error instanceof z.ZodError) {
      for (const subError of error.errors) {
        console.error(`Error in field ${subError.path.join('.')}: ${subError.message}`);
      }
    } else {
      console.error(error);
    }
    return new Response("Error processing request", { status: 400 });
  }
};

export { handlePostJob as POST };