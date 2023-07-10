import { formatDate } from "@/app/_lib/client/formatDate";
import { ChartDataset } from "../../_components/Charts/BarChart";
import { AggregateMetrics } from "../server/getAggregateMetrics";
import { Response } from "../server/getResponses";
import { percentDifference } from "./percentDifference";

const FILLER_WORDS = new Set([
  "um",
  "uh",
  "like",
  "well",
  "you know",
  "so",
  "actually",
  "basically",
  "honestly",
  "literally",
  "anyway",
  "right",
  "i mean",
  "ok",
  "okay",
  "ah",
  "er",
  "hmm",
  "ahem",
  "right",
  "ahh",
  "yeah",
  "mm-hmm",
  "mhm",
]);

type AggregateMetric =
  | "avgScore"
  | "avgQuietTimeSeconds"
  | "avgTimeSeconds"
  | "wordFrequency";

type ResponseMetric = "score" | "quietTimeSeconds" | "timeSeconds";

type Dataset = { labels: string[]; dataset: ChartDataset };

export const formatChartMetrics = ({
  metrics,
  responses,
}: {
  metrics: AggregateMetrics[];
  responses?: Response[];
}) => {
  const labels: string[] = [];
  const aggregateDatasets: Record<AggregateMetric, Dataset> = {
    avgScore: { labels: [], dataset: { label: "data", data: [] } },
    avgQuietTimeSeconds: { labels: [], dataset: { label: "data", data: [] } },
    avgTimeSeconds: { labels: [], dataset: { label: "data", data: [] } },
    wordFrequency: { labels: [], dataset: { label: "data", data: [] } },
  };

  const responseDatasets: Record<ResponseMetric, Dataset> = {
    score: { labels: [], dataset: { label: "data", data: [] } },
    quietTimeSeconds: { labels: [], dataset: { label: "data", data: [] } },
    timeSeconds: { labels: [], dataset: { label: "data", data: [] } },
  };

  // Base metrics
  for (const metric of metrics) {
    // TODO: handle different periods
    const label = metric.date.toLocaleString("default", { month: "long" });

    // Labels
    aggregateDatasets.avgScore.labels.push(label);
    aggregateDatasets.avgTimeSeconds.labels.push(label);
    aggregateDatasets.avgQuietTimeSeconds.labels.push(label);

    // Data
    aggregateDatasets.avgScore.dataset.data.push(metric.avgScore);
    aggregateDatasets.avgTimeSeconds.dataset.data.push(metric.avgTimeSeconds);
    aggregateDatasets.avgQuietTimeSeconds.dataset.data.push(
      metric.avgQuietTimeSeconds
    );
  }

  if (responses) {
    for (const response of responses) {
      const label = formatDate(response.date);

      // Labels
      responseDatasets.score.labels.push(label);
      responseDatasets.timeSeconds.labels.push(label);
      responseDatasets.quietTimeSeconds.labels.push(label);

      // Data
      if (response.score) {
        responseDatasets.score.dataset.data.push(response.score);
      }
      if (response.quietTimeSeconds) {
        responseDatasets.quietTimeSeconds.dataset.data.push(
          response.quietTimeSeconds
        );
      }
      responseDatasets.timeSeconds.dataset.data.push(response.timeSeconds);
    }
  }

  // Word frequency
  if (metrics.length > 0) {
    for (const [word, freq] of Object.entries(
      // Get current periods metrics
      metrics[metrics.length - 1].wordFrequency
    )) {
      if (
        FILLER_WORDS.has(word) ||
        word.includes("uh") ||
        word.includes("um")
      ) {
        // Label
        aggregateDatasets.wordFrequency.labels.push(word);

        // Data
        aggregateDatasets.wordFrequency.dataset.data.push(freq);
      }
    }
  }

  const getPercentDifference = (key: AggregateMetric) => {
    const data = aggregateDatasets[key].dataset.data;
    if (data.length > 1) {
      return percentDifference(data[data.length - 2], data[data.length - 1]);
    }
  };

  const percentDifferences = {
    avgScore: getPercentDifference("avgScore"),
    avgQuietTimeSeconds: getPercentDifference("avgQuietTimeSeconds"),
    avgTimeSeconds: getPercentDifference("avgTimeSeconds"),
  };

  return { labels, aggregateDatasets, responseDatasets, percentDifferences };
};
