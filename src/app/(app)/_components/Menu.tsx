import {
  RectangleGroupIcon,
  ChartBarIcon,
  BookmarkIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { ReactNode } from "react";
import { Avatar } from "./Avatar";
import { Card } from "@/app/_components/Card";
import { getServerUrl } from "@/app/_lib/server/getServerUrl";
import { getServerUser } from "@/app/_lib/server/getServerUser";

export async function Menu() {
  const iconClass = "h-7";
  const user = await getServerUser();
  const { pathname } = getServerUrl();

  return (
    <Card className="pt-6 h-full hidden md:block">
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
          href="/"
          active={pathname === "/" || pathname.includes("/dashboard")}
        />
        <MenuItem
          icon={<ChartBarIcon className={iconClass} />}
          text="Metrics"
          href="/metrics"
          active={pathname.includes("/metrics")}
        />
        <MenuItem
          icon={<BookmarkIcon className={iconClass} />}
          text="My Jobs"
          href="/jobs"
          active={pathname.includes("jobs")}
        />
        <MenuItem
          icon={<UserIcon className={iconClass} />}
          text="My Profile"
          href="/profile"
          active={pathname.includes("/profile")}
        />
      </ul>
    </Card>
  );
}

type MenuItemProps = {
  icon: ReactNode;
  text: string;
  href: string;
  active?: boolean;
};

function MenuItem({ icon, text, active, href }: MenuItemProps) {
  return (
    <li>
      <Link
        href={href}
        className={`flex align-center text-lg h-12 gap-4 ${
          active ? "active" : ""
        }`}
      >
        {icon}
        {text}
      </Link>
    </li>
  );
}
