import { Avatar } from "../Avatar";

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
    subtext?: string;
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
};

export function TableCol({ colData }: Props) {
  const { type, data } = colData;

  switch (type) {
    case "Text":
      return <td className="max-w-xs break-words">{data.text}</td>;
    case "Date":
      return <td>{data.date.toDateString()}</td>;
    case "Person":
      return (
        <td>
          <div className="flex items-center space-x-3">
            <Avatar name={data.name} src={data.image} small />
            <div>
              <div className="font-bold">{data.name}</div>
              <div className="text-sm opacity-50 whitespace-nowrap">
                {data.subtext}
              </div>
            </div>
          </div>
        </td>
      );
  }
}
