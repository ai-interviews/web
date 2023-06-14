import { ReactNode } from "react";
import { ThemeSelector } from "./ThemeSelector";

type Props = {
  title: string;
  rightContent?: ReactNode;
};

export function Header({ title, rightContent }: Props) {
  return (
    <div className="flex justify-between w-full my-2 mb-5">
      <div className="text-3xl md:text-4xl font-light">{title}</div>
      <div>{rightContent}</div>
    </div>
  );
}
