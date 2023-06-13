import { ThemeSelector } from "./ThemeSelector";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <div className="flex justify-between w-full mb-1">
      <div className="text-4xl font-light">{title}</div>
      <ThemeSelector />
    </div>
  );
}
