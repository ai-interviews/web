import prisma from "@/app/_lib/server/prismadb";
import { Header } from "../../_components/Header";
import JobForm from "../_components/JobForm";
import { QueryParamsToast } from "@/app/_components/QueryParamsToast";

type Props = {
  params: { jobId: string };
  searchParams: { success?: string };
};

export default async function JobPage({
  params: { jobId },
  searchParams,
}: Props) {
  const job = await prisma.job.findUnique({
    where: {
      id: jobId,
    },
  });

  return (
    <div>
      <QueryParamsToast searchParams={searchParams} />
      <Header title={job?.title || ""} />
      <JobForm job={job} />
    </div>
  );
}
