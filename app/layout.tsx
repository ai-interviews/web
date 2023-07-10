import { NextAuthProvider, ThemeProvider, ToastProvider } from "./providers";
import "@/app/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider>
      <head></head>
      <body className="h-screen">
        <main className="h-screen">
          <ToastProvider>
            <NextAuthProvider>{children}</NextAuthProvider>
          </ToastProvider>
        </main>
      </body>
    </ThemeProvider>
  );
  ``;
}
