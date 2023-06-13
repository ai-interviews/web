import { NextAuthProvider } from "@/app/providers";
import { Menu } from "./_components/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center h-full p-10 gap-8">
      <Menu />
      <div className="h-full pr-5 pb-5 sm:w-full 2xl:w-8/12 overflow-x-auto">
        {children}
      </div>
    </div>
  );
}
