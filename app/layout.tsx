import { NextAuthProvider, ThemeProvider } from "./providers";
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
          <NextAuthProvider>{children}</NextAuthProvider>
        </main>
      </body>
    </ThemeProvider>
  );
  ``;
}
