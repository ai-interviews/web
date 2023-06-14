"use client";

import { SessionProvider } from "next-auth/react";
import { useTheme } from "./_lib/client/theme";

type Props = {
  children?: React.ReactNode;
};

export const NextAuthProvider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export const ThemeProvider = ({ children }: Props) => {
  const { theme } = useTheme();

  return (
    <html lang="en" data-theme={theme || "light"}>
      {children}
    </html>
  );
};
