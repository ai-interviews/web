import { Image } from "@/app/_components/Image";
import { Avatar } from "../Avatar";
import { getCountryImageUrl } from "../../_lib/client/getCountryImageUrl";

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

export type TableCol = TextCol | PersonCol | DateCol;

type Props = {
  colData: TableCol;
  className?: string;
};

export function TableCol({ colData, className }: Props) {
  const { type, data } = colData;

  switch (type) {
    case "Text":
      return (
        <td className={`max-w-xs break-words ${className}`}>{data.text}</td>
      );
    case "Date":
      return <td className={className}>{data.date.toDateString()}</td>;
    case "Person":
      return (
        <td className={className}>
          <div className="flex items-center space-x-4">
            <Avatar name={data.name} src={data.image} size="sm" />
            <div>
              <div className="font-bold">{data.name}</div>
              <div className="flex flex-nowrap items-center gap-1.5 text-sm opacity-50 whitespace-nowrap">
                <Image
                  className="h-2 w-4"
                  src={getCountryImageUrl(data.country)}
                  alt="country flag"
                />
                {data.country}
              </div>
            </div>
          </div>
        </td>
      );
  }
}
