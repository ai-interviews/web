"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

type MenuItemProps = {
  icon: ReactNode;
  text: string;
  href: string;
  bgColorSecondary?: boolean;
};

export function MenuItem({
  icon,
  text,
  href,
  bgColorSecondary,
}: MenuItemProps) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={href}
        className={`
          flex align-center text-lg h-12 gap-4 
          ${bgColorSecondary ? "bg-accent" : ""}
          ${pathname.includes(href) ? "active" : ""}
        `}
      >
        {icon}
        {text}
      </Link>
    </li>
  );
}
