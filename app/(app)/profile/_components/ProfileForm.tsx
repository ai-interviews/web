"use client";

import { User } from "@prisma/client";
import { useState } from "react";
import { Avatar } from "../../_components/Avatar";
import { Input } from "@/app/_components/inputs/Input";
import { formatDate } from "@/app/_lib/client/formatDate";
import { Spinner } from "@/app/_components/Spinner";
import { useToast } from "@/app/_hooks/useToast";
import { callBackend } from "@/app/_lib/server/callBackend";
import {
  ApiUpdateUserResp,
  ApiUpdateUserBody,
} from "@/app/api/user/_lib/updateUser";
import { useRouter } from "next/navigation";

type Props = {
  user: User;
};

export function ProfileForm({ user }: Props) {
  const showToast = useToast();
  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>();

  // Form state
  const [name, setName] = useState<string>(user.name);
  const [country, setCountry] = useState<string>(user.country || "");
  const [linkedin, setLinkedin] = useState<string>(user.linkedin || "");
  const [imageUrl, setImageUrl] = useState<string>(user.image || "");

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      await callBackend<ApiUpdateUserResp, ApiUpdateUserBody>({
        url: "/api/user",
        method: "PUT",
        body: {
          name,
          country,
          linkedin,
          imageUrl,
        },
      });

      showToast({
        type: "success",
        text: "Saved.",
      });

      router.refresh();
    } catch (e) {
      console.error(e);
      showToast({
        type: "danger",
        text: "There was an error updating your profile information. Please try again or contact a developer.",
      });
    }

    setIsLoading(false);
  };

  return (
    <div className="w-full space-y-4 md:w-2/3">
      <div className="mb-4 flex w-full items-center gap-6">
        <Avatar size="lg" src={imageUrl} name={name} />
        <div className="w-full space-y-5">
          <Input label="Name" value={name} onChange={setName} />
          <Input label="Email" value={user.email} disabled />
        </div>
      </div>
      <Input
        label="Linkedin"
        value={linkedin}
        placeholder="URL"
        onChange={setLinkedin}
      />
      <Input label="Date joined" value={formatDate(user.dateJoined)} disabled />
      <Input label="Country" value={country} onChange={setCountry} />

      <div className="pt-3">
        <button
          className="btn-neutral btn w-24"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Save"}
        </button>
      </div>
    </div>
  );
}
