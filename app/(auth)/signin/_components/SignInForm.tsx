"use client";

import { Spinner } from "@/app/_components/Spinner";
import { Link } from "@/app/_components/inputs/Link";
import { useToast } from "@/app/_hooks/useToast";
import { signIn } from "@/app/_lib/client/signIn";
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
        text: "Something went wrong. Please try again.",
      });
    }
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
      <div>
        <label className="label">
          <span className="label-text text-base">Email</span>
        </label>
        <input
          type="text"
          placeholder="Email address"
          className={classNames("input-bordered input w-full", {
            "input-error": isErrorEmail,
          })}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onSubmit();
            }
          }}
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
