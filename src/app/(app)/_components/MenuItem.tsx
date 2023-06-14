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
          btn flex flex-nowrap justify-start whitespace-nowrap normal-case font-normal align-center text-lg h-12 gap-4 
          ${bgColorSecondary ? "btn-outline" : ""}
          ${pathname.includes(href) ? "active" : ""}
        `}
      >
        {icon}
        {text}
      </Link>
    </li>
  );
}
