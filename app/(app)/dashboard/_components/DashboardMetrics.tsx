import { Card } from "../../../_components/Card";
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

  const { avgQuietTimeSeconds, avgScore, wordFrequency, slangFrequency } =
    chartMetrics.datasets;

  const { avgQuietTimeSeconds: avgQuietTimeSecondsDelta } =
    chartMetrics.percentDifferences;

  return (
    <div className="flex items-center gap-5 justify-between flex-wrap w-full xl:h-130 2xl:h-96">
      <div className="flex flex-col gap-3 w-full lg:flex-1">
        <MetricCard
          title={wordFrequency.labels.length.toString()}
          subtext="Different filler words detected this month."
        >
          <PieChart
            labels={wordFrequency.labels}
            dataset={wordFrequency.dataset}
            className="w-24 2xl:w-36"
          />
        </MetricCard>
        <MetricCard
          title={slangFrequency.labels.length.toString()}
          subtext="Different slang words detected this month."
        >
          <PieChart
            labels={slangFrequency.labels}
            dataset={slangFrequency.dataset}
            className="w-24 2xl:w-36"
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
            className="w-24 h-24  2xl:h-full 2xl:w-36"
            barThickness={8}
            hideGridLines
          />
        </MetricCard>
      </div>
      <Card className="flex flex-col justify-center h-full w-full lg:w-96 lg:flex-auto">
        <div className="text-2xl pl-4 pb-5 w-full">Performance over time</div>
        <BarChart
          labels={avgScore.labels}
          dataset={avgScore.dataset}
          className="h-5/6 w-full"
        />
      </Card>
    </div>
  );
}
