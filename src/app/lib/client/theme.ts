// @ts-ignore
import daisyUiColors from "daisyui/src/theming/themes";
import { getLocalStorage, setLocalStorage } from "./storage";

export const getTheme = () => getLocalStorage("interviews-theme") || "";

export const setTheme = (newTheme: string) => {
  setLocalStorage("interviews-theme", newTheme);
  window.dispatchEvent(new Event("storage"));
  document.querySelector("html")!.setAttribute("data-theme", newTheme);
};

type ThemeColors = {
  "color-scheme": string;
  primary: string;
  secondary: string;
  accent: string;
  "base-100": string;
  "base-200": string;
  "base-300": string;
  neutral: string;
  "neutral-focus": string;
  info: string;
  success: string;
  warning: string;
  error: string;
};

export const getThemeColors = (): ThemeColors =>
  daisyUiColors[`[data-theme=${getTheme()}]`];
