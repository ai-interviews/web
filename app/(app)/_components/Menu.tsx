import {
  RectangleGroupIcon,
  BookmarkIcon,
  UserIcon,
  PlusIcon,
  Bars4Icon,
} from "@heroicons/react/24/outline";
import { Avatar } from "./Avatar";
import { Card } from "../../_components/Card";
import { getServerUser } from "../../_lib/server/getServerUser";
import { ThemeSelector } from "./ThemeSelector";
import { MenuItem } from "./MenuItem";
import { SignOutButton } from "./SignOutButton";

export async function Menu() {
  const iconClass = "h-7";
  const user = await getServerUser();

  return (
    <Card className="hidden h-full flex-col justify-between pt-6 md:flex">
      <ul className="menu rounded-box w-56 gap-4">
        {/* Avatar */}
        <div className="mb-5 flex flex-col gap-3">
          <div className="align-center flex w-full justify-center">
            <Avatar src={user.image || undefined} name={user.name} />
          </div>
          <div className="w-full text-center">{user.name}</div>
        </div>

        {/* Menu items */}
        <MenuItem
          icon={<RectangleGroupIcon className={iconClass} />}
          text="Dashboard"
          href="/dashboard"
        />
        <MenuItem
          icon={<Bars4Icon className={iconClass} />}
          text="Past interviews"
          href="/interviews"
        />
        <MenuItem
          icon={<BookmarkIcon className={iconClass} />}
          text="My Jobs"
          href="/jobs"
        />
        <MenuItem
          icon={<UserIcon className={iconClass} />}
          text="My Profile"
          href="/profile"
        />
        <MenuItem
          icon={<PlusIcon className={iconClass} />}
          text="New interview"
          href="/interview"
          bgColorSecondary
        />
      </ul>
      <div className="flex items-center justify-between">
        <SignOutButton />
        <ThemeSelector />
      </div>
    </Card>
  );
}
