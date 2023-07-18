import { Card } from "@/app/_components/Card";
import { BarChart } from "@/app/(app)/_components/Charts/BarChart";
import { MetricCard } from "@/app/(app)/_components/MetricCard";
import { formatChartMetrics } from "@/app/(app)/_lib/client/formatChartMetrics";
import { PieChart } from "@/app/(app)/_components/Charts/PieChart";
import { Response } from "@/app/(app)/_lib/server/getResponses";

type Props = {
  responses: Response[];
};

export async function DashboardMetrics({ responses }: Props) {
  const chartMetrics = formatChartMetrics({ responses });

  const { timeSeconds, quietTimeSeconds, wordFrequency, slangFrequency } =
    chartMetrics.responseDatasets;

  const avgQuantifiedMetric =
    quantifiedMetric.dataset.data.reduce((acc, val) => acc + val, 0) /
      quantifiedMetric.dataset.data.length || 0;

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-5">
      <div className="flex w-full flex-col gap-3 lg:flex-1">
        <MetricCard
          title={<>{quietTimeSeconds.avg.toFixed(2)} s</>}
          subtext={"Average thinking time."}
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
        <MetricCard
          title={wordFrequency.dataset.data.length}
          subtext="Different filler words detected."
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
      <div className="flex w-full flex-wrap items-center justify-between gap-5">
        <div className="flex w-full flex-col gap-3 lg:flex-row">
          <MetricCard
            title={
              <>{avgQuietTimeSeconds === "0.00" ? 0 : avgQuietTimeSeconds} s</>
            }
            subtext={"Average thinking time this month."}
          >
            {quietTimeSeconds.dataset.data.length ? (
              <BarChart
                labels={quietTimeSeconds.dataset.data.map(() => "")}
                dataset={quietTimeSeconds.dataset}
                className="h-24 w-24 lg:w-1/4 2xl:h-full 2xl:w-36"
                barThickness={6}
                hideGridLines
              />
            ) : (
              <div className="w-24 text-center text-sm lg:w-1/4 2xl:w-36">
                No data
              </div>
            )}
          </MetricCard>
          <MetricCard
            title={wordFrequency.dataset.data.length}
            subtext="Different filler words detected this month."
          >
            {wordFrequency.dataset.data.length ? (
              <PieChart
                labels={wordFrequency.labels}
                dataset={wordFrequency.dataset}
                className="w-24 lg:w-1/4 2xl:w-36"
              />
            ) : (
              <div className="w-24 text-center text-sm lg:w-1/4 2xl:w-36">
                No data
              </div>
            )}
          </MetricCard>
          {/* <MetricCard
            title={<></>}
            subtext={
              "Average number of quantifiable metrics detected in your responses this month."
            }
          >
            {quantifiedMetric.dataset.data.length ? (
              <div className="w-24 text-center lg:w-1/4 2xl:w-36 2xl:text-5xl">
                {avgQuantifiedMetric}
              </div>
            ) : (
              <div className="w-24 text-center text-sm lg:w-1/4 2xl:w-36">
                No data
              </div>
            )}
          </MetricCard> */}
          <MetricCard
            title={slangFrequency.labels.length.toString()}
            subtext="Different slang words detected this month."
          >
            {slangFrequency.dataset.data.length ? (
              <PieChart
                labels={slangFrequency.labels}
                dataset={slangFrequency.dataset}
                className="w-24 lg:w-1/4 2xl:w-36"
              />
            ) : (
              <div className="w-24 text-center text-sm lg:w-1/4 2xl:w-36">
                No data
              </div>
            )}
          </MetricCard>
        </div>
      </div>
    </div>
  );
}
