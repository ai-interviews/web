import { Card } from "@/app/_components/Card";
import { ReactNode } from "react";

type Props = {
  title: string;
  subtext: string;
  children?: ReactNode;
};

export function MetricCard({ title, subtext, children }: Props) {
  return (
    <Card className="2xl:h-48 justify-center w-full lg:w-min">
      <div className="flex align-center items-center justify-center gap-2 lg:gap-8 ">
        <div className="flex flex-col justify-center gap-5">
          <div className="xl:text-xl 2xl:text-2xl">{title}</div>
          <div className="text-sm opacity-50 w-32 break-words">{subtext}</div>
        </div>
        {children}
      </div>
    </Card>
  );
}
