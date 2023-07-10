import { formatDate } from "@/app/_lib/client/formatDate";
import { getServerUser } from "@/app/_lib/server/getServerUser";

export async function ProfileInfo() {
  const user = await getServerUser();

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-5">
        <div className="text-2xl">My information</div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">Name</div>
          <div className="text-sm opacity-50">{user.name}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">Email</div>
          <div className="text-sm opacity-50">{user.email}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">Country</div>
          <div className="text-sm opacity-50">{user.country}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">LinkedIn Profile</div>
          <div className="text-sm opacity-50">{user.linkedIn}</div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-xl">User Since</div>
          <div className="text-sm opacity-50">
            {formatDate(user.dateJoined)}
          </div>
        </div>
      </div>
    </div>
  );
}
