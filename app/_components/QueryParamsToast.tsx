"use client";

import { useToast } from "@/app/_hooks/useToast";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export const QueryParamsToast = ({
  searchParams: { success },
}: {
  searchParams: { success?: string };
}) => {
  const showToast = useToast();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (success === "true") {
      showToast({
        type: "success",
        text: "Sucess",
      });
      router.replace(pathname);
    }
    // @ts-ignore
  }, [success, showToast, router]);

  return <></>;
};
