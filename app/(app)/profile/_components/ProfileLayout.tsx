import { Card } from "@/app/_components/Card";
import { formatDate } from "@/app/_lib/client/formatDate";
import { getServerUser } from "@/app/_lib/server/getServerUser";
import { ProfileForm } from "./ProfileForm";

export async function ProfileLayout() {
  const user = await getServerUser();

  return (
    <Card className="px-7 py-8">
      <ProfileForm user={user} />
    </Card>
  );
}
