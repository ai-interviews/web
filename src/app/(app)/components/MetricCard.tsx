import { Card } from "@/app/components/Card";
import { BarChart } from "./Charts/BarChart";

type Props = {
  title: string;
  subtext: string;
};

export function MetricCard({ title, subtext }: Props) {
  return (
    <Card>
      <div className="flex align-center justify-between gap-8">
        <div className="flex flex-col gap-5">
          <div className="text-2xl">{title}</div>
          <div className="text-sm opacity-50 w-32 break-words">{subtext}</div>
        </div>
        <BarChart
          labels={[""]}
          dataset={{ label: "Score", data: [6.5] }}
          className="h-full w-48"
          barThickness={8}
          hideYAxis
        />
      </div>
    </Card>
  );
}
