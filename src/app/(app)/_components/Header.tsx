import { ThemeSelector } from "./ThemeSelector";

type Props = {
  title: string;
};

export function Header({ title }: Props) {
  return (
    <div className="flex justify-between w-full my-2 mb-5 md:mb-2">
      <div className="text-3xl md:text-4xl font-light">{title}</div>
      <ThemeSelector />
    </div>
  );
}
