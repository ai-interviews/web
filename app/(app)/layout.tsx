import { Suspense } from "react";
import { Menu } from "./_components/Menu";
import { LoadScreen } from "../_components/LoadScreen";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-full items-center gap-8 p-10">
      <Menu />
      <div className="h-full w-full overflow-x-auto pb-5 pr-5 2xl:w-9/12">
        <Suspense fallback={<LoadScreen />}>{children}</Suspense>
      </div>
    </div>
  );
}
