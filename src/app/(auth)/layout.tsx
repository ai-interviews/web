import { SessionProvider } from "next-auth/react";
import { NextAuthProvider } from "@/app/providers";
import { Suspense } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Suspense fallback="loading...">{children}</Suspense>;
}
