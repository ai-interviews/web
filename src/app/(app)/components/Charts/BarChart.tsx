"use client";

import { Chart, ChartData, ChartDataset } from "chart.js";
import { Bar } from "react-chartjs-2";
import { CategoryScale, LinearScale, BarElement } from "chart.js";
import { getThemeColors } from "@/app/lib/client/theme";
import { useEffect, useState } from "react";

Chart.register(CategoryScale, LinearScale, BarElement);

type Props = {
  className?: string;
  labels: string[];
  dataset: { label: string; data: number[] };
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
  const [primaryThemeColor, setPrimaryThemeColor] = useState<string>(
    getThemeColors().primary
  );

  // Change bar color when theme is changed
  useEffect(() => {
    const onStorage = () => {
      setPrimaryThemeColor(getThemeColors().primary);
    };

    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, []);

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
              borderColor: primaryThemeColor,
              backgroundColor: primaryThemeColor,
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
