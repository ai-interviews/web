import { getServerSession } from "next-auth";
import SignOut from "./_components/SignOut";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

export default async function SignOutPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/signin");
  }

  return <SignOut />;
}
