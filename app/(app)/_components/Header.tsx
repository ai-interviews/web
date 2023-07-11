import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import Link from 'next/link';
import { ReactNode } from "react";
import { ThemeSelector } from "./ThemeSelector";

type Props = {
  title: string;
  rightContent?: ReactNode;
  backButton?: boolean;
  backLink?: string;
};

export function Header({ title, rightContent, backButton = false, backLink = "/" }: Props) {
  return (
    <div className="flex justify-between w-full my-2 mb-5">
      <div className="flex items-center gap-4">
        {backButton && (
          <Link href={backLink} className="btn btn-outline btn-sm">
          <ArrowLeftIcon height={22}/>
        </Link>
        )}
        <div className="text-3xl md:text-4xl font-light">{title}</div>
      </div>
      <div>{rightContent}</div>
    </div>
  );
}
