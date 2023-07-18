import { ReactNode } from "react";

type Props = {
  className?: string;
  children?: ReactNode;
};

export function Card({ children, className = "" }: Props) {
  return (
    <div className={`card bg-base-200 px-6 py-6 ${className}`}>{children}</div>
  );
}
