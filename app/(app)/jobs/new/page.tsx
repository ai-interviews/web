import prisma from "@/app/_lib/server/prismadb";
import { Header } from "../../_components/Header";
import JobForm from "../_components/JobForm";

export default async function JobPage() {
  return (
    <div>
      <Header title="Add job" backButton backLink="/jobs" />
      <JobForm />
    </div>
  );
}
