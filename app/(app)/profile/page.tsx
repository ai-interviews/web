import { Header } from "../_components/Header";
import { Suspense } from "react";
import { ProfileLayout } from "./_components/ProfileLayout";
import { LoadScreen } from "@/app/_components/LoadScreen";

export default async function Profile() {
  return (
    <div>
      <Header title="Profile" />
      <Suspense fallback={<LoadScreen />}>
        <ProfileLayout />
      </Suspense>
    </div>
  );
}
