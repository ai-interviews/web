import { Suspense } from "react";
import { getServerUser } from "../../_lib/server/getServerUser";
import { Header } from "../_components/Header";
import { DashboardMetrics } from "./_components/DashboardMetrics";
import { Spinner } from "@/app/_components/Spinner";
import { getResponses } from "../_lib/server/getResponses";
import { Card } from "@/app/_components/Card";
import { ResponseTable } from "../_components/ResponseTable/ResponseTable";

export default async function Dashboard() {
  const user = await getServerUser();
  const responses = await getResponses();

  return (
    <div className="h-min">
      <div className="mb-4 2xl:mb-8">
        <Header title={`Welcome back, ${user.name.split(" ")[0]}.`} />
        <DashboardMetrics responses={responses} />
      </div>
      <Card className="h-min">
        <div className="pb-2.5 pl-4 text-2xl">Activity</div>
        <ResponseTable data={responses} />
      </Card>
    </div>
  );
}
