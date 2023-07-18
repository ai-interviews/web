import { Card } from "../../../_components/Card";
import { BarChart } from "../../_components/Charts/BarChart";
import { MetricCard } from "../../_components/MetricCard";
import { getAggregateMetrics } from "../../_lib/server/getAggregateMetrics";
import { formatChartMetrics } from "../../_lib/client/formatChartMetrics";
import { PieChart } from "../../_components/Charts/PieChart";
import { getResponses } from "../../_lib/server/getResponses";

export async function DashboardMetrics() {
  const metrics = await getAggregateMetrics({
    startDate: new Date("2023-02-15"),
    endDate: new Date(),
  });

  const responses = await getResponses();

  const chartMetrics = formatChartMetrics({ metrics, responses });

  const { wordFrequency, slangFrequency } = chartMetrics.aggregateDatasets;

  const { timeSeconds, quietTimeSeconds } = chartMetrics.responseDatasets;

  const avgQuietTimeSeconds = (
    quietTimeSeconds.dataset.data.reduce((acc, val) => acc + val, 0) /
      quietTimeSeconds.dataset.data.length || 0
  ).toFixed(2);

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-5">
      <div className="flex w-full flex-col gap-3 lg:flex-1">
        <MetricCard
          title={
            <>{avgQuietTimeSeconds === "0.00" ? 0 : avgQuietTimeSeconds} s</>
          }
          subtext={"Average thinking time this month."}
        >
          {quietTimeSeconds.dataset.data.length ? (
            <BarChart
              labels={quietTimeSeconds.labels}
              dataset={quietTimeSeconds.dataset}
              className="h-24 w-24  2xl:h-full 2xl:w-36"
              barThickness={6}
              hideGridLines
            />
          ) : (
            <div className="w-24 text-center text-sm 2xl:w-36">No data</div>
          )}
        </MetricCard>
        {/* <MetricCard
          title={slangFrequency.labels.length.toString()}
          subtext="Different slang words detected this month."
        >
          {slangFrequency.dataset.data.length ? (
            <PieChart
              labels={slangFrequency.labels}
              dataset={slangFrequency.dataset}
              className="w-24 2xl:w-36"
            />
          ) : (
            <div className="w-24 text-center text-sm 2xl:w-36">No data</div>
          )}
        </MetricCard> */}
        <MetricCard
          title={wordFrequency.dataset.data.length}
          subtext="Different filler words detected this month."
        >
          {wordFrequency.dataset.data.length ? (
            <PieChart
              labels={wordFrequency.labels}
              dataset={wordFrequency.dataset}
              className="w-24 2xl:w-36"
            />
          ) : (
            <div className="w-24 text-center text-sm 2xl:w-36">No data</div>
          )}
        </MetricCard>
      </div>
      <Card className="relative flex h-full w-full flex-col justify-center lg:w-96 lg:flex-auto">
        <div className="w-full pb-5 pl-4 text-2xl">Response times</div>
        <BarChart
          labels={timeSeconds.labels}
          dataset={timeSeconds.dataset}
          className="h-64 w-full"
        />
        {!timeSeconds.dataset.data.length && (
          <div className="absolute left-0 right-0 ml-auto mr-auto w-24 text-center text-sm 2xl:w-36">
            No data
          </div>
        )}
      </Card>
    </div>
  );
}
