import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const useClientUser = () => {
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "unauthenticated") {
      router.push("/signin");
    }
  }, [session.status, router]);

  if (session.status === "loading" || !session.data?.user) {
    return { isLoading: true };
  }

  return { isLoading: false, user: session.data.user };
};
