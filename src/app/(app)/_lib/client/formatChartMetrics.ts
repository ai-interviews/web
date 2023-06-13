import { ChartDataset } from "../../_components/Charts/BarChart";
import { AggregateMetrics } from "../server/getAggregateMetrics";
import { percentDifference } from "./percentDifference";

type NumericMetric =
  | "avgScore"
  | "avgQuietTimeSeconds"
  | "avgTimeSeconds"
  | "wordFrequency";

export const formatChartMetrics = ({
  metrics,
}: {
  metrics: AggregateMetrics[];
}) => {
  const labels: string[] = [];
  const datasets: Record<
    NumericMetric,
    { labels: string[]; dataset: ChartDataset }
  > = {
    avgScore: { labels: [], dataset: { label: "data", data: [] } },
    avgQuietTimeSeconds: { labels: [], dataset: { label: "data", data: [] } },
    avgTimeSeconds: { labels: [], dataset: { label: "data", data: [] } },
    wordFrequency: { labels: [], dataset: { label: "data", data: [] } },
  };

  // Base metrics
  for (const metric of metrics) {
    const label = metric.date.toLocaleString("default", { month: "long" });

    // Labels
    datasets.avgScore.labels.push(label);
    datasets.avgTimeSeconds.labels.push(label);
    datasets.avgQuietTimeSeconds.labels.push(label);

    // Data
    datasets.avgScore.dataset.data.push(metric.avgScore);
    datasets.avgTimeSeconds.dataset.data.push(metric.avgTimeSeconds);
    datasets.avgQuietTimeSeconds.dataset.data.push(metric.avgQuietTimeSeconds);
  }

  // Word frequency
  if (metrics.length > 0) {
    for (const [word, freq] of Object.entries(
      metrics[metrics.length - 1].wordFrequency
    )) {
      if (word === "so" || word === "and" || word === "to" || word === "a") {
        // Label
        datasets.wordFrequency.labels.push(word);

        // Data
        datasets.wordFrequency.dataset.data.push(freq);
      }
    }
  }

  const getPercentDifference = (key: NumericMetric) => {
    const data = datasets[key].dataset.data;
    if (data.length > 1) {
      return percentDifference(data[data.length - 2], data[data.length - 1]);
    }
  };

  const percentDifferences = {
    avgScore: getPercentDifference("avgScore"),
    avgQuietTimeSeconds: getPercentDifference("avgQuietTimeSeconds"),
    avgTimeSeconds: getPercentDifference("avgTimeSeconds"),
  };

  return { labels, datasets, percentDifferences };
};
