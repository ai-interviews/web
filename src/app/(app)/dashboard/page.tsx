import { Card } from "@/app/components/Card";
import { LatestQuestions } from "./components/LatestQuestions";
import { BarChart } from "../components/Charts/BarChart";
import { MetricCard } from "../components/MetricCard";
import { Suspense } from "react";
import { getServerUser } from "@/app/lib/server/getServerUser";
import { Header } from "../components/Header";

export default async function Dashboard() {
  const user = await getServerUser();

  return (
    <div className="flex flex-col gap-6 h-full justify-center">
      <Header title={`Welcome back, ${user.name.split(" ")[0]}.`} />
      <div className="flex items-center gap-5">
        <div className="flex flex-col gap-5 w-1/3">
          <MetricCard
            title="0%"
            subtext="Decrease in the use of filler words this month"
          />
          <MetricCard
            title="0%"
            subtext="Decrease in thinking time this month."
          />
        </div>
        <Card className="flex flex-col justify-center h-full w-2/3">
          <div className="text-2xl pl-4 pb-5">Performance over time</div>
          <BarChart
            labels={["June"]}
            dataset={{ label: "Score", data: [6.5] }}
            className="h-full w-full"
          />
        </Card>
      </div>
      <Suspense>
        <LatestQuestions />
      </Suspense>
    </div>
  );
}
