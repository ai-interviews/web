import { Card } from "@/app/_components/Card";
import { BarChart } from "../../_components/Charts/BarChart";
import { MetricCard } from "../../_components/MetricCard";
import { getAggregateMetrics } from "../../_lib/db/getAggregateMetrics";
import { formatBarChartMetrics } from "../../_lib/formatBarChartMetrics";

export async function DashboardMetrics() {
  const metrics = await getAggregateMetrics({
    startDate: new Date("2023-02-15"),
    endDate: new Date(),
  });

  const barChartMetrics = formatBarChartMetrics({ metrics });

  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col gap-5 w-1/3">
        <MetricCard
          title="0%"
          subtext="Decrease in the use of filler words this month"
        >
          <BarChart
            labels={[""]}
            dataset={{ label: "Score", data: [6.5] }}
            className="h-full w-48"
            barThickness={8}
            hideYAxis
          />
        </MetricCard>
        <MetricCard title="0%" subtext="Decrease in thinking time this month.">
          <BarChart
            labels={[""]}
            dataset={{ label: "Score", data: [6.5] }}
            className="h-full w-48"
            barThickness={8}
            hideYAxis
          />
        </MetricCard>
      </div>
      <Card className="flex flex-col justify-center h-full w-2/3">
        <div className="text-2xl pl-4 pb-5">Performance over time</div>
        <BarChart
          labels={barChartMetrics.labels}
          dataset={barChartMetrics.datasets.avgScore}
          className="h-full w-full"
        />
      </Card>
    </div>
  );
}
