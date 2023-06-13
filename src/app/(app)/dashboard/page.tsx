import { Card } from "@/app/_components/Card";
import { LatestQuestions } from "./_components/LatestQuestions";
import { Suspense } from "react";
import { getServerUser } from "@/app/_lib/server/getServerUser";
import { Header } from "../_components/Header";
import { DashboardMetrics } from "./_components/DashboardMetrics";

export default async function Dashboard() {
  const user = await getServerUser();

  return (
    <div className="flex flex-col gap-4 h-full justify-center w-full">
      <div>
        <Header title={`Welcome back, ${user.name.split(" ")[0]}.`} />
        <Suspense>
          <DashboardMetrics />
        </Suspense>
      </div>
      <Suspense>
        <LatestQuestions />
      </Suspense>
    </div>
  );
}
