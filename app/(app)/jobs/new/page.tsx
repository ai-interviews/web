import prisma from "@/app/_lib/server/prismadb";
import { Header } from "../../_components/Header";
import JobForm from "../_components/JobForm";

export default async function JobPage() {
  return (
    <div>
      <Header title="Add job" backLink="/jobs" hasBackButton />
      <div className="disclaimer">
        <h1 className="text-xs font-bold uppercase tracking-wide">
          Disclaimer
        </h1>
        <p className="text-xs">
          You don&apos;t have to satisfy every job requirement to practice or
          apply!
        </p>
      </div>
      <br></br>
      <JobForm />
    </div>
  );
}
