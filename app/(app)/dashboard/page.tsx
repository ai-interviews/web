import { Card } from "../../_components/Card";
import { LatestQuestions } from "./_components/LatestQuestions";
import { Suspense } from "react";
import { getServerUser } from "../../_lib/server/getServerUser";
import { Header } from "../_components/Header";
import { DashboardMetrics } from "./_components/DashboardMetrics";
import { Spinner } from "@/app/_components/Spinner";

export default async function Dashboard() {
  const user = await getServerUser();

  return (
    <div className="h-min">
      <div className="mb-4 2xl:mb-8">
        <Header title={`Welcome back, ${user.name.split(" ")[0]}.`} />
        <Suspense>
          <DashboardMetrics />
        </Suspense>
      </div>
      <Suspense fallback={<Spinner />}>
        <div>
          <LatestQuestions />
        </div>
      </Suspense>
    </div>
  );
}
