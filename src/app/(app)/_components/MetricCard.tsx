import { Card } from "@/app/_components/Card";
import { BarChart } from "./Charts/BarChart";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtext: string;
  children?: ReactNode;
};

export function MetricCard({ title, subtext, children }: Props) {
  return (
    <Card>
      <div className="flex align-center justify-between gap-8">
        <div className="flex flex-col gap-5">
          <div className="text-2xl">{title}</div>
          <div className="text-sm opacity-50 w-32 break-words">{subtext}</div>
        </div>
        {children}
      </div>
    </Card>
  );
}
