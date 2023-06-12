"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignIn() {
  const [email, setEmail] = useState<string>();

  const handleSignIn = () => {
    if (email) {
      signIn("email", { email, redirect: false });
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign in with email</button>
    </div>
  );
}
