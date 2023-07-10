import { Card } from "../../_components/Card";
import { ReactNode } from "react";

type Props = {
  title: ReactNode;
  subtext: string;
  children?: ReactNode;
};

export function MetricCard({ title, subtext, children }: Props) {
  return (
    <Card className="w-full justify-center lg:w-min 2xl:h-48">
      <div className="align-center flex items-center justify-center gap-2 lg:gap-8 ">
        <div className="flex flex-col justify-center gap-5">
          <div className="xl:text-xl 2xl:text-2xl">{title}</div>
          <div className="w-32 break-words text-sm opacity-50">{subtext}</div>
        </div>
        {children}
      </div>
    </Card>
  );
}
