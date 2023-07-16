import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";
import { ThemeSelector } from "./ThemeSelector";

type Props = {
  title: string;
  rightContent?: ReactNode;
  hasBackButton?: boolean;
  backLink?: string;
};

export function Header({
  title,
  rightContent,
  hasBackButton = false,
  backLink = "/",
}: Props) {
  return (
    <div className="my-2 mb-5 flex w-full justify-between">
      <div className="flex items-center gap-4">
        {hasBackButton && (
          <Link href={backLink} className="btn-outline btn-sm btn">
            <ArrowLeftIcon height={22} />
          </Link>
        )}
        <div className="text-3xl font-light md:text-4xl">{title}</div>
      </div>
      <div>{rightContent}</div>
    </div>
  );
}
