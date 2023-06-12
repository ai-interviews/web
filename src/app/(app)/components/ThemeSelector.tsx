"use client";

import { Dropdown } from "@/app/components/inputs/Dropdown";
import { getTheme, setTheme } from "@/app/lib/client/theme";

const THEMES = [
  "light",
  "dark",
  "cupcake",
  "bumblebee",
  "emerald",
  "corporate",
  "synthwave",
  "retro",
  "cyberpunk",
  "valentine",
  "halloween",
  "garden",
  "forest",
  "aqua",
  "lofi",
  "pastel",
  "fantasy",
  "wireframe",
  "black",
  "luxury",
  "dracula",
  "cmyk",
  "autumn",
  "business",
  "acid",
  "lemonade",
  "night",
  "coffee",
  "winter",
];

export function ThemeSelector() {
  const onChange = (theme: string) => {
    setTheme(theme);
  };

  return (
    <Dropdown
      onChange={onChange}
      options={THEMES.map((theme) => ({ label: theme, value: theme }))}
      selected={getTheme()}
      wide={true}
    />
  );
}
