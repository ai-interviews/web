import { Card } from "@/app/_components/Card";
import { BarChart } from "../../_components/Charts/BarChart";
import { MetricCard } from "../../_components/MetricCard";
import { getAggregateMetrics } from "../../_lib/server/getAggregateMetrics";
import { formatChartMetrics } from "../../_lib/client/formatChartMetrics";
import { PieChart } from "../../_components/Charts/PieChart";

export async function DashboardMetrics() {
  const metrics = await getAggregateMetrics({
    startDate: new Date("2023-02-15"),
    endDate: new Date(),
  });

  const chartMetrics = formatChartMetrics({ metrics });

  const { avgQuietTimeSeconds, avgScore, wordFrequency } =
    chartMetrics.datasets;

  const { avgQuietTimeSeconds: avgQuietTimeSecondsDelta } =
    chartMetrics.percentDifferences;

  return (
    <div className="flex items-center gap-5">
      <div className="flex flex-col gap-5 w-1/3">
        <MetricCard
          title="4"
          subtext="Different filler words detected this month."
        >
          <PieChart
            labels={wordFrequency.labels}
            dataset={wordFrequency.dataset}
            className="h-full max-w-36"
          />
        </MetricCard>
        <MetricCard
          title={avgQuietTimeSecondsDelta?.delta || "0%"}
          subtext={`${
            avgQuietTimeSecondsDelta?.isPositive ? "Increase" : "Decrease"
          } in thinking time this month.`}
        >
          <BarChart
            labels={avgQuietTimeSeconds.dataset.data.map(() => "")}
            dataset={avgQuietTimeSeconds.dataset}
            className="xl:h-24 xl:w-24 2xl:h-full 2xl:w-36"
            barThickness={8}
            hideGridLines
          />
        </MetricCard>
      </div>
      <Card className="flex flex-col justify-center xl:h-80 2xl:h-96 w-2/3">
        <div className="text-2xl pl-4 pb-5">Performance over time</div>
        <BarChart
          labels={avgScore.labels}
          dataset={avgScore.dataset}
          className="h-5/6 w-full"
        />
      </Card>
    </div>
  );
}
