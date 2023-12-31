"use client";

import { Spinner } from "@/app/_components/Spinner";
import { Input } from "@/app/_components/inputs/Input";
import { Link } from "@/app/_components/inputs/Link";
import { useToast } from "@/app/_hooks/useToast";
import { signIn } from "@/app/_lib/client/signIn";
import { callBackend } from "@/app/_lib/server/callBackend";
import { ApiSignInBody } from "@/app/api/signin/_lib/signIn";
import CheckCircleIcon from "@heroicons/react/24/outline/CheckCircleIcon";
import classNames from "classnames";
import { useState } from "react";

export function SignInForm() {
  const showToast = useToast();

  const [email, setEmail] = useState<string>();

  const [isErrorEmail, setIsErrorEmail] = useState<boolean>();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEmailSent, setIsEmailSent] = useState<boolean>(false);

  const onSubmit = async () => {
    if (!email) {
      setIsErrorEmail(true);
      showToast({
        type: "danger",
        text: "Please fill in all required fields.",
      });
      return;
    }

    try {
      setIsLoading(true);

      await signIn({ email });

      setIsEmailSent(true);
    } catch (error) {
      console.error(error);
      showToast({
        type: "danger",
        text: "Something went wrong: " + error,
      });
    }

    setIsLoading(false);
  };

  return isEmailSent ? (
    <div className="mt-3 flex w-full flex-col items-center gap-3 px-5">
      <CheckCircleIcon height={80} className="text-success" />
      <div className="space-y-1">
        <div className="w-full text-xl font-semibold">Check your email</div>
        <div className="text-md">
          Please check your email inbox (make sure to check your junk folder)
          and click on the provided link to sign in. If you don&apos;t recieve
          an email, {/* TODO: Debounce signin */}
          <Link href="#" onClick={() => signIn({ email: email! })}>
            click here to resend.
          </Link>
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-2">
      <div className="mt-3 text-sm">
        Note: We are currently experiencing an issue with link validation for
        Microsoft work emails. While we are fixing this issue, we kindly ask
        that you use a non-work email to sign up. Thank you for your
        understanding!
      </div>
      <div>
        <label className="label">
          <span className="label-text text-base">Email</span>
        </label>
        <Input
          placeholder="Email address"
          isError={isErrorEmail}
          value={email}
          onChange={setEmail}
          onEnterKey={() => onSubmit()}
        />
      </div>

      <div className="pt-3">
        <button
          className="btn-neutral btn w-24"
          onClick={onSubmit}
          disabled={isLoading}
        >
          {isLoading ? <Spinner /> : "Sign in"}
        </button>
      </div>

      <div className="pt-1 text-sm">
        Don&apos;t have an account? <Link href="/signup">Sign up.</Link>
      </div>
    </div>
  );
}
