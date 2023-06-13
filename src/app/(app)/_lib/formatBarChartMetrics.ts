import { BarChartDataset } from "../_components/Charts/BarChart";
import { AggregateMetrics } from "./db/getAggregateMetrics";

export const formatBarChartMetrics = ({
  metrics,
}: {
  metrics: AggregateMetrics[];
}) => {
  const labels: string[] = [];
  const datasets: Record<
    "avgScore" | "avgQuietTimeSeconds" | "avgTimeSeconds",
    BarChartDataset
  > = {
    avgScore: { label: "data", data: [] },
    avgQuietTimeSeconds: { label: "data", data: [] },
    avgTimeSeconds: { label: "data", data: [] },
  };

  for (const metric of metrics) {
    // Push month name as x axis label
    labels.push(metric.date.toLocaleString("default", { month: "long" }));

    // Push quantity to bar chart dataset
    datasets.avgScore.data.push(metric.avgScore);
    datasets.avgTimeSeconds.data.push(metric.avgTimeSeconds);
    datasets.avgQuietTimeSeconds.data.push(metric.avgQuietTimeSeconds);
  }

  return { labels, datasets };
};
