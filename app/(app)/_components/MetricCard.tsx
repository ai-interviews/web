import classNames from "classnames";
import { Card } from "../../_components/Card";
import { ReactNode } from "react";

type Props = {
  title?: ReactNode;
  subtext: string;
  className?: string;
  children?: ReactNode;
};

export function MetricCard({ title, subtext, className, children }: Props) {
  return (
    <Card className={classNames("w-full justify-center 2xl:h-48", className)}>
      <div className="align-center flex items-center justify-center gap-2 lg:gap-8 ">
        <div
          className={classNames("flex flex-col justify-center", {
            "gap-5": !!title,
          })}
        >
          <div className="xl:text-xl 2xl:text-2xl">{title}</div>
          <div className="w-32 break-words text-sm opacity-50">{subtext}</div>
        </div>
        {children}
      </div>
    </Card>
  );
}
