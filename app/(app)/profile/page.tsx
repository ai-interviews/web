import { Header } from "../_components/Header";
import { Suspense } from "react";
import { ProfileInfo } from "./_components/ProfileInfo";

export default async function Profile() {
  return (
    <div className="h-min">
      <div className="mb-4 2xl:mb-8">
        <Header title={`Profile`} />
      </div>
      <Suspense>
        <ProfileInfo />
      </Suspense>
    </div>
  );
}