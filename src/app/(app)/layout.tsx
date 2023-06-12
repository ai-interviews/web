import { NextAuthProvider } from "@/app/providers";
import { Menu } from "./components/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center h-full p-10 gap-8">
      <Menu />
      <div className="h-full">{children}</div>
    </div>
  );
}
