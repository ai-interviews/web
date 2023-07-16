import { ApiSignInBody } from "@/app/api/signin/_lib/signIn";
import { signIn as nextAuthSignIn } from "next-auth/react";
import { callBackend } from "../server/callBackend";

export const signIn = async ({ email }: { email: string }) => {
  await callBackend<{}, ApiSignInBody>({
    method: "POST",
    url: "/api/signin",
    body: {
      email,
    },
  });

  return await nextAuthSignIn("email", {
    email,
    redirect: false,
  });
};
