import prisma from "@/app/_lib/server/prismadb";
import { Header } from "../../_components/Header";
import JobForm from "../_components/JobForm";

type Props = {
  params: { jobId: string };
};

export default async function JobPage({ params: { jobId } }: Props) {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  return (
    <div>
      <Header title={job?.title || ""} hasBackButton />
      <JobForm job={job} />
    </div>
  );
}
