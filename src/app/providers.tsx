"use client";

import { SessionProvider } from "next-auth/react";
import { getTheme } from "./lib/client/theme";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ThemeProvider = ({ children }: Props) => {
  return (
    <html lang="en" data-theme={getTheme()}>
      {children}
    </html>
  );
};
