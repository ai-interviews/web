"use client";

import { Spinner } from "@/app/_components/Spinner";
import { useToast } from "@/app/_hooks/useToast";
import { callBackend } from "@/app/_lib/server/callBackend";
import TrashIcon from "@heroicons/react/24/outline/TrashIcon";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  responseId: string;
};

export function DeleteResponseButton({ responseId }: Props) {
  const showToast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await callBackend({
        url: `/api/response/${responseId}`,
        method: "DELETE",
      });
      router.refresh();
    } catch (error) {
      console.error(error);
      showToast({
        type: "danger",
        text: "There was an error deleting your response. Try again or contact a developer.",
      });
    }

    setIsLoading(false);
  };

  return (
    <button className="btn-ghost btn" onClick={onDelete} disabled={isLoading}>
      {isLoading ? (
        <Spinner />
      ) : (
        <TrashIcon className="text-error" height={20} />
      )}
    </button>
  );
}
