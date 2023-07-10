"use client";

import { SessionProvider } from "next-auth/react";
import { useTheme } from "./_lib/client/theme";
import { createContext, useState } from "react";
import { Toast, ToastOptions } from "./_components/Toast";

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

export const ToastContext = createContext({
  showToast: (_: ToastOptions) => {},
});

export const ToastProvider = ({ children }: Props) => {
  const [toastOptions, setToastOptions] = useState<ToastOptions>();

  const showToast = (options: ToastOptions) => {
    setToastOptions(options);

    // Clear toast after 5 seconds
    setTimeout(() => {
      setToastOptions(undefined);
    }, 5 * 1000);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {toastOptions && (
        <Toast type={toastOptions.type} text={toastOptions.text} />
      )}
      {children}
    </ToastContext.Provider>
  );
};
