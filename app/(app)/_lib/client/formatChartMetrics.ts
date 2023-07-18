import { formatDate } from "@/app/_lib/client/formatDate";
import { ChartDataset } from "../../_components/Charts/BarChart";
import { Response } from "../server/getResponses";
import { FILLER_WORDS, SLANG_WORDS } from "./metricDictionary";

type ResponseMetric =
  | "quietTimeSeconds"
  | "timeSeconds"
  | "wordFrequency"
  | "slangFrequency";

type Dataset = { labels: string[]; dataset: ChartDataset; avg: number };

export const formatChartMetrics = ({
  responses = [],
}: {
  responses?: Response[];
}) => {
  const labels: string[] = [];

  const responseDatasets: Record<ResponseMetric, Dataset> = {
    quietTimeSeconds: {
      labels: [],
      dataset: { label: "data", data: [] },
      avg: 0,
    },
    timeSeconds: {
      labels: [],
      dataset: { label: "data", data: [] },
      avg: 0,
    },
    wordFrequency: {
      labels: [],
      dataset: { label: "data", data: [] },
      avg: 0,
    },
    slangFrequency: {
      labels: [],
      dataset: { label: "data", data: [] },
      avg: 0,
    },
  };

  const wordFrequency: Record<string, number> = {};
  for (const response of responses) {
    const label = formatDate(response.date);

    // Labels
    responseDatasets.timeSeconds.labels.push(label);
    responseDatasets.quietTimeSeconds.labels.push("");

    // Data
    responseDatasets.timeSeconds.dataset.data.push(response.timeSeconds);
    responseDatasets.quietTimeSeconds.dataset.data.push(
      response.quietTimeSeconds
    );

    // Averages
    responseDatasets.timeSeconds.avg += response.timeSeconds / responses.length;
    responseDatasets.quietTimeSeconds.avg +=
      response.quietTimeSeconds / responses.length;

    // console.log(JSON.parse(response.wordFrequency as string));

    // Word frequency
    const responseWordFrequency = (response.wordFrequency || {}) as Record<
      string,
      number
    >;

    for (const [word, freq] of Object.entries(responseWordFrequency)) {
      wordFrequency[word] = (wordFrequency[word] || 0) + freq;
    }
  }

  // Get filler words from wordFrequency
  for (const [word, freq] of Object.entries(wordFrequency)) {
    if (FILLER_WORDS.has(word) || word.includes("uh") || word.includes("um")) {
      // Label
      responseDatasets.wordFrequency.labels.push(word);

      // Data
      responseDatasets.wordFrequency.dataset.data.push(freq);
    }
  }

  // Get slang words from wordFrequency
  for (const [word, freq] of Object.entries(wordFrequency)) {
    if (SLANG_WORDS.includes(word)) {
      // Label
      responseDatasets.slangFrequency.labels.push(word);

      // Data
      responseDatasets.slangFrequency.dataset.data.push(freq);
    }
  }

  return { labels, responseDatasets };
};
