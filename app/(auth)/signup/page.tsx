import { Card } from "@/app/_components/Card";
import { SignupForm } from "./_components/SignUpForm";
import { redirect } from "next/navigation";
import { getServerUser } from "@/app/_lib/server/getServerUser";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function SignupPage() {
  const session = await getServerSession(authOptions);

  if (session?.user) {
    redirect("/");
  }

  return (
    <Card className="w-full rounded-md p-6 lg:max-w-lg">
      <h1 className="text-center text-3xl font-light">Sign up</h1>
      <SignupForm />
    </Card>
  );
}
