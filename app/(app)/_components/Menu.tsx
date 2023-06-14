import {
  RectangleGroupIcon,
  ChartBarIcon,
  BookmarkIcon,
  UserIcon,
  PlusIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";
import { Avatar } from "./Avatar";
import { Card } from "../../_components/Card";
import { getServerUrl } from "../../_lib/server/getServerUrl";
import { getServerUser } from "../../_lib/server/getServerUser";
import { ThemeSelector } from "./ThemeSelector";
import { MenuItem } from "./MenuItem";

export async function Menu() {
  const iconClass = "h-7";
  const user = await getServerUser();

  return (
    <Card className="pt-6 h-full hidden md:flex flex-col justify-between">
      <ul className="menu w-56 rounded-box gap-4">
        {/* Avatar */}
        <div className="flex flex-col gap-3 mb-5">
          <div className="flex align-center justify-center w-full">
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
          icon={<ChartBarIcon className={iconClass} />}
          text="Metrics"
          href="/metrics"
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
        <button className="btn btn-ghost">
          <ArrowLeftOnRectangleIcon height={24} width={24} />{" "}
        </button>
        <ThemeSelector />
      </div>
    </Card>
  );
}
