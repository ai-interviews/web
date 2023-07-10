"use client";

import { Spinner } from "@/app/_components/Spinner";
import { ToastType } from "@/app/_components/Toast";
import { Input } from "@/app/_components/inputs/Input";
import { Link } from "@/app/_components/inputs/Link";
import { useToast } from "@/app/_hooks/useToast";
import { signIn } from "@/app/_lib/client/signIn";
import { callBackend } from "@/app/_lib/server/callBackend";
import { ApiSignUpBody, ApiSignUpResp } from "@/app/api/signup/_lib/signUp";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import { useState } from "react";

export function SignupForm() {
  const showToast = useToast();

  // Form data
  const [email, setEmail] = useState<string>();
  const [name, setName] = useState<string>();
  const [linkedin, setLinkedin] = useState<string>();

  // Form errors
  const [isErrorEmail, setIsErrorEmail] = useState<boolean>();
  const [isErrorName, setIsErrorName] = useState<boolean>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSignedUp, setIsSignedUp] = useState<boolean>();

  const onSubmit = async () => {
    try {
      if (isSignedUp || isLoading) {
        return;
      }

      setIsLoading(true);
      const [type, text] = [
        "danger" as ToastType,
        "Please fill in all required fields.",
      ];

      if (!email) {
        setIsErrorEmail(true);
        showToast({ type, text });
        return;
      }

      if (!name) {
        setIsErrorName(true);
        showToast({ type, text });
        return;
      }

      await callBackend<ApiSignUpResp, ApiSignUpBody>({
        url: "/api/signup",
        method: "POST",
        body: {
          email,
          name,
          linkedin,
        },
      });

      showToast({ type: "success", text: "Success!" });

      await signIn({ email });

      setIsSignedUp(true);
    } catch (error) {
      console.error(error);
      showToast({
        type: "danger",
        text: "Something went wrong. Please try again.",
      });
    }

    setIsLoading(false);
  };

  if (isSignedUp) {
    return (
      <div className="mt-3 flex w-full flex-col items-center gap-3 px-5">
        <CheckCircleIcon height={80} className="text-success" />
        <div className="space-y-1">
          <div className="w-full text-xl font-semibold">Check your email</div>
          <div className="text-md">
            Please check your email inbox (make sure to check your junk folder)
            and click on the provided link to sign in. If you don&apos;t recieve
            an email, {/* TODO: Debounce resend */}
            <Link href="#" onClick={() => signIn({ email: email! })}>
              click here to resend.
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Input label="Email" onChange={setEmail} required />
      <Input label="Name" onChange={setName} required />
      <Input label="Linkedin" onChange={setLinkedin} />

      <div className="pt-3">
        <button
          className="btn-neutral btn w-24"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Sign up"}
        </button>
      </div>

      <div className="pt-1 text-sm">
        Already have an account? <Link href="/signin">Sign in.</Link>
      </div>
    </div>
  );
}
