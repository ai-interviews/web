"use client";

import { Chart } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement } from "chart.js";
import { useTheme } from "@/app/_lib/client/theme";

Chart.register(CategoryScale, LinearScale, BarElement);

export type BarChartDataset = { label: string; data: number[] };

type Props = {
  className?: string;
  labels: string[];
  dataset: BarChartDataset;
  barThickness?: number;
  hideYAxis?: boolean;
};

export function BarChart({
  className,
  labels,
  dataset,
  hideYAxis,
  barThickness = 15,
}: Props) {
  const { themeColors } = useTheme();

  return (
    <div className={className}>
      <Bar
        options={{
          responsive: true,
          maintainAspectRatio: false,
          scales: hideYAxis
            ? {
                y: {
                  ticks: {
                    display: false,
                  },
                  grid: {
                    display: false,
                  },
                },
              }
            : {},
        }}
        data={{
          labels,
          datasets: [
            {
              ...dataset,
              borderColor: themeColors.primary,
              backgroundColor: themeColors.primary,
              barThickness,
              borderWidth: 2,
              borderRadius: 3,
              borderSkipped: false,
            },
          ],
        }}
      />
    </div>
  );
}
