"use client";

import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { ChartDataset } from "./BarChart";
import { useTheme } from "../../../_lib/client/theme";

ChartJS.register(ArcElement, Tooltip, Legend);

type Props = {
  labels: string[];
  dataset: ChartDataset;
  className?: string;
};

export function PieChart({ labels, dataset, className = "" }: Props) {
  const {
    themeColors: { primary, secondary, accent, neutral, info },
  } = useTheme();

  return (
    <div className={className}>
      <Pie
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels,
          datasets: [
            {
              ...dataset,
              backgroundColor: [primary, secondary, accent, neutral, info],
            },
          ],
        }}
      />
    </div>
  );
}
