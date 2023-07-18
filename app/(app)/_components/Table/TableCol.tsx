import { Image } from "@/app/_components/Image";
import { Avatar } from "../Avatar";
import { getCountryImageUrl } from "../../_lib/client/getCountryImageUrl";
import { formatDate } from "@/app/_lib/client/formatDate";
import { ReactNode } from "react";
import Link from "next/link";
import classNames from "classnames";

type DateCol = {
  type: "Date";
  data: {
    date: Date;
  };
};

type PersonCol = {
  type: "Person";
  data: {
    name: string;
    image?: string;
    country: string;
  };
};

type TextCol = {
  type: "Text";
  data: {
    text: string;
  };
};

type CustomCol = {
  type: "Custom";
  data: {
    content: ReactNode;
  };
};

export type TableCol = TextCol | PersonCol | DateCol | CustomCol;

type Props = {
  colData: TableCol;
  className?: string;
  href?: string;
};

export function TableCol({ colData, className, href }: Props) {
  const { type, data } = colData;

  const linkWrapper = (content: ReactNode): ReactNode => {
    if (href) {
      return (
        <Link href={href} className="h-full w-full">
          <div className="flex h-full w-full items-center px-3 py-4">
            {content}
          </div>
        </Link>
      );
    }

    return (
      <div className="h-full w-full">
        <div className="flex h-full w-full items-center px-3 py-4">
          {content}
        </div>
      </div>
    );
    // return content;
  };

  switch (type) {
    case "Text":
      return (
        <td className={classNames("max-w-xs break-words p-0", className)}>
          {linkWrapper(data.text)}
        </td>
      );
    case "Date":
      return (
        <td className={classNames("p-0", className)}>
          {linkWrapper(formatDate(data.date))}
        </td>
      );
    case "Custom":
      return (
        <td className={classNames("p-0", className)}>
          {linkWrapper(data.content)}
        </td>
      );
    case "Person":
      return (
        <td className={classNames("p-0", className)}>
          {linkWrapper(
            <div className="flex items-center space-x-4">
              <Avatar name={data.name} src={data.image} size="sm" />
              <div>
                <div className="font-bold">{data.name}</div>
                <div className="flex flex-nowrap items-center gap-1.5 whitespace-nowrap text-sm opacity-50">
                  <Image
                    className="h-2 w-4"
                    src={getCountryImageUrl(data.country)}
                    alt="country flag"
                  />
                  {data.country}
                </div>
              </div>
            </div>
          )}
        </td>
      );
  }
}
